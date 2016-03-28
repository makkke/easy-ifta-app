import React from 'react'
import styles from './ReportTitle.css'

function ReportTitle(props) {
  const { period } = props
  const periodString = period ? `Q-${period.quarter} ${period.year}` : ''

  return (
    <div className={styles.root}>
      <h1>IFTA {periodString} Tax Return</h1>
    </div>
  )
}

ReportTitle.propTypes = {
  period: React.PropTypes.object,
}

export default ReportTitle
