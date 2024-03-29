import BaseVideo from '../web-components-cms-template/src/es/components/atoms/Video.js'

/* global self */
export default class Video extends BaseVideo {
  constructor (...args) {
    super(...args)
    this.sources = (this.getAttribute('sources') && Video.parseAttribute(this.getAttribute('sources'))) || null
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
      :host { 
        background-color: ${this.hasAttribute('background-color') ? this.getAttribute('background-color') : 'transparent'};
        width: var(--width);
        padding: ${this.hasAttribute('background-color') ? 'var(--padding-white-background)' : 'var(--padding)'};
        height: var(--height);
        display:block;
      }
      :host > iframe, video{
        background-color: var(--border-color);
        border: var(--border);
        width: var(--child-width);
      }
      :host > iframe{
        height: var(--iframe-height);
      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > iframe{
          height: var(--iframe-height-mobile);
        }
        :host > iframe, video{
          border: var(--border-mobile);
          width: var(--child-width-mobile);

        }
      }
    `
  }
}
