import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class ProvinceSelect extends Component {
  static propTypes = {
    province: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  }

  state = {
    province: 'none',
    isValid: true,
  }

  componentWillReceiveProps(nextProps) {
    const { province } = nextProps
    this.setState({ province })
  }

  handleChange = (e) => {
    const province = e.target.value
    this.setState({ province })

    // required
    if (province === 'none') {
      return this.setState({ isValid: false })
    }

    this.setState({ isValid: true })

    this.props.onChange({ province })
  }

  render() {
    const className = classNames('form-control c-select', {
      'form-control-danger': !this.state.isValid,
    })

    return (
      <select
        className={className}
        title="Select Province"
        defaultValue="none"
        value={this.state.province}
        onChange={this.handleChange}
      >
        <option value="none">Select Province</option>
        <option value="ab">Alberta</option>
        <option value="bc">British Columbia</option>
        <option value="mb">Manitoba</option>
        <option value="nb">New Brunswick</option>
        <option value="nl">Newfoundland &amp; Labrador</option>
        <option value="nt">Northwest Territories</option>
        <option value="ns">Nova Scotia</option>
        <option value="nu">Nunavut</option>
        <option value="on">Ontario</option>
        <option value="pe">Prince Edward Island</option>
        <option value="qc">Quebec</option>
        <option value="sk">Saskatchewan</option>
        <option value="yt">Yukon</option>
      </select>
   )
  }
}

export default ProvinceSelect
