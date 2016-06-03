$(document).ready(function() {
  $('#home').height(window.innerHeight);
  $('#myCarousel').carousel({
    interval: 3000
  });

  function scrollNav() {
    $('.nav a').click(function(){
      //Toggle Class
      $("nav .active").removeClass("active");
      $(this).closest('li').addClass("active");
      var theClass = $(this).attr("class");
      $('.'+theClass).parent('li').addClass('active');
      //Animate
      $('html, body').stop().animate({
          scrollTop: $( $(this).attr('href') ).offset().top - 160
      }, 1000);
      return false;
    });
    $('.scrollTop a').scrollTop();
  }
  scrollNav();

  $('.navbar-brand').click(function ( ) {
    scrollToHome();
  });

  function scrollToHome() {
    $('html, body').stop().animate({
      scrollTop : $('#home').offset().top - 160
    }, 1000);
  }
});
