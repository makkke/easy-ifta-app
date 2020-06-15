import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from './distances.module'
import Section from '../../components/Section'
import RegionSelect from './RegionSelect'
import DistanceList from './DistanceList'

class DistancesSection extends Component {
  static propTypes = {
    distances: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
  }

  static defaultProps = {
    distances: [],
  }

  state = {
    region: 'none',
    amount: '',
  }

  handleRegionChange = (region) => {
    this.setState(region)
  }

  handleAmountChange = (e) => {
    const amount = parseFloat(e.target.value)
    if (isNaN(amount)) return

    this.setState({ amount })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()

    const { region, amount } = this.state
    this.props.actions.createDistance({ region, amount })
    this.props.save()
    this.reset()
  }

  handleRemoveDistance = (index) => {
    this.props.actions.removeDistance(index)
    this.props.save()
  }

  reset() {
    this.setState({ region: 'none', amount: '' })
  }

  render() {
    const { region } = this.state
    return (
      <Section id="distance-traveled-section" title="Distance Traveled">
        <form className="row" onSubmit={this.handleFormSubmit}>
          <div className="form-group">
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
                type="submit"
                className="btn btn-success btn-lg"
              >Add</button>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col-xs-12">
            <DistanceList
              distances={this.props.distances}
              onRemove={this.handleRemoveDistance}
            />
          </div>
        </div>
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({
  distances: state.distances,
})

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(DistancesSection)
