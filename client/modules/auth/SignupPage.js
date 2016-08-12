import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ButtonToolbar, Button } from 'react-bootstrap'

import { actions } from './auth.module'

class SignupPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object,
  }

  state = {}

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.actions
      .signup({
        name: 'Slava Ivanov',
        company: 'Exilium',
        email: 'slava.eth@gmail.com',
        password: 'test',
      })
      .then(() => this.context.router.push('/'))
  }

  render() {
    return (
      <div>
        <h2>Signup</h2>
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={this.handleSubmit}>Signup</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)
