import React, { PropTypes } from 'react'
import FuelPurchaseItem from './FuelPurchaseItem'

function FuelPurchaseList(props) {
  const { fuelPurchases } = props
  return (
    <ul className="list-group">
      {fuelPurchases.map((x, i) => {
        const boundRemove = props.onRemove.bind(this, i)
        return (
          <FuelPurchaseItem
            key={i}
            region={x.region}
            volume={x.volume}
            unit={x.unit}
            onRemove={boundRemove}
          />
        )
      })}
    </ul>
  )
}

FuelPurchaseList.propTypes = {
  fuelPurchases: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default FuelPurchaseList
