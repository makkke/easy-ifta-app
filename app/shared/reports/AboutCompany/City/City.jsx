import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class City extends Component {
  static propTypes = {
    city: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  }

  state = {
    city: '',
    isValid: true,
  }

  componentWillReceiveProps(nextProps) {
    const { city } = nextProps
    this.setState({ city })
  }

  handleChange = (e) => {
    const city = e.target.value.trim().substring(0, 50)
    this.setState({ city })
  }

  handleBlur = () => {
    const { city } = this.state

    // required
    if (city.length === 0) {
      return this.setState({ isValid: false })
    }

    // max 50 chars
    if (city.length > 50) {
      return this.setState({ isValid: false })
    }

    this.setState({ isValid: true })

    this.props.onChange({ city })
  }

  render() {
    const className = classNames('form-control', {
      'form-control-danger': !this.state.isValid,
    })

    return (
      <input
        type="text"
        className={className}
        placeholder="City"
        value={this.state.city}
        maxLength="50"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
   )
  }
}

export default City
