// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Wrapper for a Icon element
 * Example at: /src/es/components/pages/Home.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Icon
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Icon extends Shadow() {
  connectedCallback () {
    this.setLink()
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
    :host{
      padding:0;
    }
    :host svg {
      height:min(5vw, 28px);
      width:min(5vw, 27px);
      pointer-events:bounding-box;
    }
    :host a > svg path{
      fill: var(--icon-path-fill, black);
      transition:0.3s;
    }
    :host a:hover > svg path {
       fill: var(--icon-path-fill-hover, white);
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host{
        padding:0.5rem 0.85rem 0 0;
      }
      :host svg {
        height:1.5rem;
        width:1.5rem;
      }
      `
  }

  setLink (link = this.link, target = this.target, title = this.title) {
    if (!link) return
    const svg = this.root.querySelector('svg')
    const a = document.createElement('a')
    a.setAttribute('href', link)
    a.setAttribute('target', target)
    a.setAttribute('title', title)
    a.appendChild(svg)
    if (target === '_blank') {
      a.setAttribute('rel', 'noopener')
    }
    this.root.appendChild(a)
  }

  get link () {
    return this.getAttribute('link')
  }

  get target () {
    const target = this.getAttribute('target') || ''
    return ['blank', 'self', 'parent', 'top'].includes(target) ? `_${target}` : '_self'
  }

  get title () {
    return this.getAttribute('title') || ''
  }
}
