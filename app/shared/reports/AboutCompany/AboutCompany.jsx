import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CompanyName from './CompanyName'
import CountrySelect from './CountrySelect'
import Address from './Address'
import City from './City'
import ProvinceSelect from './ProvinceSelect'
import PostalCode from './PostalCode'

class AboutCompany extends Component {
  static propTypes = {
    report: PropTypes.object.isRequired,
    company: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
  }

  static defaultProps = {
    company: {
      name: '',
      country: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      identificationNumber: '',
      referenceNumber: '',
    },
  }

  handleInputChange = (props) => {
    this.updateReport({ ...props })
  }

  updateReport(props) {
    const { report } = this.props
    const company = {
      ...this.props.company,
      ...props,
    }
    report.company = company
    this.props.save(report)
  }

  renderAddress() {
    const { company } = this.props
    if (company.country === 'none') return ''

    if (company.country === 'canada') {
      return (
        <div>
          <div className="form-group row">
            <div className="col-xs-6">
              <Address address={company.address} onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-xs-6">
              <City city={company.city} onChange={this.handleInputChange} />
            </div>
            <div className="col-xs-3">
              <ProvinceSelect province={company.province} onChange={this.handleInputChange} />
            </div>
            <div className="col-xs-3">
              <PostalCode postalCode={company.postalCode} onChange={this.handleInputChange} />
            </div>
          </div>
        </div>
      )
    }

    if (company.country === 'usa') {
      return 'Usa'
    }
  }

  render() {
    const { company } = this.props
    return (
      <div id="company-section" className="section">
        <h4>About Company</h4>
        <div className="form-group row">
          <div className="col-xs-6">
            <CompanyName name={company.name} onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-6">
            <CountrySelect country={company.country} onChange={this.handleInputChange} />
          </div>
        </div>
        {this.renderAddress()}
        <div className="form-group row">
          <div className="col-xs-6">
            <input type="text" className="form-control" placeholder="Identification Number" />
          </div>
          <div className="col-xs-6">
            <input type="text" className="form-control" placeholder="Reference Number" />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    company: state.reports.report.company,
  }
}

export default connect(mapStateToProps)(AboutCompany)
