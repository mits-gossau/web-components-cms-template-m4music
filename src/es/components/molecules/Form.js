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

  renderCSS () {
    super.renderCSS()
    this.css = /* css */`
      :host fieldset {
        border: var(--fieldset-border, none);
      }

      :host h4.form-caption {
        font-size: var(--h4-font-size, 1.25rem) !important;
        line-height: var(--h4-line-height, 125%) !important;
      }

      :host .error-message {
        font-size:0.5rem;
        color:var(--field-error-color, #FF7373);
        padding:var(--field-padding-error, 0);
        display: flex;
        flex-direction: row;
        align-items: center;
        align-content: center;
      }

      :host .show-error {
        display:visible;
      }

      :host .hide-error{
        display:none;
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


      :host select {
        /* display: inline-block;
        box-sizing: border-box;*/
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
        font-size:var(--form-select-font-size, inherit);
        width:var(--form-select-width, auto);
        margin:var(--form-select-margin, 0);
      }

      :host select:focus-visible {
        -webkit-appearance: none;
        -moz-appearance:none;
        -ms-appearance:none;
        appearance:none;
        border:1px solid var(--form-select-border, white);
      }

      :host .register-label{
        padding:0.2rem;
        font-size:var(--register-form-label-font-size, inherit);
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
        
      }
    
    `
  }
}
