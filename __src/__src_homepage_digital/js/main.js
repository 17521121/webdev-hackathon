$(function($) {

  "use strict";


/*=========================== scroll background ===========================*/

  $(window).scroll(function(){

    var wScroll = $(this).scrollTop();

    // Activate menu
    if (wScroll >50) {
      $('.navbar').addClass('active_sc');
    }
    else {
      $('.navbar').removeClass('active_sc');
    };
        
  });

  /*=========================== close scroll background ===========================*/

 



  /*=========================== preloader ===========================*/
  // Wait for window load
  $(window).on('load', function() {
     $(".se-pre-con").fadeOut("slow");;
  });

  /*=========================== preloader ===========================*/



  /*=========================== team slider===========================*/
   var owls = $("#team-owl");
    owls.owlCarousel({

        autoplay: true,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        items: 1,
        loop: true,
        center: false,
        margin: 30,
        stagePadding: 0,
        dots:true,
        nav:false,


        merge: false,
        mergeFit: true,
        autoWidth: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
                nav: false
            },
            768: {
                items: 3,
                nav: false,
                loop: true
            }
        },
    });
  /*=========================== team slider===========================*/


/*=========================== testi slider ===========================*/
   var owls = $("#testimonial-owl");
    owls.owlCarousel({

        autoplay: false,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        items: 2,
        loop: true,
        center: false,
        margin: 20,
        stagePadding: 0,
        dots:false,
        nav:true,


        merge: false,
        mergeFit: true,
        autoWidth: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
                nav: true
            },
            768: {
                items: 2,
                nav: true,
                loop: true
            }
        },
        navText : ["<i class='fas fa-angle-left fa-2x'></i>","<i class='fas fa-angle-right fa-2x'></i>"]
    });
  /*=========================== testi slider ===========================*/


/*=========================== testi slider ===========================*/
   var owls = $("#testimonial-owl-t");
    owls.owlCarousel({

        autoplay: false,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        items: 3,
        loop: true,
        center: false,
        margin: 20,
        stagePadding: 0,
        dots:true,
        nav:false,


        merge: false,
        mergeFit: true,
        autoWidth: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
                nav: false
            },
            768: {
                items: 3,
                nav: false,
                loop: true
            }
        },
        navText : ["<i class='fas fa-angle-left fa-2x'></i>","<i class='fas fa-angle-right fa-2x'></i>"]
    });
  /*=========================== testi slider ===========================*/


//Pricing Tabs
  if($('.pricing-table-dig').length){
    $('.pricing-table-dig .tab-btns .tab-btn').on('click', function(e) {
      e.preventDefault();
      var target = $($(this).attr('data-tab'));
      
      if ($(target).hasClass('actve-tab')){
        return false;
      }else{
        $('.pricing-table-dig .tab-btns .tab-btn').removeClass('active-btn');
        $(this).addClass('active-btn');
        $('.pricing-table-dig .pr-content .pr-tab').removeClass('active-tab');
        $(target).addClass('active-tab');
      }
    });
  }


/*=========================== counter js active ===========================*/

    $('.counter').counterUp({
        delay: 4,
        time: 4000
    });

/*=========================== close counter js active ===========================*/



/*=========================== video player active ===========================*/
/*video popup*/
$("#video").videoPopup({
      autoplay: 1,
      controlsColor: 'white',
      showVideoInformations: 0,
      width: 1000,
      customOptions: {
          rel: 0,
          end: 60
      }
});
/*=========================== video player active ===========================*/


 /*=========================== mover active ===========================*/
 //mouse over image drag
  $('html').mousemove(function(e){
    
    var wx = $(window).width();
    var wy = $(window).height();
    
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    
    var newx = x - wx/2;
    var newy = y - wy/2;
    

    
    $('#wrapper div').each(function(){
      var speed = $(this).attr('data-speed');
      if($(this).attr('data-revert')) speed *= -1;
      TweenMax.to($(this), 1, {x: (1 - newx*speed), y: (1 - newy*speed)});
      
    });
    
  });
 /*=========================== mover active ===========================*/



 /*=========================== popup image ===========================*/

//popup gallery
  $('.popup-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
      }
  });
/*=========================== popup image ===========================*/


  

 /*=========================== isotop active ===========================*/

    // init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  percentPosition: true,
  masonry: {
    // use outer width of grid-sizer for columnWidth
    columnWidth: 1
  }
});



// filter items on button click
$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});

// change is-checked class on buttons
$('.filter-button-group').each(function(i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
    });
});

/*=========================== isotop active ===========================*/

 // ------------------------------- AOS Animation 
        AOS.init({
          duration: 1000,
          mirror: true
        });

});



/*add maps*/

/*add maps*/
// Initialize and add the map
function initMap() {
  // The location of Uluru
  var uluru = {lat: -25.344, lng: 131.036};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}






/*coming soon page*/

(function () {
  // Specify the deadline date
  var deadlineDate = new Date('Dec 31, 2018 23:59:59').getTime();

  // Cache all countdown boxes into consts
  var countdownDays = document.querySelector('.countdown__days .number');
  var countdownHours = document.querySelector('.countdown__hours .number');
  var countdownMinutes = document.querySelector('.countdown__minutes .number');
  var countdownSeconds = document.querySelector('.countdown__seconds .number');

  // Update the count down every 1 second (1000 milliseconds)
  setInterval(function () {
    // Get current date and time
    var currentDate = new Date().getTime();

    // Calculate the distance between current date and time and the deadline date and time
    var distance = deadlineDate - currentDate;

    // Calculations the data for remaining days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
    var seconds = Math.floor(distance % (1000 * 60) / 1000);

    // Insert the result data into individual countdown boxes
    countdownDays.innerHTML = days;
    countdownHours.innerHTML = hours;
    countdownMinutes.innerHTML = minutes;
    countdownSeconds.innerHTML = seconds;
  }, 1000);
})();