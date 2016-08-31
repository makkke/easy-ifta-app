// ------------------------------------
// Constants
// ------------------------------------
const OPEN_CONNECT_ROAD_SO_FAR_MODAL = 'easy-ifta/app/OPEN_CONNECT_ROAD_SO_FAR_MODAL'
const CLOSE_CONNECT_ROAD_SO_FAR_MODAL = 'easy-ifta/app/CLOSE_CONNECT_ROAD_SO_FAR_MODAL'

// ------------------------------------
// Actions
// ------------------------------------
export const openConnectRoadSoFarModal = () => ({
  type: OPEN_CONNECT_ROAD_SO_FAR_MODAL,
})

export const closeConnectRoadSoFarModal = () => ({
  type: CLOSE_CONNECT_ROAD_SO_FAR_MODAL,
})

export const actions = {
  openConnectRoadSoFarModal,
  closeConnectRoadSoFarModal,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [OPEN_CONNECT_ROAD_SO_FAR_MODAL]: (state) => {
    return {
      ...state,
      showConnectRoadSoFarModal: true,
    }
  },

  [CLOSE_CONNECT_ROAD_SO_FAR_MODAL]: (state) => {
    return {
      ...state,
      showConnectRoadSoFarModal: false,
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  showConnectRoadSoFarModal: false,
}

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
