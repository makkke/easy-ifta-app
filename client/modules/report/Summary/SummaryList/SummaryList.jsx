import React, { PropTypes } from 'react'
import { findRegion, convertVolumeByRegionToLiters } from '../../data'

function summarizeDistances(distances = []) {
  const map = new Map()
  distances.forEach(x => {
    if (!map.has(x.region)) {
      map.set(x.region, 0)
    }
    map.set(x.region, map.get(x.region) + x.amount)
  })

  return map
}

function summarizeFuelPurchases(fuelPurchases = []) {
  const map = new Map()
  fuelPurchases.forEach(x => {
    if (!map.has(x.region)) {
      map.set(x.region, 0)
    }
    const volume = map.get(x.region) + convertVolumeByRegionToLiters(x.region, x.volume)
    map.set(x.region, volume)
  })

  return map
}

function summarize(distances = [], fuelPurchases = []) {
  const summarizedDistances = summarizeDistances(distances)
  const summarizedFuelPurchases = summarizeFuelPurchases(fuelPurchases)

  const map = new Map()
  summarizedDistances.forEach((distance, key) => {
    if (!map.has(key)) {
      map.set(key, { distance, fuelPurchase: 0 })
    }
  })

  summarizedFuelPurchases.forEach((fuelPurchase, key) => {
    if (!map.has(key)) {
      map.set(key, { distance: 0, fuelPurchase })
    } else {
      const x = map.get(key)
      x.fuelPurchase = fuelPurchase
      map.set(key, x)
    }
  })

  return [...map.entries()].map(x => {
    const region = findRegion(x[0])
    return {
      region,
      distance: x[1].distance,
      fuelPurchase: x[1].fuelPurchase,
    }
  })
}

function SummaryList(props) {
  const { fuelPurchases, distances } = props
  const summaries = summarize(distances, fuelPurchases)

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Province or State</th>
          <th>Distance Traveled (Km)</th>
          <th>Fuel Purchases (L)</th>
        </tr>
      </thead>
      <tbody>
        {summaries.map((summary, i) => {
          return (
            <tr key={i}>
              <td>{`${summary.region.name} (${summary.region.id.toUpperCase()})`}</td>
              <td>{summary.distance}</td>
              <td>{summary.fuelPurchase}</td>
            </tr>
          )
        })}
        <tr>
          <td>Total</td>
          <td>{summaries.map(x => x.distance).reduce((sum, x) => sum + x, 0)}</td>
          <td>{summaries.map(x => x.fuelPurchase).reduce((sum, x) => sum + x, 0)}</td>
        </tr>
      </tbody>
    </table>
  )
}

SummaryList.propTypes = {
  fuelPurchases: PropTypes.array.isRequired,
  distances: PropTypes.array.isRequired,
}

export default SummaryList
