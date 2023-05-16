// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for a speaker-overview element
 * Example at: /src/es/components/pages/Professional-Overview.html
 *
 * @export
 * @class SpeakerOverview
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class SpeakerOverview extends Shadow() {
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
    :host h1 {
      margin-bottom: 2.5rem;
      font-weight: normal;
    }

    :host .speaker__wrap {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    :host .speaker__box {
      margin: 0 1rem 2rem 0;
      color: #232323;
    }

    :host .speaker__box m4music-a-picture {
      overflow: hidden;
    }

    :host .speaker__box:hover .speaker__name {
      color: #FA4B46;
    }

    :host .speaker__name {
      display: inline-block;
      margin-top: 0.6rem;
      transition: color 0.3s ease-in-out;
    }

    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {

    }
  `
  }
}
