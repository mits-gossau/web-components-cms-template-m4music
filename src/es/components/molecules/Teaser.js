// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'
/* global self */

export default class Teaser extends Shadow() {
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
    this.css = /* css */`
    :host {
      margin:var(--component-spacing) 0 0 0;
      width:100%;
      height:100%;
    }
    :host .wrapper {
      display:flex;
      gap: 1rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    }
    :host .box {
      margin:0 0 1rem 0;
      position: relative;
    }
    :host .box-title {
      position: absolute;
      z-index:3;
      height:100%;
      width:100%;
    }
    :host .box h3 {
      margin:1rem;
    }
    :host .box-title:hover {
      background:var(--color-orange, white);
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
     :host .wrapper {
      flex-direction:column;
      gap:0;
     }
    }
    `
  }
}
