// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for an event teaser
 * Example at: /src/es/components/pages/Home.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class EventTeaser
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class EventTeaser extends Shadow() {
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
      display:flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: row;
      width:100%;
    }
    :host .wrapper {
      margin:0 0.5rem 0 0;
      position:relative;
      width:100%;
    }
    :host .wrapper:last-of-type {
      margin:0;
    }
    :host .text {
      top:50%;
      left:50%;
      transform:translate(-50%, -50%);
      position:absolute;
      color:#FB5F3F;
      text-align:center;
      box-sizing:border-box;
      font-size:3.5vw;
      line-height:100%;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host{
        flex-direction: column;
      }
      :host .wrapper {
        margin:0 0 0.5rem 0;
      }
      :host .text {
        font-size:max(3rem, 15vw);
      }
    }
  `
  }
}
