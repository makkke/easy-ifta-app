import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { getReport, updateReport } from '../reports.module'
import ReportTitle from '../ReportTitle'
import AboutYou from '../AboutYou'
import AboutCompany from '../AboutCompany'

class ReportPage extends Component {
  static propTypes = {
    report: PropTypes.object.isRequired,
    updateReport: PropTypes.func.isRequired,
  }

  need = [
    getReport,
  ]

  render() {
    return (
      <form id="main-content" className="col-xs-9" noValidate>
        <ReportTitle period={this.props.report.period} />
        <AboutYou save={this.props.updateReport} report={this.props.report} />
        <AboutCompany save={this.props.updateReport} report={this.props.report} />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    report: state.reports.report,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateReport: (report) => dispatch(updateReport(report)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage)
