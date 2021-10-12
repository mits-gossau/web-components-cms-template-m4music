// @ts-check
//import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'
import BaseBody from '../web-components-cms-template/src/es/components/organisms/Body.js'

/* global self */

/**
 * Example at: /src/es/components/pages/Home.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class ContentWrapper
 * @type {CustomElementConstructor}
 * @attribute {
 * {number} [columns=3] example 3 column container
 * }
 * @css {
 * var(--content-wrapper-div-margin-mobile, 0)
 * var(--content-wrapper-div-margin, 0)
 * var(--content-wrapper-margin-bottom-mobile, 0)
 * var(--content-wrapper-margin-bottom, 0)
 * }
 */
export default class ContentWrapper extends BaseBody {

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
      ${this.hasAttribute('no-space') ? `--content-wrapper-margin-bottom: 0` : ''};
      align-items:${this.contentAlign.flexAlignItems};
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      margin-bottom:var(--content-wrapper-margin-bottom, 0);
      width: 100% !important;
    }
    :host ul  {
      margin:var(--ul-margin, 0);
    }
    :host > section > div  {
      flex-basis:${100 / this.columns}%;
      margin:var(--content-wrapper-div-margin, 0);
      text-align:${this.contentAlign.textAlign}
    }
    :host > section > div:last-of-type {
      margin:0;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host > section {
        ${this.hasAttribute('no-space') ? `--content-wrapper-margin-bottom-mobile: 0` : ''};
        align-items:${this.contentAlignMobile.flexAlignItems};
        display:flex;
        flex-direction:column;
        margin-bottom:var(--content-wrapper-margin-bottom-mobile, 0);
      }
      :host > section > div  {
        flex-basis:${100 / this.columns}%;
        margin:var(--content-wrapper-div-margin-mobile, 0);
      }
      :host > section > div *  {
        text-align:${this.contentAlignMobile.textAlign}
      }
      :host > section > div:last-of-type {
        margin:0;
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
   * set flex align item and text align value
   * @param {*} value 
   * @returns 
   */
  setContentAlign(value) {
    return {
      flexAlignItems: value ? 'center' : 'flex-start',
      textAlign: value ? value : 'left'
    }
  }
}
