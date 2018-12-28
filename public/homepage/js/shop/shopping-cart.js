// Check out product
function checkoutProduct(){
    var orders  = localStorage.getItem("cart") || "{}";
    var buyerInfo = $("#checkout-form").serialize(); 
    var data = buyerInfo+"&orders="+orders;
    $.ajax({

        url    : "/gio-hang/ajax-checkout",
        type   : "POST",
        data   : data,
        success:function(){
            localStorage.setItem("cart","{}");
            localStorage.setItem("alert-success","true");
            $(document).scrollTop(0);
            location.reload();
        }
    });
}

/**This function change product quantity in cart */
function changeProductQuantity(productId, quantity){
    let orderString = localStorage.getItem("cart")||"{}";
    let orders      = JSON.parse(orderString);
    let product     = orders[productId];

    let lastTotalProduct = parseInt($("#cart-number-item").html());
    let lastTotalPrice   = parseFloat($("#total-price").html());
    let lastPrice        = parseFloat($("#sub-total-"+productId).html().replace("VNĐ"));
    let newPrice         = parseFloat(product.price)*parseInt(quantity);
    let increPrice       = newPrice - lastPrice;
    let increQuantity    = increPrice/parseFloat(product.price);
    let newTotalPrice    = lastTotalPrice + increPrice;

    $("#sub-total-"+productId).html(newPrice + "VNĐ");
    orders[productId].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(orders));

    // Set total price for cart summary and cart page.
    $(".price-total").html(newTotalPrice);

    // Set number product item for cart sumary.
    $("#cart-number-item").html(lastTotalProduct + increQuantity);

    // Set number product in summary cart.
    $(".item-box-"+productId+" .quantity").html("Số lượng: "+quantity);
}

/**This function show list product which were added to cart */
function showCartProduct() {

    let orderString = localStorage.getItem("cart")||"{}";
    let orders = JSON.parse(orderString);
    let totalPrice = 0;

    if(orderString == "{}"){
        $("#checkout-form").hide();
    }
    // Generate product list in cart.
    for(pro in orders){

        var order  = orders[pro];
        totalPrice += parseInt(order.quantity)*parseFloat(order.price);

        $("#product-list").append(
            '<tr class="item-box-'+pro+'">'+
                '<td colspan="2" class="prod-column">'+
                    '<div class="column-box">'+
                    '  <figure class="prod-thumb"><a href="/cua-hang/chi-tiet-san-pham/'+pro+'">'+
                            '<img style="width:100px" src="'+order.image+'" alt="hình ảnh: '+order.name+'"></a>'+
                    '</figure>'+
                    '<h3 class="prod-title">'+order.name+'</h3>'+
                    ' </div>'+
                '</td>'+
                '<td class="unit-price">'+order.price+'</td>'+
                '<td class="qty"><input data-product-id="'+pro+'" class="quantity-spinner" type="text" value="'+order.quantity+'" name="quantity"></td>'+
                '<td class="sub-total" id="sub-total-'+pro+'">'+parseInt(order.quantity)* parseFloat(order.price)+'VNĐ</td>'+
                '<td class="remove"><a href="#" class="remove-btn" data-product-id="'+pro+'"><span class="fa fa-trash-o"></span></a></td>'+
            '</tr>'
        );
    }

    $(".price-total").html(totalPrice);

    // Add script files necessary for page
    $("#script-reload").html(
        '<script src="/homepage/js/bootstrap.min.js"></script>'+
        '<script src="/homepage/js/jquery.fancybox.pack.js"></script>'+
        '<script src="/homepage/js/jquery.fancybox-media.js"></script>'+
        '<script src="/homepage/js/jquery.bootstrap-touchspin.js"></script>'+
        '<script src="/homepage/js/jquery.mCustomScrollbar.concat.min.js"></script>'+
        '<script src="/homepage/js/owl.js"></script>'+
        '<script src="/homepage/js/wow.js"></script>'+
        '<script src="/homepage/js/script.js"></script>');

    // Change info cart when quantity change.
    $(".quantity-spinner").on("change",function(e){
        let quantity   = $(this).val();
        if(parseInt(quantity) == 0){
           $(this).val(1);
           quantity = 1;
        }       
        let product_id = $(this).data().productId;       
        changeProductQuantity(product_id,quantity);
    });
}

$(function () {
    
    let successMessage = localStorage.getItem("alert-success")||"false";
    if(successMessage == "true"){
        $("#success-alert").css("display","");
        localStorage.setItem("alert-success","false");
        setTimeout(function(){
            $("#success-alert").slideUp();
        },3000)
    }

    showCartProduct();

    $("#checkout-form").on("submit",function(e){
        e.preventDefault();

        let note       = $("#note").val();
        let name       = $("#name").val();
        let phone      = $("#phone").val();
        let address    = $("#address").val();
        let totalPrice = $("#price-total").html();
        
        $("#tr-note").html("<p>"+note+"</p>");
        $("#tr-address").html(
            "<b>Họ tên: </b>" + name + "<br>" +
            "<b>SĐT</b>: " + phone + "<br>" +
            "<b>Địa chỉ: </b>" + address + "<br>"
        );
        $("#tr-total-price").html(totalPrice + "VNĐ");

        $("#confirm-checkout-modal").modal();
    });

    $("#checkout-btn").on("click", function(e){
        e.preventDefault();
        checkoutProduct();
    });

})