export const LOAD_ROUTE = 'LOAD_ROUTE'

// Export Actions
export function loadRoute(route) {
  return {
    type: LOAD_ROUTE,
    route,
  }
}
