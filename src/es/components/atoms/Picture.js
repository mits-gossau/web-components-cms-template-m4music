import BasePicture from '../web-components-cms-template/src/es/components/atoms/Picture.js'

/* global self */
export default class Picture extends BasePicture {
  renderCSS () {
    super.renderCSS()
    this.css = /* css */`
      :host picture, :host picture img {
        transition: var(--transition, 0.15s ease-out all);
      }
      :host(.hover) picture img {
        opacity: 0;
      }
      :host(.hover) picture {
        background-color: var(--color-orange, #FA4B46);
      }
      ${this.getAttribute('namespace') === 'event-detail-picture-'
      ? `:host picture{
          background-color: var(--background-color, none);
        }
        :host img {
          opacity: var(--opacity, 1);
          filter: var(--img-filter, none);
        }`
        : ''
      }

      :host picture{
        width: 100%;
        ${this.hasAttribute('ratio')
        ? /*css*/`
          aspect-ratio: 1/${this.getAttribute('ratio')};
        `
        : '' }
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host picture{
          ${this.hasAttribute('ratioMobile')
          ? /*css*/`
            aspect-ratio: 1/${this.getAttribute('ratioMobile')};
          `
          : '' }
        }
      }
    `
  }
}
