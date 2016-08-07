import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class CompanyName extends Component {
  static propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
  }

  state = {
    name: '',
    isValid: true,
  }

  componentWillReceiveProps(nextProps) {
    const { name } = nextProps
    this.setState({ name })
  }

  handleChange = (e) => {
    const name = e.target.value.trim().substring(0, 50)
    this.setState({ name })
  }

  handleBlur = () => {
    const { name } = this.state

    // required
    if (name.length === 0) {
      return this.setState({ isValid: false })
    }

    // max 50 chars
    if (name.length > 50) {
      return this.setState({ isValid: false })
    }

    this.setState({ isValid: true })

    return this.props.onChange({ name })
  }

  render() {
    const className = classNames('form-control', {
      'form-control-danger': !this.state.isValid,
    })

    return (
      <input
        type="text"
        className={className}
        placeholder="Company Name"
        value={this.state.name}
        maxLength="50"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
   )
  }
}

export default CompanyName
