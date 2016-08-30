import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import is from 'is_js'
// import _ from 'lodash'

import { actions, loadLatestTaxReturn } from './taxReturn.module'
// import { updateUser } from './user.module'
import TaxReturnTitle from './TaxReturnTitle'
// import AboutYouSection from './AboutYouSection'
// import AboutCompany from './AboutCompany'
import DistancesSection from '../distances/DistancesSection'
import FuelPurchasesSection from '../fuelPurchases/FuelPurchasesSection'
import Summary from './SummarySection'

class TaxReturnPage extends Component {
  static propTypes = {
    taxReturn: PropTypes.object.isRequired,
    // aboutYou: PropTypes.object.isRequired,
    // saveReportOnServer: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
  }

  state = {
    // aboutYou: this.props.aboutYou,
    errors: {},
  }

  // componentWillReceiveProps(nextProps) {
  //   const { aboutYou } = nextProps
  //   this.setState({ aboutYou })
  // }

  need = [
    loadLatestTaxReturn,
  ]

  // handleAboutYouSectionChange = (event) => {
  //   const { aboutYou, errors } = this.state
  //   const field = event.target.name

  //   aboutYou[field] = event.target.value
  //   errors[field] = null

  //   this.setState({ aboutYou })
  // }

  // handleAboutYouSectionBlur = () => {
  //   const { aboutYou } = this.state
  //   const errors = this.validateAboutYouSection()

  //   if (is.not.empty(errors)) {
  //     this.setState({ errors })
  //   }

  //   const validFields = Object.keys(aboutYou).filter(x => !errors[x])
  //   const propsToSave = _.pick(aboutYou, validFields)

  //   this.props.actions.updateAboutYou(propsToSave)
  //   this.props.actions.saveReportOnServer()
  // }

  // validateAboutYouSection() {
  //   const errors = {}
  //   const { firstName, lastName } = this.state.aboutYou

  //   if (firstName.length === 0) {
  //     errors.firstName = 'This field is required'
  //   }

  //   if (lastName.length === 0) {
  //     errors.firstName = 'This field is required'
  //   }

  //   return errors
  // }

  render() {
    const { period } = this.props.taxReturn

    return (
      <div id="main-content" className="col-xs-9" noValidate>
        <TaxReturnTitle period={period} />
        <DistancesSection save={this.props.actions.saveTaxReturn} />
        <FuelPurchasesSection save={this.props.actions.saveTaxReturn} />
        <Summary />
        {
        // <AboutYouSection
        //   aboutYou={this.state.aboutYou}
        //   errors={this.state.errors}
        //   onChange={this.handleAboutYouSectionChange}
        //   onBlur={this.handleAboutYouSectionBlur}
        // />
        // <AboutCompany save={this.props.saveReportOnServer} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  taxReturn: state.taxReturn,
})

// const mapDispatchToProps = (dispatch) => {
//   return {
//     saveReportOnServer: () => dispatch(saveReportOnServer()),
//     actions: {
//       updateAboutYou: () => dispatch(updateUser()),
//       saveReportOnServer: () => dispatch(saveReportOnServer()),
//     },
//   }
// }

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaxReturnPage)
