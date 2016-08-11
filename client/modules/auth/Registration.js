import React, { PropTypes } from 'react'

function getStyles() {
  const styles = {
    root: {},
  }

  return styles
}

function Registration(props) {
  const styles = getStyles()

  return (
    <div style={styles.root}>
      <h1>Registration</h1>
      {props.children}
    </div>
  )
}

Registration.propTypes = {
  children: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}

export default Registration
