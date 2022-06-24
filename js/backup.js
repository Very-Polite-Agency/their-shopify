//  ${options.map(option =>
//               `<div class="${abc}__product-option">
//                 ${console.log(option)}
//               </div>`
//             ).join('')}
//             
//             <img class="lazyload-item lazyload-item--image lazypreload lazyload-item--inline inline lazyautosizes lazyload" src="${image.size.pico}" data-src="${image.size.compact}" alt="${image.alt}" width="${image.width}" height="${image.height}" />
// 
//   const renderAddedToCartNotification = ( product = {} ) => {
// 
//     if ( notificationElement ) {
//       notificationElement.innerHTML = renderNotificationCard( title, options, image );
//     }
// 
//     var animation = anime.timeline({
//       targets: document.getElementById('shopify-add-to-cart-notification'),
//       easing: 'easeOutExpo',
//     })
//     .add({
//       translateX: 0,
//       opacity: 1,
//       duration: 250
//     })
//     .add({
//       translateX: 300,
//       opacity: 0,
//       delay: 2850,
//       duration: 850
//     });
// 
//     animation.play;

    // image = {
    //   alt: "Gold Boy Ring"
    //   aspect_ratio: 0.865
    //   height: 1664
    //   url: "https://cdn.shopify.com/s/files/1/0616/5076/3962/products/THEIR--product-image--gold-boy-ring--featured_2x_fd791ad4-dae2-4585-8232-3816b0e9bab5.png?v=1651254614"
    //   width: 1440
    // }

    // WITH VARIANT
    // discounted_price: 89900
    // discounts: []
    // featured_image: {aspect_ratio: 0.865, alt: 'Gold Boy Ring', height: 1664, url: 'https://cdn.shopify.com/s/files/1/0616/5076/3962/p…1ad4-dae2-4585-8232-3816b0e9bab5.png?v=1651254614', width: 1440}
    // final_line_price: 89900
    // final_price: 89900
    // gift_card: false
    // grams: 850
    // handle: "gold-boy-ring"
    // id: 41544576434362
    // image: "https://cdn.shopify.com/s/files/1/0616/5076/3962/products/THEIR--product-image--gold-boy-ring--featured_2x_fd791ad4-dae2-4585-8232-3816b0e9bab5.png?v=1651254614"
    // key: "41544576434362:95a9cf6ec771477a5fb6593736eb9096"
    // line_level_discount_allocations: []
    // line_level_total_discount: 0
    // line_price: 89900
    // options_with_values: [{…}]
    // options_with_values: Array(1)
    //   0:
    //   name: "Size"
    //   value: "3"
    // original_line_price: 89900
    // original_price: 89900
    // price: 89900
    // product_description: "Proin cursus efficitur magna, vel tempus augue malesuada et. Duis elit neque, malesuada sit amet ornare vitae, mattis in orci. Integer lobortis sapien risus, ac vestibulum metus dignissim vitae. Nullam suscipit, dolor eu pellentesque blandit, dolor quam egestas est, in dapibus ipsum ipsum at nisi. Morbi id est urna. Etiam eget odio eu risus accumsan pulvinar. Nunc et neque efficitur sapien vestibulum accumsan eget eu metus. Mauris porttitor mauris non sapien molestie sollicitudin. Pellentesque at auctor odio. Ut convallis ultricies turpis, in egestas nisl sodales sed. Phasellus a ex sit amet odio tincidunt facilisis ut eu sem. Ut quis nibh tristique odio ultricies malesuada. Donec tristique vel enim in volutpat."
    // product_has_only_default_variant: false
    // product_id: 7078860980410
    // product_title: "Gold Boy Ring"
    // product_type: "24k Gold Plated Ring"
    // properties: null
    // quantity: 1
    // requires_shipping: true
    // sku: ""
    // taxable: true
    // title: "Gold Boy Ring - 4"
    // total_discount: 0
    // url: "/products/gold-boy-ring?variant=41544576434362"
    // variant_id: 41544576434362
    // variant_options: ['4']
    // variant_title: "4"
    // vendor: "Their Jewelry and Accessories"

    // NO VARIANT
    // discounted_price: 89900
    // discounts: []
    // featured_image: {aspect_ratio: 0.866, alt: '24k Gold Plated Ring Smooth', height: 1066, url: 'https://cdn.shopify.com/s/files/1/0616/5076/3962/p…7deb-4e59-4cb3-b2a9-d264657ca6f3.png?v=1651008831', width: 923}
    // final_line_price: 1258600
    // final_price: 89900
    // gift_card: false
    // grams: 850
    // handle: "24k-gold-plated-ring-smoothooth"
    // id: 41367931191482
    // image: "https://cdn.shopify.com/s/files/1/0616/5076/3962/products/THEIR--product-image--gold-ring-smooth--featured_4x_b6387deb-4e59-4cb3-b2a9-d264657ca6f3.png?v=1651008831"
    // key: "41367931191482:3431ba3af2494717c9596e7a463713c1"
    // line_level_discount_allocations: []
    // line_level_total_discount: 0
    // line_price: 1258600
    // options_with_values: [{…}]
    // original_line_price: 1258600
    // original_price: 89900
    // price: 89900
    // product_description: "Aliquam tincidunt porttitor mi in pellentesque. Nam nec mi quis nisi accumsan placerat. Sed enim dolor, auctor eget porttitor quis, pellentesque eu tellus. Donec tempor sapien et odio eleifend vestibulum. Nam vitae dui eu purus placerat tristique in in erat. Aliquam erat volutpat. Etiam sed augue eu mauris interdum scelerisque et feugiat libero. Aliquam quis ornare lectus. Pellentesque in ligula vel diam maximus posuere. Sed porta at odio in efficitur. Praesent vel dapibus orci. Morbi venenatis id quam quis rutrum. Pellentesque pharetra suscipit purus, sed facilisis odio mattis nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    // product_has_only_default_variant: true
    // product_id: 7076410523834
    // product_title: "24k Gold Plated Ring Smooth"
    // product_type: "24k Gold Plated Ring Smooth"
    // properties: {}
    // quantity: 14
    // requires_shipping: true
    // sku: ""
    // taxable: true
    // title: "24k Gold Plated Ring Smooth"
    // total_discount: 0
    // url: "/products/24k-gold-plated-ring-smoothooth?variant=41367931191482"
    // variant_id: 41367931191482
    // variant_options: ['Default Title']
    // variant_title: null
    // vendor: "Their Jewelry and Accessories"
