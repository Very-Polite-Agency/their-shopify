//////////////////////////////////////////////////////////
////  Cart
//////////////////////////////////////////////////////////

const Cart = (() => {

  let debug = true;
  let info = { name : 'Cart', version : '1.0' };

  let tools = new Tools();
  let breakpoints = new Breakpoints();
  let throttled = false;
  let config = {
    addToCart: {
      method: 'post',
      url: window.Shopify.routes.root + 'cart/add.js',
      headers: { 'Content-Type': 'application/json' },
      data: {
        items: []
      }
    },
    getCart: {
      method: 'get',
      url: window.Shopify.routes.root + 'cart.js'
    },
    changeCart: {
      method: 'post',
      url: window.Shopify.routes.root + 'cart/change.js',
      headers: { 'Content-Type': 'application/json' },
      data: {}
    }
  };

  //////////////////////////////////////////////////////////
  ////  Render Cart Item Removal by Key
  //////////////////////////////////////////////////////////

  const renderCartItemRemovalByKey = ( key = '' ) => {
    let element = document.getElementById(`cart-line-item--${key}`) || false;
    if ( element ) element.remove();
  };

  //////////////////////////////////////////////////////////
  ////  Render Cart Items Count
  //////////////////////////////////////////////////////////

  const renderCartItemsCount = ( count = 0 ) => {
    ( document.querySelectorAll('.js--cart-item-count') || [] ).forEach( element => {
      element.innerHTML = `${count}`;
      if ( count > 0 ) {
        element.classList.add('has-items');
      } else {
        element.classList.remove('has-items');
      }
    });
  };

  //////////////////////////////////////////////////////////
  ////  Render Empty Cart Message
  //////////////////////////////////////////////////////////

  const renderEmptyCartMessage = () => {
    alert('Your cart is empty!');
  };

  //////////////////////////////////////////////////////////
  ////  Get Cart
  //////////////////////////////////////////////////////////

  const getCart = () => {
    axios( config.getCart ).then(function (response) {
      console.log( 'getCart :: Succes', response );
      renderCartItemsCount(response.data.item_count);
    })
    .catch(function (error) {
      console.log( 'getCart :: Error', error );
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
          config.addToCart.data.items.push({ id: variantID, quantity: quantity });
          axios( config.addToCart ).then(function (response) {
            console.log( 'onButtonClickAddProductToCart :: Succes', response );
          })
          .catch(function (error) {
            console.log( 'onButtonClickAddProductToCart :: Succes', error );
          })
          .then(function () {
            getCart();
          });
        }

      });
    });
  };

  //////////////////////////////////////////////////////////
  ////  On Button Click Add Product To Cart
  //////////////////////////////////////////////////////////

  const onClickRemoveCartLineItem = () => {

    let buttons = document.getElementsByClassName("js--remove-cart-line-item") || [];

    Array.from(buttons).forEach( button => {
      button.addEventListener('click', event => {

        let key = button.closest('.cart-line-item') ? button.closest('.cart-line-item').dataset.lineItemKey : false;

        if ( key ) {
          config.changeCart.data = {
            id: key,
            quantity: 0
          };
          axios( config.changeCart ).then(function (response) {
            console.log( 'changeCart :: Succes', response );

            let items_count = response.data.item_count || 0;

            if ( items_count ) {
              renderCartItemsCount( items_count );
              renderCartItemRemovalByKey( key  );
            } else {
              renderEmptyCartMessage();
            }

          })
          .catch(function (error) {
            console.log( 'changeCart :: Error', error );
          })
          .then(function () {});
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
    onClickRemoveCartLineItem();

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
