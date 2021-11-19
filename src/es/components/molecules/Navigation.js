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
      :host {
        margin:30px;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {  
        :host {
          margin:30px;
        }
      }
    `
  }
}
