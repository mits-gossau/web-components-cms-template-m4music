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
  constructor (button, ...args) {
    super(...args)

    this._button = button

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
      } else {
        this.dispatchEvent(new CustomEvent('form-submit',
          {
            detail: {
              button: event.target
            },
            bubbles: true,
            cancelable: true,
            composed: true
          }))
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
      border: var(--border-${this.type}, var(--border), none);
      color: var(--color-${this.type}, white);
      cursor: var(--cursor, pointer);
      font-family: var(--font-family, var(--font-family-bold));
      font-size: var(--font-size, 1em);
      font-weight: var(--font-weight, var(--font-weight, normal));
      margin: var(--margin, 1em);
      height: var(--height, auto);
      padding:var(${(this.icon && this.type !== 'arrowDown') ? '--icon-padding' : '--padding'}, 1em);
      transition: var(--transition, 0.3s all);
      width: var(--width, 100%);
      border-radius:var(--border-radius, unset);
    }
    :host button:hover,  button:active, button:focus {
      background-color: var(--background-color-hover-${this.type}, --background-color);
      color: var(--color-hover-${this.type}, --color);
    }
    :host > button > svg{
      margin-left: ${this.iconEnd ? 'var(--icon-margin-left, 0)' : '0'};
      margin-right: ${this.iconFront ? 'var(--icon-margin-right, 0)' : '0'};
    }
    ${this.type === 'arrowRight' ? this.arrowRightCSS : ''}
    ${this.type === 'arrowDown' ? this.arrowDownCSS : ''}
    ${this.type === 'arrowLeft' ? this.arrowLeftCSS : ''}
    ${this.type === 'filter' ? this.filterCSS('desktop') : ''}
    :host .icon {
      display:var(--icon-display, flex);
      align-items:var(--icon-align-items, center);
      justify-content:var(--icon-justify-content, center);
    }
    :host > .icon > svg {
      width:var(--icon-width, 100%);
    }
    :host button:disabled:hover {
      background-color: var(--background-color-${this.type}, transparent);
      cursor: default;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host button {
        color: var(--color-${this.type}-mobile, white);
        height: var(--height-mobile, 100%);
        font-size: var(--font-size-mobile, 1em);
        margin: var(--margin-mobile, 1em);
        padding:var(${(this.icon && this.type !== 'arrowDown') ? '--icon-padding-mobile, var(--icon-padding)' : '--padding-mobile, var(--padding)'});
        width: var(--width-mobile, 100%);
      }
      :host button:hover,  button:active, button:focus {
        background-color: var(--background-color-hover-${this.type}, --background-color);
        color: var(--color-hover-${this.type}, --color);
      }
      :host > .icon > svg {
        width:var(--icon-width-mobile, 100%);
      }
      ${this.type === 'filter' ? this.filterCSS('mobile') : ''}
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
    this.disable()
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
    if (type === 'arrowRight') {
      iconImg = document.createElement('div')
      iconImg.innerHTML = `
        <svg viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow">
          <path d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5V10.5ZM43.0607 13.0607C43.6464 12.4749 43.6464 11.5251 43.0607 10.9393L33.5147 1.3934C32.9289 0.807611 31.9792 0.807611 31.3934 1.3934C30.8076 1.97919 30.8076 2.92893 31.3934 3.51472L39.8787 12L31.3934 20.4853C30.8076 21.0711 30.8076 22.0208 31.3934 22.6066C31.9792 23.1924 32.9289 23.1924 33.5147 22.6066L43.0607 13.0607ZM2 13.5H42V10.5H2V13.5Z" fill="#FA4B46"/>
        </svg>
      `
      iconImg = iconImg.children[0]
      button.append(iconImg)
    } else if (type === 'arrowDown') {
      iconImg = document.createElement('div')
      iconImg.innerHTML = `
        <svg viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow">
          <path d="M6.75 1.5C6.75 1.08579 6.41421 0.75 6 0.75C5.58579 0.75 5.25 1.08579 5.25 1.5L6.75 1.5ZM5.46967 18.0303C5.76256 18.3232 6.23744 18.3232 6.53033 18.0303L11.3033 13.2574C11.5962 12.9645 11.5962 12.4896 11.3033 12.1967C11.0104 11.9038 10.5355 11.9038 10.2426 12.1967L6 16.4393L1.75736 12.1967C1.46447 11.9038 0.989592 11.9038 0.696699 12.1967C0.403805 12.4896 0.403805 12.9645 0.696699 13.2574L5.46967 18.0303ZM5.25 1.5L5.25 17.5L6.75 17.5L6.75 1.5L5.25 1.5Z" fill="black"/>
        </svg>
      `
      iconImg = iconImg.children[0]
      button.append(iconImg)
    } else if (type === 'arrowLeft') {
      iconImg = document.createElement('div')
      iconImg.innerHTML = `
        <svg viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow">
          <path d="M0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.93934 10.9393ZM42 13.5C42.8284 13.5 43.5 12.8284 43.5 12C43.5 11.1716 42.8284 10.5 42 10.5V13.5ZM2 13.5H42V10.5H2V13.5Z" fill="#FA4B46"/>
        </svg>
      `
      iconImg = iconImg.children[0]
      button.prepend(iconImg)
    }

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
   * Disable button
   */
  disable () {
    this.button.disabled = !!this.hasAttribute('disable')
  }

  /**
   * get button type
   */
  get type () {
    return this.getAttribute('type') || 'primary'
  }

  /**
   * has icon
   */
  get icon () {
    return this.iconEnd || this.iconFront
  }

  /**
   * Icon at end
   */
  get iconEnd () {
    return this.type === 'arrowRight' || this.type === 'arrowDown'
  }

  /**
   * Icon at front
   */
  get iconFront () {
    return this.type === 'arrowLeft'
  }

  /**
   * CSS Styles if button has arrowRight icon
   */
  get arrowRightCSS () {
    return /* css */ `
    :host button{
      ${this.getAttribute('background-color') === 'white' ? 'color: var(--color-black);' : ''}
    }
    :host button:hover{
      ${this.getAttribute('background-color') === 'white' ? 'color: var(--color-black);' : ''}
    }
    :host > button:hover .arrow{
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

  /**
   * CSS Styles if button has arrowLeft icon
   */
  get arrowLeftCSS () {
    return /* css */ `
    :host button{
      ${this.getAttribute('background-color') === 'white' ? 'color: var(--color-black);' : ''}
      text-transform: uppercase;
    }
    :host button:hover{
      ${this.getAttribute('background-color') === 'white' ? 'color: var(--color-black);' : ''}
    }
    :host > button:hover .arrow{
      animation-name: arrowright;
      animation-duration: 0.5s;
      animation-fill-mode: both;
    }
    :host > button .arrow{
      animation-name: arrowleft;
      animation-duration: 0.5s;
      animation-fill-mode: both;
    }
    :host > button .arrow path {
      fill: white;
    }
    @keyframes arrowright {
      0%{
        transform: translateX(0px);
      }
      100%{
        transform: translateX(-10px);
      }
    }
    @keyframes arrowleft {
      0%{
        transform: translateX(-10px);
      }
      100%{
        transform: translateX(0px);
      }
    }
    `
  }

  /**
   * CSS Styles if button has arrowDown icon
   */
  get arrowDownCSS () {
    return /* css */ `
    :host > button .arrow {
      height: 1rem;
    }
    :host > button:hover .arrow > path{
      fill: var(--color-orange);
    }
    :host > button .arrow > path{
      fill: var(--color-black);
    }
    `
  }

  /**
   * Styling for filter buttons
   * @param {string} breakpoint
   */
  filterCSS (breakpoint) {
    const padding = breakpoint === 'desktop' ? '--padding' : '--padding-mobile'
    const fontSize = breakpoint === 'desktop' ? '--font-size' : '--font-size-mobile'
    const iconSize = breakpoint === 'desktop' ? '12px' : '8px'
    return /* css */ `
    :host > button {
      border-radius:4px;
      background-color:var(--background-color, white);
      color:var(--color, black);
      font-size:var(${fontSize}, inherit);
      margin:0;
      height:auto;
      padding:var(${padding}, 0);
    }
    :host(:not([data-filter-value='show_all'])) > button::after {
      content: url('/assets/img/filter.svg');
      padding-left: 0.2rem;
      display:inline-block;
      height:${iconSize};
      width:${iconSize};
    }
    :host(:not([data-filter-value='show_all']).active) > button::after {
      content: url('/assets/img/filter-active.svg');
      padding-left: 0.2rem;
      display:inline-block;
      height:${iconSize};
      width:${iconSize};
    }
    :host(:not(.active)[data-filter-value='show_all']) > button:hover::after {
      content: url('/assets/img/filter-reset-hover.svg');
    }
    :host(:not(.active)[data-filter-value='show_all']) > button::after {
      content: url('/assets/img/filter-reset.svg');
      padding-left: 0.2rem;
      display:inline-block;
      height:${iconSize};
      width:${iconSize};
    }
    :host > button:hover,
    :host > button:active,
    :host(.active) > button {
      background-color:var(--background-color-hover, white);
      color:var(--color-hover, white);
    }
    ${breakpoint != 'desktop' ? /* css */ `
      :host(:not(.active)) button:hover,
      :host(:not(.active)) > button:hover {
        background-color: var(--background-color, transparent);
        color: var(--color, white);
      }` : ''
    }`
  }
}
