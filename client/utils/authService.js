// import ExecutionEnvironment from 'exenv'

// class AuthService {
//   constructor(clientId, domain) {
//     if (ExecutionEnvironment.canUseViewport) {
//       const Auth0Lock = require('auth0-lock').default // eslint-disable-line
//       // configure Auth0
//       this.lock = new Auth0Lock(clientId, domain, {})

//       // add callback for lock `authenticated` event
//       this.lock.on('authenticated', this._authenticate.bind(this))

//       // binds login functions to keep this context
//       this.login = this.login.bind(this)
//     }
//   }

//   /**
//    * Saves the user token
//    * @private
//    * @param  {object} authResult
//    */
//   _authenticate(authResult) {
//     this.setToken(authResult.idToken)
//   }

//   /**
//    * Calls the show method to display the widget
//    */
//   login() {
//     this.lock.show()
//   }

//   *
//    * Checks if there is a saved token and it's still valid
//    * @return {boolean} true if logged in

//   isLoggedIn() {
//     return !!this.getToken()
//   }

//   /**
//    * Saves user token to localStorage
//    * @param {string} idToken
//    */
//   setToken(idToken) {
//     if (ExecutionEnvironment.canUseViewport) {
//       localStorage.setItem('id_token', idToken)
//     }
//   }

//   /**
//    * Retrieve the user token from localStorage
//    * @return {string} token
//    */
//   getToken() {
//     if (ExecutionEnvironment.canUseViewport) {
//       return localStorage.getItem('id_token')
//     }
//   }

//   /**
//    * Clear user token and profile data from localStorage
//    */
//   logout() {
//     if (ExecutionEnvironment.canUseViewport) {
//       localStorage.removeItem('id_token')
//     }
//   }
// }

// export default AuthService
