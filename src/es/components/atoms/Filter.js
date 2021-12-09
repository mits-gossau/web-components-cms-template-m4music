// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for a filter element
 * Example at: /src/es/components/pages/Events.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Filter
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Filter extends Shadow() {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
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
    this.css = /* css */ `
    :host {
      align-content:center;
      align-items:center;
      display:flex;
      flex-direction:row;
      flex-wrap:wrap;
      justify-content:flex-start;
      margin-bottom:0.9rem;
    }
    :host > m4music-a-button {
      font-size:unset;
      padding:0 0.2rem 0.2rem 0;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host > m4music-a-button {
        padding:0 0.2rem 0.2rem 0;
      }
    }
  `
  }
}
