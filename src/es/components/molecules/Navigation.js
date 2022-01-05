// @ts-check
import BaseNavigation from '../web-components-cms-template/src/es/components/molecules/Navigation.js'

/* global self */

export default class Navigation extends BaseNavigation {
  renderCSS () {
    super.renderCSS()
    this.css = /* css */ `
      :host .icons {
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding:0.5rem 0 0.5rem 0;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
      }
      :host .meta {
        padding:0.5rem 0 0 0;
        border-top: 1px solid black;
      }
      :host .icons > a-logo {
        margin:0 1rem 0 0;
      }
      :host .icons > a-logo:last-of-type {
        margin:0;
      }
      :host(.no-scroll) > nav > ul li.meta ul a-link {
        --header-navigation-font-size:min(24px, max(16px, 0.8rem));
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {  
      }
    `
  }
}
