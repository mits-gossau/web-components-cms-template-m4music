// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for a event item element (event or artist)
 * Example at: /src/es/components/pages/Events.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class EventItem
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class EventItem extends Shadow() {
  constructor (...args) {
    super(...args)
    this.mouseX = 0
    this.mouseY = 0

    const between = (x, value, range) => {
      return x >= value - range && x <= value + range
    }

    this.mouseDown = event => {
      this.mouseX = event.pageX
      this.mouseY = event.pageY
    }

    this.clickListener = event => {
      if (between(event.pageX, this.mouseX, 10) && between(event.pageY, this.mouseY, 10) && this.getAttribute('href')) {
        if (event.which === 1) { // Left Button
          event.stopPropagation()
          self.open(this.getAttribute('href'), this.getAttribute('target') || '_self')
        } else if (event.which === 2) { // Middle Button
          event.stopPropagation()
          self.open(this.getAttribute('href'), '_blank')
        }
      }
    }

    if (this.hasAttribute('href')) {
      this.setAttribute('data-href', this.getAttribute('href'))
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.addEventListener('mousedown', this.mouseDown)
    this.addEventListener('mouseup', this.clickListener)
  }

  disconnectedCallback () {
    this.removeEventListener('mousedown', this.mouseDown)
    this.removeEventListener('mouseup', this.clickListener)
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
    this.css = /* css */ `
    :host {
      display:flex;
      flex-direction:column;
      align-items:flex-start;
      justify-content:flex-start;
      align-content:flex-start;
      margin-bottom:0.9rem;
      background-color:transparent;
      ${this.hasAttribute('href') ? 'cursor: pointer;' : ''}
      flex-wrap:wrap;
      flex: 1;
      flex-basis: 25%;
      max-width:25%;
    }
    :host p  {
      padding:0;
      margin:0 0 0.25rem 0;
    }
    :host .image-wrapper{
      margin-right:0.45rem;
      width:95%;
    }
    :host .content-wrapper{
      display:flex;
      flex-direction:column;
      align-content:flex-start;
      justify-content:flex-start;
      align-items:${this.getAttribute('type') === 'speaker' ? 'center' : 'flex-start'};
      width:95%;
      padding-top:16px;
      word-break:break-all;
    }
    :host .date{
      color:var(--date-font-color, #616161);
      font-size:var(--date-font-size, 0.65rem);
      line-height:var(--date-line-height, 125%);   
    }
    :host .date > span {
      color:var(--date-font-color, #616161);
    }
    :host .name{
      color:var(--name-font-color, #000000); 
      font-size:var(--name-font-size, 0.9rem);
      line-height:var(--name-line-height, 100%);
      text-align:${this.getAttribute('type') === 'speaker' ? 'center' : 'left'};
    }
    :host .description{
      color:var(--description-font-color, #000000); 
      font-size:var(--description-font-size, 0.65rem);
      line-height:var(--description-line-height, 125%);
      text-align:${this.getAttribute('type') === 'speaker' ? 'center' : 'left'};
    }
    :host(.hidden) {
      display: none;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host {
        align-items:${this.getAttribute('type') === 'speaker' ? 'center' : 'flex-start'};
        flex-wrap:nowrap;
        flex-direction:row;
        max-width:100%;
      }
      :host p  {
        margin:0 0 0.1rem 0;
      }
      :host .content-wrapper{
        padding-top:0;
        align-items:flex-start;
      }
      :host .image-wrapper{
       width:auto;
      }
      :host .date{
        font-size:var(--date-font-size-mobile, 1rem);
        line-height:var(--date-line-height-mobile, 125%);   
      }
      :host .name{
        font-size:var(--name-font-size-mobile, 1.5rem);
        line-height:var(--name-line-height-mobile, 100%);
        text-align:left;
      }
      :host .description{
        font-size:var(--description-font-size-mobile, 1rem);
        text-align:left;
      }
    }
  `
  }
}
