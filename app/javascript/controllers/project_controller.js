import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.boundKeydown = this.handleKeydown.bind(this)

    document.querySelectorAll('.project-details-link').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        this.showProjectDetails(link.getAttribute('href').substring(1), true);
      });
    });

    document.querySelectorAll('.nav-button').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        this.showProjectDetails(button.getAttribute('href').substring(1), true);
      });
    });

    this.setupLightbox();

    this.showProjectDetails('sensium-details', false); // Display Sensium details by default without scrolling
  }

  disconnect() {
    document.removeEventListener('keydown', this.boundKeydown)
    if (this.overlay) {
      this.overlay.remove()
      this.overlay = null
    }
    document.body.style.overflow = ''
  }

  showProjectDetails(targetId, scroll) {
    document.querySelectorAll('.project-details-section').forEach((section) => {
      section.style.display = 'none';
    });
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.style.display = 'block';
      if (scroll) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  // ---- Lightbox (click any project screenshot to view it full-size) ----
  setupLightbox() {
    let overlay = document.getElementById('project-lightbox')
    if (!overlay) {
      overlay = document.createElement('div')
      overlay.id = 'project-lightbox'
      overlay.className = 'project-lightbox-overlay'
      overlay.setAttribute('role', 'dialog')
      overlay.setAttribute('aria-modal', 'true')
      overlay.setAttribute('aria-hidden', 'true')
      overlay.innerHTML =
        '<button type="button" class="project-lightbox-close" aria-label="Close image">&times;</button>' +
        '<img class="project-lightbox-img" alt="">' +
        '<p class="project-lightbox-caption"></p>'
      document.body.appendChild(overlay)
    }
    this.overlay = overlay
    this.lightboxImg = overlay.querySelector('.project-lightbox-img')
    this.lightboxCaption = overlay.querySelector('.project-lightbox-caption')

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay || event.target.classList.contains('project-lightbox-close')) {
        this.closeLightbox()
      }
    })
    document.addEventListener('keydown', this.boundKeydown)

    this.element.querySelectorAll('.project-details-section img').forEach((img) => {
      img.classList.add('zoomable')
      img.addEventListener('click', () => this.openLightbox(img))
    })
  }

  openLightbox(img) {
    if (!this.overlay) return
    this.lightboxImg.src = img.currentSrc || img.src
    this.lightboxImg.alt = img.alt || ''
    const caption = img.parentElement && img.parentElement.querySelector('.sensium-caption')
    this.lightboxCaption.textContent = caption ? caption.textContent : (img.alt || '')
    this.overlay.classList.add('open')
    this.overlay.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
  }

  closeLightbox() {
    if (!this.overlay) return
    this.overlay.classList.remove('open')
    this.overlay.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
  }

  handleKeydown(event) {
    if (event.key === 'Escape') this.closeLightbox()
  }
}
