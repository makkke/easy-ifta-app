import React, { Component, PropTypes } from 'react'

function getStyles(state) {
  return {
    root: {
      position: state.affix ? 'fixed' : '',
    },
  }
}

class Affix extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    offset: PropTypes.number,
    id: PropTypes.string,
  }

  static defaultProps = {
    offset: 0,
  }

  state = {
    affix: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { affix } = this.state
    const { offset } = this.props
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    if (!affix && scrollTop >= offset) {
      this.setState({ affix: true })
    }

    if (affix && scrollTop < offset) {
      this.setState({ affix: false })
    }
  }

  render() {
    const { id } = this.props
    const styles = getStyles(this.state)

    return (
      <div id={id} style={styles.root}>
        {this.props.children}
      </div>
    )
  }
}

export default Affix
