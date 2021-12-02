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
      flex-direction: row;
      align-content: flex-start;
      justify-content: flex-start;
      align-items: flex-start;
    }
    :host .item-content{
      display:flex;
    }
    :host .item-content__date{
      font-size:8px;
    }
    :host .item-content__description{
      font-size:20px;
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
    const iW = this.createContentWrapper("item-image")
    //const eventImageWrapper = document.createElement('div')
    //eventImageWrapper.className="item-image"

    const eI = this.createEventImage(this.eventImage)
    //const eventImage = new Image()
    //eventImage.src = this.eventImage
    //eventImageWrapper.appendChild(eventImage)
    iW.appendChild(eI)

    const cW = this.createContentWrapper("item-content")
    //const eventContentWrapper = document.createElement('div')
    //eventContentWrapper.className="item-content"
    
    const eD = this.createContentElement(this.eventDate, 'p', 'item-content__name__date')
    //const eventDate = document.createElement('p')
    //eventDate.className="item-content__name__date"
    //eventDate.innerHTML = this.eventDate

    const eDesc = this.createContentElement(this.eventDescription, 'p', 'item-content__description')
    //const eventDescription = document.createElement('p')
    //eventDescription.className="item-content__description"
    //eventDescription.innerHTML = this.eventDescription

    //eventContentWrapper.append(eventDescription,eventDate)
    cW.append(eDesc,eD)

    this.html = [iW,cW]
    //this.html = [eventImageWrapper,eventContentWrapper]
    //content.appendChild(eventContentWrapper)
    //this.html = content
  }


  /**
   * @param {any} htmlContent
   * @param {string} element
   * @param {string} className
   */
  createContentElement(htmlContent, element, className){
    const el = document.createElement(element)
    el.className = className
    el.innerHTML = htmlContent
    return el
  }
  
   /**
   * @param {string} className
   */
   createContentWrapper(className){
    const element = document.createElement('div')
    element.className = className
    return element
  }

  /**
   * @param {string} img
   */
  createEventImage(img){
    const image = new Image()
    image.src = img
    return image
  }

  /**
   * get event date
   *
   */
   get eventDate () {
    return this.getAttribute('event-date') || ""
  }

  get eventDescription () {
    return this.getAttribute('event-description') || ""
  }

  get eventImage () {
    return this.getAttribute('event-image') || null
  }

}
