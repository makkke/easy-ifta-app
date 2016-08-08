import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { provinces } from '../../data'

class ProvinceSelect extends Component {
  static propTypes = {
    province: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    province: 'none',
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
      this.setState({ isValid: false })
    } else {
      this.setState({ isValid: true })
      this.props.onChange({ province })
    }
  }

  render() {
    const className = classNames('form-control c-select', {
      'form-control-danger': !this.state.isValid,
    })

    return (
      <select
        className={className}
        title="Select Province"
        value={this.state.province}
        onChange={this.handleChange}
      >
        <option value="none">Select Province</option>
        {provinces.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
      </select>
   )
  }
}

export default ProvinceSelect
