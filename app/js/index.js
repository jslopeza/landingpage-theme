$(document).ready(function() {
  $('#fullpage').fullpage({
    css3: true,
    easing: 'swing',
    anchors: ['home', 'about', 'testimonials', 'contact'],
    menu: '#menu',
    easingcss3: 'ease-out',
    controlArrows: false,
    scrollOverflow: true,
    scrollOverflowOptions: null,
  });

  $('#myCarousel').carousel({
    interval: 3000
  });
});
