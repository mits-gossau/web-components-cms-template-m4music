// @ts-check
import BaseBody from './Body.js'

/* global self */

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

    let activeFilters = []

    this.filterChange = e => {
      const filterButton = e.detail.button
      const filterValue = filterButton.getAttribute('data-filter-value')
      const eventWrapper = this.root.querySelector("[type='event-wrapper']")

      if (filterValue === 'show_all' || (activeFilters.length === 1 && activeFilters[0] === 'show_all')) activeFilters = []
      if (filterButton.classList.contains('active')) {
        activeFilters.push(filterValue)
      } else {
        activeFilters = activeFilters.filter(f => f !== filterValue)
      }

      if (eventWrapper) {
        const events = eventWrapper.root.querySelectorAll("[type='event']")

        if (activeFilters.length === 1 && activeFilters[0] === 'show_all') {
          events.forEach(event => event.classList.remove('hidden'))
        } else {
          events.forEach(event => {
            const tags = event.getAttribute('data-tags').split(' ')
            event.classList.remove('hidden')

            activeFilters.forEach(filter => {
              if (!tags.includes(filter)) {
                event.classList.add('hidden')
              }
            })
          })
        }
      }
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    this.addEventListener('filter-change', this.filterChange)
  }

  disconnectedCallback () {
    this.removeEventListener('filter-change', this.filterChange)
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
    :host > section {
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      width:100%;
      background-color:var(--section-background-color, transparent);
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host  {}
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
}
