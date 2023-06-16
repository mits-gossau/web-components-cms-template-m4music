// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for a contact element
 * Example at: /src/es/components/pages/Professional-Single.html
 *
 * @export
 * @class Contact
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Contact extends Shadow() {
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
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    :host .contact__wrap {
      display: flex;
      flex-direction: column;
      width: 50%;
    }

    :host .contact__heading {
      font-size: 1rem;
      margin-bottom: 1rem;
      font-weight: normal;
    }

    :host .contact__top-text {
      font-size: 0.6rem;
      margin-bottom: 0.175rem;
    }

    :host .contact__bottom-text {
      margin-bottom: 1.625rem;
    }

    :host .contact__wrap .contact__wrap:last-child .contact__bottom-text {
      margin-bottom: 0;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host {
        flex-direction: column;
      }

      :host .contact__wrap {
        width: 100%;
      }

      :host .contact__wrap--main + .contact__wrap--main {
        margin-top: 3rem;
      }

      :host .contact__top-text {
        font-size: 0.75rem;
      }
    }
  `
  }
}
