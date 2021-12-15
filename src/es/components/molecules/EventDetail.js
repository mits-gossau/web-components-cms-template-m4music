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
      margin-bottom:1rem;
    }
    :host a-picture {
      display: block;
    }
    :host .text {
      position: absolute;
      width: 100%;
      margin: auto;
      bottom: 1rem;
    }
    :host h1{
      color:black;
      font-size:3rem;
      line-height:100%;
      margin:0 1rem 1rem 1rem;
    }
    :host .date{
      color:black;
      font-size:0.75rem;
      line-height:125%;
      margin:0 0 0 1rem;
    }
    :host > div > m4music-a-button {
      margin:0 0 1rem 1rem;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host h1{
        font-size:1.8rem;
      }
      :host .date{
        font-size:0.95rem;
      }
     

      :host > div > m4music-a-button > button  {
        padding:40px !important;
        margin:40px !important;
        heigth:140px !important;

        font-size:300px;
      }
      
    }
  `
  }
}
