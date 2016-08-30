import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import { actions as fuelPurchasesActions } from './fuelPurchases.module'
import { actions as appActions } from '../app/app.module'
import { isProvince } from '../../utils/data'
import Section from '../../components/Section'
import RegionSelect from './RegionSelect'
import FuelPurchaseList from './FuelPurchaseList'

class FuelPurchasesSection extends Component {
  static propTypes = {
    fuelPurchases: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
    isConnectedToRoadSoFar: PropTypes.bool,
  }

  static defaultProps = {
    fuelPurchases: [],
  }

  state = {
    region: 'none',
    volume: '',
    showRoadSoFarLoginModal: false,
  }

  handleRegionChange = (region) => {
    this.setState(region)
  }

  handleVolumeChange = (e) => {
    const volume = parseFloat(e.target.value)
    if (isNaN(volume)) return

    this.setState({ volume })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()

    const { region, volume } = this.state
    this.props.actions.createFuelPurchase({ region, volume })
    this.props.save()
    this.reset()
  }

  handleRemoveFuelPurchase = (index) => {
    this.props.actions.removeFuelPurchase(index)
    this.props.save()
  }

  handleImportClick = () => {
    if (this.props.isConnectedToRoadSoFar) {
      this.props.actions.importFuelPurchasesFromRoadSoFar()
    } else {
      this.props.actions.openConnectRoadSoFarModal()
    }
  }

  reset() {
    this.setState({ region: 'none', volume: '' })
  }

  render() {
    const { region } = this.state

    return (
      <Section id="fuel-purchases-section" title="Fuel Purchases">
        <Button bsStyle="primary" onClick={this.handleImportClick}>Import from Road so Far</Button>

        <form className="row" onSubmit={this.handleFormSubmit}>
          <div className="form-group">
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
                type="submit"
                className="btn btn-success btn-lg"
              >Add</button>
            </div>
          </div>
        </form>
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

const mapStateToProps = (state) => ({
  fuelPurchases: state.fuelPurchases,
  isConnectedToRoadSoFar: state.auth.user.connections.map(x => x.app).includes('road-so-far'),
})

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators({ ...appActions, ...fuelPurchasesActions }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelPurchasesSection)
