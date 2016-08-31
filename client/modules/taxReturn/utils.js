import moment from 'moment'

export function latestTaxPeriod(date = new Date()) {
  const period = moment(date).subtract(1, 'quarter')

  return { year: period.year(), quarter: period.quarter() }
}

export default { latestTaxPeriod }
