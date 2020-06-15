import fetch from 'isomorphic-fetch'

const { API_URL, ROAD_SO_FAR_API } = process.env

export function api(endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (response.status >= 200 && response.status < 300) {
      return json
    }

    const error = new Error(response.statusText)
    error.response = response
    throw error
  })
}

export function secureApi(token, endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (response.status >= 200 && response.status < 300) {
      return json
    }

    const error = new Error(response.statusText)
    error.response = response
    throw error
  })
}

export function roadSoFarApi(endpoint, method = 'GET', body, headers) {
  return fetch(`${ROAD_SO_FAR_API}/${endpoint}`, {
    headers: {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (response.status >= 200 && response.status < 300) {
      return json
    }

    const error = new Error(response.statusText)
    error.response = response
    throw error
  })
}

export default { api, secureApi }
