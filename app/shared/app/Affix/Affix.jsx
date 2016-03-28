import React, { Component, PropTypes } from 'react'

class Affix extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    className: PropTypes.string,
    offset: PropTypes.number,
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
    const affix = this.state.affix ? 'affix' : ''
    const { className, offset, ...props } = this.props

    return (
      <div {...props} className={`${className} ${affix}`}>
        {this.props.children}
      </div>
    )
  }
}

export default Affix
