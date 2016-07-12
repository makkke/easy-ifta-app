import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import SummaryList from './SummaryList'

class FuelPurchases extends Component {
  static propTypes = {
    fuelPurchases: PropTypes.array.isRequired,
    distances: PropTypes.array.isRequired,
  }

  static defaultProps = {
    fuelPurchases: [],
    distances: [],
  }

  render() {
    return (
      <div id="summary-section" className="section">
        <h4>Summary</h4>
        <div className="form-group row">
          <div className="col-xs-12">
            <SummaryList
              fuelPurchases={this.props.fuelPurchases}
              distances={this.props.distances}
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
    distances: state.distances,
  }
}

export default connect(mapStateToProps)(FuelPurchases)
