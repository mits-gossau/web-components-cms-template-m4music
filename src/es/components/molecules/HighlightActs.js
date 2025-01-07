// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for a highlight-acts element
 * Example at: /src/es/components/pages/Highlight-Acts.html
 *
 * @export
 * @class HighlightActs
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class HighlightActs extends Shadow() {
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
    :host .highlights-wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-top: 2rem;
    }

    :host .highlight-link {
      width: 30%;
      text-decoration: none;
      margin: 0 1rem 2.5rem 0;
    }

    :host .highlight-link:hover,
    :host .highlight-link:hover h2 {
      text-decoration: none;
    }

    /* FE Review Change 2024 */
    :host .highlight-link h2{
      font-size: 1.25rem;
      margin-top: 0.7rem;
      color: white;
      text-decoration: none;
    }

    :host .highlight-link p {
      font-size: 0.6rem;
      margin: 0.65rem 0 0.2rem;
      color: white;
    }

    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host .highlights-wrapper {
        flex-direction: column;
        margin-top: 3rem;
      }

      :host .highlight-link {
        width: 100%;
        margin: 0 0 2rem 0;
      }

      :host .highlight-link p {
        font-size: 1rem;
        margin: 0.65rem 0 0.2rem;
      }
    }
  `
  }
}
