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

      let elementID = 'add-to-cart-notification';
      let element = document.getElementById(elementID) || false;
      let options = renderProductOptions( product );
      let { featured_image: image = {}, product_title: title = '' } = product;

      image.size = {
        compact: image.url ? Theme.imgURLFilter(image.url, 'compact') : '',
        pico: image.url ? Theme.imgURLFilter(image.url, 'pico') : '',
      };

      element.innerHTML = `
        <div class="${elementID}__main">
          <div class="${elementID}__image">
            <img class="lazyload-item lazyload-item--image lazypreload lazyload-item--inline inline lazyautosizes lazyload" src="${image.size.pico}" data-src="${image.size.compact}" alt="${image.alt}" width="${image.width}" height="${image.height}" />
          </div>
          <div class="${elementID}__content">
            <strong class="${elementID}__product-title caption caption--2">${title}</strong>
            ${ options ? options : '' }
          </div>
        </div>
      `;

      function renderProductOptions( product = {} ) {

        let { options_with_values: options = [] } = product;
        let template = '';

        if ( options.length ) {
          options.forEach( option => {

            let { name = '', value = '' } = option;
            if ( 'Default Title' !== value ) {
              console.log( option );
              template += `
                <div class="${elementID}__product-option">
                  <div class="${elementID}__product-option-name">${name}</div>
                  <div class="${elementID}__product-option-value">${value}</div>
                </div>
              `;
            }

          });
        }

        return template;

      }

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
