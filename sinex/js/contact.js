jQuery(function(){
  jQuery('.asoop-navbar-two-icon').click(function(){
    jQuery(".asoop-navbar-two-menu").toggleClass('show');
  });

  jQuery('.asoop-navbar-two-close-icon').click(function(){
    jQuery(".asoop-navbar-two-menu").toggleClass('show');
  });
  jQuery('.menu-item-has-children').click(function(e){
    e.stopPropagation();
    if (e.target !== this && !jQuery(e.target).is(jQuery(this).children("a")))
      return;
    jQuery(this).children("ul").toggleClass('show');
  });
});

jQuery( document ).ready(function() {

                        WebFont.load({
                            
                            google: {
                        families: ['Source Sans Pro',]
                        }
                        });

                    initAsoopAnime();
                    });
                    