import fetch from 'isomorphic-fetch'

// ------------------------------------
// Constants
// ------------------------------------
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

// ------------------------------------
// Actions
// ------------------------------------

// Create Report
export const createReportSync = (report) => ({
  type: CREATE_REPORT,
  payload: report,
})

export const requestCreateReport = () => ({
  type: CREATE_REPORT_REQUEST,
})

export const createReportSuccess = (report) => ({
  type: CREATE_REPORT_SUCCESS,
  payload: report,
})

export const createReportFail = (err) => ({
  type: CREATE_REPORT_FAIL,
  error: err,
})

export const createReport = () => {
  return (dispatch) => {
    dispatch(createReportSync())
    dispatch(requestCreateReport())

    return fetch('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        if (process.env.CLIENT) {
          localStorage.setItem('reportId', json.id)
        }
        return dispatch(createReportSuccess(json))
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

export const fetchReport = (id) => {
  return (dispatch) => {
    dispatch(requestFetchReport())

    return fetch(`/api/reports/${id}`)
      .then((response) => {
        if (response.status === 404) {
          return dispatch(createReport())
        }

        return response.json()
      })
      .then(json => dispatch(fetchReportSuccess(json)))
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

export const updateReport = (report) => {
  return (dispatch) => {
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

export const actions = {
  fetchReport,
  updateReport,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
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
    return {
      ...state,
      report: action.payload,
    }
  },

  [UPDATE_REPORT]: (state, action) => {
    return {
      ...state,
      report: action.payload,
    }
  },

  // [CREATE_RECIPE]: (state, action) => {
  //   return {
  //     data: [{
  //       name: action.payload.name,
  //     }].concat(state.data),
  //   }
  // },

  // [CREATE_RECIPE_REQUEST]: (state) => {
  //   return {
  //     ...state,
  //     fetching: true,
  //   }
  // },

  // [CREATE_RECIPE_SUCCESS]: (state, action) => {
  //   return {
  //     ...state,
  //     fetching: false,
  //     data: action.payload,
  //   }
  // },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  report: {},
}

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
