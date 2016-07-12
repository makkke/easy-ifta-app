import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from '../Header'
import Sidebar from '../Sidebar'
import styles from './App.css'

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <Header />
        <div className={`${styles.container} container`}>
          <div className="row">
            <Sidebar />
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(App)
