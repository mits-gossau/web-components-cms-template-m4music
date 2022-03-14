// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for partner logos
 * Example at: /src/es/components/pages/Partner.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Partner
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Partner extends Shadow() {
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
      align-items: flex-start;
      display:flex;
      flex-direction:column;
      justify-content:flex-start;
      padding:0.5rem 0.5rem 1rem;
      width:calc(100% - 1rem);
    }
    :host .partner {
      align-items: center;
      display: flex;
      flex-direction: column;
    }
    :host .logo-wrapper {
      align-items: center;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap:1rem;
      justify-content: flex-start;
    }
    :host .partner-text > a-link * a {
      font-size:200px !important;
    }
    :host a-link {
      --font-size:var(--a-font-size, 1em);
      --padding:var(--a-link-content-spacing, 0);
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host .partner {
        padding-bottom:2rem;
      }
      :host .logo-wrapper {
        justify-content: center;
        gap:1rem;
        flex-direction: column;
        width:100%;
      }
    }
  `
  }
}
