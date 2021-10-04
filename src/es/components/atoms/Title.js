// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for title element
 * Example at: /src/es/components/pages/Home.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Title
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Title extends Shadow() {
  connectedCallback() {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS() {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML() {
    return !this.root.querySelector(`${this.type}`)
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS() {
    this.css = /* css */ `
    :host :is(h1, h2, h3, h4, h5, h6) {
      font-weight: var(--font-weight, normal);
      margin: var(--margin, 1em);
      
    }

    :host h1 {
      font-size:var(--h1-font-size, 3em);
    }

    :host h6 {
      font-size:var(--h6-font-size, 1em);
    }
  
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host { }
    }
  `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML() {
    this.html = `<${this.type}>${this.getAttribute('title') || 'No title attribute set!'}</${this.type}>`
  }

  /**
   * get title type
   */
  get type() {
    return this.getAttribute('type') || 'h1'
  }
}
