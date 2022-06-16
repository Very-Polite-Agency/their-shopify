//////////////////////////////////////////////////////////
////  Gliders
//////////////////////////////////////////////////////////

const Gliders = (() => {

  let debug = false;
  let info = { name : 'Gliders', version : '1.1' };

  let tools = new Tools();
  let breakpoints = new Breakpoints();
  let gliders = {};
  let targets = '.js--glider';
  let throttled = false;

  //////////////////////////////////////////////////////////
  ////  Get Gliders
  //////////////////////////////////////////////////////////

  const getGliders = () => {
    return document.querySelectorAll( targets ) || [];
  };

  //////////////////////////////////////////////////////////
  ////  Glider Options
  //////////////////////////////////////////////////////////

  const gliderOptions = ( $customOptions = false ) => {

    let options = {
      animationTimingFunc: 'ease-in-out',
      animationDuration: 280,
      autoplay: 3200,
      breakpoints: {},
      hoverpause: true,
      perView: 1,
      type: 'carousel',
      rewind: true,
      throttle: 50,
      gap: 12,
    };

    if ( $customOptions && (typeof $customOptions == "object") ) {
      options = { ...options, ...$customOptions };
    }

    return options;

  };

  //////////////////////////////////////////////////////////
  ////  Set Gliders
  //////////////////////////////////////////////////////////

  const setGliders = () => {

    let gliderElements = getGliders();

    for ( let i = 0; i < gliderElements.length; i++ ) {

      let element = gliderElements[i];
      let id = element.id;
      let style = element.dataset.glideStyle || 'not-set';
      let desktopOnly = element.dataset.glideDesktopOnly === 'true' || false;
      let mobileOnly = element.dataset.glideMobileOnly === 'true' || false;
      let gap = element.dataset.glideGap === 'true' || false;
      let options = gliderOptions();

      gliders[id] = {
        desktopOnly: desktopOnly,
        glider: false,
        element: element,
        id: id,
        active: false,
        style: style,
        mobileOnly: mobileOnly,
        gap: gap,
      };

      switch ( style ) {
        case 'feature-carousel': {
          options = gliderOptions({
            autoplay: 0,
            gap: 0,
            peek: 0,
            perView: 1,
            direction: 'rtl',
            breakpoints: {
              // up to 9999
              9999: {
                gap: 100,
                peek: { before: 0, after: 175 },
                perView: 3
              },
              // up to 1400
              1399: {
                gap: 90,
                peek: { before: 0, after: 175 },
                perView: 2
              },
              // up to 1200
              1199: {
                gap: 80,
                peek: { before: 0, after: 175 },
                perView: 2
              },
              // up to 992
              991: {
                gap: 50,
                peek: { before: 0, after: 100 },
                perView: 2
              },
              // up to 768
              767: {
                gap: 50,
                peek: { before: 0, after: 150 },
                perView: 1
              },
              // up to 576
              575: {
                gap: 50,
                peek: { before: 0, after: 100 },
                perView: 1
              }
            }
          });
          break;
        }
        case 'header-announcements': {
          options = gliderOptions({
            autoplay: 3800,
            gap: 0,
            peek: 0,
            perView: 1,
            breakpoints: {},
          });
          break;
        }
      }

      if ( gap ) {
        options.gap = 10;
      }

      gliders[id].options = options;

    }

  };

  //////////////////////////////////////////////////////////
  ////  Initialize Gliders
  //////////////////////////////////////////////////////////

  const initGliders = () => {

    if ( debug ) console.log( 'initGliders started' );

    let windowWidth = window.innerWidth;

    for ( let key in gliders ) {

      let glider = gliders[key];

      if ( glider.mobileOnly ) {
        if ( windowWidth > breakpoints.sizes.lg ) {
          toggleGliderByID( glider.id, false, glider.options );
    	  } else {
          toggleGliderByID( glider.id, true, glider.options );
        }
      } else if ( glider.desktopOnly ) {
        if ( windowWidth >= breakpoints.sizes.lg ) {
          toggleGliderByID( glider.id, true, glider.options );
    	  } else {
          toggleGliderByID( glider.id, false, glider.options );
        }
      } else {
        toggleGliderByID( glider.id, true, glider.options );
      }

    }

    if ( debug ) console.log( 'initGliders finished' );

  };

  //////////////////////////////////////////////////////////
  ////  Toggle Glider by ID
  //////////////////////////////////////////////////////////

  const toggleGliderByID = ( $id = false, $enable = true, $options = {} ) => {

    if ( $id ) {

      let glider = gliders[$id];

      if ( $enable ) {
        if ( glider.active === false ) {

          let glide = new Glide( '#' + glider.id, $options );
          let eventsToWatch = [ 'build.after', 'run.after' ]; // recently removed 'run'

          glide.on( 'mount.after', function( e ) {

            glider.glider = glide;
            glider.active = true;
            gliders[$id] = glider;

            setTimeout( function() {
              glide.update();
            }, 250 );

          });

          glide.on( eventsToWatch, function() {
            setTimeout( () => updateGliderHeight( glider.element ), 100 );
          });

          ( document.querySelectorAll('[data-target="#' + glider.id + '"].next') || [] ).forEach( button => {
            button.addEventListener('click', function () {
              glide.go('>');
            });
          });

          ( document.querySelectorAll('[data-target="#' + glider.id + '"].prev') || [] ).forEach( button => {
            button.addEventListener('click', function () {
              glide.go('<');
            });
          });

          glide.mount();

        }
      } else {
        if ( glider.active === true ) {
          glider.glider.destroy();
          glider.element.querySelector( '.glide__track' ).style.height = 'auto';
          glider.active = false;
          gliders[$id] = glider;
        }
      }

    }

  };

  //////////////////////////////////////////////////////////
  ////  Subnavigation Controls
  //////////////////////////////////////////////////////////

  const subnavigationControls = () => {

    let targets = '.product__campaign-gallery-subnavigation-item';
    let targetElements = document.querySelectorAll('.product__campaign-gallery-subnavigation-item') || [];

    function updateGalleryByIndex( $target = false ){
      let galleryID = $target.getAttribute('data-gallery-id') || false;
      let selectedIndex = $target.getAttribute('data-gallery-item-index') || false;
      let glider = gliders[galleryID];
      if ( glider.active ) {
        glider.glider.go( '=' + selectedIndex );
      }
    }

    targetElements.forEach((target) => {
      target.addEventListener( 'click', function(){
        updateGalleryByIndex( target );
      });
    });

  };

  //////////////////////////////////////////////////////////
  ////  Update Glider Height
  //////////////////////////////////////////////////////////

  const updateGliderHeight = ( $glideElement = false ) => {

    if ( debug ) console.log( `updateGliderHeight() Started!` );

    if ( $glideElement ) {

      let activeSlide = $glideElement.querySelector( '.glide__slide--active' ) || false;
      let track = $glideElement.querySelector( '.glide__track' ) || false;

      if ( activeSlide && track ) {
        let activeSlideHeight = activeSlide.offsetHeight;
        let trackHeight = track.offsetHeight;
        if ( trackHeight != activeSlideHeight ) {
          track.style.height = activeSlideHeight + 'px';
          AOS.refresh();
        }
      }

    }

    if ( debug ) console.log( `updateGliderHeight() Finished!` );

  };

  //////////////////////////////////////////////////////////
  ////  Update Subnavigation
  //////////////////////////////////////////////////////////

  const updateGliderSubnavigation = ( $gliderObject = false, $index = false ) => {
    if ( $gliderObject ) {
      if ( debug ) console.log( 'updateGliderSubnavigation', $gliderObject );
      let elementSubnavigationItems = document.querySelectorAll( '[data-gallery-id="glide--product-campaign-gallery"]' ) || [];
      if ( elementSubnavigationItems.length ) {
        for (let i = 0; i < elementSubnavigationItems.length; i++) {
          let element = elementSubnavigationItems[i];
          let elementIndex = parseInt( element.getAttribute('data-gallery-item-index') );
          tools.removeClass( 'active', [ element ] );
          if ( $index === elementIndex ) {
            tools.addClass( 'active', [ element ] );
          }
        }
      }

    }
  }

  //////////////////////////////////////////////////////////
  ////  Public Method | Initialize
  //////////////////////////////////////////////////////////

  const init = () => {

    if ( debug ) console.log( `${info.name}.init() Started` );

    setGliders();
    initGliders();

    window.addEventListener('resize', function(e){
      if ( !throttled ) {
        window.requestAnimationFrame(function() {
          initGliders();
          throttled = false;
        });
        throttled = true;
      }
    });

    if ( debug ) console.log( `${info.name}.init() Finished` );

  };

  //////////////////////////////////////////////////////////
  ////  Returned Methods
  //////////////////////////////////////////////////////////

  return {
    debug,
    info,
    init,
    gliderOptions,
    gliders
  };

});
