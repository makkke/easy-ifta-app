import React from 'react'

import theme from '../../components/styles/theme'

function getStyles() {
  return {
    root: {
      color: theme.colors.blue,
    },

    title: {
      marginBottom: 40,
      fontWeight: theme.fontWeight.light,
    },
  }
}

function ReportTitle(props) {
  const { period } = props
  const periodString = period ? `Q-${period.quarter} ${period.year}` : ''
  const styles = getStyles()

  return (
    <div className={styles.root}>
      <h1 style={styles.title}>IFTA {periodString} Tax Return</h1>
    </div>
  )
}

ReportTitle.propTypes = {
  period: React.PropTypes.object,
}

export default ReportTitle
