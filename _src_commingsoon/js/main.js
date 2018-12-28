(function ($) {

    "use strict";   
    
        /*---------------------------
     MICHIMP INTEGRATION
    -----------------------------*/
    $('#mc-form').ajaxChimp({
        url: 'http://facebook.us14.list-manage.com/subscribe/post?u=b2a3f199e321346f8785d48fb&amp;id=6d023c55e5', //Set Your Mailchamp URL
        callback: function (resp) {
            if (resp.result === 'success') {
                $('.subscribe-form input, .subscribe-form button').fadeOut();
            }
        }
    });
    
    $(window).on("load", function () {
        $('.preloader').fadeOut(500);
    });
    
    
    
    
})(jQuery);