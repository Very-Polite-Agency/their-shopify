//////////////////////////////////////////////////////////
////  Render
//////////////////////////////////////////////////////////

const Render = (() => {

  let debug = false;
  let info = { name : 'Render', version : '1.0' };

  let tools = new Tools();
  let breakpoints = new Breakpoints();

  //////////////////////////////////////////////////////////
  ////  Set Header Total Height to CSS Var
  //////////////////////////////////////////////////////////

  let notification = {
    productAddedToCart: function( product = {} ) {

      console.log( 'productAddedToCart ::', product );

      let abc = 'add-to-cart-notification';
      let element = document.getElementById(abc) || false;
      let {
        featured_image: image = {},
        options_with_values: options = [],
        product_title: title = '',
      } = product;
      let template = `
        <div class="${abc}__main">
          <div class="${abc}__image">
            <img class="lazyload-item lazyload-item--image lazypreload lazyload-item--inline inline lazyautosizes lazyload" src="${image.size.pico}" data-src="${image.size.compact}" alt="${image.alt}" width="${image.width}" height="${image.height}" />
          </div>
          <div class="${abc}__content">
            <strong class="${abc}__product-title caption caption--2">${title}</strong>
          </div>
        </div>
      `;

      element.innerHTML = template;

    }
  };

  //////////////////////////////////////////////////////////
  ////  Returned
  //////////////////////////////////////////////////////////

  return {
    debug,
    info,
    notification
  };

});
