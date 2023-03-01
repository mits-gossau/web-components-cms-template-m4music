// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for a key speaker element
 * Example at: /src/es/components/pages/Quote.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Speakers
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Speakers extends Shadow() {
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
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      max-width: 9.2rem;
      margin-right: 0.5rem;
    }
    :host .m-speakers__name {
      margin: 1rem 0 1rem;
      font-size: 1rem;
    }
    
    :host .m-speakers__function,
    :host .m-speakers__text {
      font-size: 0.6rem;
    }
    @media only screen and (max-width: 960px) {
      :host {
        width: 100%;
        max-width: 100%;
      }
    
      :host .o-wrapper__teasers {
        flex-direction: column;
      }
    
      :host .m-speakers__name {
        margin: 1rem 0 1rem;
        font-size: 1.5rem;
      }
    
      :host .m-speakers__function,
      :host .m-speakers__text {
        font-size: 1rem;
      }
    
      :host .m-speakers__text {
        margin: 0 0 1rem 0;
      }
    }
  `
  }
}
