// @ts-check
import BaseBody from './Body.js'

/* global self */
/* global sessionStorage */

/**
 * Structure:
 *    <m4music-o-list>
 *      <m4music-a-filter>
 *        <m4music-a-button type="filter" data-filter-value="show_all" class="active">Alle</m4music-a-button>
 *        <m4music-a-button type="filter" data-filter-value="[VALUE]">[TRANSLATED_VALUE]</m4music-a-button>
 *      </m4music-a-filter>
 *      <m4music-o-wrapper type="event-wrapper">
 *        <m4music-m-event-item type="event" data-tags="[TAGS]"> // TAGS separated by whitespace
 *            (...)
 *        </m4music-m-event-item>
 *      </m4music-o-wrapper>
 *    </m4music-o-list>
 * Example at: /src/es/components/pages/Events.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class List
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Wrapper extends BaseBody {
  constructor (...args) {
    super(...args)

    this.activeFilters = this.getEmptyFilter

    this.filterChange = e => {
      const filterButton = e.detail.button
      const filterValue = filterButton.getAttribute('data-filter-value')
      const eventWrapper = this.root.querySelector("[type='event-wrapper']")

      // if show_all was clicked, or only show_all is set (happens when all other filters are deactivated) => reset activeFilters
      if (filterValue === 'show_all' || (this.activeFilters[0].length === 1 && this.activeFilters[0][0] === 'show_all')) this.activeFilters = this.getEmptyFilter

      this.updateLocalStorageFilterValue(filterButton) 
      if (eventWrapper) { 
        const events = eventWrapper.root.querySelectorAll("[type='event']")
        if ((this.activeFilters[0].length === 1 && this.activeFilters[0][0] === 'show_all') || this.isEmptyFilter) {
          events.forEach(event => event.classList.remove('hidden'))
          this.clearFilterValues()
        } else {
          this.filterEventItems(events)
        }
        if ([...events].filter(e => !e.classList.contains('hidden')).length === 0) {
          this.noResultsFound.classList.remove('hidden')
          if (this.isEmptyFilter) {
            events.forEach(event => event.classList.remove('hidden'))
            this.noResultsFound.classList.add('hidden')
          }
        } else {
          this.noResultsFound.classList.add('hidden')
        }
      }
    }
  }

  saveScrollPosition() {
    var pathName = document.location.pathname;
      var scrollPosition = document.documentElement.scrollTop;
      var scrollPositionSafari = document.body.scrollTop;
      if (scrollPosition > scrollPositionSafari){
        sessionStorage.setItem("m4music-scrollPosition_" + pathName, scrollPosition.toString());
      } else{
        sessionStorage.setItem("m4music-scrollPosition_" + pathName, scrollPositionSafari.toString());
      }
  }

  terminationEvent = 'onpagehide' in self ? 'pagehide' : 'unload'; // backwards compatibility
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    this.addEventListener('filter-change', this.filterChange)
    window.addEventListener(this.terminationEvent, this.saveScrollPosition, false);
    this.setLocalStorageFilterValues()
    this.jumpToPosition()
  }

  disconnectedCallback () {
    this.removeEventListener('filter-change', this.filterChange)
    window.removeEventListener(this.terminationEvent, this.saveScrollPosition);
    this.clearFilterValues()
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
    return !this.root.querySelector('section')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    super.renderCSS()
    const bodyCss = this.css.replace(/\s>\smain/g, '')
    this.css = ''
    this._css.textContent = bodyCss
    this.css = /* css */ `
    :host {
      display: block;
    }
    :host > section {
      background-color: ${this.hasAttribute('background-color') ? this.getAttribute('background-color') : 'transparent'};
      --event-item-name-font-color: var(--color);
      --event-item-description-font-color: var(--color);
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      margin: 0;
      width: 100%;
    }
    ${this.hasAttribute('background-color')
        ? /* css */ ` 
    :host > section {
        --wrapper-background-color: ${this.getAttribute('background-color')};
        --wrapper-main-background-color: ${this.getAttribute('background-color')};
        --filter-background-color: ${this.getAttribute('background-color')};
        --event-item-name-font-color: var(--color-black);
        --event-item-description-font-color: var(--color-black);  
        width: 90%;
        padding: 0 5%;      
      }`
        : ''
      }
    :host .hidden {
      display: none;
    }
    :host h4.noResultsFound {
      text-transform: none;
      margin: 50px 0;
      color: ${this.hasAttribute('background-color') ? 'var(--color-black)' : 'var(--color)'};
    }

    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host h4.noResultsFound {
        margin: 25px 0;
      }
    }
  `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    const section = document.createElement('section')
    Array.from(this.root.children).forEach(node => {
      if (node.tagName !== 'STYLE') section.appendChild(node)
    })
    this.html = section
  }

  jumpToPosition (){
    var pathName = document.location.pathname;
    if (sessionStorage["m4music-scrollPosition_" + pathName]) {
      document.documentElement.scrollTop = Number(sessionStorage.getItem("m4music-scrollPosition_" + pathName));
      document.body.scrollTop = Number(sessionStorage.getItem("m4music-scrollPosition_" + pathName)); //safari
    }
  }

  /**
   * Get NoResultsFound Text-Element.
   *
   * @return {HTMLHeadingElement}
   */
  get noResultsFound () {
    return this.root.querySelector('.noResultsFound')
  }

  /**
   * Update session storage with selected filter value
   * param {[string[], string[], string[], string[], string[]]} filterValue
   */
  updateLocalStorageFilterValue (filterButton) {
    const filterValue = filterButton.getAttribute('data-filter-value')
    const filterGroup = this.getGroupPosition(filterButton)
    var filter = this.activeFilters[filterGroup]
    if(filterButton.classList.contains('active')){
      filter.push(filterValue)
    }
    else{
      this.activeFilters[filterGroup].push(filterValue)
      filter = filter.filter(f => f !== filterValue)
    }
    this.activeFilters[filterGroup] = filter

    //set Session Storage
    if (this.isEmptyFilter) {
      sessionStorage.clear()
    } else {
      var pathName = document.location.pathname;  
      sessionStorage.setItem('m4music-filter_' + pathName, JSON.stringify(this.activeFilters))
    }
  }

  /**
   * Clear session storage values - only values!
   */
  clearFilterValues () {
    var pathName = document.location.pathname;  
    sessionStorage.setItem('m4music-filter_' + pathName, JSON.stringify(this.getEmptyFilter))
  }

  /**
   * Set filter values stored in the session storage
   * @returns void
   */
  setLocalStorageFilterValues () {
    var pathName = document.location.pathname;  
    const data = sessionStorage.getItem('m4music-filter_' + pathName)

    this.activeFilters = JSON.parse(data) || this.getEmptyFilter
    // no active filter set
    if (this.isEmptyFilter) return

    // filter buttons
    this.root.querySelectorAll("[type='filter']").forEach(button => {
      if (button.getAttribute('data-filter-value') != 'show_all') {
        if (this.activeFilters[this.getGroupPosition(button)].includes(button.getAttribute('data-filter-value'))) {
          button.classList.add('active')
        }
      }
      else{
        button.classList.remove('active')
      }
    })

    // event items
    const eventWrapper = this.root.querySelector("[type='event-wrapper']")
    if (eventWrapper) {
      const events = eventWrapper.root.querySelectorAll("[type='event']")
      this.filterEventItems(events)
    }
  }

  filterEventItems (events) {
    var returnEvents = [...events]
    var falseEvent = []

    events.forEach(event => {
      const tags = event.getAttribute('data-tags').split(' ')
      event.classList.add('hidden')

      this.activeFilters.forEach(filter => {
        if(!falseEvent.includes(event) && filter.length != 0){
          var filterFound = false
          filter.forEach(f => {
            if (tags.includes(f)) {
              filterFound = true
            }
          })

          if(!filterFound && returnEvents.includes(event)){
            returnEvents.splice(returnEvents.indexOf(event), 1)
          } else if(!filterFound){
            falseEvent.push(event)
          }
        }

      })
    })
    returnEvents.forEach(e => {
      e.classList.remove('hidden')
    });
  }


  
  getGroupPosition(button){
    const filterGroup = button.getAttribute('data-filter-group')
    return this.getGroupPositionfromString(filterGroup)
  }
  
  getGroupPositionfromString(group){
    switch(group){
      case "day":
        return 1;      
      case "location":
        return 2;
      case "language":
        return 3   
      case "type":
        return 4;      
      case "genre":
        return 5; 
      default:
        return 0
    }
  }

  get getEmptyFilter(){
    return [[],[],[],[],[],[]]
  }
  get isEmptyFilter(){
    return !this.activeFilters[1].length && !this.activeFilters[2].length && !this.activeFilters[3].length && !this.activeFilters[4].length && !this.activeFilters[5].length
  }
}
