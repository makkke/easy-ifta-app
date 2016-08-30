import React, { Component, PropTypes } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Joi from 'joi'

import TextInput from '../../../components/TextInput/TextInput'

// function getStyles() {
//   return {}
// }

class ConnectRoadSoFarModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    connect: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
    errors: {},
    isProcessing: false,
  }

  handleInputChange = (event) => {
    const { errors } = this.state
    const value = event.target.value.trim()
    const field = event.target.name

    errors[field] = null
    errors.login = null

    this.setState({ [field]: value, errors })
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
      const { path, message } = result.error.details[0]
      this.setState({ errors: { [path]: message } })
      return
    }

    // login
    try {
      this.setState({ isProcessing: true })
      await this.props.connect(this.state.email, this.state.password)
      this.setState({ isProcessing: false })
      this.props.onClose()
    } catch (e) {
      this.setState({ errors: { login: true }, isProcessing: false })
    }
  }

  render() {
    // const styles = getStyles()
    const { isProcessing } = this.state
    const buttonText = isProcessing ? 'Connecting...' : 'Connect'

    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login to Road so Far</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <div>{this.state.errors.login && 'Wrong username or password'}</div>
              <TextInput
                name="email"
                placeholder="Email"
                value={this.state.email}
                error={this.state.errors.email}
                onChange={this.handleInputChange}
              />
              <TextInput
                name="password"
                placeholder="Password"
                type="password"
                value={this.state.password}
                error={this.state.errors.password}
                onChange={this.handleInputChange}
              />
              <Button
                type="submit"
                bsStyle="primary"
                bsSize="large"
                block
                disabled={isProcessing}
              >{buttonText}</Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
   )
  }
}

export default ConnectRoadSoFarModal
