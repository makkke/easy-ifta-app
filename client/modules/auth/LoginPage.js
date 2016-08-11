import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ButtonToolbar, Button } from 'react-bootstrap'

import { actions } from './auth.module'

class LoginPage extends Component {
  static propTypes = {
    auth: PropTypes.object,
    actions: PropTypes.object.isRequired,
    location: PropTypes.object,
  }

  static contextTypes = {
    router: React.PropTypes.object,
  }

  state = {}

  handleSubmit = (event) => {
    event.preventDefault()

    const redirect = this.props.location.query.next || '/'
    this.props.actions
      .login('slava.eth@gmail.com', 'test')
      .then(() => this.context.router.push(redirect))
  }

  render() {
    // const { auth } = this.props

    return (
      <div>
        <h2>Login</h2>
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={this.handleSubmit}>Login</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
