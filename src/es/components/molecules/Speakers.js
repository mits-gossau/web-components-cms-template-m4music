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
      display:flex;
      position:relative;
    }
    :host .picture {
      display:block;
      position:relative;
      width:100%;
      height:auto;
      border:1px solid #b22222;
      padding:1px;
    } 
    :host .name {
      z-index:999;
      position:absolute;
      left:20%;
      font-size:96px;
      color:#FB5F3F;
      position:absolute;
      display:block;
      width:80%;
      margin-top:-12%;
      max-width:610px;
      font-size:4vw;
      padding:.6em 1em .6em 1.7em;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host {}
    }
  `
  }
}
