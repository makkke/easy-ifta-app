import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import styles from './Header.css'

function Header(props, context) {
  const navItemClass = classNames('nav-item', {
    active: context.router.isActive('/recipes', true),
  })

  return (
    <div className={styles.root}>
      <nav className="navbar navbar-light bg-faded">
        <Link to="/" className="navbar-brand">Simple IFTA</Link>
        <ul className="nav navbar-nav">
          <li className={navItemClass}>
            <Link to="/recipes" className="nav-link">Recipes <span className="sr-only">(current)</span></Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

Header.contextTypes = {
  router: React.PropTypes.object,
}

export default Header
