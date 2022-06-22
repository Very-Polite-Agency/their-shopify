//////////////////////////////////////////////////////////
////  Product
//////////////////////////////////////////////////////////

const Product = (() => {

  let debug = true;
  let info = { name : 'Product', version : '1.0' };

  let elements = {
    optionSelector: document.querySelector('select.product-options__variants') || false,
    buttonAddToCart: document.querySelectorAll('.js--add-to-cart') || [],
    price: document.querySelectorAll('.product-details__price') || []
  };
  let tools = new Tools();
  let breakpoints = new Breakpoints();
  let throttled = false;

  //////////////////////////////////////////////////////////
  ////  Render Product Option Price
  //////////////////////////////////////////////////////////

  const renderProductOptionPrice = ( price = 0, priceCompareAt = 0 ) => {

    let currency_code = Theme.currency.iso_code || 'CAD';

    return `
      ${(function () {
        if ( priceCompareAt ) {
	        return `
            <span class="price__amount">${ price/100 }<span class="price__currency-code">${ currency_code }</span></span>
            <span class="price__amount compare-at-price">${ priceCompareAt/100 }<span class="price__currency-code">${ currency_code }</span></span>
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
    if ( elements.optionSelector ) {
      elements.optionSelector.addEventListener( 'change', function() {
        let option = this.options[this.selectedIndex];
        updateProductAddToCartButton( option );
        updateProductPrice( option );
      });
    }
  };

  //////////////////////////////////////////////////////////
  ////  Update Add to Cart Button
  //////////////////////////////////////////////////////////

  const updateProductAddToCartButton = ( option = {} ) => {
    elements.buttonAddToCart.forEach( button => {
      button.dataset.variantId = option.value || 0;
    });
  };

  //////////////////////////////////////////////////////////
  ////  Update Product Price
  //////////////////////////////////////////////////////////

  const updateProductPrice = ( option = {} ) => {

    let price = parseInt(option.dataset.price) || 0;
    let priceCompareAt = parseInt(option.dataset.compareAtPrice) || 0;

    elements.price.forEach( element => {
      element.innerHTML = renderProductOptionPrice( price, priceCompareAt );
    });

  };

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $options = false ) => {

    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );
    let option = elements.optionSelector.options[elements.optionSelector.selectedIndex];
    updateProductAddToCartButton( option );
    updateProductPrice( option );
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
