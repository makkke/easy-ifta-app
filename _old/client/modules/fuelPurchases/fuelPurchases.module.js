import { roadSoFarApi } from '../../utils/api'

// ------------------------------------
// Constants
// ------------------------------------
const LOAD_FUEL_PURCHASES = 'LOAD_FUEL_PURCHASES'
const CREATE = 'CREATE_FUEL_PURCHASE'
const REMOVE = 'REMOVE_FUEL_PURCHASES'

// ------------------------------------
// Actions
// ------------------------------------
export const loadFuelPurchases = (fuelPurchases) => ({
  type: LOAD_FUEL_PURCHASES,
  fuelPurchases,
})

export const create = (fuelPurchase) => ({
  type: CREATE,
  fuelPurchase,
})

export const remove = (index) => ({
  type: REMOVE,
  index,
})

export const importFuelPurchasesFromRoadSoFar = () => {
  return (dispatch, getState) => {
    const { apiKey } = getState().auth.user.connections.find(x => x.app === 'road-so-far')

    return roadSoFarApi('fuelPurchases', 'GET', undefined, { Authorization: `Bearer ${apiKey}` })
      .then(fuelPurchases => dispatch(loadFuelPurchases(fuelPurchases)))
      .catch(err => {
        console.log(err)
        throw err
      })
  }
}

export const actions = {
  loadFuelPurchases,
  createFuelPurchase: create,
  removeFuelPurchase: remove,
  importFuelPurchasesFromRoadSoFar,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_FUEL_PURCHASES]: (state, action) => {
    return [
      ...action.fuelPurchases,
    ]
  },

  [CREATE]: (state, { fuelPurchase }) => {
    return [
      ...state,
      { ...fuelPurchase },
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
