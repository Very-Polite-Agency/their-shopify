//////////////////////////////////////////////////////////
////  Footer
//////////////////////////////////////////////////////////

const Footer = (() => {

  let debug = true;
  let info = { name : 'Footer', version : '1.0' };

  let breakpoints = new Breakpoints();
  let throttled = false;

  //////////////////////////////////////////////////////////
  ////  Close Menu
  //////////////////////////////////////////////////////////

  const setFooterLegalContainerPosition = () => {

    let footerLegal = document.querySelector('.footer__legal') || false;
    let footerImageDesktop = document.querySelector('.footer__image.d-lg-block') || false;
    let containerPadding = getComputedStyle(document.documentElement).getPropertyValue('--bs-container-fluid-padding');

    console.log({ footerLegal, footerImageDesktop, containerPadding });

    if ( footerLegal && footerImageDesktop ) {
      if ( window.innerWidth >= breakpoints.sizes.lg ) {
        footerLegal.style.paddingLeft = footerImageDesktop.offsetWidth + 28 + 'px';
      } else {
        footerLegal.style.paddingLeft = 'unset';
      }
    }

  };

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $options = false ) => {

    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );

    setFooterLegalContainerPosition();

    // ---------------------------------------- On resize, execute functions
    window.addEventListener( 'resize', function(e) {
      if ( !throttled ) {
        window.requestAnimationFrame(function() {
          setFooterLegalContainerPosition();
          throttled = false;
        });
        throttled = true;
      }
    });

    if ( debug ) console.log( `${info.name}.init() Finished` );

  };

  //////////////////////////////////////////////////////////
  ////  Returned
  //////////////////////////////////////////////////////////

  return {
    debug,
    info,
    init,
  };

});
