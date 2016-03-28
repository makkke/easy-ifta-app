import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class Address extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  }

  state = {
    address: '',
    isValid: true,
  }

  componentWillReceiveProps(nextProps) {
    const { address } = nextProps
    this.setState({ address })
  }

  handleChange = (e) => {
    const address = e.target.value.trim().substring(0, 60)
    this.setState({ address })
  }

  handleBlur = () => {
    const { address } = this.state

    // required
    if (address.length === 0) {
      return this.setState({ isValid: false })
    }

    // max 60 chars
    if (address.length > 60) {
      return this.setState({ isValid: false })
    }

    this.setState({ isValid: true })

    this.props.onChange({ address })
  }

  render() {
    const className = classNames('form-control', {
      'form-control-danger': !this.state.isValid,
    })

    return (
      <input
        type="text"
        className={className}
        placeholder="Address"
        value={this.state.address}
        maxLength="60"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
   )
  }
}

export default Address
