
/** 
 * Function add product to cart.
 * @returns void
 */
function addToCart(button){

    // data structure of order: {productId: {quantity, image, price, name}}
    // Get productID of product which added to cart.
    let productId = $(button).data().productId;

    // Get all order within localStorage
    let orderString = localStorage.getItem("cart") || "{}";

    // Parse orderString to object.
    let order = JSON.parse(orderString);
    
    // Reset value for orders.
    if(order[productId] ? true : false){

        order[productId]["quantity"] += 1;

    }else{

        let image =  $(button).data().image;
        let name  =  $(button).data().productName;
        let price =  $(button).data().price;

        order[productId] = {quantity: 1, image, price: price, name: name};
    }

    renderCartDropDown(productId,order[productId]);

    // Save list product to localStorage.
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("cart",JSON.stringify(order));
    } else {
        console.log("Sorry, your browser does not support Web Storage...")
    }

}

/* ================== Load More Product =================== */

/**
 * Function load more product.
 * @returns void
 */
function loadMoreProduct(){
    let nextPage = $("#btn-load-more").data().nextPage;
    let pageSize = $("#btn-load-more").data().pageSize;
    $.ajax({

        url:"/cua-hang/get-products",
        data:{page: nextPage},
        success: function(result){
            
            // Set new value for button load more's "data-next-page"
            $("#btn-load-more").data().nextPage = parseInt(nextPage)+1;

            // Check: Hide button load more.
            if(result.products.length < parseInt(pageSize)){
                $("#load-more-area").hide();
            }

            // append data to product container.
            $.each(result.products, function(index, product){
                $("#product-container").append(
                    '<div class="default-product-column vertical-column col-md-3 col-sm-6 col-xs-12">'+
                        '<div class="inner-box text-center">'+
                            '<div class="image-box">'+
                                '<figure>'+
                                    '<a href="'+ product.imageLink +'" title="'+ product.name +'" class="lightbox-image">'+
                                    '<img src="'+ product.imageLink +'" alt="'+ product.name +'"></a>'+
                                '</figure>'+
                                '<div class="overlay-box"><div class="info"><span class="price">'+ product.prices +'VND</span></div></div>'+
                            '</div>'+ 
                            '<div class="content-box">'+
                                ' <h3 class="prod-title"><a href="/cua-hang/chi-tiet-san-pham/'+ product._id +'">'+ product.name +'</a></h3>'+
                                '<a href="#" '+
                                    'data-product-name = "' + product.name+'"' +
                                    'data-image        = "' + product.imageLink +'"'+
                                    'data-price        = "' + product.prices +'"' +
                                    'data-product-id   = "' + product._id +'" '+
                                    'class="btn-add-to-cart theme-btn btn-style-three">'+
                                    'Thêm vào giỏ hàng'+
                                '</a>'+
                            '</div>'+
                        '</div>'+
                  '</div>'
                );
            });

            // Set event for button add product to cart
            // Which has been appended into page.
            $(".btn-add-to-cart").on('click',function(e){
                e.preventDefault();
                addToCart($(this));
            }); 
        }
    });
}

/** ============= Document ready =============== */
$(function(){

    // Set event for button load more product.
    $("#btn-load-more").on("click",function(e){
        e.preventDefault();
        loadMoreProduct();      
    });

    // Set event for button add product to cart.
    $(".btn-add-to-cart").on('click',function(e){
        e.preventDefault();
        addToCart($(this));
    }); 
    
})