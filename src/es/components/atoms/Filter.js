// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */
/* global CustomEvent */

/**
 * Wrapper for a filter element
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
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Filter
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {}
 */
export default class Filter extends Shadow() {
  constructor (...args) {
    super(...args)

    this.filterToggle = e => {
      const showAllFilter = this.root.querySelector("[type='filter'][data-filter-value='show_all']")
      const filter = e.target

      if (filter.getAttribute('data-filter-value') === 'show_all') {
        if (!filter.classList.contains('active')) {
          this.root.querySelectorAll("[type='filter']").forEach(button => button.classList.remove('active'))
          filter.classList.add('active')
        } else return // do nothing if user tries to unselect show_all
      } else {
        if (filter.classList.contains('active')) {
          filter.classList.remove('active')
          if (this.root.querySelectorAll("[type='filter'].active").length === 0 && showAllFilter) showAllFilter.classList.add('active')
        } else {
          filter.classList.add('active')
          if (showAllFilter) showAllFilter.classList.remove('active')
        }
      }
      // send filter-change event to m4music-o-list
      this.dispatchEvent(new CustomEvent('filter-change',
        {
          detail: {
            button: filter
          },
          bubbles: true,
          cancelable: true,
          composed: true
        }))
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.root.querySelectorAll("[type='filter']").forEach(button => {
      button.addEventListener('click', this.filterToggle)
    })
  }

  disconnectedCallback () {
    this.root.querySelectorAll("[type='filter']").forEach(button => {
      button.removeEventListener('click', this.filterToggle)
    })
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
      align-content:center;
      align-items:center;
      display:flex;
      flex-direction:row;
      flex-wrap:wrap;
      justify-content:flex-start;
      margin-bottom:0.9rem;
    }
    :host > m4music-a-button {
      font-size:unset;
      padding:0 0.2rem 0.2rem 0;
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host > m4music-a-button {
        padding:0 0.2rem 0.2rem 0;
      }
    }
  `
  }
}
