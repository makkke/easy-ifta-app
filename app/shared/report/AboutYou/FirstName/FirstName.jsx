import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class FirstName extends Component {
  static propTypes = {
    value: PropTypes.string,
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
    const value = e.target.value.trim().substring(0, 30)
    this.setState({ value })
  }

  handleBlur = () => {
    const { value: firstName } = this.state

    // required
    if (firstName.length === 0) {
      return this.setState({ isValid: false })
    }

    // max 30 chars
    if (firstName.length > 30) {
      return this.setState({ isValid: false })
    }

    this.setState({ isValid: true })

    return this.props.onChange({ firstName })
  }

  render() {
    const className = classNames('form-control', {
      'form-control-danger': !this.state.isValid,
    })

    return (
      <input
        type="text"
        className={className}
        placeholder="First Name"
        value={this.state.value}
        maxLength="30"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
   )
  }
}

export default FirstName
