  jQuery(function ($) {
   "use strict";

/*---Header Scroll---*/

   
   if ($("nav.navbar").hasClass("fixed-bottom")) {
      var navHeight = $(".fixed-bottom").offset().top;
      $(window).scroll(function () {
         if ($(window).scrollTop() > navHeight) {
            $('.fixed-bottom').addClass('fixedmenu');
         } else {
            $('.fixed-bottom').removeClass('fixedmenu');
         }
      });
   }

   if ($(".just-sidemenu").length) {
      var anchor_point = $(".banner-fullscreen").outerHeight();
      var side_toggle = $(".just-sidemenu #sidemenu_toggle");
      side_toggle.addClass("toggle_white");
      $(window).on("scroll", function () {
         if ($(window).scrollTop() >= anchor_point) {
            side_toggle.removeClass("toggle_white");
         } else {
            side_toggle.addClass("toggle_white");
         }
      });
   }

   if (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/trident/i)) {
      $(".rev_overlay").addClass("d-none");
      $("#rev_slider_video .rs-fullvideo-cover").css("background", "rgba(0,0,0,0)");
   }


   /*----- Menu On click -----*/
   if ($("#sidemenu_toggle").length) {
      $("body").addClass("pushwrap");
      $("#sidemenu_toggle").on("click", function () {
         $(".pushwrap").toggleClass("active");
         $(".side-menu").addClass("side-menu-active"), $("#close_side_menu").fadeIn(700)
      }), $("#close_side_menu").on("click", function () {
         $(".side-menu").removeClass("side-menu-active"), $(this).fadeOut(200), $(".pushwrap").removeClass("active")
      }), $("#btn_sideNavClose").on("click", function () {
         $(".side-menu").removeClass("side-menu-active"), $("#close_side_menu").fadeOut(200), $(".pushwrap").removeClass("active")
      });
   }
  
  
  
  

});