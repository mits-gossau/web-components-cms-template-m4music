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
    :host .detail-image{
      width:100%;
    }

    :host .embed-container .youtube-player {
      width: 50vw;
      height: 30vw;
    }
    :host .embed-container .css-answer-group.pds-answer-group {
      margin: 20px 0 40px 0;
    }
    :host .embed-container .css-answer-row.pds-answer-row {
      margin-top: 15px;
    }
    :host .embed-container .css-radiobutton.pds-radiobutton {
      transform: translateY(-5px);
      margin-right: 10px;
    }
    :host .embed-container .css-question-top.pds-question-top {
      font-size: var(--h2-font-size);
    }
    :host .embed-container .css-votebutton-outer.pds-votebutton-outer a {
      font-size: var(--button-font-size-mobile);
      padding: 0.5rem 0.75rem;
      background-color: var(--color-orange);
      color: white;
      margin-bottom: 15px;
      cursor: pointer;
      display: inline-block;
      text-decoration: none;
      border-radius: 4px;
      transition: 0.3s all;
    }
    :host .embed-container .css-votebutton-outer.pds-votebutton-outer a:hover,
    :host .embed-container .css-votebutton-outer.pds-votebutton-outer a:focus,
    :host .embed-container .css-votebutton-outer.pds-votebutton-outer a:active { 
      background-color: #E53C1A;
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
      :host ul {
        margin-top: 0;
      }

      :host .embed-container .youtube-player {
        width: 80vw;
        height: 50vw;
        margin: 0 auto;
      }
      :host .embed-container .css-radiobutton.pds-radiobutton {
        transform: translateY(-2px);
        margin-right: 5px;
      }
    }
    `
  }
}
