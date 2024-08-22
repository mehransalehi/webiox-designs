// Wait for the document to be ready before executing the following code
$(document).ready(function () {

  // Initialize the Splide slider with the ID 'splide01'
  new Splide('#splide01').mount();

  // Initiate animations on scroll
  initAsoopAnime();

  // Handle the dropdown navbar button for mobile view
  $('.header .bars').click(function(){
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
    $('header li>a').each(function() {
      var target = $(this).attr("href");
      if (scrollTop >= $(target).offset().top - 300) { 
        $('header li').removeClass('current');
        $(this).closest('li').addClass('current');
      }
    });
  });

  // Typing animation effect
  const typedTextSpan = $(".typed-text");
  const cursorSpan = $(".cursor");
  const textArray = ["Designer", "Programmer", "Developer"];
  const typingDelay = 200;
  const erasingDelay = 100;
  const newTextDelay = 2000; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;

  // Start the typing animation after a short delay
  if (textArray.length)
    setTimeout(type, newTextDelay + 250);

  // Function to type out the text
  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.is(".typing"))
        cursorSpan.addClass("typing");
      typedTextSpan.text(typedTextSpan.text() + textArray[textArrayIndex].charAt(charIndex));
      charIndex++;
      setTimeout(type, typingDelay);
    } 
    else {
      cursorSpan.removeClass("typing");
      setTimeout(erase, newTextDelay);
    }
  }

  // Function to erase the text
  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.is(".typing"))
        cursorSpan.addClass("typing");
      typedTextSpan.text(textArray[textArrayIndex].substring(0, charIndex - 1));
      charIndex--;
      setTimeout(erase, erasingDelay);
    } 
    else {
      cursorSpan.removeClass("typing");
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) 
        textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }
});
