import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { createDistance, removeDistance } from '../../redux/modules/distances.module'
import RegionSelect from './RegionSelect'
import DistanceList from './DistanceList'
import { isProvince } from '../../app/data'

class DistanceTraveled extends Component {
  static propTypes = {
    distances: PropTypes.array.isRequired,
    create: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
  }

  static defaultProps = {
    distances: [],
  }

  state = {
    region: 'none',
    amount: null,
  }

  handleRegionChange = (region) => {
    this.setState(region)
  }

  handleAmountChange = (e) => {
    const amount = parseFloat(e.target.value)
    if (isNaN(amount)) return

    this.setState({ amount })
  }

  handleAddButtonClick = () => {
    const { region, amount } = this.state

    this.props.create({ region, amount })
    this.props.save()
    this.reset()
  }

  handleRemoveDistance = (index) => {
    this.props.remove(index)
    this.props.save()
  }

  reset() {
    this.setState({ region: 'none', amount: null })
  }

  render() {
    const { region } = this.state
    return (
      <div id="distance-traveled-section" className="section">
        <h4>Distance Traveled</h4>
        <div className="form-group row">
          <div className="col-xs-6">
            <RegionSelect region={region} onChange={this.handleRegionChange} />
          </div>
          <div className="col-xs-4">
            <input
              type="number"
              className="form-control"
              placeholder="Km"
              value={this.state.amount}
              onChange={this.handleAmountChange}
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
            <DistanceList
              distances={this.props.distances}
              onRemove={this.handleRemoveDistance}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    distances: state.distances,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    create: (fuelPurchase) => dispatch(createDistance(fuelPurchase)),
    remove: (index) => dispatch(removeDistance(index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DistanceTraveled)
