import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions as appActions } from './app.module'
import { actions as authActions } from '../auth/auth.module'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ConnectRoadSoFarModal from './components/ConnectRoadSoFarModal'

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
          <ConnectRoadSoFarModal
            show={props.showConnectRoadSoFarModal}
            connect={props.actions.connectRoadSoFar}
            onClose={() => props.actions.closeConnectRoadSoFarModal()}
          />
        </div>
      </div>
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  showConnectRoadSoFarModal: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  showConnectRoadSoFarModal: state.app.showConnectRoadSoFarModal,
})

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators({ ...appActions, ...authActions }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
