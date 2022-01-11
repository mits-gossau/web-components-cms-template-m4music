// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for an event detail element
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
      display:inline-block;
      margin-bottom:var(--margin-bottom, 1rem);
      position:relative;
    }
    :host a-picture {
      display:inline;
    }
    :host a-picture:before {
      background:rgba(255,255,255,0.5);
      content:"";
      height:100%;
      position:absolute;
      width:100%;
    }
    :host .text-wrapper {
      bottom:var(--text-wrapper-position-bottom, 1rem);
      margin:1rem auto;
      position:absolute;
      width:90%;
      left:0;
      right:0;
      bottom:0;
    }
    :host h1{
      color:var(--h1-color, black);
      font-size:var(--h1-font-size, 3rem);
      line-height:var(--h1-line-height, 100%);
      margin:var(--h1-margin, 0 1rem 1rem 0);
    }
    :host .date{
      color:var(--date-color, black);
      font-size:var(--date-font-size, 0.75rem);
      line-height:var(--date-line-height, 125%);
      margin:var(--date-margin, 0 0 0.5rem 0);
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host h1{
        font-size:var(--h1-font-size, 1.8rem);
      }
      :host .date{
        font-size:var(--date-font-size, 0.95rem);
      }
    }
  `
  }
}
