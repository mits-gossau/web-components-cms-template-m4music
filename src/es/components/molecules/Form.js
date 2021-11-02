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

      :host h4.form-caption {
        font-size: var(--h4-font-size, 1.25rem) !important;
        line-height: var(--h4-line-height, 125%) !important;
      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host h4.form-caption {
          font-size: var(--h4-font-size-mobile, min(1.25rem, 5vw)) !important;
        line-height: var(--h4-line-height-mobile, 125%) !important;
        }
      }
    
    `
  }
}
