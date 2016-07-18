import React from 'react'
import { Link } from 'react-router'

function getStyles() {
  return {
    root: {
      minHeight: 64,
      backgroundColor: 'white',
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, .1)',
    },
  }
}

function Header() {
  const styles = getStyles()

  return (
    <header style={styles.root} className="navbar navbar-fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand">SimpleIFTA</Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login <span className="sr-only">(current)</span></Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
