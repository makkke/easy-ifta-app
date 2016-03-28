import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class Title extends Component {
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
    // TODO: add validation
    const value = e.target.value.trim().substring(0, 30)
    this.setState({ value })
  }

  handleBlur = () => {
    const { value: title } = this.state

    // max 30 chars
    if (title.length > 30) {
      return this.setState({ isValid: false })
    }

    this.setState({ isValid: true })

    this.props.onChange({ title })
  }

  render() {
    const className = classNames('form-control', {
      'form-control-danger': !this.state.isValid,
    })

    return (
      <input
        type="text"
        className={className}
        placeholder="Title"
        value={this.state.value}
        maxLength="30"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
   )
  }
}

export default Title
