// @ts-check
import BaseBody from './Body.js'

/* global self */

/**
 * Example at: /src/es/components/pages/Home.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class List
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
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
      width:var(--wrapper-div-width, 100%);
    }
    :host > section > div:last-of-type {
      margin:var(--wrapper-last-margin, 0);
    }
    :host article {
      width: var(--article-width, 100%);
    }
    :host :is(h1, h2, h3, h4) {
      margin: var(--h-title-margin, 0);
    }
    :host :is(h5, h6) {
      margin: var(--h56-title-margin, 0);
    }

    :host .heading2 {
      font-size: var(--h2-font-size, min(4rem, 10vw));
      line-height: var(--h2-line-height, normal);
      text-align: var(--h2-text-align, start);
      word-break: var(--h2-word-break, normal);
      text-transform: var(--h2-text-transform, none);
      margin: var(--h2-margin, var(--content-spacing, unset)) auto;
      padding: var(--h2-padding, unset);
    }
    :host .heading3 {
      font-size: var(--h3-font-size, min(3rem, 10vw));
      line-height: var(--h3-line-height, normal);
      text-align: var(--h3-text-align, start);
      word-break: var(--h3-word-break, normal);
      text-transform: none;
      margin: var(--h3-margin, var(--content-spacing, unset)) auto;
      padding: var(--h3-padding, unset);
    }
    :host .heading4 {
      font-size: var(--h4-font-size, min(2rem, 10vw));
      line-height: var(--h4-line-height, normal);
      text-align: var(--h4-text-align, start);
      word-break: var(--h4-word-break, normal);
      text-transform: none;
      margin: var(--h4-margin, var(--content-spacing, unset)) auto;
      padding: var(--h4-padding, unset);
    }
    :host .heading5 {
      font-size: var(--h5-font-size, min(1.5rem, 10vw));
      line-height: var(--h5-line-height, normal);
      text-align: var(--h5-text-align, start);
      word-break: var(--h5-word-break, normal);
      text-transform: none;
      margin: var(--h5-margin, var(--content-spacing, unset)) auto;
      padding: var(--h5-padding, unset);
    }
    :host .heading6 {
      font-size: var(--h6-font-size, min(1.5rem, 10vw));
      line-height: var(--h6-line-height, normal);
      text-align: var(--h6-text-align, start);
      word-break: var(--h6-word-break, normal);
      text-transform: none;
      margin: var(--h6-margin, var(--content-spacing, unset)) auto;
      padding: var(--h6-padding, unset);
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
      :host :is(h1, h2, h3, h4) {
        margin:var(--h-title-margin, 0)
      }
      :host :is(h5, h6) {
        margin: var(--h56-title-margin, 0);
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

  
}