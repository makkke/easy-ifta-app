import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux'

import theme from '../../components/styles/theme'
import TextInput from '../../components/TextInput/TextInput'
import { actions } from './auth.module'

function getStyles() {
  return {
    form: {
      maxWidth: 500,
      marginTop: 120,
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 40,
      borderRadius: 3,
      borderWidth: 1,
      boxSizing: 'border-box',
      borderColor: theme.colors.lightGrey,
      borderStyle: 'solid',
      boxShadow: '0 2px 8px rgba(31,45,61,0.05)',
      backgroundColor: theme.colors.white,
    },
    header: {
      marginTop: 0,
      marginBottom: 20,
      textAlign: 'center',
      fontSize: theme.fontSize.h3,
      color: theme.colors.black,
    },
    subheader: {
      marginTop: 0,
      marginBottom: 40,
      textAlign: 'center',
      fontSize: theme.fontSize.h2,
      color: theme.colors.darkGrey,
    },
    inputLarge: {
      height: 50,
      width: '100%',
      fontSize: 16,
      boxSizing: 'border-box',
    },
    forgotPassword: {
      marginTop: 10,
      marginBottom: 20,
      textAlign: 'right',
      fontSize: theme.fontSize.normal,
      color: theme.colors.darkGrey,
    },
    button: {
      height: 50,
      backgroundColor: theme.colors.green,
      borderColor: theme.colors.green,
      fontSize: theme.fontSize.normal,
    },
    subtext: {
      marginTop: 40,
      marginBottom: 0,
      textAlign: 'center',
      fontWeight: theme.fontWeight.light,
      color: theme.colors.darkGrey,
    },
    subtextLink: {
      paddingLeft: 5,
      outline: 'none',
      color: theme.colors.blue,
      textDecoration: 'none',
    },
  }
}

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
    const styles = getStyles()
    // const { auth } = this.props

    return (
      <div>
        <form style={styles.form}>
          <div style={styles.header}>
            <h3>Welcome back</h3>
          </div>
          <div style={styles.subheader}>
            <span>Sign into your account here:</span>
          </div>
          <TextInput style={styles.inputLarge} placeholder="Email" />
          <TextInput style={styles.inputLarge} placeholder="Password" type="password" />
          <div style={styles.forgotPassword}>
            <span>Forgot your password?</span>
          </div>
          <Button style={styles.button} bsStyle="primary" bsSize="large" block>Sign In</Button>
        </form>
        <div style={styles.subtext}>
          <span>Dont have an account?</span>
          <Button style={styles.subtextLink} bsStyle="link">Sign Up</Button>
        </div>
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
