document.addEventListener( 'DOMContentLoaded', function() {
 var splide = new Splide( '.splide' );
 splide.mount();

 // Handle the dropdown navbar button for mobile view
 $('.header .navbar-bars').click(function(){
   $(this).find('i').toggleClass('fa-bars fa-times');
   $(".header nav").toggleClass('show');
 });

 // Smooth scroll when clicking on anchor links starting with '#'
 $("body").on('click', 'a[href^="#"]', function() {
   var target = $(this).attr("href");
   if (target != '#' && target != '.') {
     $('html, body').animate({
       scrollTop: $(target).offset().top - 100
     }, 1000);
   }
 });

 // Update the 'current' class on navigation links based on scroll position
 $(window).scroll(function() {
   var scrollTop = $(window).scrollTop();
   $('header nav li>a').each(function() {
    var target = $(this).attr("href");
    if (scrollTop >= $(target).offset().top - 300) { 
      $('header nav li').removeClass('current');
      $(this).closest('li').addClass('current');
    }
  });
  //Update Navbar background on scroll
  if (scrollTop >= 1){
   $('.navbar-container').addClass('scrolled');
  }else{
   $('.navbar-container').removeClass('scrolled');
  }
 });


});