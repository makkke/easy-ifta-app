import fetch from 'isomorphic-fetch'

// ------------------------------------
// Constants
// ------------------------------------
const LOGIN_REQUEST = 'simple-ifta/auth/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'simple-ifta/auth/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'simple-ifta/auth/LOGIN_FAILURE'

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

    return fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(response => {
        try {
          return dispatch(loginSuccess(response.token))
        } catch (err) {
          return dispatch(loginFailure(err))
        }
      })
      .catch(err => dispatch(loginFailure(err)))
  }
}

export const actions = {
  login,
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
