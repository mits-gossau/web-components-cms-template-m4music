// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for a event detail element
 * Example at: /src/es/components/pages/EventDetail.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class EventDetail
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class EventDetail extends Shadow() {
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
      position: relative;
      display: inline-block;
    }
    :host a-picture {
      display: block;
    }
    :host > div {
      position: absolute;
      top: 1rem;
      left: 1rem;
      top:1rem;
      background:red;
      color:black;
      margin:0 1rem 2rem 1rem;
    }
    :host h1{
      font-size:max(3vw, 3rem);
      line-height:100%;
      margin:0;
    }
    :host .date{
      font-size:0.75rem;
      line-height:125%;
      margin:0;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
    }
  `
  }
}
