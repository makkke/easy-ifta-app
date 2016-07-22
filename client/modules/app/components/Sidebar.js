import React, { Component } from 'react'
import Affix from './Affix'

function getStyles() {
  return {
    item: {
      fontSize: '1.125rem',
      color: '#7e8890',
    },
    link: {
      paddingLeft: 0,
      fontSize: '1.125rem',
      color: '#7e8890',
    },
    active: {
      color: '#3498db',
    },
    submenu: {
      paddingLeft: 20,
    },
  }
}

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
    const styles = getStyles()

    let style = {}
    if (isSubmenu) {
      style = styles.submenu
    }

    return (
      <ul style={style} className="nav nav-pills nav-stacked">
        {menu.map((item) => {
          if (item.submenu) {
            return (
              <li key={`${item.id}-submenu`}>{this.renderMenu(item.submenu, true)}</li>
            )
          }

          return (
            <li className="nav-item" key={item.id}>
              <a style={styles.link} className="nav-link" href={`#${item.id}`} onClick={this.activateItem(item.id)}>{item.title}</a>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const styles = getStyles()

    return (
      <nav style={styles.root} className="col-xs-3 clearfix">
        <Affix id="sidebar-content" offset={84}>
          {this.renderMenu(this.state.menu)}
        </Affix>
      </nav>
   )
  }
}

export default Sidebar
