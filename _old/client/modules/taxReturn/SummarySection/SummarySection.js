import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import Section from '../../../components/Section'
import SummaryList from './SummaryList'

class SummarySection extends Component {
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
      <Section id="summary-section" title="Summary">
        <div className="form-group row">
          <div className="col-xs-12">
            <SummaryList
              fuelPurchases={this.props.fuelPurchases}
              distances={this.props.distances}
            />
          </div>
        </div>
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({
  fuelPurchases: state.fuelPurchases,
  distances: state.distances,
})

export default connect(mapStateToProps)(SummarySection)
