// @ts-check
import BaseForm from '../web-components-cms-template/src/es/components/molecules/Form.js'

/* global self */

export default class Form extends BaseForm {
  connectedCallback() {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.renderHTML()
  }

  shouldComponentRenderCSS() {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
  * renders the a-text-field html
  *
  * @return {void}
  */
  renderHTML() {
    this.hasRendered = true
    this.loadChildComponents().then(children => {
      const inputArray = Array.from(this.root.querySelectorAll('input'))
      const selectArray = Array.from(this.root.querySelectorAll('select'))
      inputArray.concat(selectArray).filter(i => i.getAttribute('type') !== 'hidden').forEach(input => {
        this.inputFields.push(input)
        const label = this.root.querySelector(`label[for='${input.getAttribute('id')}']`) || this.root.querySelector(`label[for='${input.getAttribute('name')}']`)
        const aInput = new children[0][1](input, label, { mode: 'false', namespace: this.getAttribute('namespace-children') || this.getAttribute('namespace') || '' })
        aInput.setAttribute('type', input.getAttribute('type'))
        if (input.hasAttribute('reverse')) aInput.setAttribute('reverse', input.getAttribute('reverse'))
        input.replaceWith(aInput)
        if (input.hasAttribute('validation-message')) {
          const changeListener = event => {
            if (input.hasAttribute('valid') ? input.getAttribute('valid') === 'true' : input.validity.valid) {
              label.removeAttribute('data-balloon-visible')
              label.removeAttribute('aria-label')
              label.removeAttribute('data-balloon-pos')
            } else {
              label.setAttribute('data-balloon-visible', 'true')
              label.setAttribute('aria-label', input.getAttribute('validation-message'))
              label.setAttribute('data-balloon-pos', input.hasAttribute('reverse') ? 'down' : 'up')
            }
          }
          this.validateFunctions.push(changeListener)
          input.changeListener = changeListener
          input.addEventListener('blur', changeListener)
          input.addEventListener('blur', event => {
            input.addEventListener('change', changeListener)
            input.addEventListener('keyup', changeListener)
          }, { once: true })
        }
      })
      // spam protection
      if (this.getAttribute('type') === 'newsletter') {
        this.emptyInput = document.createElement('input')
        this.emptyInput.type = 'text'
        this.emptyInput.id = 'oceans'
        this.form.appendChild(this.emptyInput)
      }
      Array.from(this.root.querySelectorAll('button')).forEach(button => {
        const aButton = new children[1][1](button, { namespace: this.getAttribute('namespace-children') || this.getAttribute('namespace') || '' })
        button.replaceWith(aButton)
      })
    })
  }

  renderCSS() {
    super.renderCSS()
    this.css = /* css */`
      :host fieldset {
        border: var(--fieldset-border, none);
      }

      :host h4.form-caption {
        font-size: var(--h4-font-size, 1.25rem) !important;
        line-height: var(--h4-line-height, 125%) !important;
      }

      :host .error-message span::before {
        content: url('/assets/img/Error.png');
        margin-right: 5px;
      }

      :host .error-message {
        font-size:var(--field-error-font-size, inherit);
        margin-bottom:var(--field-error-margin-bottom, 0);
        line-height:var(--field-error-line-height, normal);
        color:var(--field-error-color, #FF7373);
        padding:var(--field-padding-error, 0);
        display:var(--field-error-display, flex);
        flex-direction:var(--field-error-flex-direction, row);
        align-items:var(--field-error-align-items, center);
        align-content:var(--field-error-align-content, center);
        visibility:hidden;
      }

      :host .error-message > img {
        padding: var(--field-error-image-padding, 0);
      }

      :host .show-error {
        visibility:visible;
      }

      :host .error-message .field-validation-error{
        visibility:visible;
      }

      :host .description {
        font-size:var(--field-description-font-size, inherit);
        width:var(--field-description-width, auto);
        padding:var(--field-description-padding, 0);
      }

      :host .radio-group{
        display:flex;
        flex-direction:row;
        align-items:flex-start;
        width:var(--radio-group-width, auto);
        justify-content: space-between;
      }

      :host [type=radio] {
        margin:var(--radio-margin, 0);
        align-self:center;
      }

      :host * label {
        padding:var(--field-label-padding, 0);
      }


      :host select {
        box-sizing: content-box;
        padding:var(--form-select-padding, 0);
        border:1px solid var(--form-select-border, white);
        font: inherit;
        line-height: inherit;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        appearance: none;
        background-repeat: no-repeat;
        background-image: linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%);
        background-position: right 15px top 0.6rem, right 10px top 0.6rem;
        background-size: 5px 5px, 5px 5px;
        background-color:var(--form-select-background-color, white);
        color:var(--form-select-color, white);
        font-size:var(--field-input-font-size, inherit);
        width:var(--form-select-width, auto);
        margin:var(--form-select-margin, 0);
        height:var(--field-height-mobile);
        border-radius:var(--field-select-border-radius, 0);
      }

      :host select:focus-visible {
        -webkit-appearance: none;
        -moz-appearance:none;
        -ms-appearance:none;
        appearance:none;
        border:1px solid var(--form-select-border, white);
      }

      :host .register-label{
        padding:var(--field-padding, 0);
        font-size:var(--form-label-font-size, inherit);
      }

      :host  m4music-a-button {
        padding-top:0.4rem;
      }
      
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host h4.form-caption {
          font-size:var(--h4-font-size-mobile, min(1.25rem, 5vw)) !important;
          line-height:var(--h4-line-height-mobile, 125%) !important;
        }
        :host select {
          padding:var(--form-select-padding-mobile, 0);
          font-size:var(--form-select-font-size-mobile, inherit);
          width:var(--form-select-width-mobile, auto);
          margin:var(--form-select-margin-mobile, 0);
          height:var(--form-select-height-mobile, auto);
        }

        :host .description {
          font-size:var(--field-description-font-size-mobile, inherit);
          width:var(--field-description-width-mobile, auto);
        }

        :host .radio-group{
          width:100%;
        }

        :host [type=radio] {
          align-items:center;
          margin:var(--radio-margin-mobile, 0);
        }

        :host * label {
          padding:var(--field-label-padding-mobile, 0);
        }
        
      }
    
    `
  }
}
