// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for a display element
 * Example at: /src/es/components/pages/Show-Signle.html
 *
 * @export
 * @class Display
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Display extends Shadow() {
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
    :host .display__heading {
      font-size: 0.75rem;
      margin-bottom: 2rem;
      font-weight: 400;
    }
    
    :host .display__items {
      display: flex;
      flex-direction: row;
    }

    :host .display__item {
      margin: 0 0.5rem 0.5rem 0;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host .display__heading {
        font-size: 1.1rem;
        margin-bottom: 2.5rem;
      }

      :host .display__items {
        flex-direction: column;
        align-items: flex-start;
      }

      :host .display__item {
        margin-bottom: 1.6rem;
      }

      :host .display__item:last-child {
        margin-bottom: 0;
      }
    }
  `
  }
}
