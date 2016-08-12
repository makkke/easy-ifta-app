import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
// import theme from '../../components/styles/theme'

// function getStyle() {
//   return {}
// }

class LoginPage extends Component {
  static propTypes = {
    auth: PropTypes.object,
  }

  state = {}

  render() {
    // const { auth } = this.props

    return (
      <form>
        <FormGroup controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl type="text" placeholder="popa" />
        </FormGroup>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(LoginPage)
