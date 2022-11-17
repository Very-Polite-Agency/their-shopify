//////////////////////////////////////////////////////////
////  Add to Cart
//////////////////////////////////////////////////////////

const AddToCart = (() => {

  let debug = false;
  let info = { name : 'Add to Cart', version : '1.0' };

  let tools = new Tools();
  let breakpoints = new Breakpoints();
  let throttled = false;
  let config = {
    getCart: {
      method: 'get',
      url: window.Shopify.routes.root + 'cart.js'
    },
    addToCart: {
      method: 'post',
      url: window.Shopify.routes.root + 'cart/add.js',
      headers: { 'Content-Type': 'application/json' },
      data: {
        items: []
      }
    }
  };

  //////////////////////////////////////////////////////////
  ////  Get Cart
  //////////////////////////////////////////////////////////

  const getCart = () => {
    axios( config.getCart ).then(function (response) {
      alert(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {});
  };

  //////////////////////////////////////////////////////////
  ////  On Button Click Add Product To Cart
  //////////////////////////////////////////////////////////

  const onButtonClickAddProductToCart = () => {
    ( document.querySelectorAll('.js--add-to-cart') || [] ).forEach( button => {
      button.addEventListener('click', event => {

        event.preventDefault();

        let variantID = parseInt( button.dataset.variantId ) || 0;
        let quantity = parseInt( button.dataset.quantity ) || 0;

        if ( variantID && quantity ) {
          config.data.items.push({ id: variantID, quantity: quantity });
          axios( config ).then(function (response) {
            console.log( response );
            getCart();
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {

          });
        }

      });
    });
  };

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $options = false ) => {

    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );

    // execute expression
    onButtonClickAddProductToCart();

    // ---------------------------------------- On resize, execute functions
    window.addEventListener( 'resize', function(e) {
      if ( !throttled ) {
        window.requestAnimationFrame(function() {

          // throttled expression
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
