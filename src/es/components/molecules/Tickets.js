// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for ticket selling teaser element
 * Example at: /src/es/components/pages/Tickets.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Tickets
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Tickets extends Shadow() {
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
      background-color: #FA4B46;
    }

    :host .title {
      margin-bottom: 1rem;
    }

    :host h2 {
      font-size: 2rem;
      color: white;
      font-weight: normal;
    }

    :host .text {
      margin-bottom: 2.75rem;
    }

    :host .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.6rem;
    }

    :host .buy {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 700px;
    }

    :host h4 {
      --h4-font-size: 1.3rem;
      --h4-margin: 0;
      font-weight: 400;
    }

    :host .row span {
      font-size: 1.3rem;
      margin-right: 2.625rem;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host .text {
        margin-bottom: 3rem;
      }

      :host .row {
        flex-direction: column;
        align-items: flex-start;
      }

      :host .row + .row {
        margin-top: 3.5rem;
      }

      :host .buy {
        flex-direction: column;
        align-items: flex-start;
        width: auto;
      }

      :host h4 {
        --h4-font-size-mobile: 2rem;
      }

      :host .row span {
        font-size: 2rem;
        margin-right: 0;
        margin-bottom: 0.85rem;
      }
    }
  `
  }
}
