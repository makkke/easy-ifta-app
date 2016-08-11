import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import DevTools from './components/DevTools'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function getStyles() {
  const styles = {
    root: {
      paddingTop: 114,
      transition: 'padding-top .25s ease-in-out',
    },
  }

  return styles
}

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { isMounted: false }
  }

  componentDidMount() {
    this.setState({ isMounted: true }) // eslint-disable-line
  }

  render() {
    const styles = getStyles()

    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="Simple IFTA"
            titleTemplate="%s | Simple IFTA"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header />
          <div className="container" style={styles.root}>
            <div className="row">
              <Sidebar />
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(App)
