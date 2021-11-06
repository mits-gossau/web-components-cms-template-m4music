// @ts-check
import BaseForm from '../web-components-cms-template/src/es/components/molecules/Form.js'

/* global self */

export default class Form extends BaseForm {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.renderHTML()
  }

  shouldComponentRenderCSS () {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
  * renders the a-text-field html
  *
  * @return {void}
  */
  renderHTML () {
    this.hasRendered = true
    this.loadChildComponents().then(children => {
      const inputArray = Array.from(this.root.querySelectorAll('input'))
      const selectArray = Array.from(this.root.querySelectorAll('select'))
      inputArray.concat(selectArray).filter(i => i.getAttribute('type') !== 'hidden').forEach(input => {
        this.inputFields.push(input)
        const label = this.root.querySelector(`label[for='${input.getAttribute('id')}']`) || this.root.querySelector(`label[for='${input.getAttribute('name')}']`)
        const description = this.root.querySelector(`.description[data-for='${input.getAttribute('id')}']`) || this.root.querySelector(`.description[data-for='${input.getAttribute('name')}']`)
        const aInput = new children[0][1](input, label, { mode: 'false', namespace: this.getAttribute('namespace-children') || this.getAttribute('namespace') || '' })
        if (description) aInput.prepend(description)
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

  renderCSS () {
    super.renderCSS()
    this.css = /* css */`
      :host{
        padding:var(--form-padding, 30px);
      }
      :host fieldset{
        border:var(--fieldset-border, none);
        padding:var(--fieldset-padding, 0);
      }
      :host h4.form-caption{
        font-size:var(--h4-font-size, 1.25rem) !important;
        line-height:var(--h4-line-height, 125%) !important;
        margin:var(--form-caption-margin, 0);
        text-transform:var(--form-caption-text-transform, uppercase);
      }
      
      :host .error-message span::before{
        content:url('/assets/img/Error.png');
        margin-right:5px;
      }
      :host .error-message{
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
      :host .description {
        order: 10; /* lazy solution that description is under input-field */
      }
      :host .error-message .field-validation-valid{
        height:var(--field-error-valid-height, 0);
      }
      :host .error-message > img{
        padding:var(--field-error-image-padding, 0);
        width:0.5rem;
      }
      :host .error-message .field-validation-error{
        visibility:visible;
        height:unset;
      }
      :host .description{
        font-size:var(--field-description-font-size, inherit);
        width:var(--field-description-width, auto);
        padding:var(--field-description-padding, 0);
      }
      :host .radio-group{
        display:flex;
        flex-direction:row;
        align-items:flex-start;
        width:var(--field-radio-group-width, auto);
        justify-content:space-between;
        height:var(--field-radio-group-height, auto);
      }
      :host .radio-group label{
        padding:0;
        align-self:center;
      }
      :host [type=radio]{
        align-self:center;
      }
      :host [type=radio] input {
        margin-right: var(--field-radio-input-margin-right, 10px);
      }
      :host :not(input)[type=radio] {
        margin:var(--field-radio-margin, 0);
      }

      :host .form-button-container > * {
        display: inline;
      }

      :host .m4music-button-primary {
        background-color: var(--button-background-color-primary, transparent);
        border: var(--button-border, none);
        border-radius: var(--button-border-radius, 0);
        color: var(--button-color-primary, white);
        cursor: var(--button-cursor, pointer);
        font-family: var(--button-font-family, var(--button-font-family-bold));
        font-size: var(--button-font-size, 1em);
        font-weight: var(--button-font-weight, var(--button-font-weight, normal));
        padding:var(--button-padding, 1em);
        transition: var(--button-transition, 0.3s all);
        width: var(--button-width, 100%);
        height: auto;
        margin: var(--input-button-margin, 1.5em 1em 1em 0);
      }
      :host .m4music-button-primary:hover,
      :host .m4music-button-primary:active,
      :host .m4music-button-primary:focus {
        background-color: var(--button-background-color-hover-primary, --button-background-color);
        color: var(--button-color-hover-primary, --button-color);
      }

      :host .m4music-button-secondary {
        background-color: var(--color-grey, transparent);
        border: var(--button-border, none);
        border-radius: var(--button-border-radius, 0);
        color: var(--color, white);
        cursor: var(--button-cursor, pointer);
        font-family: var(--button-font-family, var(--button-font-family-bold));
        font-size: var(--button-font-size, 1em);
        font-weight: var(--button-font-weight, var(--button-font-weight, normal));
        padding:var(--button-padding, 1em);
        transition: var(--button-transition, 0.3s all);
        width: var(--button-width, 100%);
        height: auto;
        margin: var(--input-button-margin, 1.5em 1em 1em 0);
      }
      :host .m4music-button-secondary:hover,
      :host .m4music-button-secondary:active,
      :host .m4music-button-secondary:focus {
        background-color: var(--color-light-grey, --button-background-color);
        color: var(--color, --button-color);
      }

      :host [type=radio]:focus{
        outline:none;
      }

      :host [type=checkbox] input{
        width: var(--checkbox-width, 20px);
        height: var(--checkbox-height, 20px);
        margin-top: var(--checkbox-margin-top, 30px);
      }


      :host * input{
        box-sizing: border-box;
      }

      :host * label{
        padding:var(--field-label-padding, 0);
      }
      :host select{
        box-sizing:border-box;
        padding:var(--field-select-padding, 0);
        border:1px solid var(--field-select-border, white);
        font:inherit;
        line-height:inherit;
        -webkit-appearance:none;
        -moz-appearance:none;
        -ms-appearance:none;
        appearance:none;
        background-repeat:no-repeat;
        background-image:linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%);
        background-position:right 15px top 0.6rem, right 10px top 0.6rem;
        background-size:5px 5px, 5px 5px;
        background-color:var(--field-select-background-color, white);
        color:var(--field-select-color, white);
        font-size:var(--field-input-font-size, inherit);
        width:var(--field-select-width, auto);
        margin:var(--field-select-margin, 0);
        height:var(--field-input-height);
        border-radius:var(--field-select-border-radius, 0);
      }
      :host select:focus-visible{
        -webkit-appearance:none;
        -moz-appearance:none;
        -ms-appearance:none;
        appearance:none;
        border:1px solid var(--field-select-border, white);
      }
      :host .register-label{
        padding:var(--field-padding, 0);
        font-size:var(--field-label-font-size, inherit);
      }
      :host  m4music-a-button{
        padding-top:var(--form-button-padding-top, 0);
      }
      :host .steps{
        padding:0;
        margin:var(--form-steps-title-margin, 0);
      }
      :host .steps__title{
        font-size:var(--form-steps-font-size, inherit);
        font-weight:var(--form-steps-font-weight, normal);
        padding:0;
        margin:0;
      }
      :host .step__counter{
        color:var(--form-steps-counter-color, white);
        padding:var(--form-steps-counter-padding, 0);
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host h4.form-caption {
          font-size:var(--h4-font-size-mobile, min(1.25rem, 5vw)) !important;
          line-height:var(--h4-line-height-mobile, 125%) !important;
        } 
        :host select {
          padding:var(--field-select-padding-mobile, 0);
          font-size:var(--field-select-font-size-mobile, inherit);
          width:var(--field-select-width-mobile, auto);
          margin:var(--field-select-margin-mobile, 0);
          height:var(--field-select-height-mobile, auto);
          background-position: right 0.7rem top 0.8rem, right 0.5rem top 0.8rem;
          background-size: 0.3rem 0.3rem, 0.3rem 0.3rem;
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
          margin:var(--field-radio-margin-mobile, 0);
        }
        :host [type=checkbox] input{
          width: var(--checkbox-width-mobile, 15px);
          height: var(--checkbox-height-mobile, 15px);
          margin-top: var(--checkbox-margin-top-mobile, 13px);
        }
        :host * label {
          padding:var(--field-label-padding-mobile, 0);
        }
        :host m4music-a-button {
          padding-top:var(--form-button-padding-top-mobile, 0);
        }
      }
    `
  }
}
