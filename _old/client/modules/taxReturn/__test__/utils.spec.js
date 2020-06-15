import test from 'ava'

import * as utils from '../utils'

test('should return latest tax period', t => {
  let period = utils.latestTaxPeriod(new Date(2016, 6))
  t.deepEqual(period, { year: 2016, quarter: 2 })

  period = utils.latestTaxPeriod(new Date(2017, 1))
  t.deepEqual(period, { year: 2016, quarter: 4 })
})
