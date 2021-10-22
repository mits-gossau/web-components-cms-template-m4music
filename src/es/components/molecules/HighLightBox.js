import BaseBody from '../organisms/Body.js'

export default class Highlightbox extends BaseBody {
  constructor (...args) {
    super(...args)

  }

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
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        background: #434343;
        padding: 144px 128px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 96px;
      }
      :host > h3 {
        color: var(--h3-color);
        font-size: var(--h3-font-size);
        font-family: var(--h3-font-family);
        font-weight: var(--h3-font-weight);
        line-height: var(--h3-line-height);
        text-align: var(--h3-text-align);
        word-break: var(--h3-word-break);
        text-transform: var(--h3-text-transform);
        margin: var(--h3-margin) auto;
        padding: var(--h3-padding);
      }
      :host > * {
        text-align: center;
      }
    `
  }

}
