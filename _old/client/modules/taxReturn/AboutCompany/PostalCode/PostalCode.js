import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class PostalCode extends Component {
  static propTypes = {
    postalCode: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  }

  state = {
    postalCode: '',
    isValid: true,
  }

  componentWillReceiveProps(nextProps) {
    const { postalCode } = nextProps
    this.setState({ postalCode })
  }

  handleChange = (e) => {
    const postalCode = e.target.value.trim().substring(0, 7)
    this.setState({ postalCode })
  }

  handleBlur = () => {
    // TODO: add proper validation
    const { postalCode } = this.state

    // required
    if (postalCode.length === 0) {
      this.setState({ isValid: false })
      return
    }

    // max 7 chars
    if (postalCode.length > 7) {
      this.setState({ isValid: false })
      return
    }

    this.setState({ isValid: true })

    this.props.onChange({ postalCode })
  }

  render() {
    const className = classNames('form-control', {
      'form-control-danger': !this.state.isValid,
    })

    return (
      <input
        type="text"
        className={className}
        placeholder="Postal Code"
        value={this.state.postalCode}
        maxLength="7"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    )
  }
}

export default PostalCode
