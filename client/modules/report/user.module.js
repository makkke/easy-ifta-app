// ------------------------------------
// Constants
// ------------------------------------
const LOAD_USER = 'simple-ifta/user/LOAD_USER'
const UPDATE_USER = 'simple-ifta/user/UPDATE_USER'

// ------------------------------------
// Actions
// ------------------------------------
export const loadUser = (user) => ({
  type: LOAD_USER,
  user,
})

export const updateUser = (user) => ({
  type: UPDATE_USER,
  user,
})

export const actions = {
  loadUser,
  updateUser,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_USER]: (state, action) => {
    return {
      ...action.user,
    }
  },

  [UPDATE_USER]: (state, action) => {
    return {
      ...state,
      ...action.user,
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
