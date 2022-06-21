//////////////////////////////////////////////////////////
////  Add to Cart
//////////////////////////////////////////////////////////

const AddToCart = (() => {

  let debug = true;
  let info = { name : 'Add to Cart', version : '1.0' };

  let tools = new Tools();
  let breakpoints = new Breakpoints();
  let throttled = false;

  //////////////////////////////////////////////////////////
  ////  Is Variant Available
  //////////////////////////////////////////////////////////

  const isVariantAvailable = ( $option = false ) => {
    if ( $option && parseInt($option.dataset.inventory) > 0 ) {
      return true;
    }
    return false;
  };

  //////////////////////////////////////////////////////////
  ////  Select on Change
  //////////////////////////////////////////////////////////

  const onChangeUpdateSelectedOption = () => {
    let select = document.querySelector('.product-options__variants') || false;
    if ( select ) {
      select.addEventListener('change', function() {
        let option = this.options[this.selectedIndex];
        console.log( 'onChangeUpdateSelectedOption :: ', option );
        updateAddToCartButton( option );
      });
    }
  };

  //////////////////////////////////////////////////////////
  ////  Update Add to Cart Button
  //////////////////////////////////////////////////////////

  const updateAddToCartButton = ( option = false ) => {
    if ( option ) {

      let inventory = parseInt(option.dataset.inventory) || 0;
      let inventoryPolicy = option.dataset.inventoryPolicy || '';
      let inventoryManagement = option.dataset.inventoryManagement || ''; // shopify
      let variantID = option.value || 0;

      ( document.querySelectorAll('.js--add-to-cart') || [] ).forEach( button => {
        button.dataset.variantId = variantID;
      });

    }
  }

  //////////////////////////////////////////////////////////
  ////  Update Price
  //////////////////////////////////////////////////////////

  const updatePrice = ( option = false ) => {
    if ( option ) {

//       let price = parseInt(option.dataset.price) || 0;
//       let priceCompare = parseInt(option.dataset.priceCompare) || 0;
//       let template = `$${(price/100).toFixed(2)}`;
//       if ( priceCompare && priceCompare > price ) {
//         template += ` <span class="product__price-compare-at">$${(priceCompare/100).toFixed(2)}</span>`;
//       }
//
//       ( document.querySelectorAll('.product__price') || [] ).forEach( element => {
//         if ( !element.classList.contains('product__price--recommended') ) {
//           element.innerHTML = template;
//         }
//       });

    }
  }

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $options = false ) => {

    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );

    onChangeUpdateSelectedOption();

    // execute expression
    ( document.querySelectorAll('.js--add-to-cart') || [] ).forEach( button => {
      button.addEventListener('click', event => {
        console.log('clicked');
        event.preventDefault();
        addProductToCartFromButton( button );
      });
    });

    function addProductToCartFromButton( button = false ) {

      //
      //   let variantID = parseInt( $button.dataset.variantId ) || 123456;
      //   let quantity = parseInt( $button.dataset.quantity ) || 1;
      //   let image = $button.dataset.featuredImage || '';
      //   let config = {
      //     method: 'post',
      //     url: window.Shopify.routes.root + 'cart/add.js',
      //     headers: { 'Content-Type': 'application/json' },
      //     data: { 'items': [{ 'id': variantID, 'quantity': quantity }] }
      //   };
      //
      //   axios( config ).then(function (response) {
      //     notifyUser( response.data.items );
      //     updateCartItemsCount();
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   })
      //   .then(function () {});

      if ( button ) {

        let productForm = button.closest('form') || [];
        let variantID = productForm.querySelector('[name="id"]').value;
        let variantQty = productForm.querySelector('[name="quantity"]').value;

        console.log({
          productForm,
          variantID,
          variantQty
        });

      }

    };


    function variantOptionSelector( button = false ) {

      //
      //   let variantID = parseInt( $button.dataset.variantId ) || 123456;
      //   let quantity = parseInt( $button.dataset.quantity ) || 1;
      //   let image = $button.dataset.featuredImage || '';
      //   let config = {
      //     method: 'post',
      //     url: window.Shopify.routes.root + 'cart/add.js',
      //     headers: { 'Content-Type': 'application/json' },
      //     data: { 'items': [{ 'id': variantID, 'quantity': quantity }] }
      //   };
      //
      //   axios( config ).then(function (response) {
      //     notifyUser( response.data.items );
      //     updateCartItemsCount();
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   })
      //   .then(function () {});

      if ( button ) {

        let productForm = button.closest('form') || [];
        let variantID = productForm.querySelector('[name="id"]').value;
        let variantQty = productForm.querySelector('[name="quantity"]').value;

        console.log({
          productForm,
          variantID,
          variantQty
        });

      }

    };


    function renderOptionPrice( price = 0, compare_price = 0 ) {

      let currency_code = Theme.currency.iso_code;

      return `
        ${(function () {
	        if ( compare_price ) {
		        return `
              <span class="price__amount">${ compare_price/100 }<span class="price__currency-code">${ currency_code }</span></span>
              <span class="price__amount compare-at-price">${ price/100 }<span class="price__currency-code">${ currency_code }</span></span>
            `;
	        } else {
            return `
              <span class="price__amount">${ price/100 }<span class="price__currency-code">${ currency_code }</span></span>
            `;
          }

        })()}
      `;

    }

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
