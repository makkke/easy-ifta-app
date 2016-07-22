import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { regions } from '../../data'

class RegionSelect extends Component {
  static propTypes = {
    region: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    region: 'none',
    onChange: PropTypes.func,
  }

  state = {
    region: 'none',
    isValid: true,
  }

  componentWillReceiveProps(nextProps) {
    const { region } = nextProps
    this.setState({ region })
  }

  handleChange = (e) => {
    const region = e.target.value
    this.setState({ region })

    // required
    if (region === 'none') {
      this.setState({ isValid: false })
    } else {
      this.setState({ isValid: true })
      this.props.onChange({ region })
    }
  }

  render() {
    const className = classNames('form-control c-select', {
      'form-control-danger': !this.state.isValid,
    })

    return (
      <select
        className={className}
        title="Select State or Province"
        value={this.state.region}
        onChange={this.handleChange}
      >
        <option value="none">Select State or Province</option>
        {regions.map(x => <option key={x.id} value={x.id}>{`${x.id.toUpperCase()} ${x.name}`}</option>)}
      </select>
   )
  }
}

export default RegionSelect
