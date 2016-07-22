import React, { PropTypes } from 'react'

function getStyles() {
  return {
    root: {
      position: 'relative',
      padding: 32,
      marginBottom: 32,
      background: '#fff',
      border: '2px solid #f1f1f1',
      borderRadius: 3,
      transition: 'all 200ms ease-in-out',
    },
    title: {
      marginBottom: 20,
    },
  }
}

function Section(props) {
  const { id, title, children } = props
  const styles = getStyles()


  return (
    <div id={id} style={styles.root}>
      <h4 style={styles.title}>{title}</h4>
      {children}
    </div>
  )
}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default Section
