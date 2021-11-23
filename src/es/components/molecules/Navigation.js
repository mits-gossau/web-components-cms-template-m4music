// @ts-check
import BaseNavigation from '../web-components-cms-template/src/es/components/molecules/Navigation.js'

/* global self */

export default class Navigation extends BaseNavigation {


  renderCSS() {
    super.renderCSS()
    this.css = /* css */`
      :host > nav > ul {
        background-color:var(--background-color, white);
        flex-wrap:var(--flex-wrap, unset);
      }
      :host > nav > ul > li {
        margin:0 0.5rem 0 0;
      }
      
      :host > nav > ul li > a-link:hover {
        background-color:#434343;
      }
      :host > nav > ul li.open > a-link {
        background-color:#434343;
      }
      :host > nav > ul > li.icon-list{
        display:none;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {  
        :host > nav > ul {
          background-color:var(--background-color-mobile, white);
          width:auto;
        }
        :host > nav > ul > li {
          margin:0 0 3rem 0;
        }
        :host > nav > ul li a-link.open ~ ul {
          background-color:var(--background-color-child-mobile, white);
        }
        :host > nav > ul li.open > a-link {
          background-color:inherit;
        }
        :host > nav > ul li.open  {
          color:white; 
        }
        :host > nav > ul > li  a:hover{
          color:white;
        }
        :host > nav > ul li > a-link:hover {
          background-color:inherit;
        }
        :host > nav > ul > li.icon-list{
          display:inherit;
        }
        :host .icons {
          display:flex;
          /* TODO: Remove! */
          -webkit-filter: invert(100%);
          filter: invert(100%);
          /* ============= */
        }
      }
    `
  }
}