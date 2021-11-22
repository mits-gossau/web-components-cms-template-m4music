import BaseBody from '../organisms/Body.js'

export default class Newsletter extends BaseBody {
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
    super.renderCSS()
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
      :host > * a {
        text-decoration-line: var(--a-text-decoration-line-ext, none);
        text-decoration-style: var(--a-text-decoration-style-ext, solid);
        text-decoration-color: var(--a-text-decoration-color-ext, red);
        text-decoration-thickness:var(--a-text-decoration-thickness-ext, 1px);    
        color: var(--color);
      }
      :host > * a:hover {
        text-decoration-line: var(--a-text-decoration-line-hover-ext, none);
        text-decoration-style: var(--a-text-decoration-style-hover-ext, solid);
        text-decoration-color: var(--a-text-decoration-color-hover-ext, red);
        text-decoration-thickness:var(--a-text-decoration-thickness-hover-ext, 1px);    
      }
      :host > p {
        margin: var(--p-margin);
        margin-bottom: 0;
      }
      :host .container {
        margin: 0 auto;
        width: 450px;
      }
      :host .policy{
        margin: var(--policy-margin);
        font-size: var(--policy-font-size);
        text-align: var(--policy-text-align, start);
      }

      :host .policy p {
        margin: var(--policy-p-margin, 0);
      }
      :host > m4music-m-form {
        padding: var(--newsletter-m4music-m-form-padding);
        display: var(--newsletter-m4music-m-form-display);
        flex-direction: var(--newsletter-m4music-m-form-flex-direction);
      }


      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host .container {
          width: 294px;
        }
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
