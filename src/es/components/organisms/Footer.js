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
 * var(--a-color-hover, #FFFFFF)
 * var(--a-font-size-mobile, 1em)
 * var(--a-link-content-spacing, 0)
 * var(--a-link-display-mobile)
 * var(--a-link-display)
 * var(--align-content, normal)
 * var(--background-color, black)
 * var(--border-top, 0)
 * var(--box-sizing, content-box)
 * var(--color, white)
 * var(--content-spacing-mobile, 0) auto;
 * var(--content-spacing, 0) auto
 * var(--content-width-mobile, 80%)
 * var(--content-width, 80%)
 * var(--display, flex)
 * var(--div-padding-mobile, 0)
 * var(--div-padding, 0)
 * var(--engagement-padding-mobile, 0)
 * var(--engagement-text-max-width, auto)
 * var(--flex-direction-mobile, column)
 * var(--flex-direction, row)
 * var(--icons-div-padding-mobile, 1em)
 * var(--icons-div-padding, 1em)
 * var(--icons-img-height, 1em)
 * var(--icons-img-width, 1em)
 * var(--justify-content, normal)
 * var(--li-padding, 0)
 * var(--meta-font-size-mobile, 1em)
 * var(--meta-font-size, 1em)
 * var(--meta-padding, 0)
 * var(--padding, 0)
 * var(--ul-li-padding, 0)
 * var(--ul-list-style-type, none)
 * var(--ul-margin-mobile, 0.5em 0)
 * var(--ul-margin, 0)
 * var(--ul-padding, 0)
 * var(--z-index, 100)
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
        background-color:var(--background-color, black);
        grid-area:footer;
        z-index:var(--z-index, 100);
      }
      :host > * {
        margin:var(--content-spacing, 0) auto;
        width:var(--content-width, 80%);
      }
      :host > footer {
        align-content:var(--align-content, normal);
        border-top:var(--border-top, 0);
        box-sizing:var(--box-sizing, content-box);
        color:var(--color, white);
        display:var(--display, flex);
        flex-direction:var(--flex-direction, row);
        justify-content:var(--justify-content, normal);
        padding:var(--padding, 0);
      }
      :host > footer ul {
        list-style-type:var(--ul-list-style-type, none);
        margin:var(--ul-margin, 0);
        padding:var(--ul-padding, 0);
      }
      :host > footer li {
        float:left;
        padding:var(--li-padding, 0);
      }
      :host .footer__main, .footer__meta {
        display:flex;
        flex-direction:row;
        justify-content:space-between;
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
        flex-direction:row;
        flex-wrap:wrap;
      }
      :host .footer__nav ul > li {
        float:initial;
        padding:var(--ul-li-padding, 0);
      }
      :host .footer__nav > div {
        padding:var(--div-padding, 0);
      }
      :host .footer__nav > div > h6 {
        font-size:var(--title-h6-font-size, inherit);
        padding:var(--title-h6-padding, 0);
        font-weight:var(--title-h6-font-weight, normal);
        margin:var(--title-h6-margin, 0);
      }
      :host .icons {
        display:flex;
        flex-direction:row;
        justify-content:space-between;
      }
      :host a-link {
        --color-hover:var(--a-color-hover, #FFFFFF);
        --display-mobile:var(--a-link-display-mobile);
        --display:var(--a-link-display);
        --font-size:var(--a-font-size, 1em);
        --padding:var(--a-link-content-spacing, 0);
      }
      :host .active{
        --color:var(--color-orange);
        --color-hover:var(--color, #FFFFFF);
        --text-decoration-hover: none;
      }

      :host .hide-desktop{
        display:none;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {  
        :host > * {
          margin:var(--content-spacing-mobile, 0) auto; 
          width:var(--content-width-mobile, 80%);
        }
        :host > footer {     
          flex-direction:var(--flex-direction-mobile, column);
        }
        :host > footer ul {
          margin:var(--ul-margin-mobile, 0.5em 0);
        }
        :host .footer__main, .footer__meta {
          flex-direction:column;
        }
        :host .footer__engagement {
          padding:var(--engagement-padding-mobile, 0);
        }
        :host .footer__nav {
          align-items:center;
          text-align: center;
          flex-direction:column;
        }
        :host .footer__meta {
          align-items:center;
          font-size:var(--meta-font-size-mobile, 1em);
        }
        :host .metalinks > ul{
          display:flex;
          flex-direction:column;
          align-items:center;
        }
        :host .metalinks > ul > li{
          padding: var(--footer-ul-li-padding,var(--ul-li-padding, 0));
        }
        :host .metalinks > ul > li:first-child{
          padding: var(--footer-title-h6-padding-mobile,var(--title-h6-padding-mobile, 0));
        }
        :host .languages{
          padding-top: 0.7rem;
        }
        :host a-link {
          --text-align:center;
          --font-size:var(--a-font-size-mobile, 1em);
        }
        :host .footer__nav > div {
          padding:var(--div-padding-mobile, 0);
        }
        :host .footer__nav > div > h6 {
          font-size:var(--title-h6-font-size-mobile, inherit);
          padding:var(--title-h6-padding-mobile, 0);
          font-weight:var(--title-h6-font-weight-mobile, normal);
          margin:var(--title-h6-margin-mobile, 0);
        }
        :host .icons {
          justify-content:center;
          align-items:center;
        }
        :host .icons > a-logo{
          margin: 0px 0.3rem;
        }
        :host .hide-mobile {
          display: none;
        }
        :host .hide-desktop {
          display: block;
        }
      }
    `
  }
}
