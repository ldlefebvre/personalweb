import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
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

    this.showProjectDetails('exad-details', false); // Display EXAD details by default without scrolling
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
}
