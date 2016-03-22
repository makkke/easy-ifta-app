import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Footer from './Footer'

class App extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div className="container">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
}

export default connect()(App)
