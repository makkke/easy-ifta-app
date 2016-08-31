import React, { PropTypes } from 'react'
import pluralize from 'pluralize'
import { findRegion, findVolumeUnitByRegion } from '../../../../utils/data'

function FuelPurchaseItem(props) {
  const { volume } = props
  const region = findRegion(props.region)
  const unit = findVolumeUnitByRegion(props.region)

  return (
    <li className="list-group-item">
      {region.name}
      <span className="label label-default label-pill pull-xs-right">{pluralize(unit.name, volume, true)}</span>
      <button type="button" className="btn btn-secondary" onClick={props.onRemove}>X</button>
    </li>
  )
}

FuelPurchaseItem.propTypes = {
  region: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default FuelPurchaseItem
