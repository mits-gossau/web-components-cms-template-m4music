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
    :host ul > li > p {
      margin: var(--li-p-margin, 0);
    }
    :host .embed-container .embed-youtube {
      text-align: left !important;
    }
    :host .embed-container .embed-youtube iframe {
      width: 32vw;
      height: 18vw;
    }
    :host .embed-container .css-answer-group, :host .embed-container .poll__answer-media-public {
      width: 50%;
    }
    :host .embed-container .css-answer-group.pds-answer-group > div {
      width: 100%;
    }
    :host .embed-container .css-answer.pds-answer > span {
      display: flex;
      flex-wrap: wrap;
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
      :host .embed-container .embed-youtube iframe {
        width: 80vw;
        height: 45vw;
      }
      :host .embed-container .css-answer-group, :host .embed-container .poll__answer-media-public {
        width: 100%;
      }
      :host .embed-container .css-answer.pds-answer > span {
        display: inline;
      }
    }
    `
  }
}
