import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateCompany } from '../company.module'
import Section from '../../../components/Section'
import CompanyName from './CompanyName'
import CountrySelect from './CountrySelect'
import Address from './Address'
import City from './City'
import ProvinceSelect from './ProvinceSelect'
import PostalCode from './PostalCode'

class AboutCompany extends Component {
  static propTypes = {
    company: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
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
    this.props.update({ ...props })
    this.props.save()
  }

  renderAddress() {
    const { company } = this.props

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

    return ''
  }

  render() {
    const { company } = this.props

    return (
      <Section id="company-section" title="About Company">
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
      </Section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    company: state.company,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update: (company) => dispatch(updateCompany(company)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutCompany)
