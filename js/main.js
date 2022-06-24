// @codekit-prepend quiet "../node_modules/animejs/lib/anime.min.js";
// @codekit-prepend quiet "../node_modules/aos/dist/aos.js";
// @codekit-prepend quiet "../node_modules/axios/dist/axios.min.js";
// @codekit-prepend quiet "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
// @codekit-prepend quiet "../node_modules/@glidejs/glide/dist/glide.min.js";
// @codekit-prepend quiet "../node_modules/validator/validator.min.js";

// @codekit-prepend "./modules/_cart.js";
// @codekit-prepend "./modules/_credits.js";
// @codekit-prepend "./modules/_breakpoints.js";
// @codekit-prepend "./modules/_forms.js";
// @codekit-prepend "./modules/_gliders.js";
// @codekit-prepend "./modules/_header.js";
// @codekit-prepend "./modules/_instagramFeed.js";
// @codekit-prepend "./modules/_mobileMenu.js";
// @codekit-prepend "./modules/_modals";
// @codekit-prepend "./modules/_product.js";
// @codekit-prepend "./modules/_render.js";
// @codekit-prepend "./modules/_scrolling.js";
// @codekit-prepend "./modules/_sizing.js";
// @codekit-prepend "./modules/_stepper.js";
// @codekit-prepend "./modules/_tools.js";

//////////////////////////////////////////////////////////////////////////////////////////
////  Execute Theme
//////////////////////////////////////////////////////////////////////////////////////////

let modules = [
  new Cart(),
  new Forms(),
  new Gliders(),
  new Header(),
  new InstagramFeed(),
  new MobileMenu(),
  new Product(),
  new Scrolling(),
  new Sizing(),
  new Stepper(),
  new Credits(),
];

modules.forEach( module => module.init() );

AOS.init({
  offset: 150,                  // offset (in px) from the original trigger point
  delay: 0,                     // values from 0 to 3000, with step 50ms
  duration: 550,                // values from 0 to 3000, with step 50ms
  easing: 'ease-in-out',        // default easing for AOS animations
});
