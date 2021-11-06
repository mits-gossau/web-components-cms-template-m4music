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
 * @attribute {
 * {string} [type] used to determine what type is set valid values: primary, secondary, arrow, download
 * }
 * @css {
 * var(--background-color-${this.type}, transparent)
 * var(--background-color-hover, --background-color)
 * var(--color-hover, --color)
 * var(--border, none)
 * var(--color-${this.type}, white)
 * var(--cursor, pointer)
 * var(--font-family, var(--font-family-bold))
 * var(--font-size-mobile, 1em)
 * var(--font-size, 1em)
 * var(--font-weight, var(--font-weight, normal))
 * var(--height, 100%)
 * var(--margin, 1em)
 * var(--padding, 1em)
 * var(--width, 100%)
 * var(--width-mobile, 100%)
 * }
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
      margin: var(--margin, 1em);
      padding:var(${this.icon ? '--icon-padding' : '--padding'}, 1em);
      transition: var(--transition, 0.3s all);
      width: var(--width, 100%);
    }
    :host button:hover,  button:active, button:focus {
      background-color: var(--background-color-hover-${this.type}, --background-color);
      color: var(--color-hover-${this.type}, --color);
    }
    :host > button > svg{
      margin-left:var(${this.icon ? '--icon-margin-left' : '0'}, 0);
    }
    ${this.type === 'arrow' ? this.arrowCSS : ''}
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host button {
        height: var(--height-mobile, 100%);
        font-size: var(--font-size-mobile, 1em);
        margin: var(--margin-mobile, 1em);
        width: var(--width-mobile, 100%);
      }
      :host button:hover,  button:active, button:focus {
        background-color: var(--background-color-hover-${this.type}, --background-color);
        color: var(--color-hover-${this.type}, --color);
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
    if (this.icon) this.constructor.addIconToButton(this.button, this.type)
    this.html = this.button
  }

  /**
   * Prepend icon to button
   *
   * @param {HTMLButtonElement} button
   * @param {string} type
   * @return {HTMLElement}
   */
  static addIconToButton (button, type) {
    let iconImg
    if (type === 'arrow') {
      iconImg = document.createElement('div')
      iconImg.innerHTML = `
        <svg width="34" height="18" viewBox="0 0 34 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow">
          <path d="M2 7.5H0.5V10.5H2V7.5ZM34 9L19 0.339746V17.6603L34 9ZM2 10.5H20.5V7.5H2V10.5Z" fill="#FB5F3F"/>
        </svg>
      `
      iconImg = iconImg.children[0]
    } else if (type === 'download') {
      iconImg = document.createElement('div')
      iconImg.innerHTML = `
      <svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
      <title>Button Download</title>
      <desc>Created with Sketch.</desc>
      <g id="Button-Download" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Group-2">
              <circle id="Oval" fill="var(--button-background-color)" cx="30" cy="30" r="30"></circle>
              <g id="Group" transform="translate(19.000000, 14.000000)" stroke="#FB5F3F" stroke-width="3">
                  <line x1="0" y1="30.5" x2="23" y2="30.5" id="Line-3" stroke-linecap="square"></line>
                  <line x1="11.5" y1="22" x2="11.5" y2="-6.10622664e-16" id="Line-3-Copy" stroke-linecap="square"></line>
                  <polyline id="Path-2" points="0 12.5 11.5 24.5 23 12.5"></polyline>
              </g>
          </g>
      </g>
    </svg>
      `
      iconImg = iconImg.children[0]
    }
    button.append(iconImg)
    button.classList.add('icon')
    return button
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

  /**
   * get icon type
   */
  get icon () {
    return this.type === 'arrow' || this.type === 'download'
  }

  /**
   * CSS Styles if button has arrow icon
   */
  get arrowCSS () {
    return `:host > button:hover .arrow{
      animation-name: arrowright;
      animation-duration: 0.5s;
      animation-fill-mode: both;
    }
    :host > button .arrow{
      animation-name: arrowleft;
      animation-duration: 0.5s;
      animation-fill-mode: both;
    }
    @keyframes arrowright {
      0%{
        transform: translateX(0px);
      }
      100%{
        transform: translateX(10px);
      }
    }
    @keyframes arrowleft {
      0%{
        transform: translateX(10px);
      }
      100%{
        transform: translateX(0px);
      }
    }
    `
  }
}
