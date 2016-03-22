import React from 'react'
import styles from './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
   <footer className={styles.root}>
     <p>&copy; {year} Simple IFTA by Exilium Studio</p>
   </footer>
 )
}

export default Footer
