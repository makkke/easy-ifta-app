import React from 'react'
import { Link } from 'react-router'
import theme from '../../../components/styles/theme'

function getStyles() {
  return {
    root: {
      minHeight: 64,
      paddingTop: 12,
      backgroundColor: 'white',
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, .1)',
    },
    logo: {
      fontSize: 24,
      color: theme.colors.blue,
    },
    link: {
      color: theme.colors.black,
    },
  }
}

function Header() {
  const styles = getStyles()

  return (
    <header style={styles.root} className="navbar navbar-fixed-top">
      <div className="container">
        <Link to="/" style={styles.logo} className="navbar-brand">EasyIFTA</Link>
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
