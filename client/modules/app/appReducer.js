// Import Actions
import { LOAD_ROUTE } from './appActions'

// Initial state
const initialState = {
  route: '/',
}

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ROUTE:
      return {
        route: action.route,
      }

    default:
      return state
  }
}

export default AppReducer
