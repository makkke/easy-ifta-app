import api from '../../utils/api'

// ------------------------------------
// Constants
// ------------------------------------
const LOGIN_REQUEST = 'simple-ifta/auth/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'simple-ifta/auth/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'simple-ifta/auth/LOGIN_FAILURE'

const SIGNUP_REQUEST = 'simple-ifta/auth/SIGNUP_REQUEST'
const SIGNUP_SUCCESS = 'simple-ifta/auth/SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'simple-ifta/auth/LOGIN_FAILURE'

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
      .then(response => dispatch(loginSuccess(response.token)))
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
      .then(response => dispatch(signupSuccess(response.token)))
      .catch(err => {
        dispatch(signupFailure(err))
        throw err
      })
  }
}

export const actions = {
  login,
  signup,
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
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  token: null,
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
