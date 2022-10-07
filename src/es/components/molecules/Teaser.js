// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

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
      background-color:red;
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
      width:100%;
      height:100%;
      position: relative;
    }

   :host .box h3 {
      position: absolute;
      top: 0;
      left: 0;
      background-color:yellow;
      width:100%;
      height:100%;
      z-index:3;
      margin:0;
    }

    :host .box h3:hover {
      background:orange;
    }
    
     @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host { }
    }
    `
  }
}
