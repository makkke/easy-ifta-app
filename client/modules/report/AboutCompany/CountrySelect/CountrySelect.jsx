import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class CountrySelect extends Component {
  static propTypes = {
    country: PropTypes.string,
    onChange: PropTypes.func,
  }

  state = {
    country: 'none',
    isValid: true,
  }

  componentWillReceiveProps(nextProps) {
    const { country } = nextProps
    this.setState({ country })
  }

  handleChange = (e) => {
    const country = e.target.value
    this.setState({ country })

    // required
    if (country === 'none') {
      return this.setState({ isValid: false })
    }

    this.setState({ isValid: true })

    return this.props.onChange({ country })
  }

  render() {
    const className = classNames('form-control c-select', {
      'form-control-danger': !this.state.isValid,
    })

    return (
      <select
        className={className}
        title="Select Country"
        value={this.state.country}
        onChange={this.handleChange}
      >
        <option value="none" disabled hidden>Select Country</option>
        <option value="canada">Canada</option>
        <option value="usa" disabled hidden>USA</option>
      </select>
   )
  }
}

export default CountrySelect
