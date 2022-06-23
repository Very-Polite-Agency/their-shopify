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
  ////  Render Cart Checkout Amount
  //////////////////////////////////////////////////////////

  const renderCartCheckoutChargeAmount = ( amount = 0 ) => {
    ( document.querySelectorAll('.js--checkout-charge-amount') || [] ).forEach( element => {
      element.innerHTML = `${amount}`;
    });
  };

  //////////////////////////////////////////////////////////
  ////  Render Empty Cart Message
  //////////////////////////////////////////////////////////

  const renderEmptyCartMessage = () => {
    alert('Your cart is empty!');
  };

  //////////////////////////////////////////////////////////
  ////  Add to Cart
  //////////////////////////////////////////////////////////

  const addToCart = ( arrOfProducts = [] ) => {

    config.addToCart.data.items = arrOfProducts

    axios( config.addToCart ).then(function (response) {
      console.log( 'addToCart :: Axios Success', response );
      config.addToCart.data.items.length = 0;
      getCart();
    })
    .catch(function (error) {
      console.log( 'addToCart :: Axios Error', error );
    })
    .then(function () {});

  };

  //////////////////////////////////////////////////////////
  ////  Change Cart (By Key & Quantity)
  //////////////////////////////////////////////////////////

  const changeCart = ( key = '', quantity = 1 ) => {

    if ( key ) {

      config.changeCart.data = { id: key, quantity: quantity };

      axios( config.changeCart ).then(function (response) {
        console.log( response );
        renderCartCheckoutChargeAmount(response.data.items_subtotal_price/100);
        renderCartItemsCount(response.data.item_count);
        if ( 0 === response.data.item_count ) renderEmptyCartMessage();
        if ( 0 === quantity ) renderCartItemRemovalByKey( key );
      })
      .catch(function (error) {
        console.log( 'changeCart :: Axios Error', error );
      })
      .then(function () {});

    } else {
      console.log( 'changeCart :: Arguments Error', { key, quantity } );
    }

  };

  //////////////////////////////////////////////////////////
  ////  Get Cart
  //////////////////////////////////////////////////////////

  const getCart = () => {

    axios( config.getCart ).then(function (response) {
      console.log( 'getCart :: Axios Success', response );
      renderCartItemsCount(response.data.item_count);
      renderCartCheckoutChargeAmount(response.data.items_subtotal_price/100);
    })
    .catch(function (error) {
      console.log( 'getCart :: Axios Error', error );
    })
    .then(function () {});

  };

  //////////////////////////////////////////////////////////
  ////  On Button Click Add Product To Cart
  //////////////////////////////////////////////////////////

  const onClickAddProductToCart = () => {
    ( document.querySelectorAll('.js--add-to-cart') || [] ).forEach( button => {
      button.addEventListener('click', event => {

        let id = parseInt( button.dataset.variantId ) || 0;
        let quantity = parseInt( button.dataset.quantity ) || 1;
        if ( id ) addToCart([ { id, quantity } ]);

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

        let key = button.closest('.cart-line-item') ? button.closest('.cart-line-item').dataset.lineItemKey : '';
        changeCart( key, 0 );

      });
    });

  };

  //////////////////////////////////////////////////////////
  ////  On Click Update Line Item
  //////////////////////////////////////////////////////////

  const onClickUpdateLineItem = () => {

    let inputs = document.getElementsByClassName("stepper__input") || [];
    let buttons = document.getElementsByClassName("stepper__button") || [];
    let timer = {
      input: false,
      button: false,
      delay: 250
    };

    Array.from(inputs).forEach( input => {
      input.addEventListener('input', event => {

        clearTimeout(timer.input);

        let quantity = parseInt(input.value);
        let key = input.closest('.cart-line-item') ? input.closest('.cart-line-item').dataset.lineItemKey : '';

        timer.input = setTimeout(() => {
          changeCart( key, quantity );
        }, timer.delay);

      });
    });

    Array.from(buttons).forEach( button => {
      button.addEventListener('click', event => {

        clearTimeout(timer.button);

        let action = button.name || '';
        let input = button.dataset.targetId ? document.getElementById(button.dataset.targetId) : false;
        let key = button.closest('.cart-line-item') ? button.closest('.cart-line-item').dataset.lineItemKey : '';
        let maximum = input ? ( input.max ? parseInt(input.max) : 9999 ) : 9999;
        let minimum = input ? ( input.min ? parseInt(input.min) : 1 ) : 1;
        let quantity = input ? parseInt(input.value) : 1;

        switch ( action ) {
          case 'decrease': {
            quantity--;
            break;
          }
          case 'increase': {
            quantity++;
            break;
          }
        }

        quantity = ( quantity > minimum ) ? quantity : minimum;
        input.value = quantity

        timer.button = setTimeout(() => {
          changeCart( key, quantity );
        }, timer.delay);

      });
    });

  };

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $options = false ) => {

    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );

    // execute expression
    onClickAddProductToCart();
    onClickRemoveCartLineItem();
    onClickUpdateLineItem();

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
