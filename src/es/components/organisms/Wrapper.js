// @ts-check
import BaseBody from './Body.js'

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
 * var(--p-line-height-mobile, normal)
 * var(--p-line-height, normal)
 * var(--wrapper-div-margin-mobile, 0)
 * var(--wrapper-div-margin, 0)
 * var(--wrapper-margin-bottom-mobile, 0)
 * var(--wrapper-margin-bottom, 0)
 * }
 */
export default class Wrapper extends BaseBody {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
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
    return !this.root.querySelector('section')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    super.renderCSS()
    const bodyCss = this.css.replace(/\s>\smain/g, '')
    this.css = ''
    this._css.textContent = bodyCss
    this.css = /* css */ `
    :host > section {
      ${this.hasAttribute('no-space') ? '--wrapper-margin-bottom: 0' : ''};
      align-items: ${this.hasAttribute('align-content') ? this.getAlignment(this.getAttribute('align-content')).flex : 'var(--align-items, flex-start)'};
      background-color:var(--wrapper-background-color, transparent);
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      margin-bottom:var(--wrapper-margin-bottom, 0);
      width: 100% !important;
    }
    :host > section .lowercase {
      text-transform: none;
    }
    :host > section * p {
      line-height:var(--p-line-height, normal);
    }
    :host > section > div  {
      flex-basis:${100 / this.columns}%;
      margin:var(--wrapper-div-margin, 0);
      text-align: ${this.hasAttribute('align-content') ? this.getAlignment(this.getAttribute('align-content')).text : 'var(--text-align, left)'};
    }
    :host > section > div:last-of-type {
      margin:var(--wrapper-last-margin, 0);
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host > section {
        ${this.hasAttribute('no-space') ? '--wrapper-margin-bottom-mobile: 0' : ''};
        align-items: ${this.hasAttribute('align-content-mobile') ? this.getAlignment(this.getAttribute('align-content-mobile')).flex : 'var(--align-items-mobile, var(--align-items, flex-start))'};
        display:flex;
        flex-direction:column;
        margin-bottom:var(--wrapper-margin-bottom-mobile, 0);
      }
      :host > section * p {
        line-height:var(--p-line-height-mobile, normal);
      }
      :host > section > div  {
        flex-basis:${100 / this.columns}%;
        margin:var(--wrapper-div-margin-mobile, 0);
      }
      :host > section > div *  {
        text-align: ${this.hasAttribute('align-content-mobile') ? this.getAlignment(this.getAttribute('align-content-mobile')).text : 'var(--text-align-mobile, var(--text-align, left))'};
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
  renderHTML () {
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
  get columns () {
    return this.getAttribute('columns') || 1
  }

  /**
   *
   * @param {*} alignDirection
   * @returns
   */
  getAlignment (alignDirection) {
    const alignment = {
      right: { flex: 'flex-end', text: 'right' },
      center: { flex: 'center', text: 'center' },
      left: { flex: 'flex-start', text: 'left' }
    }
    return (alignDirection in alignment) ? alignment[alignDirection] : alignment.left
  }
}
