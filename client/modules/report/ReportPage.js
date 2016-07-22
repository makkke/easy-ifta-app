import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import is from 'is_js'
import _ from 'lodash'

import { getReport, saveReportOnServer } from './report.module'
import { updateUser } from './user.module'
import ReportTitle from './ReportTitle'
import AboutYouSection from './AboutYouSection'
import AboutCompany from './AboutCompany'
import DistanceTraveled from './DistanceTraveled'
import FuelPurchases from './FuelPurchases'
import Summary from './Summary'

class ReportPage extends Component {
  static propTypes = {
    report: PropTypes.object.isRequired,
    aboutYou: PropTypes.object.isRequired,
    saveReportOnServer: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
  }

  state = {
    aboutYou: this.props.aboutYou,
    errors: {},
  }

  componentWillReceiveProps(nextProps) {
    const { aboutYou } = nextProps
    this.setState({ aboutYou })
  }

  need = [
    getReport,
  ]

  handleAboutYouSectionChange = (event) => {
    const { aboutYou, errors } = this.state
    const field = event.target.name

    aboutYou[field] = event.target.value
    errors[field] = null

    this.setState({ aboutYou })
  }

  handleAboutYouSectionBlur = () => {
    const { aboutYou } = this.state
    const errors = this.validateAboutYouSection()

    if (is.not.empty(errors)) {
      this.setState({ errors })
    }

    const validFields = Object.keys(aboutYou).filter(x => !errors[x])
    const propsToSave = _.pick(aboutYou, validFields)

    this.props.actions.updateAboutYou(propsToSave)
    this.props.actions.saveReportOnServer()
  }

  validateAboutYouSection() {
    const errors = {}
    const { firstName, lastName } = this.state.aboutYou

    if (firstName.length === 0) {
      errors.firstName = 'This field is required'
    }

    if (lastName.length === 0) {
      errors.firstName = 'This field is required'
    }

    return errors
  }

  render() {
    return (
      <form id="main-content" className="col-xs-9" noValidate>
        <ReportTitle period={this.props.report.period} />
        <AboutYouSection
          aboutYou={this.state.aboutYou}
          errors={this.state.errors}
          onChange={this.handleAboutYouSectionChange}
          onBlur={this.handleAboutYouSectionBlur}
        />
        <AboutCompany save={this.props.saveReportOnServer} />
        <DistanceTraveled save={this.props.saveReportOnServer} />
        <FuelPurchases save={this.props.saveReportOnServer} />
        <Summary />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    report: state.report,
    aboutYou: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveReportOnServer: () => dispatch(saveReportOnServer()),
    actions: {
      updateAboutYou: () => dispatch(updateUser()),
      saveReportOnServer: () => dispatch(saveReportOnServer()),
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage)
