import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import theme from '../../../components/styles/theme'
import { actions } from '../../../modules/auth/auth.module'

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

function Header(props) {
  const styles = getStyles()

  return (
    <header style={styles.root} className="navbar navbar-fixed-top">
      <div className="container">
        <Link to="/" style={styles.logo} className="navbar-brand">EasyIFTA</Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link
              to="/login"
              className="nav-link"
              onClick={() => {
                props.actions.logout()
              }}
            >Logout <span className="sr-only">(current)</span></Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

Header.propTypes = {
  actions: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(null, mapDispatchToProps)(Header)
