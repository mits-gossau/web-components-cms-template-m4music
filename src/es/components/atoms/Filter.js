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

    this.activateShowAllFilter = showAllFilter => {
      showAllFilter.root.querySelector('button').textContent = showAllFilter.getAttribute('data-showall-translation')
      showAllFilter.classList.add('active')
    }

    this.deactivateShowAllFilter = showAllFilter => {
      showAllFilter.root.querySelector('button').textContent = showAllFilter.getAttribute('data-reset-translation')
      showAllFilter.classList.remove('active')
    }

    this.filterToggle = e => {
      const showAllFilter = this.root.querySelector("[type='filter'][data-filter-value='show_all']")
      const filter = e.target

      if (filter.getAttribute('data-filter-value') === 'show_all') {
        if (!filter.classList.contains('active')) {
          this.root.querySelectorAll("[type='filter']").forEach(button => button.classList.remove('active'))
          this.activateShowAllFilter(showAllFilter)
        } else return // do nothing if user tries to unselect show_all
      } else {
        if (filter.classList.contains('active')) { // deactivate filter & and if no active filters left => activate show_all
          filter.classList.remove('active')
          if (this.root.querySelectorAll("[type='filter'].active").length === 0 && showAllFilter) this.activateShowAllFilter(showAllFilter)
        } else { // activate filter & deactivate show_all
          filter.classList.add('active')
          if (showAllFilter) this.deactivateShowAllFilter(showAllFilter)
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
      ${this.hasAttribute('background-color')
      ? `
        --filter-background-color: ${this.getAttribute('background-color')};
        color: var(--color-black);
        width: calc(100% - 2rem) !important;
        padding: 0 0 1rem 0;`
      : `
        padding:0.9rem 0;
        width: 100% !important;
        `}
      align-content:center;
      align-items:center;
      background-color:var(--list-filter-background-color, var(--filter-background-color, transparent));
      display:flex;
      flex-direction:row;
      flex-wrap: wrap;
    }
    :host > div {
      align-self: flex-start;
    }
    :host .filter > *:not(h5) {
      display: inline-block;
    }
    :host .weekdays {
      width: 210px;
    }
    :host .locations {
      width: 300px;
    }
    :host .eventType {
      width: 270px;
    }
    :host .languages {
      width: 320px;
    }
    :host .genres {
      width: 380px;
    }
    :host h5 {
      margin: 10px 0;
      text-transform: uppercase;
      font-size: 0.6rem;
      color: #232323;
    }
    :host .filterButtonContainer {
      display: flex;
      flex-wrap: wrap;
    }
    :host [type='filter'] {
      font-size:unset;
      padding:0 0.2rem 0 0;
    }

    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host {
        flex-direction: column;
        align-items: flex-start;
        min-width: 100%;
        flex-wrap: nowrap;
      }
      :host .filter, :host .weekdays, :host .locations, :host .eventType, :host .languages, :host .genres {
        margin-bottom: 0.5rem;
        padding: 0;
        width: 100%;
      }
      :host h5 {
        margin: 4px 0;
      }
      :host [type='filter'] {
        padding:0 0.2rem 0.2rem 0;
      }
    }
  `
  }
}
