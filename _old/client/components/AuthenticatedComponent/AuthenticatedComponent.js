import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      token: PropTypes.string,
      location: PropTypes.object,
    }

    static contextTypes = {
      router: React.PropTypes.object,
    }

    componentWillMount() {
      this.checkAuth(this.props.isAuthenticated)
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isAuthenticated)
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        const redirectAfterLogin = this.props.location.pathname
        this.context.router.push(`/login?next=${redirectAfterLogin}`)
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <Component {...this.props} />
            : null
          }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated,
  })

  return connect(mapStateToProps)(AuthenticatedComponent)
}

export default requireAuthentication
