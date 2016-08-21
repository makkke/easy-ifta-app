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

class SignupPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    location: PropTypes.object,
  }

  static contextTypes = {
    router: React.PropTypes.object,
  }

  state = {
    name: 'Slava Ivanov',
    company: 'Exilium',
    email: 'slava.eth@gmail.com',
    password: 'test',
    isProcessing: false,
    errors: {},
  }

  handleInputChange = (event) => {
    const { errors } = this.state
    const value = event.target.value.trim()
    const field = event.target.name

    errors[field] = null
    errors.signup = false

    this.setState({ [field]: value, errors })
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    // validate
    const schema = Joi.object({
      name: Joi.string().min(2).required().label('Full Name'),
      company: Joi.string().min(2).required().label('Company'),
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().required().label('Password'),
    })
    const result = Joi.validate(this.state, schema, { allowUnknown: true })
    if (result.error) {
      const { path, message } = result.error.details[0]
      this.setState({ errors: { [path]: message } })
      return
    }

    // signup
    try {
      this.setState({ isProcessing: true })
      await this.props.actions.signup(this.state)
      this.context.router.push('/')
    } catch (e) {
      this.setState({ errors: { signup: true }, isProcessing: false })
    }
  }

  render() {
    const styles = getStyles()
    const { isProcessing } = this.state
    const buttonText = isProcessing ? 'Creating...' : 'Create Account'

    return (
      <div>
        <form style={styles.form} onSubmit={this.handleSubmit}>
          <div style={styles.header}>
            <h3>Sign up to save your data!</h3>
          </div>
          <div style={styles.subheader}>
            <span>An EasyIFTA account is used to securely save your data.</span>
          </div>
          <div>{this.state.errors.signup && 'Email already used'}</div>
          <TextInput
            style={styles.inputLarge}
            name="name"
            placeholder="Full Name"
            value={this.state.name}
            error={this.state.errors.name}
            onChange={this.handleInputChange}
          />
          <TextInput
            style={styles.inputLarge}
            name="company"
            placeholder="Company"
            value={this.state.company}
            error={this.state.errors.company}
            onChange={this.handleInputChange}
          />
          <TextInput
            style={styles.inputLarge}
            name="email"
            placeholder="Email"
            value={this.state.email}
            error={this.state.errors.email}
            onChange={this.handleInputChange}
          />
          <TextInput
            style={styles.inputLarge}
            name="password"
            placeholder="Password"
            type="password"
            value={this.state.password}
            error={this.state.errors.password}
            onChange={this.handleInputChange}
          />
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
          <span>Already have an account?</span>
          <Link to="/login">
            <Button style={styles.subtextLink} bsStyle="link">Sign in</Button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(null, mapDispatchToProps)(SignupPage)
