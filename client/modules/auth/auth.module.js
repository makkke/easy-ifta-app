import { api, secureApi, roadSoFarApi } from '../../utils/api'
import { loadLatestTaxReturn } from '../taxReturn/taxReturn.module'

// ------------------------------------
// Constants
// ------------------------------------
const LOGIN_REQUEST = 'simple-ifta/auth/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'simple-ifta/auth/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'simple-ifta/auth/LOGIN_FAILURE'

const SIGNUP_REQUEST = 'simple-ifta/auth/SIGNUP_REQUEST'
const SIGNUP_SUCCESS = 'simple-ifta/auth/SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'simple-ifta/auth/LOGIN_FAILURE'

const LOGOUT = 'simple-ifta/auth/LOGOUT'

const LOAD_ME_REQUEST = 'easy-ifta/auth/LOAD_ME_REQUEST'
const LOAD_ME_SUCCESS = 'easy-ifta/auth/LOAD_ME_SUCCESS'
const LOAD_ME_FAILURE = 'easy-ifta/auth/LOAD_ME_FAILURE'

const CREATE_CONNECTION = 'easy-ifta/auth/CREATE_CONNECTION'

// ------------------------------------
// Actions
// ------------------------------------

// Login
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
})

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  token,
})

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
})

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(loginRequest())

    return api('auth/login', 'POST', { email, password })
      .then(response => {
        dispatch(loginSuccess(response.token))

        return dispatch(loadLatestTaxReturn())
      })
      .catch(err => {
        dispatch(loginFailure(err))
        throw err
      })
  }
}

// Signup
export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
})

export const signupSuccess = (token) => ({
  type: SIGNUP_SUCCESS,
  token,
})

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  error,
})

export const signup = (user) => {
  return (dispatch) => {
    dispatch(signupRequest())

    return api('auth/signup', 'POST', user)
      .then(response => {
        dispatch(signupSuccess(response.token))

        return dispatch(loadLatestTaxReturn())
      })
      .catch(err => {
        dispatch(signupFailure(err))
        throw err
      })
  }
}

// Logout
export const logout = () => ({
  type: LOGOUT,
})

// Load me
export const loadMeRequest = () => ({
  type: LOAD_ME_REQUEST,
})

export const loadMeSuccess = (user) => ({
  type: LOAD_ME_SUCCESS,
  user,
})

export const loadMeFailure = (error) => ({
  type: LOAD_ME_FAILURE,
  error,
})

export const loadMe = () => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    dispatch(loadMeRequest())

    return secureApi(token, 'users/me')
      .then(user => dispatch(loadMeSuccess(user)))
      .catch(err => {
        dispatch(loadMeFailure(err))
        throw err
      })
  }
}

// Create connection
export const createConnectionSync = (connection) => ({
  type: CREATE_CONNECTION,
  connection,
})

export const createConnection = (connection) => {
  return (dispatch, getState) => {
    dispatch(createConnectionSync(connection))
    const { token, user: { connections } } = getState().auth

    return secureApi(token, 'users/me', 'PUT', { connections })
      // .then(apiKey => dispatch(createConnection({ app: 'road-so-far', apiKey: apiKey.token })))
      .catch(err => {
        // dispatch(loadMeFailure(err))
        console.log(err)
        throw err
      })
  }
}

// Connect Road So Far
export const createRoadSoFarApiKey = (token) => {
  return (dispatch) => {
    return roadSoFarApi('apiKeys', 'POST', {}, { Authorization: `Bearer ${token}` })
      .then(apiKey => dispatch(createConnection({ app: 'road-so-far', apiKey: apiKey.token })))
      .catch(err => {
        // dispatch(loadMeFailure(err))
        console.log(err)
        throw err
      })
  }
}

export const connectRoadSoFar = (email, password) => {
  return (dispatch) => {
    return roadSoFarApi('auth/login', 'POST', { email, password })
      .then(response => dispatch(createRoadSoFarApiKey(response.token)))
      .catch(err => {
        console.log(err)
        throw err
      })
  }
}

export const actions = {
  login,
  signup,
  logout,
  loadMe,
  connectRoadSoFar,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_REQUEST]: (state) => {
    return {
      ...state,
      isAuthenticating: true,
    }
  },

  [LOGIN_SUCCESS]: (state, action) => {
    const { token } = action
    if (process.env.CLIENT) {
      localStorage.setItem('token', token)
    }

    return {
      ...state,
      isAuthenticated: true,
      isAuthenticating: false,
      token,
    }
  },

  [LOGIN_FAILURE]: (state) => {
    if (process.env.CLIENT) {
      localStorage.removeItem('token')
    }

    return {
      ...state,
      isAuthenticated: false,
      isAuthenticating: false,
      token: null,
    }
  },

  [SIGNUP_REQUEST]: (state) => {
    return {
      ...state,
      isAuthenticating: true,
    }
  },

  [SIGNUP_SUCCESS]: (state, action) => {
    const { token } = action
    if (process.env.CLIENT) {
      localStorage.setItem('token', token)
    }

    return {
      ...state,
      isAuthenticated: true,
      isAuthenticating: false,
      token,
    }
  },

  [SIGNUP_FAILURE]: (state) => {
    if (process.env.CLIENT) {
      localStorage.removeItem('token')
    }

    return {
      ...state,
      isAuthenticated: false,
      isAuthenticating: false,
      token: null,
    }
  },

  [LOGOUT]: (state) => {
    if (process.env.CLIENT) {
      localStorage.removeItem('token')
    }

    return {
      ...state,
      isAuthenticated: false,
      isAuthenticating: false,
      token: null,
    }
  },

  [LOAD_ME_REQUEST]: (state) => {
    return {
      ...state,
    }
  },

  [LOAD_ME_SUCCESS]: (state, { user }) => ({
    ...state,
    user,
  }),

  [LOGIN_FAILURE]: (state) => ({
    ...state,
  }),

  [CREATE_CONNECTION]: (state, { connection }) => {
    const connections = state.user.connections.filter(x => x.app !== connection.app)
    connections.push(connection)

    return {
      ...state,
      user: {
        ...state.user,
        connections,
      },
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  token: null,
  user: {
    connections: [],
  },
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
