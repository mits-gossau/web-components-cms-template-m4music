// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for title element
 * Example at: /src/es/components/pages/Home.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Title
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Title extends Shadow() {
  connectedCallback() {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS() {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML() {
    return !this.root.querySelector(`${this.type}`)
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS() {
    this.css = /* css */ `
    :host :is(h1, h2, h3, h4, h5, h6) {
      --font-family: var(--h-font-family, var(--font-family, inherit));
      --font-weight: var(--h-font-weight, var(--font-weight, normal));
      --line-height: var(--h-line-height, var(--line-height, normal));
      --margin: var(--h-margin, 0);
      --padding: var(--h-padding, 0);
      --text-transform: var(--h-text-transform, none);
    }

    :host h1 {
      color: var(--h1-color, var(--h-color, white));
      font-family:var(--h1-font-family, var(--font-family, inherit));
      font-size:var(--h1-font-size, 6em);
      font-weight: var(--h1-font-weight, var(--font-weight, normal));
      margin: var(--h1-margin, var(--margin, 0));
      padding:var(--h1-padding, var(--padding, 0));
    }
    :host h2 {
      color:var(--h2-color, var(--h-color, white));
      font-size:var(--h2-font-size, 5em);
      font-weight: var(--h2-font-weight, var(--font-weight, normal));
      margin: var(--h2-margin, var(--margin, 0));
      padding:var(--h2-padding, var(--padding, 0));
    }
    :host h3 {
      color:var(--h3-color, var(--h-color, white));
      font-size:var(--h3-font-size, 4em);
      font-weight: var(--h3-font-weight, var(--font-weight, normal));
      margin: var(--h3-margin, var(--margin, 0));
      padding:var(--h3-padding, var(--padding, 0));
    }
    :host h4 {
      color:var(--h4-color, var(--h-color, white));
      font-size:var(--h4-font-size, 3em);
      font-weight: var(--h4-font-weight, var(--font-weight, normal));
      margin: var(--h4-margin, var(--margin, 0));
      padding:var(--h4-padding, var(--padding, 0));
    }
    :host h5 {
      color:var(--h5-color, var(--h-color, white));
      font-size:var(--h5-font-size, 2em);
      font-weight: var(--h5-font-weight, var(--font-weight, normal));
      margin: var(--h5-margin, var(--margin, 0));
      padding:var(--h5-padding, var(--padding, 0));
    }
    :host h6 {
      color:var(--h6-color, var(--h-color, white));
      font-size:var(--h6-font-size, 1em);
      font-weight: var(--h6-font-weight, var(--font-weight, normal));
      margin: var(--h6-margin, var(--margin, 0));
      padding:var(--h6-padding, var(--padding, 0));
    }
  
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {

      :host h1 {
        font-size:var(--h1-font-size-mobile, 6em);
      }
      :host h2 {
        font-size:var(--h2-font-size-mobile, 5em);
      }
      :host h3 {
        font-size:var(--h3-font-size-mobile, 4em);
      }
      :host h4 {
        font-size:var(--h4-font-size-mobile, 3em);
      }
      :host h5 {
        font-size:var(--h5-font-size-mobile, 2em);
      }  
      :host h6 {
        font-size:var(--h6-font-size-mobile, 1em);
      }
    }
  `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML() {
    this.html = `<${this.type}>${this.getAttribute('title') || 'No title attribute set!'}</${this.type}>`
  }

  /**
   * get title type
   */
  get type() {
    return this.getAttribute('type') || 'h1'
  }
}
