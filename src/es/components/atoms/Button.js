// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global CustomEvent */
/* global self */

/**
 * Wrapper for a button element
 * Example at: /src/es/components/pages/Home.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Button
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Button extends Shadow() {
  constructor (...args) {
    super(...args)

    if (this.hasShadowRoot) {
      // @ts-ignore
      Array.from(this.childNodes).forEach(node => this.button.appendChild(this.root.appendChild(node)))
    }

    this.clickListener = event => {
      if (this.getAttribute('href')) {
        event.stopPropagation()
        if (this.getAttribute('href')[0] === '#') {
          this.dispatchEvent(new CustomEvent(this.getAttribute('click-anchor') || 'click-anchor', {
            detail: {
              selector: this.getAttribute('href')
            },
            bubbles: true,
            cancelable: true,
            composed: true
          }))
        } else {
          self.open(this.getAttribute('href'), this.getAttribute('target') || '_self')
        }
      }
    }
    // link behavior made accessible
    if (this.hasAttribute('href')) {
      this.setAttribute('data-href', this.getAttribute('href'))
      this.setAttribute('role', 'link')
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    this.addEventListener('click', this.clickListener)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.clickListener)
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
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.root.querySelector('button')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */ `
    :host button {
      background-color: var(--background-color-${this.type}, transparent);
      border: var(--border, none);
      color: var(--color-${this.type}, white);
      cursor: var(--cursor, pointer);
      font-family: var(--font-family, var(--font-family-bold));
      font-size: var(--font-size, 1em);
      font-weight: var(--font-weight, var(--font-weight, normal));
      height: var(--height, 100%);
      margin: var(--margin, 1em);
      padding:var(--padding, 1em);
      width: var(--width, 100%);
    }
    :host button:hover,  button:active, button:focus {
      background-color: var(--background-color-hover, --background-color);
      color: var(--color-hover, --color);
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host button {
        font-size: var(--font-size-mobile, 1em);
        width: var(--width-mobile, 100%);
      }
    }
  `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    // @ts-ignore
    this.html = this.button
  }

  /**
   * Get button element. If not set, create element and return it
   *
   * @return {HTMLButtonElement}
   */
  get button () {
    return this._button || (this._button = document.createElement('button'))
  }

  /**
   * get button type
   */
  get type () {
    return this.getAttribute('type') || 'primary'
  }
}
