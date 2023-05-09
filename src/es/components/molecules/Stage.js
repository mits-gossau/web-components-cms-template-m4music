// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for a stage element
 * Example at: /src/es/components/pages/HomeV2.html
 *
 * @export
 * @class Stage
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Stage extends Shadow() {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS () {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */ `
    :host {
      margin: 0;
      width: 100%;
      position: relative;
      max-width: 100vw;
      overflow: hidden;
      height: 1000px;
      --any-margin-top-first-child: 0;
      --any-margin-top-first-child-mobile: 0;
    }
    :host .stage__info {
      position: absolute;
      z-index: 1;
      left: 50%;
      transform: translateX(-50%);
      width: 88%;
      bottom: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    :host .stage__info a-logo {
      height: 200px;
      width: auto;
      margin-top: 1.5rem;
    }
    :host .stage__heading {
      --body-h1-padding: 0;
      font-size: 2.5rem;
      --h1-margin: 0  0 1.5rem;
    }
    :host .stage__links {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host .stage {
        height: 840px;
      }

      :host .stage__links {
        margin-top: 2.2rem;
      }

      :host .stage__info a-logo {
        height: 90px;
        width: auto;
        margin-top: 2rem;
      }
    }
  `
  }
}
