function initcarousel(id){
    let carousel = document.querySelector(`#${id}`);
    let pagination = carousel.querySelector(".splide__pagination");
    pagination ? pagination.remove() : false;
    new this.window.Splide( carousel ).mount();
}
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
initcarousel('splide03');

                        WebFont.load({
                            
                            google: {
                        families: ['Source Sans Pro',]
                        }
                        });

                    initAsoopAnime();
                    });
                    