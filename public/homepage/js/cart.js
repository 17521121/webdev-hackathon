
/** Function render a item of cart */
function getCartItemBox(productID, productInfo){

    var result = '<div class="item-box item-box-' + productID + '">'+
                     '<div class="inner">'+
                         '<figure class="thumb">'+
                             '<img src="' + productInfo.image +'" alt="' + productInfo.name + '">'+
                         '</figure>'+
                         '<div class="title">' + productInfo.name + '</div>'+
                         '<div class="price">' +
                             productInfo.price +
                         '</div>'+
                         '<div class="quantity">Số lượng: '+productInfo.quantity+'</div>'+
                         '<a href="#" '+
                             'class="theme-btn remove-btn" '+
                             'data-product-id = "'+ productID +'">'+
                                  '<span class="fa fa-remove"></span> &nbsp; Xóa'+
                         '</a>'+
                     '</div>'+
                 '</div>'
    
    return result;
}
 
 /**
  * Function render cart dropdown's items
  * @param {*} productID 
  * @param {*} productInfo 
  */
function renderCartDropDown(productID = null, productInfo = null){
     
    let itemBox     = "";
    let numberItem  = 0;
    let totalPrice   = 0;
 
    // This case perform after load this page 
    // from server. Load all product added to cart before.
    if(productID == null && productInfo == null){
        
         $('.item-box').remove();
         
         let orderString = localStorage.getItem("cart") || "{}";
         let order       = JSON.parse(orderString);     
 
         for(var pro in order){          
             numberItem += parseInt(order[pro]['quantity']);
             totalPrice += parseInt(order[pro]['quantity'])*parseFloat(order[pro]['price']);
             itemBox =  getCartItemBox(pro, order[pro]);
             $('#cart-dropdown-wrapper').prepend(itemBox);           
         }
 
         $('#cart-number-item').html(numberItem);
 
    }else{
 
         // This case: add a product to cart.
         numberItem = parseInt($('#cart-number-item').html()) + 1;
         itemBox =  getCartItemBox(productID, productInfo);
         totalPrice = parseFloat(productInfo['price']) + parseFloat($("#total-price").html());
 
         $('.item-box-'+productID).remove();
         $('#cart-dropdown-wrapper').prepend(itemBox);
         $('#cart-number-item').html(numberItem);
    }
    
    $("#total-price").html(totalPrice);

    // Set onclick event for button.remove-btn
    $(".remove-btn").on("click",function(e){
        e.preventDefault();

        let product_id     = $(this).data().productId;
        let lastTotalPrice = parseFloat($("#total-price").html());
        let order          = JSON.parse(localStorage.getItem("cart")); 
        let removePrice    = parseInt(order[product_id]['quantity'])*parseFloat(order[product_id]['price']);      
        let totalQuantity  = parseInt($('#cart-number-item').html()) - parseInt(order[product_id]['quantity']);
       
        delete order[product_id];  
        $(".item-box-"+product_id).remove(); 
        $('#cart-number-item').html(totalQuantity);
        localStorage.setItem("cart",JSON.stringify(order));
        $(".price-total").html(lastTotalPrice - removePrice);
      
        if(JSON.stringify(order) == "{}"){
            $("#checkout-form").hide();
        }
    });
}

$(function(){
    $(".item-box").remove();
    // Generate cart summary.
    renderCartDropDown();
}) 