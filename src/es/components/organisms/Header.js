// @ts-check
import BaseHeader from '../web-components-cms-template/src/es/components/organisms/Header.js'

/* global self */

/**
 * Header can be sticky and hosts as a flex mostly a logo and a navigation
 * Example at: /src/es/components/pages/Home.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Header
 * @type {CustomElementConstructor}
 * @css {}
 * @attribute {}
 */
export default class Header extends BaseHeader {
  constructor (...args) {
    super(...args)
    this.keyListener = event => {
      if (event.key === 'Escape' && this.header.classList.contains('open')) {
        const icon = this.root.querySelector('a-menu-icon')
        this.header.classList.toggle('open')
        icon.classList.toggle('open')
      }
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    super.connectedCallback()
    self.addEventListener('keydown', this.keyListener)
  }

  disconnectedCallback () {
    this.removeEventListener('keydown', this.keyListener)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS () {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    super.renderCSS()
    this.css = /* css */ `
    :host > header > a-logo {
      z-index:100;
    }
    :host > header > m4music-m-navigation {
      top:0;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {}
  `
  }
}
