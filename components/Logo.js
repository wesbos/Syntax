/**
 * @name Logo
 * @see https://github.com/wesbos/Syntax/issues/273
 */

import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import PropTypes from 'prop-types'

export default class Logo extends Component {

  static propTypes = {
    redirectOn: PropTypes.shape({
      click: PropTypes.oneOf(['left', 'right']).isRequired,
      url: PropTypes.string.isRequired
    }),
    shouldRedirect: PropTypes.bool
  }

  handleClick = (event) => {

    const leftClick = event.type === 'click' || event.button === 0 || event.nativeEvent.which === 1
    const rightClick = event.type === 'contextmenu' || event.button === 2 || event.nativeEvent.which === 3

    const checkClick = () => {
      if(this.props.redirectOn.click == 'left')
        return event.type === 'click' || event.button === 0 || event.nativeEvent.which === 1
      else if(this.props.redirectOn.click == 'right')
        return event.type === 'contextmenu' || event.button === 2 || event.nativeEvent.which === 3
    }

    if (this.props.shouldRedirect && this.props.redirectOn && checkClick())
      event.preventDefault() // To not open the context menu
      Router.push(this.props.redirectOn.url)

  }

  render() {
    return (
      <Link href="/">
        <a 
          aria-label="Syntax.FM" 
          onClick={this.props.redirectOn.click === 'left' ? this.handleClick : ""} 
          onContextMenu={this.props.redirectOn.click === 'right' ? this.handleClick : ""}>
          <img className="header__logo" src="/static/logo.png" alt="Syntax" />
        </a>
      </Link>
    )
  }

}
