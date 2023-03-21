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
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        gap:0.5rem;
        justify-content:space-between;
        padding:0.5rem 0 0.5rem 0;
      }
      :host .icons m4music-a-icon:last-child {
        padding-right: 0;
      }
      :host .meta {
        padding:0.5rem 0 0 0;
      }
      :host .meta ul {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      :host > nav > ul .meta ul {
        padding-top: 1rem;
      }
      :host .icons > a-logo {
        margin:0.25rem 1rem 0.25rem 0;
      }
      :host .icons > a-logo:last-of-type {
        margin:0;
      }
      :host(.no-scroll) > nav > ul {
        --header-navigation-padding-no-scroll:min(50px, 15vw) var(--content-spacing) 0 0;
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

      :host .lang {
        display:flex;
        flex-direction:row;
        justify-content:flex-end;
      }

      :host .lang a-link + a-link {
        margin-left: 1rem;
      }

      :host(.no-scroll) > nav {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      :host(.no-scroll) > nav > ul {
        width: 88%;
        padding-right: 0;
      }
     
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {  
        :host .icons {
          gap:0;
        }
      }

      @media only screen and (max-width: 960px) {
        :host(.no-scroll) > nav > ul {
          --header-navigation-padding-no-scroll:min(50px, 15vw) 1.77rem 0 0;
        }
      }
    `
  }
}
