import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import styles from './Header.css'

function Header() {
  const className = classNames('navbar navbar-fixed-top', {
    [styles.root]: true,
  })

  return (
    <header className={className}>
      <div className="container">
        <Link to="/" className="navbar-brand">EasyIFTA</Link>
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
