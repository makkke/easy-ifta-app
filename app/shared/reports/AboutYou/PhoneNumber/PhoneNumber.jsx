import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class PhoneNumber extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  }

  state = {
    value: '',
    isValid: true,
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps
    this.setState({ value })
  }

  handleChange = (e) => {
    const value = e.target.value.trim()
    this.setState({ value })
  }

  handleBlur = () => {
    // TODO: add validation
    const { value: phoneNumber } = this.state
    this.setState({ isValid: true })

    this.props.onChange({ phoneNumber })
  }

  render() {
    const className = classNames('form-control', {
      'form-control-danger': !this.state.isValid,
    })

    return (
      <input
        type="text"
        className={className}
        placeholder="Phone Number"
        value={this.state.value}
        maxLength="30"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
   )
  }
}

export default PhoneNumber
