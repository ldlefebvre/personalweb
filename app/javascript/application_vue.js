// import { createApp } from "vue";

// document.addEventListener('turbo:load', () => {
//   const appElement = document.getElementById('vue-app');
//   if (!appElement) return;

//   const app = createApp({
//     data() {
//       return {
//         navbarHeight: 0,
//       };
//     },
//     mounted() {
//       this.calculateNavbarHeight();
//     },
//     methods: {
//       calculateNavbarHeight() {
//         const navbar = document.querySelector('.navbar');
//         if (navbar) {
//           this.navbarHeight = navbar.offsetHeight;
//           // Apply the height as padding or margin to your content
//           // This is a placeholder; adjust according to your HTML structure
//           this.$el.style.paddingTop = `${this.navbarHeight}px`;
//         }
//       },
//     },
//   });

//   app.mount('#vue-app');
// });
