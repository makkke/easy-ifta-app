import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import Joi from 'joi'

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
    actions: PropTypes.object.isRequired,
    location: PropTypes.object,
  }

  static contextTypes = {
    router: React.PropTypes.object,
  }

  state = {
    email: '',
    password: '',
    isProcessing: false,
    errors: {},
  }

  handleEmailChange = (event) => {
    const email = event.target.value.trim()
    const { errors } = this.state
    errors.email = null
    errors.login = false

    this.setState({ email, errors })
  }

  handlePasswordChange = (event) => {
    const password = event.target.value.trim()
    const { errors } = this.state
    errors.password = null
    errors.login = false

    this.setState({ password, errors })
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    // validate
    const schema = Joi.object({
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().required().label('Password'),
    })
    const result = Joi.validate(this.state, schema, { allowUnknown: true })
    if (result.error) {
      const path = result.error.details[0].path
      this.setState({ errors: { [path]: result.error.details[0].message } })
      return
    }

    // login
    try {
      this.setState({ isProcessing: true })
      await this.props.actions.login(this.state.email, this.state.password)
      const redirect = this.props.location.query.next || '/'
      this.context.router.push(redirect)
    } catch (e) {
      this.setState({ errors: { login: true }, isProcessing: false })
    }
  }

  render() {
    const styles = getStyles()
    const { isProcessing } = this.state
    const buttonText = isProcessing ? 'Signing in...' : 'Sign in'

    return (
      <div>
        <form style={styles.form} onSubmit={this.handleSubmit}>
          <div style={styles.header}>
            <h3>Welcome back</h3>
          </div>
          <div style={styles.subheader}>
            <span>Sign into your account here:</span>
          </div>
          <div>{this.state.errors.login && 'Wrong username or password'}</div>
          <TextInput
            style={styles.inputLarge}
            name="email"
            placeholder="Email"
            value={this.state.email}
            error={this.state.errors.email}
            onChange={this.handleEmailChange}
          />
          <TextInput
            style={styles.inputLarge}
            name="password"
            placeholder="Password"
            type="password"
            value={this.state.password}
            error={this.state.errors.password}
            onChange={this.handlePasswordChange}
          />
          <div style={styles.forgotPassword}>
            <span>Forgot your password? Too bad...</span>
          </div>
          <Button
            type="submit"
            style={styles.button}
            bsStyle="primary"
            bsSize="large"
            block
            disabled={isProcessing}
          >{buttonText}</Button>
        </form>
        <div style={styles.subtext}>
          <span>Don't have an account?</span>
          <Link to="/signup">
            <Button style={styles.subtextLink} bsStyle="link">Sign up</Button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(null, mapDispatchToProps)(LoginPage)
