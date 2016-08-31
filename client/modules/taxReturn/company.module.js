// ------------------------------------
// Constants
// ------------------------------------
const LOAD_COMPANY = 'LOAD_COMPANY'
const UPDATE_COMPANY = 'UPDATE_COMPANY'

// ------------------------------------
// Actions
// ------------------------------------
export const loadCompany = (company) => ({
  type: LOAD_COMPANY,
  company,
})

export const updateCompany = (company) => ({
  type: UPDATE_COMPANY,
  company,
})

export const actions = {
  loadCompany,
  updateCompany,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_COMPANY]: (state, action) => {
    return {
      ...action.company,
    }
  },

  [UPDATE_COMPANY]: (state, action) => {
    return {
      ...state,
      ...action.company,
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
