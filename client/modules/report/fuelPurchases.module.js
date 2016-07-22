// ------------------------------------
// Constants
// ------------------------------------
const LOAD_FUEL_PURCHASES = 'simple-ifta/fuelPurchases/LOAD_FUEL_PURCHASES'
const CREATE_FUEL_PURCHASE = 'simple-ifta/fuelPurchases/CREATE_FUEL_PURCHASE'
const REMOVE_FUEL_PURCHASE = 'simple-ifta/fuelPurchases/REMOVE_FUEL_PURCHASE'

// ------------------------------------
// Actions
// ------------------------------------
export const loadFuelPurchases = (fuelPurchases = []) => ({
  type: LOAD_FUEL_PURCHASES,
  fuelPurchases,
})

export const createFuelPurchase = (fuelPurchase) => ({
  type: CREATE_FUEL_PURCHASE,
  fuelPurchase,
})

export const removeFuelPurchase = (index) => ({
  type: REMOVE_FUEL_PURCHASE,
  index,
})

export const actions = {
  loadFuelPurchases,
  createFuelPurchase,
  removeFuelPurchase,
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

  [CREATE_FUEL_PURCHASE]: (state, action) => {
    return [
      ...state,
      { ...action.fuelPurchase },
    ]
  },

  [REMOVE_FUEL_PURCHASE]: (state, action) => {
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
