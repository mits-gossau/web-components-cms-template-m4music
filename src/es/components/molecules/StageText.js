// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for a stage-text element
 * Example at: /src/es/components/pages/Highlight-Acts.html
 *
 * @export
 * @class StageText
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class StageText extends Shadow() {

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
    :host a-logo {
      margin-top: 2rem;
    }

    :host .text {
      margin: 2rem 0;
    }

    :host .link {
      margin-top: 1rem;
    }

    :host .heading {
      color: #232323;
      margin-bottom: 1rem;
    }
  `
  }
}
