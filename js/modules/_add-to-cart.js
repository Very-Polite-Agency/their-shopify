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
  ////  Render Product Option Price
  //////////////////////////////////////////////////////////

  const renderProductOptionPrice = ( price = 0, priceCompareAt = 0 ) => {

    let currency_code = Theme.currency.iso_code;

    return `
      ${(function () {
        if ( priceCompareAt ) {
	        return `
            <span class="price__amount">${ priceCompareAt/100 }<span class="price__currency-code">${ currency_code }</span></span>
            <span class="price__amount compare-at-price">${ price/100 }<span class="price__currency-code">${ currency_code }</span></span>
          `;
        } else {
          return `
            <span class="price__amount">${ price/100 }<span class="price__currency-code">${ currency_code }</span></span>
          `;
        }

      })()}
    `;

  };

  //////////////////////////////////////////////////////////
  ////  On Product Options Change
  //////////////////////////////////////////////////////////

  const onProductOptionsChange = () => {
    let select = document.querySelector('.product-options__variants') || false;
    if ( select ) {
      select.addEventListener('change', function() {
        let option = this.options[this.selectedIndex];
        console.log( 'onChangeUpdateSelectedOption :: ', option );
        updateProductAddToCartButton( option );
        updateProductPrice( option );
      });
    }
  };

  //////////////////////////////////////////////////////////
  ////  Update Add to Cart Button
  //////////////////////////////////////////////////////////

  const updateProductAddToCartButton = ( option = {} ) => {
    ( document.querySelectorAll('.js--add-to-cart') || [] ).forEach( button => {
      button.dataset.variantId = option.value || 0;
    });
  };

  //////////////////////////////////////////////////////////
  ////  Update Product Price
  //////////////////////////////////////////////////////////

  const updateProductPrice = ( option = {} ) => {

    let price = parseInt(option.dataset.price) || 0;
    let priceCompareAt = parseInt(option.dataset.compareAtPrice) || 0;

    ( document.querySelectorAll('.product-details__price') || [] ).forEach( productPriceDetails => {
      productPriceDetails.innerHTML = renderProductOptionPrice( price, priceCompareAt );
    });

  };

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $options = false ) => {

    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );
    onProductOptionsChange();
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
