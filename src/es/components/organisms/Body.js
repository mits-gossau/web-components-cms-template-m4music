// @ts-check
import BaseBody from '../web-components-cms-template/src/es/components/organisms/Body.js'

/* global self */

/**
 * Defines a body body for content and maps variables to global tags
 * Example at: /src/es/components/pages/Home.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Body
 * @type {CustomElementConstructor}
 * @css {
 *  NOTE: grid-area: body;
 * }
 */
export default class Body extends BaseBody {
  constructor (...args) {
    // @ts-ignore
    super({ mode: self.isBSVC ? 'false' : 'true' }, ...args) // disabling shadow-DOM on BSVC page to allow crowdsignal embed to work
  }

  renderCSS () {
    super.renderCSS()
    this.css = /* css */ `
    :host {
      margin-bottom: var(--margin-bottom, 0);
      background-color:var(--background-color, inherit);
    }
    :host > main {
      margin:var(--main-spacing, 0) auto;
      width:var(--main-width, 100%);
      background-color:var(--main-background-color, inherit);
    }
    :host > main > * {
      margin:var(--content-spacing, 0) auto;
      width:var(--content-width, 80%);
      max-width:var(--content-max-width, 100vw);
    }
    /* :host ul.check */
    :host ul {
      padding:var(--wrapper-ul-padding, 0);
      margin:var(--wrapper-ul-margin, 0);
      list-style-type: none;
    }
    :host > main * a {
      text-decoration-line: var(--a-text-decoration-line-ext, none);
      text-decoration-style: var(--a-text-decoration-style-ext, solid);
      text-decoration-color: var(--a-text-decoration-color-ext, red);
      text-decoration-thickness:var(--a-text-decoration-thickness-ext, 1px);    
    }
    :host > main * a:hover {
      text-decoration-line: var(--a-text-decoration-line-hover-ext, none);
      text-decoration-style: var(--a-text-decoration-style-hover-ext, solid);
      text-decoration-color: var(--a-text-decoration-color-hover-ext, red);
      text-decoration-thickness:var(--a-text-decoration-thickness-hover-ext, 1px);    
    }
    /* :host ul.check > li */
    :host ul > li {
      background: url('/assets/img/check.svg') no-repeat 0 0.3rem transparent; 
      background-size: var(--wrapper-li-background-size);
      list-style-type: none;
      padding:var(--wrapper-li-padding, 0);
      vertical-align: middle;
    }
    :host > main p {
      margin: var(--p-margin, var(--content-spacing, unset));
    }
    :host ul > li > p {
      margin: var(--li-p-margin, 0);
    }

    :host .custom-width {
      width:var(--content-custom-width, var(--content-width-not-web-component), 80%);
    }
    :host .custom-width.white {
      padding: var(--content-custom-width-white-padding, 15px 0 0 0);
    }
    :host .custom-width.white.title {
      padding-top: var(--content-custom-width-white-title-padding-top, 30px);
    }
    :host .event-detail-module-container {
      background-color: var(--color, white);
    }
    :host .event-detail-inner-container {
      padding: var(--detail-wrapper-padding-with-bg-color, 0 4rem);
    }
    :host .lead {
      font-size:1.85rem;
      line-height:initial;
      margin:0 0 3.75rem 0;
      font-family:inherit;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host {
        background-color:var(--background-color-mobile, inherit);
      }
      :host > main {
        margin:var(--main-spacing-mobile, 0) auto;
        width:var(--main-width-mobile, 100%);
        background-color:var(--main-background-color-mobile, inherit);
      }
      :host > main > *[content-width] {
        width:var(--content-width-mobile, 80%);
        margin-bottom: var(--content-spacing-mobile);
      }
      :host .detail-image{
        width:100%;
      }
      :host > main p {
        margin: var(--p-margin-mobile, var(--p-margin, var(--content-spacing-mobile, var(--content-spacing, unset))));
      }
      :host ul {
        margin-top: 0;
      }
      :host .custom-width {
        width:var(--content-custom-width-mobile, var(--content-width-not-web-component-mobile), 100%);
      }
      :host .custom-width.white {
        padding: 15px 0 0 0;
        width:var(--content-custom-width-mobile-white, 100%);
      }
      :host .custom-width.white.title {
        padding-top: var(--content-custom-width-white-title-padding-top-mobile, 15px);
      }
      :host .event-detail-inner-container {
        padding: 0;
      }
      
    }
    `
  }
}
