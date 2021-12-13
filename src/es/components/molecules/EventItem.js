// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for a event item element (event or artist)
 * Example at: /src/es/components/pages/Events.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class EventItem
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class EventItem extends Shadow() {
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
      flex-direction:row;
      align-items:flex-start;
      justify-content:flex-start;
      align-content:flex-start;
      margin-bottom:0.9rem;
      background-color:transparent;
    }
    :host p  {
      padding:0;
      margin:0 0 0.25rem 0;
    }
    :host .image-wrapper{
      margin-right:0.45rem;
    }
    :host .content-wrapper{
      display:flex;
      flex-direction:column;
      align-content:flex-start;
      justify-content:flex-start;
      align-items:flex-start;
    }
    :host .date{
      color:var(--date-font-color, #616161);
      font-size:var(--date-font-size, 0.65rem);
      line-height:var(--date-line-height, 125%);   
    }
    :host .name{
      color:var(--name-font-color, #000000); 
      font-size:var(--name-font-size, 0.9rem);
      line-height:var(--name-font-size, 100%);
    }
    :host .description{
      color:var(--description-font-color, #000000); 
      font-size:var(--description-font-size, 0.65rem);
      line-height:var(--description-line-height, 125%);
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host p  {
        margin:0 0 0.1rem 0;
      }
      :host .date{
        font-size:var(--date-font-size-mobile, 1rem);
      }
      :host .name{
        font-size:var(--name-font-size-mobile, 1.5rem);
      }
      :host .description{
        font-size:var(--description-font-size-mobile, 1rem);
      }
    }
  `
  }
}
