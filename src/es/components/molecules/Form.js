import BaseForm from '../web-components-cms-template/src/es/components/molecules/Form.js'

export default class Form extends BaseForm {
  constructor (...args) {
    super(...args)
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.renderHTML()
  }

  shouldComponentRenderCSS () {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  renderCSS () {
    this.css = /* css */`
      :host fieldset {
        border: var(--fieldset-border, none);
      }
    
    `
  }
}
