// @ts-check
import BaseNavigation from '../web-components-cms-template/src/es/components/molecules/Navigation.js'

/* global self */

export default class Navigation extends BaseNavigation {
  constructor(...args) {
    super(...args)
  }


  connectedCallback() {
    super.connectedCallback()
    this.addEventListener("click", function (e) {
      console.log(e);
      console.log(this.root.querySelector('li.open'))
      console.log(this.root.querySelector('li.open > a-link').getBoundingClientRect())
    })
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.root.querySelectorAll('a-link').forEach(link => link.removeEventListener('click', this.clickListener))
  }

  renderCSS() {
    console.log(this)
    super.renderCSS()
    this.css = /* css */`
      :host > nav > ul {
        background-color:var(--background-color, white);
      }
      :host .icons {
        display:flex;
        /* TODO: Remove! */
        -webkit-filter: invert(100%);
        filter: invert(100%);
        /* ============= */
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {  
        :host > nav > ul {
          background-color:var(--background-color-mobile, white);
          width:auto;
        }
        :host > nav > ul li a-link.open ~ ul {
          background-color:var(--background-color-child-mobile, white);
        }
        :host a-link.open {
          border-bottom:1px solid #000000;
        }
      }
    `
  }
}
