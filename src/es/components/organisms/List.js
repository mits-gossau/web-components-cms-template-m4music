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

    this.activeFilters = []

    this.filterChange = e => {
      const filterButton = e.detail.button
      const filterValue = filterButton.getAttribute('data-filter-value')
      const eventWrapper = this.root.querySelector("[type='event-wrapper']")
      // if show_all was clicked, or only show_all is set (happens when all other filters are deactivated) => reset activeFilters
      if (filterValue === 'show_all' || (this.activeFilters.length === 1 && this.activeFilters[0] === 'show_all')) this.activeFilters = []
      if (filterButton.classList.contains('active')) {
        this.activeFilters.push(filterValue)
        this.updateLocalStorageFilterValue(this.activeFilters)
      } else {
        this.activeFilters = this.activeFilters.filter(f => f !== filterValue)
        this.updateLocalStorageFilterValue(this.activeFilters)
      }
      if (eventWrapper) {
        const events = eventWrapper.root.querySelectorAll("[type='event']")
        if ((this.activeFilters.length === 1 && this.activeFilters[0] === 'show_all') || this.activeFilters.length === 0) {
          events.forEach(event => event.classList.remove('hidden'))
          this.clearFilterValues()
        } else {
          events.forEach(event => {
            const tags = event.getAttribute('data-tags').split(' ')
            event.classList.add('hidden')
            this.activeFilters.forEach(filter => {
              if (tags.includes(filter)) {
                event.classList.remove('hidden')
              }
            })
          })
        }
        if ([...events].filter(e => !e.classList.contains('hidden')).length === 0) {
          this.noResultsFound.classList.remove('hidden')
          if (this.activeFilters.length === 0) {
            events.forEach(event => event.classList.remove('hidden'))
            this.noResultsFound.classList.add('hidden')
          }
        } else {
          this.noResultsFound.classList.add('hidden')
        }
      }
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    this.addEventListener('filter-change', this.filterChange)
    this.setLocalStorageFilterValues()
  }

  disconnectedCallback () {
    this.removeEventListener('filter-change', this.filterChange)
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
   * @param {string[]} filterValue
   */
  updateLocalStorageFilterValue (filterValue) {
    if (!filterValue.length) {
      sessionStorage.clear()
    } else {
      sessionStorage.setItem('m4music', JSON.stringify(filterValue))
    }
  }

  /**
   * Clear session storage values - only values!
   */
  clearFilterValues () {
    sessionStorage.setItem('m4music', JSON.stringify([]))
  }

  /**
   * Set filter values stored in the session storage
   * @returns void
   */
  setLocalStorageFilterValues () {
    const data = sessionStorage.getItem('m4music')
    this.activeFilters = JSON.parse(data) || []
    // no active filter set
    if (!this.activeFilters.length) return

    // filter buttons
    // TODO: move to own fn
    this.root.querySelectorAll("[type='filter']").forEach(button => {
      if (this.activeFilters.includes(button.getAttribute('data-filter-value'))) {
        button.classList.add('active')
      }
      if (button.getAttribute('data-filter-value') === 'show_all') {
        button.classList.remove('active')
      }
    })

    // event items
    // TODO: move to own fn
    const eventWrapper = this.root.querySelector("[type='event-wrapper']")
    if (eventWrapper) {
      const events = eventWrapper.root.querySelectorAll("[type='event']")
      events.forEach(event => {
        const tags = event.getAttribute('data-tags').split(' ')
        const found = this.activeFilters.some(r => tags.indexOf(r) >= 0)
        if (!found) {
          event.classList.add('hidden')
        }
      })
    }
  }
}
