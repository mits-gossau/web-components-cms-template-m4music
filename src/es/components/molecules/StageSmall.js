// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for a stage-small element
 * Example at: /src/es/components/pages/Show.html
 *
 * @export
 * @class StageSmall
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class StageSmall extends Shadow() {
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
      --any-content-spacing: 0;
      --any-content-spacing--mobile: 0;
      --any-margin-top-first-child: 0;
      --any-margin-top-first-child-mobile: 0;
      --any-content-width: 100%;
      --any-content-width-mobile: 100%;
    }

    :host, :host a-picture {
      height: 460px;
      --height: 460px;
      --img-height: 460px;
    }

    :host .stage + div {
      margin-top: 2rem;
    }

    :host .stage__info {
      position: absolute;
      z-index: 1;
      left: 50%;
      transform: translateX(-50%);
      width: 88%;
      top: 0;
      height: 93%;      
      display: flex;
      flex-direction: column;
      justify-content: flex-start;    
    }

    :host .stage__info a-logo {
      height: var(--header-logo-small-height, auto);
      width: var(--header-logo-small-width, auto);
    }

    :host .stage__info a-logo a {
      width: 100%;
    }

    :host .stage__links {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host {
        height: 420px;
      }

      :host .stage__links {
        margin-top: 2.2rem;
      }

      :host .stage__info a-logo {
        height: 90px;
        width: auto;
      }
    }
  `
  }
}
