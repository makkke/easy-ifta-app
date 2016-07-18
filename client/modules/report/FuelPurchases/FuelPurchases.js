import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import { createFuelPurchase, removeFuelPurchase } from '../fuelPurchases.module'
import Section from '../../../components/Section'
import RegionSelect from './RegionSelect'
import FuelPurchaseList from './FuelPurchaseList'
import { isProvince } from '../data'

class FuelPurchases extends Component {
  static propTypes = {
    fuelPurchases: PropTypes.array.isRequired,
    create: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
  }

  static defaultProps = {
    fuelPurchases: [],
  }

  state = {
    region: 'none',
    volume: '',
  }

  handleRegionChange = (region) => {
    this.setState(region)
  }

  handleVolumeChange = (e) => {
    const volume = parseFloat(e.target.value)
    if (isNaN(volume)) return

    this.setState({ volume })
  }

  handleAddButtonClick = () => {
    const { region, volume } = this.state

    this.props.create({ region, volume })
    this.props.save()
    this.reset()
  }

  handleRemoveFuelPurchase = (index) => {
    this.props.remove(index)
    this.props.save()
  }

  reset() {
    this.setState({ region: 'none', volume: '' })
  }

  render() {
    const { region } = this.state

    return (
      <Section id="fuel-purchases-section" title="Fuel Purchases">
        <div className="form-group row">
          <div className="col-xs-6">
            <RegionSelect region={region} onChange={this.handleRegionChange} />
          </div>
          <div className="col-xs-4">
            <input
              type="number"
              className="form-control"
              placeholder={isProvince(region) ? 'Liters' : 'Gallons'}
              value={this.state.volume}
              onChange={this.handleVolumeChange}
            />
          </div>
          <div className="col-xs-2">
            <button
              type="button"
              className="btn btn-success btn-lg"
              onClick={this.handleAddButtonClick}
            >Add</button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <FuelPurchaseList
              fuelPurchases={this.props.fuelPurchases}
              onRemove={this.handleRemoveFuelPurchase}
            />
          </div>
        </div>
      </Section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fuelPurchases: state.fuelPurchases,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    create: (fuelPurchase) => dispatch(createFuelPurchase(fuelPurchase)),
    remove: (index) => dispatch(removeFuelPurchase(index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelPurchases)
