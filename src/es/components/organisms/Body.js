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
  renderCSS () {
    super.renderCSS()
    this.css = /* css */ `
    :host {
      margin-bottom: var(--margin-bottom, 0);
    }
    :host > main > * {
      margin:var(--content-spacing, 0) auto;
      width:var(--content-width, 80%);
    }
    /* :host ul.check */
    :host ul {
      padding:var(--wrapper-ul-padding, 0);
      margin:var(--wrapper-ul-margin, 0);
      list-style-type: none;
    }
    /* :host ul.check > li */
    :host ul > li {
      background: url('/assets/img/check.svg') no-repeat 0 0.3rem transparent; 
      background-size: var(--wrapper-li-background-size);
      list-style-type: none;
      padding:var(--wrapper-li-padding, 0);
      vertical-align: middle;
    }
    :host ul > li > p {
      margin: var(--li-p-margin, 0);
    }

    .text-with-button p {
      margin: var(--text-with-button-p-margin, 0);
    }
    .text-with-button article {
      margin: var(--text-with-button-margin, 25px auto 40px auto);
    }

    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host > main > *[content-width] {
        width:var(--content-width-mobile, 80%);
        margin-bottom: var(--content-spacing-mobile);
      }
      :host ul {
        margin-top: 0;
      }
    }
    `
  }
}
