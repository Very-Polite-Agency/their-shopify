//////////////////////////////////////////////////////////
////  Mobile Menu
//////////////////////////////////////////////////////////

const MobileMenu = (() => {

  let debug = false;
  let info = { name : 'MobileMenu', version : '1.0' };

  let tools = new Tools();
  let elements = tools.getArrayOfElementsByTag();
  let trigger = document.querySelectorAll('.js--mobile-menu-trigger') || [];

  //////////////////////////////////////////////////////////
  ////  Toggle Mobile Menu
  //////////////////////////////////////////////////////////

  const toggleMobileMenu = () => {
    trigger.forEach( el => {
      el.addEventListener('click',() => {
        tools.toggleClass( 'mobile-menu--active', elements );
        el.classList.toggle( 'is-active' );
      });
    });
  };

  //////////////////////////////////////////////////////////
  ////  Close Menu
  //////////////////////////////////////////////////////////

  const closeMenu = () => {
    document.body.addEventListener('click', event => {
      let isMobileMenu = event.target.closest('#shopify-section-mobile-menu') ? true : false;
      let isMobileMenuTrigger = event.target.closest('.js--mobile-menu-trigger') ? true : false;
      if ( !isMobileMenu && !isMobileMenuTrigger ) {
        tools.removeClass( 'mobile-menu--active', elements );
        trigger.forEach( el => {
          el.classList.remove( 'is-active' );
        })
      }
    });
  };

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $options = false ) => {
    if ( debug ) console.log( `${info.name}.init() Started` );
    closeMenu();
    toggleMobileMenu();
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
