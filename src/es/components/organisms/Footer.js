// @ts-check
import BaseFooter from '../web-components-cms-template/src/es/components/organisms/Footer.js'

/* global self */

/**
 * Footer is sticky
 * Example at: /src/es/components/pages/Home.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Footer
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {
 * NOTE: grid-area: footer;
 * var(--background-color, black)
 * var(--z-index, 100)
 * var(--content-spacing, 0) auto
 * var(--content-width, 80%)
 * var(--align-content, normal)
 * var(--border-top, 0)
 * var(--box-sizing, content-box)
 * var(--color, white)
 * var(--display, flex)
 * var(--flex-direction, row)
 * var(--justify-content, normal)
 * var(--padding, 0)
 * var(--ul-list-style-type, none)
 * var(--ul-margin, 0)
 * var(--ul-padding, 0)
 * var(--li-padding, 0)
 * var(--meta-font-size, 1em)
 * var(--meta-padding, 0)
 * var(--engagement-text-max-width, auto)
 * var(--ul-li-padding, 0)
 * var(--div-padding, 0)
 * var(--a-color-hover, #FFFFFF)
 * var(--a-link-display-mobile)
 * var(--a-link-display)
 * var(--a-link-content-spacing, 0)
 * var(--content-spacing-mobile, 0) auto;
 * var(--content-width-mobile, 80%)
 * var(--flex-direction-mobile, column)
 * var(--ul-margin-mobile, 0.5em 0)
 * var(--engagement-padding-mobile, 0)
 * var(--meta-font-size-mobile, 1em)
 * var(--a-font-size-mobile, 1em)
 * var(--div-padding-mobile, 0)
 * }
 */
export default class Footer extends BaseFooter {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.renderHTML()
  }

  /**
   * renders the o-footer css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
    
      :host {
        background-color: var(--background-color, black);
        grid-area: footer;
        z-index: var(--z-index, 100);
      }

      :host > * {
        margin: var(--content-spacing, 0) auto;
        width: var(--content-width, 80%);
      }
      
      :host > footer {
        align-content: var(--align-content, normal);
        border-top: var(--border-top, 0);
        box-sizing: var(--box-sizing, content-box);
        color: var(--color, white);
        display: var(--display, flex);
        flex-direction: var(--flex-direction, row);
        justify-content: var(--justify-content, normal);
        padding: var(--padding, 0);
      }

      :host > footer ul {
        list-style-type: var(--ul-list-style-type, none);
        margin: var(--ul-margin, 0);
        padding: var(--ul-padding, 0);
      }

      :host > footer li {
        float: left;
        padding:var(--li-padding, 0);
      }

      :host .footer__main, .footer__meta {
        display:flex;
        flex-direction: row;
        justify-content: space-between;
      }

      :host .footer__meta {
        font-size:var(--meta-font-size, 1em);
        padding:var(--meta-padding, 0);
      }

      :host .footer__engagement {
        max-width:var(--engagement-text-max-width, auto);
      }

      :host .footer__nav {
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
      }

      :host .footer__nav ul > li {
        float: initial;
        padding: var(--ul-li-padding, 0);
      }

      :host .footer__nav > div {
        padding: var(--div-padding, 0);
      }

      :host a-link {
        --color-hover: var(--a-color-hover, #FFFFFF);
        --display-mobile: var(--a-link-display-mobile);
        --display: var(--a-link-display);
        --font-size:var(--a-font-size, 1em);
        --font-size-mobile: var(--a-font-size-mobile, 1em);
        --padding: var(--a-link-content-spacing, 0);
      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      
        :host > * {
          margin: var(--content-spacing-mobile, 0) auto; 
          width: var(--content-width-mobile, 80%);
        }
        :host > footer {     
          flex-direction: var(--flex-direction-mobile, column);
        }
        :host > footer ul {
          margin: var(--ul-margin-mobile, 0.5em 0);
        }

        :host .footer__main, .footer__meta {
          flex-direction: column;
        }

        :host .footer__engagement {
          padding: var(--engagement-padding-mobile, 0);
        }

        :host .footer__nav {
          flex-direction: column;
        }

        :host .footer__meta {
          font-size:var(--meta-font-size-mobile, 1em);
        }

        :host a-link {
          --font-size: var(--a-font-size-mobile, 1em);
        }

        :host .footer__nav > div {
          padding: var(--div-padding-mobile, 0);
        }
        
      }
    `
  }
}
