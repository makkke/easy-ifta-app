import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class LastName extends Component {
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
    const { value: lastName } = this.state

    // required
    if (lastName.length === 0) {
      return this.setState({ isValid: false })
    }

    // max 30 chars
    if (lastName.length > 30) {
      return this.setState({ isValid: false })
    }

    this.setState({ isValid: true })

    return this.props.onChange({ lastName })
  }

  render() {
    const className = classNames('form-control', {
      'form-control-danger': !this.state.isValid,
    })

    return (
      <input
        type="text"
        className={className}
        placeholder="Last Name"
        value={this.state.value}
        maxLength="30"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
   )
  }
}

export default LastName
