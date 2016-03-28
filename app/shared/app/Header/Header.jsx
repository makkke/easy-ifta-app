import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

function Header(props, context) {
  const navItemClass = classNames('nav-item', {
    active: context.router.isActive('/recipes', true),
  })

  return (
    <header className="navbar navbar-fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand">EasyIFTA</Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className={navItemClass}>
            <Link to="/login" className="nav-link">Login <span className="sr-only">(current)</span></Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

Header.contextTypes = {
  router: React.PropTypes.object,
}

export default Header
