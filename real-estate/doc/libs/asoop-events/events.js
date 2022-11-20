jQuery(document).ready(function(){
// init all clicked scroll events
  jQuery("body").on('click','.asoop-events-clicked',function() {
    var target = jQuery(this).attr("asoop-events-target");
    jQuery('html, body').animate({
          scrollTop: jQuery("#"+target).offset().top
      }, 2000);
  });

  jQuery("body").on('click','a[href^="#"]',function() {
    var target = jQuery(this).attr("href");
    console.log(target);
    //console.log("len : "+jQuery("body").find(target).length);
    if(target != '#' && target != '.'){
        jQuery('html, body').animate({
          scrollTop: jQuery(target).offset().top
      }, 2000);
    }
  });

});


