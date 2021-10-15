// @ts-check
import BaseBody from '../web-components-cms-template/src/es/components/organisms/Body.js'

/* global self */

/**
 * Example at: /src/es/components/pages/Home.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Wrapper
 * @type {CustomElementConstructor}
 * @attribute {
 * {number} [columns=3] example 3 column container
 * {n.a} [no-space] removes margin-bottom from section element
 * {string} [align-content-mobile="center"] valid values: left, center, right
 * {string} [align-content="center"] valid values: left, center, right
 * }
 * @css {
 * var(--wrapper-div-margin-mobile, 0)
 * var(--wrapper-div-margin, 0)
 * var(--wrapper-margin-bottom-mobile, 0)
 * var(--wrapper-margin-bottom, 0)
 * }
 */
export default class Wrapper extends BaseBody {
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
    return !this.root.querySelector('section')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS() {
    super.renderCSS()
    const bodyCss = this.css.replace(/\s>\smain/g, '')
    this.css = ''
    this._css.textContent = bodyCss
    this.css = /* css */ `
    :host > section {
      ${this.hasAttribute('no-space') ? '--wrapper-margin-bottom: 0' : ''};
      align-items:${this.contentAlign.flexAlignItems};
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      margin-bottom:var(--wrapper-margin-bottom, 0);
      width: 100% !important;
    }
    :host ul  {
      padding:var(--wrapper-ul-padding, 0);
      margin:var(--wrapper-ul-margin, 0);
      list-style-type: none;
    }
    :host ul > li  {
      background: url('../../../img/check.svg') no-repeat 0 0.3rem transparent; 
      background-size: var(--wrapper-li-background-size);
      list-style-type: none;
      padding:var(--wrapper-li-padding, 0);
      vertical-align: middle;
    }
    :host > section > div  {
      flex-basis:${100 / this.columns}%;
      margin:var(--wrapper-div-margin, 0);
      text-align:${this.contentAlign.textAlign}
    }
    :host > section > div:last-of-type {
      margin:var(--wrapper-last-margin, 0);
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host > section {
        ${this.hasAttribute('no-space') ? '--wrapper-margin-bottom-mobile: 0' : ''};
        align-items:${this.contentAlignMobile.flexAlignItems};
        display:flex;
        flex-direction:column;
        margin-bottom:var(--wrapper-margin-bottom-mobile, 0);
      }
      :host > section > div  {
        flex-basis:${100 / this.columns}%;
        margin:var(--wrapper-div-margin-mobile, 0);
      }
      :host > section > div *  {
        text-align:${this.contentAlignMobile.textAlign}
      }
      :host > section > div:last-of-type {
        margin:var(--wrapper-last-margin-mobile, 0);
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
    const section = document.createElement('section')
    Array.from(this.root.children).forEach(node => {
      if (node.tagName !== 'STYLE') section.appendChild(node)
    })
    this.html = section
  }

  /**
   * get number of columns
   *
   */
  get columns() {
    return this.getAttribute('columns') || 1
  }

  /**
   * value for content align on mobile
   */
  get contentAlignMobile() {
    return this.setContentAlign(this.getAttribute('align-content-mobile'))
  }

  /**
   * value for content align
   */
  get contentAlign() {
    return this.setContentAlign(this.getAttribute('align-content'))
  }

  /**
   * set align value for properties:
   * - flexbox 'align-items'
   * - text 'align'
   * @param {string} value Align value, e.g. "center".
   * @returns {Object}
   */
  setContentAlign(value) {
    const align = this.getAlignment(value)
    return {
      flexAlignItems: align[0],
      textAlign: align[1]
    }
  }

  /**
   * 
   * @param {*} alignDirection 
   * @returns 
   */
  getAlignment(alignDirection) {
    const alignment = {
      right: ['flex-end', 'right'],
      center: ['center', 'center'],
      left: ['flex-start', 'left']
    }
    return (alignDirection in alignment) ? alignment[alignDirection] : alignment.left
  }
}
