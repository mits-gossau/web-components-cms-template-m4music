// @ts-check
import BaseNavigation from '../web-components-cms-template/src/es/components/molecules/Navigation.js'

/* global self */

export default class Navigation extends BaseNavigation {
  renderCSS () {
    super.renderCSS()
    this.css = /* css */ `
      :host {
        top:0;
      }
      :host > nav {
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        width:100%;
        height:auto;
        margin:max(2.5rem, 5vw) auto;
      }
      :host .icons {
        align-items:center;
        border-bottom:1px solid black;
        border-top:1px solid black;
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        gap:0.5rem;
        justify-content:space-between;
        padding:0.5rem 0 0.5rem 0;
      }
      :host .meta {
        padding:0.5rem 0 0 0;
        border-top:1px solid black;
      }
      :host .icons > a-logo {
        margin:0.25rem 1rem 0.25rem 0;
      }
      :host .icons > a-logo:last-of-type {
        margin:0;
      }
      :host(.no-scroll) > nav > ul li.meta ul a-link {
        --header-navigation-font-size:min(24px, max(16px, 0.8rem));
      }
      :host .lang {
        display:flex;
        flex-direction:row;
        justify-content:space-evenly;
        align-items:center;
      }
     
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {  
        :host .icons {
          gap:0;
        }
      }
    `
  }
}
