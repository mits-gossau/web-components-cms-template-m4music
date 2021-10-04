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
 *  NOTE: grid-area: footer;
 *  var(--background-color, black)
 * }
 */
export default class Footer extends BaseFooter {
  connectedCallback() {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.renderHTML()
  }

  /**
   * renders the o-footer css
   *
   * @return {void}
   */
  renderCSS() {
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
        border-top: var(--border-top, 0);
        align-content: var(--align-content, normal);
        box-sizing: var(--box-sizing, content-box);
        color: var(--color, white);
        display: var(--display, flex);
        flex-direction: var(--flex-direction, row);
        justify-content: var(--justify-content, normal);
        padding: var(--padding, 0);
      }
      :host > footer ul {
        list-style-type: var(--ul-list-style-type, none);
        padding: var(--ul-padding, 0);
        margin: var(--ul-margin, 0);
      }
      :host > footer li {
        padding:var(--li-padding, 0);
        float: left;
      }

      :host .footer__main, .footer__meta {
        display:flex;
        flex-direction: row;
        justify-content: space-between;
      }

      :host .footer__meta{
        font-size:var(--meta-font-size, 1em);
        line-height:normal;
        padding:var(--meta-padding, 0);
      }

      :host .footer__cp {
        max-width:var(--engagement-text-max-width, auto);
      }
      :host .footer__nav {
        display:flex;
        flex-direction: row;
      }

      :host .footer__nav ul > li {
        float: initial;
        padding: var(--ul-li-padding, 0);
    
      }

      :host .footer__nav > div {
        padding: var(--div-padding, 0);
      }

      :host a-link {
        --padding: var(--a-link-content-spacing, 0);
        --display: var(--a-link-display);
        --display-mobile: var(--a-link-display-mobile);
        --font-size:var(--a-font-size, 1em);
        --color-hover: var(--a-color-hover, #FFFFFF);
      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      
        :host > * {
          width: var(--content-width-mobile, 80%);
          margin: var(--content-spacing-mobile, 0) auto; 
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

        :host .footer__nav {
          flex-direction: column;
        }
        
      }
    `
  }
}
