import BaseBody from '../organisms/Body.js'

export default class Highlightbox extends BaseBody {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
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
        background: var(--background);
        padding: var(--padding);
        display: var(--display);
        flex-direction: var(--flex-direction);
        justify-content: var(--justify-content);
        margin-bottom: var(--margin-botton);
      }
      :host > h3 {
        color: var(--h3-color);
        font-size: var(--h3-font-size);
        font-family: var(--h3-font-family);
        font-weight: var(--h3-font-weight);
        line-height: var(--h3-line-height);
        word-break: var(--h3-word-break);
        text-transform: var(--h3-text-transform);
        margin: var(--h3-margin) auto;
        padding: var(--h3-padding);
      }
      :host > * {
        text-align: var(--text-align);
      }
      @media only screen and (max-width: 800px) {
        :host {
          padding: var(--mobile-padding);
        }
        :host > h3 {
          margin-top: var(--mobile-padding);
        }
      }
    `
  }
}
