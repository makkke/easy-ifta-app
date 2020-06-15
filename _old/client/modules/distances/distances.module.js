// ------------------------------------
// Constants
// ------------------------------------
const LOAD_DISTANCES = 'easy-ifta/distances/LOAD'
const CREATE = 'easy-ifta/distances/CREATE'
const REMOVE = 'easy-ifta/distances/REMOVE'

// ------------------------------------
// Actions
// ------------------------------------
export const loadDistances = (distances) => ({
  type: LOAD_DISTANCES,
  distances,
})

export const createDistance = (distance) => ({
  type: CREATE,
  distance,
})

export const removeDistance = (index) => ({
  type: REMOVE,
  index,
})

export const actions = {
  loadDistances,
  createDistance,
  removeDistance,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_DISTANCES]: (state, { distances }) => {
    return [
      ...distances,
    ]
  },

  [CREATE]: (state, { distance }) => {
    return [
      ...state,
      { ...distance },
    ]
  },

  [REMOVE]: (state, { index }) => {
    return [
      ...state.slice(0, index),
      ...state.slice(index + 1),
    ]
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
