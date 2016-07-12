import fetch from 'isomorphic-fetch'
import { loadUser } from './user.module'
import { loadCompany } from './company.module'
import { loadDistances } from './distances.module'
import { loadFuelPurchases } from './fuelPurchases.module'

// ------------------------------------
// Constants
// ------------------------------------
const LOAD_REPORT = 'simple-ifta/reports/LOAD_REPORT'

const CREATE_REPORT = 'simple-ifta/reports/CREATE_REPORT'
const CREATE_REPORT_REQUEST = 'simple-ifta/reports/CREATE_REPORT_REQUEST'
const CREATE_REPORT_SUCCESS = 'simple-ifta/reports/CREATE_REPORT_SUCCESS'
const CREATE_REPORT_FAIL = 'simple-ifta/reports/CREATE_REPORT_FAIL'

const FETCH_REPORT = 'simple-ifta/reports/FETCH_REPORT'
const FETCH_REPORT_REQUEST = 'simple-ifta/reports/FETCH_REPORT_REQUEST'
const FETCH_REPORT_SUCCESS = 'simple-ifta/reports/FETCH_REPORT_SUCCESS'
const FETCH_REPORT_FAIL = 'simple-ifta/reports/FETCH_REPORT_FAIL'

const UPDATE_REPORT = 'simple-ifta/reports/UPDATE_REPORT'
const UPDATE_REPORT_REQUEST = 'simple-ifta/reports/UPDATE_REPORT_REQUEST'
const UPDATE_REPORT_SUCCESS = 'simple-ifta/reports/UPDATE_REPORT_SUCCESS'
const UPDATE_REPORT_FAIL = 'simple-ifta/reports/UPDATE_REPORT_FAIL'

const CREATE_FUEL_PURCHASE = 'simple-ifta/reports/CREATE_FUEL_PURCHASE'
const REMOVE_FUEL_PURCHASE = 'simple-ifta/reports/REMOVE_FUEL_PURCHASE'

// ------------------------------------
// Actions
// ------------------------------------

// Create Report
export const createReportSuccess = (report) => ({
  type: CREATE_REPORT_SUCCESS,
  report,
})

export const createReportFail = (err) => ({
  type: CREATE_REPORT_FAIL,
  error: err,
})

export const createReport = () => {
  return (dispatch) => {
    return fetch('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(report => {
        if (process.env.CLIENT) {
          localStorage.setItem('reportId', report.id)
        }

        return dispatch(createReportSuccess(report))
      })
      .catch(err => dispatch(createReportFail(err)))
  }
}

// Fetch Report
export const requestFetchReport = () => ({
  type: FETCH_REPORT_REQUEST,
})

export const fetchReportSuccess = (data) => ({
  type: FETCH_REPORT_SUCCESS,
  payload: data,
})

export const fetchReportFail = (err) => ({
  type: FETCH_REPORT_FAIL,
  error: err,
})

export const loadReport = (report) => ({
  type: LOAD_REPORT,
  report,
})

export const fetchReport = (id) => {
  return (dispatch) => {
    return fetch(`/api/reports/${id}`)
      .then((response) => {
        if (response.status === 404) {
          return dispatch(createReport())
        }

        return response.json()
      })
      .then(report => {
        dispatch(loadReport(report))
        dispatch(loadUser(report.user))
        dispatch(loadCompany(report.company))
        dispatch(loadDistances(report.distances))
        dispatch(loadFuelPurchases(report.fuelPurchases))
      })
      .catch(err => dispatch(fetchReportFail(err)))
  }
}

// Update Report
export const updateReportSync = (report) => ({
  type: UPDATE_REPORT,
  payload: report,
})

export const requestUpdateReport = () => ({
  type: UPDATE_REPORT_REQUEST,
})

export const updateReportSuccess = (report) => ({
  type: UPDATE_REPORT_SUCCESS,
  payload: report,
})

export const updateReportFail = (err) => ({
  type: UPDATE_REPORT_FAIL,
  error: err,
})

export const updateReport = (data) => {
  return (dispatch, getState) => {
    const report = data || getState().report
    dispatch(updateReportSync(report))
    dispatch(requestUpdateReport())

    return fetch(`/api/reports/${report.id}`, {
      method: 'PUT',
      body: JSON.stringify(report),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => dispatch(updateReportSuccess(json)))
      .catch(err => dispatch(updateReportFail(err)))
  }
}

// Get Report
export const getReport = () => {
  return (dispatch) => {
    let reportId
    if (process.env.CLIENT) {
      reportId = localStorage.getItem('reportId')
    }

    if (reportId) {
      return dispatch(fetchReport(reportId))
    }

    return dispatch(createReport())
  }
}

// Fuel Purchases
export const createFuelPurchase = (fuelPurchase) => ({
  type: CREATE_FUEL_PURCHASE,
  payload: fuelPurchase,
})

export const removeFuelPurchase = (index) => ({
  type: REMOVE_FUEL_PURCHASE,
  payload: index,
})

export const saveReportOnServer = () => {
  return (dispatch, getState) => {
    const state = getState()
    const report = {
      id: state.report.id,
      period: state.report.period,
      user: state.user,
      company: state.company,
      distances: state.distances,
      fuelPurchases: state.fuelPurchases,
    }

    return fetch(`/api/reports/${report.id}`, {
      method: 'PUT',
      body: JSON.stringify(report),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
  }
}

export const actions = {
  fetchReport,
  saveReportOnServer,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_REPORT]: (state, action) => {
    return {
      ...action.report,
    }
  },

  [FETCH_REPORT_REQUEST]: (state) => {
    return {
      ...state,
      fetching: true,
    }
  },

  [FETCH_REPORT_SUCCESS]: (state, action) => {
    return {
      ...state,
      fetching: false,
      report: action.payload,
      receivedAt: Date.now(),
    }
  },

  [CREATE_REPORT_SUCCESS]: (state, action) => {
    const { id } = action.report
    return {
      ...state,
      id,
    }
  },

  [UPDATE_REPORT]: (state, action) => {
    return {
      ...state,
      report: action.payload,
    }
  },

  [CREATE_FUEL_PURCHASE]: (state, action) => {
    const { fuelPurchases } = state.report
    fuelPurchases.push(action.payload)

    return {
      ...state,
      report: {
        ...state.report,
        fuelPurchases,
      },
    }
  },

  [REMOVE_FUEL_PURCHASE]: (state, action) => {
    const { fuelPurchases } = state.report
    const index = action.payload

    fuelPurchases.splice(index, 1)

    return {
      ...state,
      report: {
        ...state.report,
        fuelPurchases,
      },
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
