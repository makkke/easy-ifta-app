import { secureApi } from '../../utils/api'
import { latestTaxPeriod } from './utils'
import { loadFuelPurchases } from '../fuelPurchases/fuelPurchases.module'
import { loadDistances } from '../distances/distances.module'

// ------------------------------------
// Constants
// ------------------------------------
const LOAD_LATEST_REQUEST = 'easy-ifta/taxReturns/LOAD_LATEST_REQUEST'
const LOAD_LATEST_SUCCESS = 'easy-ifta/taxReturns/LOAD_LATEST_SUCCESS'
const LOAD_LATEST_FAILURE = 'easy-ifta/taxReturns/LOAD_LATEST_FAILURE'

const CREATE_REQUEST = 'easy-ifta/taxReturns/CREATE_REQUEST'
const CREATE_SUCCESS = 'easy-ifta/taxReturns/CREATE_SUCCESS'
const CREATE_FAILURE = 'easy-ifta/taxReturns/CREATE_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

// Create
export const createRequest = () => ({
  type: CREATE_REQUEST,
})

export const createSuccess = (taxReturn) => ({
  type: CREATE_SUCCESS,
  taxReturn,
})

export const createFailure = (error) => ({
  type: CREATE_FAILURE,
  error,
})

export const create = (period) => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    dispatch(createRequest())

    return secureApi(token, 'taxReturns', 'POST', { period })
      .then(taxReturn => {
        dispatch(createSuccess(taxReturn))
        dispatch(loadFuelPurchases(taxReturn.fuelPurchases))
        dispatch(loadDistances(taxReturn.distances))
      })
      .catch(err => {
        dispatch(createFailure(err))
        throw err
      })
  }
}

// Load latest
export const loadLatestRequest = () => ({
  type: LOAD_LATEST_REQUEST,
})

export const loadLatestSuccess = (taxReturn) => ({
  type: LOAD_LATEST_SUCCESS,
  taxReturn,
})

export const loadLatestFailure = (error) => ({
  type: LOAD_LATEST_FAILURE,
  error,
})

export const loadLatestTaxReturn = () => {
  return (dispatch, getState) => {
    dispatch(loadLatestRequest())

    const { token } = getState().auth
    const taxPeriod = latestTaxPeriod()

    return secureApi(token, `taxReturns/${taxPeriod.year}/${taxPeriod.quarter}`)
      .then(taxReturn => {
        dispatch(loadLatestSuccess(taxReturn))
        dispatch(loadFuelPurchases(taxReturn.fuelPurchases))
        dispatch(loadDistances(taxReturn.distances))
      })
      .catch(() => dispatch(create(taxPeriod)))
  }
}

export const save = () => {
  return (dispatch, getState) => {
    const state = getState()
    const taxReturn = {
      id: state.taxReturn.id,
      // user: state.user,
      // company: state.company,
      distances: state.distances,
      fuelPurchases: state.fuelPurchases,
    }

    const { token } = state.auth

    return secureApi(token, `taxReturns/${taxReturn.id}`, 'PUT', taxReturn)
  }
}

export const actions = {
  loadLatestTaxReturn,
  saveTaxReturn: save,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_LATEST_REQUEST]: (state) => ({
    ...state,
    isLoading: true,
  }),

  [LOAD_LATEST_SUCCESS]: (state, { taxReturn }) => {
    return {
      ...taxReturn,
      isLoading: false,
    }
  },

  [LOAD_LATEST_FAILURE]: (state) => ({
    ...state,
    isLoading: false,
  }),

  [CREATE_REQUEST]: (state) => ({
    ...state,
    isLoading: true,
  }),

  [CREATE_SUCCESS]: (state, { taxReturn }) => {
    return {
      ...taxReturn,
      isLoading: false,
    }
  },

  [CREATE_FAILURE]: (state) => ({
    ...state,
    isLoading: false,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: false,
}

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
