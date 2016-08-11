import React, { PropTypes } from 'react'

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

function Main(props) {
  const styles = getStyles()

  return (
    <div>
      <Header />
      <div className="container" style={styles.root}>
        <div className="row">
          <Sidebar />
          {props.children}
        </div>
      </div>
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}

export default Main
