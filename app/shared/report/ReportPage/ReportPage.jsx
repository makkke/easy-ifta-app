import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { getReport, saveReportOnServer } from '../../redux/modules/report.module'
import ReportTitle from '../ReportTitle'
import AboutYou from '../AboutYou'
import AboutCompany from '../AboutCompany'
import DistanceTraveled from '../DistanceTraveled'
import FuelPurchases from '../FuelPurchases'
import Summary from '../Summary'

class ReportPage extends Component {
  static propTypes = {
    report: PropTypes.object.isRequired,
    saveReportOnServer: PropTypes.func.isRequired,
  }

  need = [
    getReport,
  ]

  render() {
    return (
      <form id="main-content" className="col-xs-9" noValidate>
        <ReportTitle period={this.props.report.period} />
        <AboutYou save={this.props.saveReportOnServer} />
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveReportOnServer: () => dispatch(saveReportOnServer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage)
