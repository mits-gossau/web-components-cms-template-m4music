// @ts-check
import BaseNavigation from '../web-components-cms-template/src/es/components/molecules/Navigation.js'

/* global self */

export default class Navigation extends BaseNavigation {
  connectedCallback() {
    super.connectedCallback()
    this.addEventListener("click", function (e) {
      console.log(e);
    })
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.root.querySelectorAll('a-link').forEach(link => link.removeEventListener('click', this.clickListener))
  }

  renderCSS() {
    console.log(this)
    super.renderCSS()
    this.css = /* css */`
      :host .icons {
        display:flex;
        /* TODO: Remove! */
        -webkit-filter: invert(100%);
        filter: invert(100%);
        /* ============= */
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {  
        :host .open {
          border-bottom:1px solid red;
          margin:0 10% 0 10%;
        }
      }
    `
  }
}
