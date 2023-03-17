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
    :host {
      height: 2rem;
    }
    :host > header {
      max-width:var(--content-max-width, 100vw);
      margin-top: 0;
      height: 2rem;
    }
    :host > header > a-logo {
      z-index:103;
    }
    :host > header > m4music-m-navigation {
      z-index:102;
      top:0;
    }
    :host > header > a-menu-icon {
      z-index:103;
    }

    @media only screen and (max-width: 960px) {
      :host {
        height: 4rem;
      }

      :host > header {
        height: 4rem;
      }
    }
  `
  }
}
