import httpStatus from 'http-status'

import TaxReturn from '../models/taxReturn.model'

function index(req, res) {
  TaxReturn.find({ user: req.user.id }).exec((err, taxReturns) => {
    if (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err)
      return
    }

    res.json(taxReturns)
  })
}

function create(req, res) {
  const { period } = req.body

  TaxReturn.findOne({
    user: req.user.id,
    'period.year': period.year,
    'period.quarter': period.quarter,
  }).exec((err, _taxReturn) => {
    if (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err)
      return
    }

    if (_taxReturn) {
      res.status(httpStatus.CONFLICT).end()
      return
    }

    const taxReturn = new TaxReturn({
      user: req.user.id,
      period,
    })

    taxReturn.save((error, savedTaxReturn) => {
      if (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err)
        return
      }

      res.json(savedTaxReturn)
    })
  })
}

function show(req, res) {
  const { id } = req.params

  TaxReturn.findById(id).exec((err, taxReturn) => {
    if (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err)
      return
    }

    if (!taxReturn) {
      res.status(httpStatus.NOT_FOUND).end()
      return
    }

    res.json(taxReturn)
  })
}

function showByPeriod(req, res) {
  const { year, quarter } = req.params

  TaxReturn.findOne({
    user: req.user.id,
    'period.year': parseInt(year, 10),
    'period.quarter': parseInt(quarter, 10),
  }).exec((err, taxReturn) => {
    if (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err)
      return
    }

    if (!taxReturn) {
      res.status(httpStatus.NOT_FOUND).end()
      return
    }

    res.json(taxReturn)
  })
}

function update(req, res) {
  const { id } = req.params

  TaxReturn.findById(id).exec((err, taxReturn) => {
    if (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err)
      return
    }

    if (!taxReturn) {
      res.status(httpStatus.NOT_FOUND).end()
      return
    }

    taxReturn.fuelPurchases = req.body.fuelPurchases // eslint-disable-line
    taxReturn.distances = req.body.distances // eslint-disable-line

    taxReturn.save((error, savedTaxReturn) => {
      if (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err)
        return
      }

      res.json(savedTaxReturn)
    })
  })
}

export default { index, create, show, showByPeriod, update }
