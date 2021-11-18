// @ts-check
import BaseNavigation from '../web-components-cms-template/src/es/components/molecules/Navigation.js'

/* global self */

export default class Navigation extends BaseNavigation {
  // constructor (...args) {
  //   super(...args)
  // }

  // connectedCallback () {
  //   super.connectedCallback()
  //   this.addEventListener('click', function (e) {
  //     console.log(e)
  //     console.log(this.root.querySelector('li.open'))
  //     console.log(this.root.querySelector('li.open > a-link').getBoundingClientRect())
  //   })
  // }

  // disconnectedCallback () {
  //   super.disconnectedCallback()
  //   this.root.querySelectorAll('a-link').forEach(link => link.removeEventListener('click', this.clickListener))
  // }

  renderCSS () {
    super.renderCSS()
    this.css = /* css */`
      :host > nav > ul {
        background-color:var(--background-color, white);
        flex-wrap:var(--flex-wrap, unset);
      }
      :host > nav > ul > li {
        margin:0 0.5rem 0 0;
      }
      :host .icons {
        visibility:hidden;
      }
      
      :host > nav > ul li > a-link:hover {
        background-color:#434343;
      }

      :host > nav > ul li.open > a-link {
        background-color:#434343;
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

        :host .open  {
          color:white;
          font-size:30px;
          
        }
        :host > nav > ul li > a-link:hover {
          background-color:inherit;
        }

        :host .icons {
          visibility:visible;
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
