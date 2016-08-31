import React, { PropTypes } from 'react'
import DistanceItem from './DistanceItem'

function DistanceList(props) {
  const { distances } = props
  return (
    <ul className="list-group">
      {distances.map((distance, i) => {
        const boundRemove = props.onRemove.bind(this, i)
        return (
          <DistanceItem
            key={i}
            region={distance.region}
            amount={distance.amount}
            unit={distance.unit}
            onRemove={boundRemove}
          />
        )
      })}
    </ul>
  )
}

DistanceList.propTypes = {
  distances: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default DistanceList
