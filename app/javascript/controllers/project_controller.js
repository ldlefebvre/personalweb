import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    document.querySelectorAll('.project-details-link').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        var targetId = link.getAttribute('href').substring(1);
        document.querySelectorAll('.project-details-section').forEach((section) => {
          section.style.display = 'none';
        });
        document.getElementById(targetId).style.display = 'block';
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
}
