// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for a gallery element
 * Example at: /src/es/components/pages/Gallery.html
 *
 * @export
 * @class Gallery
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Gallery extends Shadow() {
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
      display: flex;
      flex-direction: column;
    }

    :host h1 {
      font-weight: normal;
    }

    :host .gallery__wrap {
      display: flex;
      flex-direction: row;
    }

    :host .gallery__column {
      display: flex;
      flex-direction: column;
      margin-right: 1rem;
    }

    :host .gallery__column m4music-a-picture {
      margin-bottom: 1rem;
      overflow: hidden;
    }

    :host .gallery__column m4music-a-picture:last-child {
      margin-bottom: 0;
    }

    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host .gallery__wrap {
        flex-direction: column;
        margin-right: 0;
      }

      :host .gallery__column m4music-a-picture,
      :host .gallery__column m4music-a-picture:last-child {
        margin-bottom: 0.5rem;
      }
    }
  `
  }
}
