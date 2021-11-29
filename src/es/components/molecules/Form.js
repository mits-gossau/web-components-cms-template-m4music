// @ts-check
import BaseForm from '../web-components-cms-template/src/es/components/molecules/Form.js'

/* global self */
/* global Input */
/* global Button */
/* global customElements */

export default class Form extends BaseForm {
  constructor (...args) {
    super(...args)

    this.submitM4MusicEventListener = event => {
      event.preventDefault()

      if (this.getAttribute('type') === 'newsletter') {
        this.loadDependency().then(grecaptcha => {
          grecaptcha.ready(() => {
            grecaptcha.execute(this.getAttribute('site-key'), { action: 'newsletter' }).then(token => {
              fetch('/umbraco/api/M4MusicNewsletterApi/VerifyRecaptcha', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recaptchaToken: token })
              })
                .then(response => {
                  if (response.ok) return response.json()
                })
                .then(response => {
                  if (response) { // passed captcha
                    if (!this.submitEventListener(event)) {
                      // TODO if wanted include validation here
                      return
                    }

                    this.form.style.display = 'none'
                    this.afterSubmit.style.display = 'block'
                  } else console.error('Failed captcha')
                })
                .catch(error => console.error('Something went wrong while verifying captcha: ', error))
            })
          })
        })
      }
    }

    this.previousButtonClickedEventListener = () => {
      this.form.submit()
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    this.loadDependency()
    this.addEventListener('form-submit', this.submitM4MusicEventListener)
    if (this.previousButton) {
      this.previousButton.addEventListener('click', this.previousButtonClickedEventListener)
    }
  }

  disconnectedCallback () {
    this.removeEventListener('form-submit', this.submitM4MusicEventListener)
    if (this.previousButton) {
      this.previousButton.removeEventListener('click', this.previousButtonClickedEventListener)
    }
  }

  renderCSS () {
    super.renderCSS(false)
    this.css = /* css */`
      :host{
        padding:var(--form-padding, 30px);
      }
      :host form {
        justify-content: var(--justify-content, center);
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
      :host .description a {
        color: var(--register-field-color, white);
        text-decoration: var(--description-link-text-decoration, underline);
      }
      :host .description.copyrightText {
        width: var(--copyright-desc-width, 100%);
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
        font-weight:var(--field-label-font-weight, normal);
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
      :host .simple-form{
        flex-direction:var(--simple-form-flex-direction, row);
        align-items:var(--simple-form-align-items, center);
        justify-content:var(--simple-form-justify-content, center);
      }
      :host #afterSubmit {
        display: none;
      }
      :host #afterSubmit p {
        font-size: 27px;
      }
      :host .hidden {
        display: none;
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
          height:var(--field-radio-group-height-mobile, auto);
          flex-wrap:var(--field-radio-flex-wrap-mobile, nowrap);
          justify-content:var(--field-radio-justify-content, normal);
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
        :host #afterSubmit p {
          font-size: var(--font-size-mobile, 10px);
        }
      }
    `
  }

  /**
  * renders the a-text-field html
  *
  * @return {void}
  */
  renderHTML () {
    this.hasRendered = true
    this.loadChildComponents().then(children => {
      Array.from(this.root.querySelectorAll('input[type=submit]')).forEach(input => {
        const button = document.createElement('button')
        button.textContent = input.getAttribute('value')
        button.setAttribute('name', input.getAttribute('name'))
        const aButton = new children[1][1](button, { namespace: 'button-', namespaceFallback: this.hasAttribute('namespace-fallback-children') || this.hasAttribute('namespace-fallback') })
        aButton.setAttribute('name', input.getAttribute('name'))
        input.replaceWith(aButton)
      })
      this.inputAll
        .filter(i => i.getAttribute('type') !== 'hidden').forEach(input => {
          this.inputFields.push(input)
          const label = this.root.querySelector(`label[for='${input.getAttribute('id')}']`) || this.root.querySelector(`label[for='${input.getAttribute('name')}']`)
          const description = this.getDescription(input)
          const aInput = new children[0][1](input, label, description, { mode: 'false', namespace: this.getAttribute('namespace-children') || this.getAttribute('namespace') || '', namespaceFallback: this.hasAttribute('namespace-fallback-children') || this.hasAttribute('namespace-fallback') })
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
      // TODO: Textarea support => https://github.com/roli81/web-components-cms-template-base/blob/main/src/es/components/molecules/ContactForm.js
      Array.from(this.root.querySelectorAll('button')).forEach(button => {
        const aButton = new children[1][1](button, { namespace: this.getAttribute('namespace-button') || this.getAttribute('namespace-children') || this.getAttribute('namespace') || '', namespaceFallback: this.hasAttribute('namespace-fallback-children') || this.hasAttribute('namespace-fallback') })
        button.replaceWith(aButton)
      })
    })
  }

  /**
   * fetch children when first needed
   *
   * @returns {Promise<[string, CustomElementConstructor][]>}
   */
  loadChildComponents () {
    if (this.childComponentsPromise) return this.childComponentsPromise
    let inputPromise
    try {
      inputPromise = Promise.resolve({ default: Input })
    } catch (error) {
      inputPromise = import('../web-components-cms-template/src/es/components/atoms/Input.js')
    }
    let buttonPromise
    try {
      buttonPromise = Promise.resolve({ default: Button })
    } catch (error) {
      buttonPromise = import('../atoms/Button.js')
    }
    return (this.childComponentsPromise = Promise.all([
      inputPromise.then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['a-input', module.default]
      ),
      buttonPromise.then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['m4music-a-button', module.default]
      )
    ]).then(elements => {
      elements.forEach(element => {
        // don't define already existing customElements
        // @ts-ignore
        if (!customElements.get(element[0])) customElements.define(...element)
      })
      return elements
    }))
  }

  /**
   * fetch dependency
   *
   * @returns {Promise<{components: any}>}
   */
  loadDependency () {
    return this.dependencyPromise || (this.dependencyPromise = new Promise(resolve => {
      // needs markdown
      if ('grecaptcha' in self === true) {
        resolve(self.grecaptcha) // eslint-disable-line
      } else {
        const vendorsMainScript = document.createElement('script')
        vendorsMainScript.setAttribute('type', 'text/javascript')
        vendorsMainScript.setAttribute('async', '')
        vendorsMainScript.setAttribute('src', `https://www.google.com/recaptcha/api.js?render=${this.getAttribute('site-key')}`)
        vendorsMainScript.onload = () => {
          if ('grecaptcha' in self === true ) resolve(self.grecaptcha) // eslint-disable-line
        }
        this.html = [vendorsMainScript]
      }
    }))
  }

  get afterSubmit () {
    return this.root.querySelector('#afterSubmit')
  }

  get previousButton () {
    return this.root.querySelector('input[name="__prev"]')
  }

  get policy () {
    return this.root.querySelector('.policy')
  }
}
