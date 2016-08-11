import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ButtonToolbar, Button } from 'react-bootstrap'

class LoginPage extends Component {
  static propTypes = {
    auth: PropTypes.object,
  }

  state = {}

  render() {
    // const { auth } = this.props

    return (
      <div>
        <h2>Login</h2>
        <ButtonToolbar>
          <Button bsStyle="primary">Login</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(LoginPage)
