// document.addEventListener('turbo:load', function() {
//   document.querySelector('.navbar-nav').addEventListener('click', function(event) {
//     event.preventDefault();
//     let clickedNavItem = event.target.closest('.nav-item');
//     if (clickedNavItem) {
//       var navItems = document.querySelectorAll('.navbar-nav .nav-item');
//       navItems.forEach(function(nav) {
//         nav.classList.remove('active');
//       });
//       clickedNavItem.classList.add('active');
//     }
//   });
// });

// document.addEventListener('turbo:load', function() {
//   // Identify the current path
//   const path = window.location.pathname;

//   // Query all nav items
//   const navItems = document.querySelectorAll('.navbar-nav .nav-item');

//   // Remove 'active' class from all nav items
//   navItems.forEach(function(nav) {
//     nav.classList.remove('active');
//     // Find the <a> tag within the nav item and compare its href attribute to the current path
//     const link = nav.querySelector('a');
//     if (link && link.getAttribute('href') === path) {
//       nav.classList.add('active'); // Add 'active' class if the href matches the current path
//     }
//   });
// });

// document.addEventListener('DOMContentLoaded', function() {
//   // First, define the variables by selecting the elements from the DOM.
//   var navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
//   var mainContent = document.querySelector('.body-content'); // Target the main content wrapper

//   // Log the values after they have been defined.
  // console.log('Navbar height:', navbarHeight);
  // console.log('Main content found:', mainContent);

//   // Apply the margin top if mainContent is found.
//   if (mainContent) {
//     mainContent.style.paddingTop = `${navbarHeight}px !important`;
//   }
// });


// document.addEventListener('turbo:load', () => {
//   adjustContentMargin();
// });

// function adjustContentMargin() {
//   const navbar = document.querySelector('.navbar');
//   const mainContent = document.querySelector('.body-content');
//   if (navbar && mainContent) {
//     const navbarHeight = navbar.offsetHeight;
//     mainContent.style.marginTop = `${navbarHeight}px`;
//   }
// }
