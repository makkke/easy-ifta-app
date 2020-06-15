import React, { PropTypes } from 'react'
import pluralize from 'pluralize'

import { findRegion } from '../../../../utils/data'

function DistanceItem(props) {
  const { amount } = props
  const region = findRegion(props.region)

  return (
    <li className="list-group-item">
      {region.name}
      <span className="label label-default label-pill pull-xs-right">{pluralize('Kilometre', amount, true)}</span>
      <button type="button" className="btn btn-secondary" onClick={props.onRemove}>X</button>
    </li>
  )
}

DistanceItem.propTypes = {
  region: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default DistanceItem
