// @ts-check
import { Details as BaseDetails } from '../web-components-cms-template/src/es/components/molecules/Details.js'
import { Mutation } from '../web-components-cms-template/src/es/components/prototypes/Mutation.js'

/**
 * Details (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) aka. Bootstrap accordion
 * Example at: /src/es/components/pages/Programm.html
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class Details
 * @type {CustomElementConstructor}
 * @css {
 * --icon-transition, transform 0.15s ease
 * --icon-transform-open, rotate(45deg)
 * }
 * @attribute {
 * }
 */
export default class Details extends BaseDetails(Mutation()) {
  connectedCallback () {
    super.connectedCallback()
    if (super.shouldComponentRenderCSS()) this.renderCSS()
    if (super.shouldComponentRenderHTML()) this.renderHTML()
    document.body.addEventListener(super.openEventName, super.openEventListener)
    this.root.addEventListener('click', super.clickEventListener)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    document.body.removeEventListener(super.openEventName, super.openEventListener)
    this.root.removeEventListener('click', super.clickEventListener)
  }

  mutationCallback (mutationList, observer) {
    super.mutationCallback(mutationList, observer)
  }

  /**
   * renders the m-Details css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */` 
      :host{
        width: var(--max-width, 25%);
        color:var(--color-black);
        margin-bottom: var(--margin-bottom, 0.9rem);
      }
      :host details > summary > div.icon {
        display: flex;
        justify-content: center;
      }
      :host details > summary {
        list-style: none;
        display:flex;
        flex-direction: column;
      }
      :host m4music-m-event-item {
        --event-item-max-width:100%;
        --event-item-margin-bottom: 0;
      }
      :host details .icon > img,
      :host details .icon > div > svg {
        transition: var(--icon-transition, transform 0.15s ease);
      }
      :host details[open] .icon > img,
      :host details[open] .icon > div > svg  {
        transform: var(--icon-transform-open, rotate(45deg));
      }
      :host * p {
        padding: 1rem 0;
        margin-block-start: 0;
        margin-block-end: 0;
      }
      @media only screen and (max-width: 960px){
        :host {
          width: 100%;
        }
        :host details > summary > div.icon {
          align-items: center;
          justify-content: unset;
        }
        :host details > summary {
          flex-direction: row;
        }
      }
    `
  }

  renderHTML () {
    super.hasRendered = true
    const iconSvg = document.createElement('div')
    iconSvg.innerHTML = `
      <?xml version="1.0" encoding="UTF-8"?>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15 0.769065C15.8284 0.769064 16.5 1.44064 16.5 2.26906L16.5 13.497L27.7279 13.497C28.5563 13.497 29.2279 14.1686 29.2279 14.997C29.2279 15.8254 28.5563 16.497 27.7279 16.497L16.5 16.497L16.5 27.7249C16.5 28.5533 15.8284 29.2249 15 29.2249C14.1716 29.2249 13.5 28.5533 13.5 27.7249L13.5 16.497L2.27208 16.497C1.44365 16.497 0.772078 15.8254 0.772079 14.997C0.772078 14.1686 1.44365 13.497 2.27208 13.497L13.5 13.497L13.5 2.26906C13.5 1.44064 14.1716 0.769064 15 0.769065Z" fill="#FB5F3F"/>
      </svg>
    `
    super.divSummary.append(iconSvg)
    super.divSummary.classList.add('icon')
    super.summary.appendChild(super.divSummary)
  }
}
