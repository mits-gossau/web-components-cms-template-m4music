import BaseBody from '../organisms/Body.js'

/* global self */
export default class Embed extends BaseBody {
  constructor (...args) {
    super(...args)
    this.hasRendered = false
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
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
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.hasRendered
  }

  renderCSS () {
    this.css = /* css */`
      :host {
        text-align: left !important;
        display: block
      }
      :host(.embed-youtube) {
        max-height: 900px;
        height: 50vw;
      }      
      :host(.embed-youtube) iframe, .embed-youtube iframe {
        width: 100%;
        height: 100%;
      }
      :host(.embed-polldaddy) .css-answer-group, 
      :host(.embed-polldaddy) .poll__answer-media-public {
        width: 34vw;
      }
      :host(.embed-polldaddy) .css-answer-group.pds-answer-group > div {
        width: 100%;
      }
      :host(.embed-polldaddy) .css-answer.pds-answer > span {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      :host(.embed-polldaddy) .embed-youtube {
        width: 34vw;
        height: 19vw;
      }
      :host(.embed-spotify) {
        padding-bottom: 1.5rem;
      }
      :host(.white) iframe{
        width: 32vw;
        height: 18vw;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host(.embed-polldaddy) .embed-youtube {
          width: 80vw;
          height: 45vw;
        }
        :host(.embed-polldaddy) .css-box,
        :host(.embed-polldaddy) .css-answer-group, 
        :host(.embed-polldaddy) .poll__answer-media-public {
          width: 80vw !important;
        }
        :host(.embed-polldaddy) .css-answer.pds-answer > span {
          display: inline;
        }
        :host(.white) iframe{
          width: 100%;
          height: 100%;
        }
      }
    `
  }

  renderHTML () {
    this.hasRendered = true
    if (this.iframe != null) {
      if (this.script != null && this.script.getAttribute('src').includes('polldaddy.com')) {
        this.classList.add('embed-polldaddy')
      } else if (this.iframe.getAttribute('src').includes('youtube.com')) {
        this.classList.add('embed-youtube')
      } else if (this.iframe.getAttribute('src').includes('mx3.ch')) {
        this.classList.add('embed-mx3')
      } else if (this.iframe.getAttribute('src').includes('spotify.com')) {
        this.classList.add('embed-spotify')
      }
    }
  }

  get iframe () {
    return this.root.querySelector('iframe')
  }

  get script () {
    return this.root.querySelector('script')
  }
}
