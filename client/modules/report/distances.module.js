// ------------------------------------
// Constants
// ------------------------------------
const LOAD_DISTANCES = 'simple-ifta/distances/LOAD_DISTANCES'
const CREATE_DISTANCE = 'simple-ifta/distances/CREATE_DISTANCE'
const REMOVE_DISTANCE = 'simple-ifta/distances/REMOVE_DISTANCE'

// ------------------------------------
// Actions
// ------------------------------------
export const loadDistances = (distances = []) => ({
  type: LOAD_DISTANCES,
  distances,
})

export const createDistance = (distance) => ({
  type: CREATE_DISTANCE,
  distance,
})

export const removeDistance = (index) => ({
  type: REMOVE_DISTANCE,
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
  [LOAD_DISTANCES]: (state, action) => {
    return [
      ...action.distances,
    ]
  },

  [CREATE_DISTANCE]: (state, action) => {
    return [
      ...state,
      { ...action.distance },
    ]
  },

  [REMOVE_DISTANCE]: (state, action) => {
    const { index } = action

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
