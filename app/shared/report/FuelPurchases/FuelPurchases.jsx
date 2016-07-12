import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { createFuelPurchase, removeFuelPurchase } from '../../redux/modules/fuelPurchases.module'
import RegionSelect from './RegionSelect'
import FuelPurchaseList from './FuelPurchaseList'
import { isProvince } from '../../app/data'

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
    volume: null,
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
    this.setState({ region: 'none', volume: null })
  }

  render() {
    const { region } = this.state
    return (
      <div id="fuel-purchases-section" className="section">
        <h4>Fuel Purchases</h4>
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
      </div>
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
