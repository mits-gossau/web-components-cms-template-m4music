// @ts-check
import BasePicture from '../web-components-cms-template/src/es/components/atoms/Picture.js'

/* global self */

/**
 * Wrapper for picture element
 * Example at: /src/es/components/pages/Home.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Picture
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Picture extends BasePicture {
  connectedCallback() {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS() {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }


  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS() {
    this.css = /* css */ `
      :host{}
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host{}
    }
  `
  }
}
