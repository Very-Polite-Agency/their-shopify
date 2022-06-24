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
      let elementRect = element.getBoundingClientRect();
      let options = renderProductOptions( product );
      let { featured_image: image = {}, product_title: title = '' } = product;
      let animation = anime.timeline({
        targets: element,
        easing: 'easeOutExpo'
      });

      image.size = {
        small: image.url ? Theme.imgURLFilter( image.url, 'small' ) : '',
        pico: image.url ? Theme.imgURLFilter( image.url, 'pico' ) : '',
      };

      element.innerHTML = `
        <div class="${elementID}__main">

          <div class="${elementID}__image">
            <img class="lazyload-item lazyload-item--image lazypreload lazyload-item--inline inline lazyautosizes lazyload" src="${image.size.pico}" data-src="${image.size.small}" alt="${image.alt}" width="${image.width}" height="${image.height}" />
          </div>

          <div class="${elementID}__content">

            <div class="${elementID}__notice">
              <span class="${elementID}__notice-message">Added to Bag</span>
              <span class="${elementID}__notice-icon"></span>
            </div>

            <div class="${elementID}__product-details">
              <strong class="${elementID}__product-title">${title}</strong>
              ${ options ? options : '' }
              <div class="${elementID}__quantity">x 1</div>
            </div>

            <div class="${elementID}__cta">
              <a class="${elementID}__cta-link link" href="/cart" target="_self">Review Bag</a>
            </div>

          </div>

        </div>
      `;

      animation.add({
        translateX: 0,
        opacity: 1,
        duration: 250
      })
      .add({
        targets: element.querySelector(`.${elementID}__notice`),
        opacity: 1,
        delay: 350,
        duration: 550
      })
      .add({
        translateX: elementRect.width,
        opacity: 0,
        delay: 2750,
        duration: 550
      });

      animation.play;

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
