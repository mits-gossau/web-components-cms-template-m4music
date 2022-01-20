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
    :host {
      width:100%;
    }
    :host > section {
      ${this.hasAttribute('background-color') ? `--wrapper-background-color: ${this.getAttribute('background-color')};` : ''}
      ${this.hasAttribute('text-color') ? `--wrapper-text-color: ${this.getAttribute('text-color')};` : ''}
      ${this.hasAttribute('no-space') ? '--wrapper-margin-bottom: 0' : ''};
      align-items: ${this.hasAttribute('align-content') ? this.getAlignment(this.getAttribute('align-content')).flex : 'var(--align-items, flex-start)'};
      background-color:var(--wrapper-background-color, transparent);
      display:flex;
      flex-direction:${this.getType(this.getAttribute('type')).directionDesktop};
      flex-wrap:${this.getType(this.getAttribute('type')).wrapDesktop};
      justify-content:${this.getType(this.getAttribute('type')).justifyContentDesktop};
      margin-bottom:var(--wrapper-margin-bottom, 0);
      ${this.hasAttribute('background-color')
      ? `
        width: calc(100% - 2rem) !important;
        padding: 1rem;`
        : 'width: 100% !important;'
      }
      color:${(this.getAttribute('background-color') === 'white')
      ? 'var(--color-black, var(--color, red));'
      : 'var(--wrapper-text-color, var(--color, red));'
    }
    }
    :host > section .lowercase {
      text-transform: none;
    }
    :host > section * p {
      line-height:var(--p-line-height, normal);
    }
    :host > section > div  {
      flex-basis: calc(${100 / this.columns}% - 1rem);
      text-align: ${this.hasAttribute('align-content') ? this.getAlignment(this.getAttribute('align-content')).text : 'var(--text-align, left)'};
      width:var(--wrapper-div-width, 100%);
    }
    :host > section > div:last-of-type {
      margin:var(--wrapper-last-margin, 0);
    }
    :host article {
      width: var(--article-width, 100%);
    }
    :host :is(h1, h2, h4) {
      color:var(--wrapper-text-color, var(--color), red);
      margin: var(--h-title-margin, 0);
    }
    :host :is(h3) {
      color:var(--wrapper-h3-text-color, var(--wrapper-text-color), var(--color), red);
      margin: var(--h-title-margin, 0);
    }
    :host :is(h5, h6) {
      color:var(--wrapper-text-color, var(--color), red);
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
    ${this.getAttribute('background-color') === 'white'
    ? `/* css */ 
      :host m4music-a-button {
        --button-color-arrow:${(this.getAttribute('background-color') === 'white') ? 'var(--color-black, var(--color, red));' : ''};
        --color-hover-arrow:${(this.getAttribute('background-color') === 'white') ? 'var(--color-light-grey, var(--color, red));' : ''};
      }
      :host a {
        --a-color: ${(this.getAttribute('background-color') === 'white') ? 'var(--color-black, var(--color, red));' : ''};
        --a-color-hover: ${(this.getAttribute('background-color') === 'white') ? 'var(--color-black, var(--color, red));' : ''};
      } `
      : ''
    }
    :host .ticket-button-container {
      flex-basis: calc(30% - 0.5rem);
    }
    :host .ticket-button-container .button {
      --button-width: 100%;
      --button-margin: 0 0 0.5rem 0;
      --button-padding: 0.5rem;
      --button-font-size: 22px;
    }
    :host .ticket-button-container .button:not(:first-of-type) {
      width: 48%;
      display: inline-block;
    }
    :host .ticket-button-container .button:last-of-type {
      float: right;
    }
    :host .richtext-with-ticket {
      flex-basis: calc(70% - 0.5rem);
    }
    :host(.rich-text-wrapper) section {
      display: var(--rich-text-section-display, block);
    }
    :host(.rich-text-wrapper) section a {
      line-height: var(--rich-text-a-line-height, 125%);
    }

    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host > section {
        ${this.hasAttribute('no-space') ? '--wrapper-margin-bottom-mobile: 0' : ''};
        align-items: ${this.hasAttribute('align-content-mobile') ? this.getAlignment(this.getAttribute('align-content-mobile')).flex : 'var(--align-items-mobile, var(--align-items, flex-start))'};
        display:flex;
        flex-direction:${this.getType(this.getAttribute('type')).directionMobile};
        flex-wrap:${this.getType(this.getAttribute('type')).wrapMobile};
        margin-bottom:var(--wrapper-margin-bottom-mobile, 0);
      }
      :host > section * p {
        line-height:var(--p-line-height-mobile, normal);
      }
      :host > section > div  {
        flex-basis: calc(${100 / this.columns}% - 1rem);
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
      :host .process-step-count{
        font-size:4.5rem;
      }
      :host .process-step-date{
        font-size:1rem;
      }
      :host .process-step-action{
        font-size:1.5rem;
      }
      :host .ticket-button-container {
        flex-basis: calc(100% - 1rem);
      }
      :host .ticket-button-container .button:not(:first-of-type) {
        width: 48%;
        display: inline-block;
        --button-icon-margin-left: 0;
      }
      :host .ticket-button-container .button:last-of-type {
        float: right;
      }
      :host .richtext-with-ticket {
        flex-basis: calc(100% - 1rem);
        order: -1;
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
   * Get align direction
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

  /**
   * Get wrapper type
   * @param {*} type
   * @returns
   */
  getType (type) {
    const flexWrap = {
      default: { directionDesktop: 'row', wrapDesktop: 'wrap', directionMobile: 'column', wrapMobile: 'wrap', justifyContentDesktop: 'space-between', justifyContentMobile: 'space-between' },
      speaker: { directionDesktop: 'row', wrapDesktop: 'wrap', directionMobile: 'column', wrapMobile: 'nowrap', justifyContentDesktop: 'flex-start', justifyContentMobile: 'space-between' },
      'event-wrapper': { directionDesktop: 'row', wrapDesktop: 'wrap', directionMobile: 'column', wrapMobile: 'nowrap', justifyContentDesktop: 'flex-start', justifyContentMobile: 'space-between' }
    }
    return (type in flexWrap) ? flexWrap[type] : flexWrap.default
  }
}
