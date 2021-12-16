// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for a quote element
 * Example at: /src/es/components/pages/Quote.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Quote
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Quote extends Shadow() {
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
    :host  {
      background:var(--background-color, white);
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:flex-start;
      padding:var(--padding, 0);
    }
    :host > div {
      text-align:center;
    }
    :host > div > p {
      padding:0;
      margin:0.4rem 0 0 0;
    }
    :host .quote {
      color:var(--text-color, black);
      font-size:var(--text-font-size, initial);
      line-height:var(--text-line-height, 100%);
    }
    :host .quote-person {
      color:var(--person-color, black);
      line-height:var(--person-line-height, 100%);
      font-size:var(--person-font-size, initial);
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host .quote {
        font-size:var(--text-font-size-mobile, initial);
      }
      :host .quote-person {
        font-size:var(--person-font-size-mobile, initial);
      }
    }
  `
  }
}
