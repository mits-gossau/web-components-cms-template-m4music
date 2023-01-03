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
export default class Tickets extends Shadow() {
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
      flex-direction: row;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: space-between;
      padding-bottom:1rem;
      color:var(--color-black);
    }
    :host > div {
      max-width: calc(50% - 1rem);
      min-width: min(500px, 50% - 1rem);
      word-break: break-word;
      box-sizing: border-box;
      background-color: white;
      display:flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
      padding:0.5rem;
    }
    :host .content-wrapper {
      align-items: flex-start;
      display:flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    :host .type{
      color:var(--color-black);
      font-size:2rem;
      line-height:100%;
      margin:0;
      padding:1rem 1rem  0.5rem 0.5rem;
      text-transform: uppercase;
    }
    :host .price {
      color:var(--color-orange);
      font-size:2rem;
      line-height:100%;
      margin:0;
      padding:0 0 1rem 0.5rem;
    }
    :host ul {
      list-style-type: none;
      margin:0;
      padding:0 0 1rem 0.5rem;
    }
    :host ul > li {
      background-size:1rem;
      background: url('/assets/img/check.svg') no-repeat 0 0.3rem transparent; 
      color:var(--color-black);
      font-size:1rem;
      line-height:125%;
      list-style-type: none;
      padding:0 0 0.25rem 1.5rem;
      vertical-align: middle;
    }
    :host .btn-wrapper {
      display:flex;
      flex-direction: row;
      gap: 0.5rem;
      padding:0;
    }
    :host .btn-wrapper > m4music-a-button {
      flex-grow:1;
      margin:0;
    }
    :host .soldout {
      filter: opacity(0.3);
    }
    :host a {
      color: var(--a-color, var(--color-secondary, var(--color, pink)));
      font-weight: var(--a-font-weight, var(--font-weight, normal));
      text-align: var(--a-text-align, unset);
      text-decoration: var(--a-text-decoration, var(--text-decoration, none));
      text-underline-offset: var(--a-text-underline-offset, unset);
      display: var(--a-display, inline);
      margin: var(--a-margin, var(--content-spacing, unset)) auto;
      text-decoration-color: var(--a-text-decoration-color-ext, red);
    }
    :host a:hover, :host a:active, :host a:focus {
      color: var(--a-color-hover, var(--color-hover-secondary, var(--color-hover, var(--color, green))));
      text-decoration: var(--a-text-decoration-hover, var(--text-decoration-hover, var(--a-text-decoration, var(--text-decoration, none))));
    } 
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host  {
        flex-direction: column;
      }
      :host > div {
        max-width: 100%;
      }
      :host ul > li {
        background-size:1rem;
      }
    }
  `
  }
}
