// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for a key speaker element
 * Example at: /src/es/components/pages/Quote.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Speakers
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Speakers extends Shadow() {
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
    this.css = /* css */ `
    :host  {
      background-color: ${this.hasAttribute('background-color') ? this.getAttribute('background-color') : 'transparent'};
      align-items: center;
      display:flex;
      flex-direction:column;
      justify-content:flex-start;
      padding:var(--padding, 0);
      width: 30%;
    }
    :host .name {
      color:var(--name-color, black);
      font-size:var(--name-font-size, initial);
      line-height:100%;
      margin:0.5rem 0 0 0;
      text-transform:uppercase;
      word-wrap:anywhere;
      text-align: center;
    }
    :host .function {
      text-align: center;
      margin:0;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host{
        align-items:${this.getAlignment(this.getAttribute('align'))};
        width: 100%;
      }
      :host .name {
        font-size:var(--name-font-size-mobile, initial);
      }
      :host .function {
        font-size:var(--function-font-size-mobile, 20px);
        text-align:${this.getAttribute('align') === 'left' ? 'left' : 'right'}
      }
      :host .name.right {
        text-align:right;
      }
      :host .name.left {
        text-align:left;
      }
    }
  `
  }

  /**
   *
   * @param {*} alignDirection
   * @returns
   */
  getAlignment (alignDirection) {
    const alignment = {
      right: 'flex-end',
      left: 'flex-start'
    }
    return (alignDirection in alignment) ? alignment[alignDirection] : alignment.left
  }
}
