// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */
/* global Image */

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
  connectedCallback () {
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    if (this.shouldComponentRenderCSS()) this.renderCSS()
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.root.querySelector('div')
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
      flex-direction:row;
      align-items:flex-start;
      justify-content:flex-start;
      align-content:flex-start;
      margin-bottom:0.9rem;
      background-color:transparent;
    }
    :host p  {
      padding:0;
      margin:0 0 0.25rem 0;
    }
    :host .image-wrapper{
      margin-right:0.45rem;
      
    }
    :host .content-wrapper{
      display:flex;
      flex-direction:column;
      align-content:flex-start;
      justify-content:flex-start;
      align-items:flex-start;
    }
    :host .date{
      color:var(--date-color, #616161);
      font-size:18px;
      line-height:125%;    
    }
    :host .name{
      font-size:28px;
      line-height:100%;   
      color:var(--name-color, #000000); 
    }
    :host .description{
      font-size:18px;
      line-height:125%;
      color:var(--description-color, #000000); 
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host { }
    }
  `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    const imageWrapper = this.createContentWrapper('image-wrapper')
    const contentWrapper = this.createContentWrapper('content-wrapper')

    const image = this.createEventImage(this.image)
    imageWrapper.appendChild(image)

    const date = this.createContentElement(this.date, 'p', 'date')
    const name = this.createContentElement(this.name, 'p', 'name')
    const description = this.createContentElement(this.description, 'p', 'description')

    this.appendChildElement(contentWrapper, [date, name, description])

    this.html = [imageWrapper, contentWrapper]
  }

  /**
   * @param {HTMLDivElement} parent
   * @param {HTMLElement[]} children
   */
  appendChildElement (parent, children) {
    children.forEach(child => {
      if (child.innerHTML !== '') parent.appendChild(child)
    })
    return parent
  }

  /**
   * @param {any} content
   * @param {string} element
   * @param {string} className
   */
  createContentElement (content, element, className) {
    const el = document.createElement(element)
    el.className = className
    el.innerHTML = content
    return el
  }

  /**
   * @param {string} className
   */
  createContentWrapper (className) {
    const element = document.createElement('div')
    element.className = className
    return element
  }

  /**
   * @param {string} img
   */
  createEventImage (img) {
    const image = new Image()
    image.src = img
    return image
  }

  /**
   * get event date
   *
   */
  get date () {
    return this.getAttribute('date') || ''
  }

  get name () {
    return this.getAttribute('name') || ''
  }

  get description () {
    return this.getAttribute('description') || ''
  }

  get image () {
    return this.getAttribute('image') || null
  }
}
