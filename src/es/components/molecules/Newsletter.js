import BaseBody from '../organisms/Body.js'

/* global self */

export default class Newsletter extends BaseBody {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()

    document.addEventListener('newsletter-form-submit', () => {
      this.newsletterInfo.style.display = 'none'
    })
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
    super.renderCSS()
    this.css = /* css */`
      :host .m-newsletter__wrap {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: #FA4B46;
      }

      :host .m-newsletter__container:last-child {
        margin-right: 0;
      }

      :host .m-newsletter__wrap h3 {
        font-size: 0.75rem;
        font-weight: 400;
      }

      :host .m-newsletter__wrap h4 {
          font-size: 0.6rem;
          width: 480px;
          font-weight: normal;
          margin-bottom: 0.35rem;
      }

      :host .m-newsletter__wrap p {
        font-size: 1rem;
        width: 340px;
      }

      :host .m-newsletter__container.m-newsletter__policy p {
        font-size: 0.35rem;
        width: 300px;
      }

      :host .m-newsletter__container.m-newsletter__policy p a {
        color: white;
      }

      :host .m-newsletter__icons m4music-a-icon {
        margin-right: 0.3rem;
      }

      :host .m-newsletter__icons m4music-a-icon:last-child {
        margin-right: 0;
      }

      :host .m-newsletter__form {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }

      :host .m-newsletter__form a-input input[type="email"] {
        background-color: white;
        margin-right: 0.75rem;
        padding: 0.35rem 0.4rem;
        border: none;
        color: #999999;
        font-size: 0.5rem;
        border-radius: 0;
      }

      :host .m-newsletter__submit {
        border: none;
        background-color: white;
        padding: 0.35rem 0.6rem;
        font-size: 0.5rem;
        color: #232323;
        transition: all 0.3s ease-in-out;
      }

      :host .m-newsletter__submit:hover {
        background-color: #232323;
        color: white;
        cursor: pointer;
      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host .m-newsletter__container {
          width: 100%;
          margin-right: 0;
          margin-bottom: 2rem;
        }

        :host .m-newsletter__wrap {
          flex-direction: column;
          padding: 2rem 0.65rem;
        }

        :host .m-newsletter__wrap h3 {
          font-size: 1.5rem;
          margin: var(--newsletter-h3-margin-custom, 0); /* FE Review Change 2024 */
        }

        :host .m-newsletter__wrap h4 {
            font-size: 1rem;
            margin: var(--newsletter-h4-margin-custom, 0); /* FE Review Change 2024 */
            width: auto;
          }

        :host .m-newsletter__wrap p {
          font-size: 1.5rem;
          margin: var(--newsletter-p-margin-custom, 0);
          width: auto;
        }

        :host .m-newsletter__container.m-newsletter__policy p {
          font-size: 0.8rem;
          margin: 1em 0; /* FE Review Change 2024 */
          width: auto;
        }

        :host .m-newsletter__form {
          flex-direction: column;
        }

        :host .m-newsletter__form input[type="email"] {
          margin-right: 0;
          padding: 0.5rem 0.6rem;
          font-size: 1rem;
          width: 75%;
          margin-bottom: 1rem;
        }

        :host .m-newsletter__submit {
          padding: 0.5rem 0.6rem;
          font-size: 1rem;
          width: auto;
        }

        :host .m-newsletter__icons m4music-a-icon {
          margin-right: 0;
        }
      }
    `
  }

  get newsletterInfo () {
    return this.root.querySelector('#newsletterInfo')
  }
}
