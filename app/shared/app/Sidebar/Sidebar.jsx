import React, { Component } from 'react'
import classNames from 'classnames'
import Affix from '../Affix'
import styles from './Sidebar.css'

class Sidebar extends Component {
  state = {
    menu: [
      { id: 'client-section', title: 'About You', isActive: true },
      { id: 'company-section', title: 'About Company', isActive: false },
      {
        id: 'tax-return-section',
        title: 'Tax Return',
        isActive: false,
        submenu: [
          {
            id: 'distance-traveled-section',
            title: 'Distance Traveled',
            isActive: false,
          },
          {
            id: 'fuel-purchases-section',
            title: 'Fuel Purchases',
            isActive: false,
          },
        ],
      },
      { id: 'summary-section', title: 'Summary', isActive: false },
    ],
  }

  activateItem = (id) => {
    return () => {
      const menu = this.state.menu.map(x => ({ ...x, isActive: false }))
      const item = menu.find(x => x.id === id)
      item.isActive = true
      this.setState({ menu })
    }
  }

  renderMenu(menu, isSubmenu) {
    const menuClassName = classNames('nav nav-pills nav-stacked', {
      [styles.submenu]: isSubmenu,
    })

    return (
      <ul className={menuClassName}>
        {menu.map((item) => {
          const className = classNames('nav-link', styles.link, {
            [styles.active]: item.isActive,
          })

          if (item.submenu) {
            return (
              <li key={`${item.id}-submenu`}>{this.renderMenu(item.submenu, true)}</li>
            )
          }

          return (
            <li className="nav-item" key={item.id}>
              <a className={className} href={`#${item.id}`} onClick={this.activateItem(item.id)}>{item.title}</a>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <nav className={`${styles.root} col-xs-3 clearfix`}>
        <Affix id="sidebar-content" offset={84}>
          {this.renderMenu(this.state.menu)}
        </Affix>
      </nav>
   )
  }
}

export default Sidebar

// <div id="return-box" className="clearfix">
//   <span id="return-box-title">Refund</span>
//   <span id="return-total">$3,676.86</span>
// </div>


// <ul className="nav nav-pills nav-stacked">
//             <li className="nav-item">
//               <a className={`${styles.link} nav-link`} href="#about-you-section">About You</a>
//             </li>
//             <li className="nav-item">
//               <a className={`${styles.link} nav-link`} href="#about-company-section">About Company</a>
//             </li>
//             <li className="nav-item">
//               <a className={`${styles.link} nav-link`} href="#tax-return-section">Tax Return</a>
//             </li>
//             <li className="nav-item">
//               <a className={`${styles.link} nav-link`} href="#summary-section">Summary</a>
//             </li>
//             <li className="nav-item">
//               <a className={`${styles.link} nav-link`} href="#submit-section">Submit</a>
//             </li>
//           </ul>