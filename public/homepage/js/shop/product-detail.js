$(function(){

    $("#btn-add-to-cart").on("click", function(e){

        e.preventDefault();
        let productId = $(this).data().productId;
        let quantity  =  $("#product-quantity").val();
        let orderString = localStorage.getItem("cart") || "{}";
        let price =  $(this).data().price;
        let order = JSON.parse(orderString);


        if(order[productId] ? true : false){

            order[productId]['quantity'] += parseInt(quantity);

        }else{

            let image =  $(this).data().image;
            let name  =  $(this).data().productName;            
    
            order[productId] = {quantity: quantity , image, price: price, name: name};
        }

        localStorage.setItem("cart",JSON.stringify(order));

        renderCartDropDown();

    });

    $("#product-quantity").on("change", function(e){
        let quantity = parseInt($(this).val());
        if(quantity <= 0){
            $(this).val(1);
        }
    });
})