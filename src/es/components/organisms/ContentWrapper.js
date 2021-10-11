// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Example at: /src/es/components/pages/Home.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Wrapper
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class ContentWrapper extends Shadow() {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
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
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.root.querySelector('section')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */ `
    :host > section {
      align-items:flex-start;
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      margin-bottom:var(--margin-bottom, 0);
    }
    :host > section > div {
      flex-basis:${100 / this.columns}%;
      margin:var(--div-margin, 0);
    }
    :host > section > div:last-of-type {
      margin:0 0 0 0;
    }
    :host p {
      margin:0;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host > section {
        display:flex;
        flex-direction:column;
        margin-bottom:var(--margin-bottom-mobile, 0);
      }
      :host > section > div {
        flex-basis:${100 / this.columns}%;
        margin:var(--div-margin-mobile, 0);
      }
      :host > section > div:last-of-type {
        margin:0 0 0 0;
      }
    }
  `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    const section = document.createElement('section')
    Array.from(this.root.children).forEach(node => {
      if (node.tagName !== 'STYLE') section.appendChild(node)
    })
    this.html = section
  }

  /**
   * get number of columns
   *
   */
  get columns () {
    return this.getAttribute('columns') || 1
  }
}
