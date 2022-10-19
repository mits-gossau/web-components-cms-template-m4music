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
export default class Tickets23 extends Shadow() {
  connectedCallback() {
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
      width:100%;

    }
    :host > div  {
      width:100%;
      display:flex;
      align-items:center;
      gap:0.5rem;
      flex-direction: row;
    }
    :host .item {
      flex:1 0 0px;
      margin:var(--h-title-margin, 0);
      min-width:min(40vw, 50%);
    }
    :host .item-center {
      min-width:max(20vw, 30%);
      text-align:right;
    }
    :host .item-buy{
      min-width: 0;
      text-align:right; 
    }
    :host h2 {
      font-size:var(--h2-font-size, min(5vw, 2.52rem));
      line-height:100%;
      margin:0;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
    :host {
      margin-top:var(--component-spacing-mobile);
    }
    :host > div  {
      flex-direction: column;
      margin:0 0 var(--component-spacing-mobile) 0;
    }
    :host .item {
      margin:0 0 var(--component-spacing-mobile, 0) 0;
    }
    :host h2 {
      font-size:var(--h2-font-size-mobile, min(10vw, 2.45rem));
    }

  }`
  }
}
