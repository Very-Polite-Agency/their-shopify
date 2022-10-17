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
    let footerNewsletter = document.querySelector('.footer__newsletter') || false;

    if ( footerLegal && footerNewsletter ) {
      if ( window.innerWidth >= breakpoints.sizes.lg ) {
        footerLegal.style.paddingLeft = `${footerNewsletter.offsetLeft}px`;
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
