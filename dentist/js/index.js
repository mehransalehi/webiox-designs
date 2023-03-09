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

function initcarousel(id){
    let carousel = document.querySelector(`#${id}`);
    let pagination = carousel.querySelector(".splide__pagination");
    pagination ? pagination.remove() : false;
    new this.window.Splide( carousel ).mount();
}
jQuery(document).ready(function(){
// init all clicked scroll events
    jQuery("body").on('click','.asoop-img-modal',function() {
        if(jQuery("body").find("#asoop-main-modal").length<1){
            jQuery("body").append(
                `<div class="modal fade" id="asoop-main-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog  modal-dialog-centered Large">
                        <img src="#"/>
                    </div>
                </div>
                `
            );
        }
        jQuery("body").find("#asoop-main-modal img").attr('src',jQuery(this).attr('src'));
        jQuery("body").find("#asoop-main-modal").modal('show');
    });
    jQuery("body").on('click','span.asoop-main-modal-close',function() {
        jQuery("body").find("#asoop-main-modal").modal('hide');
    });
});
jQuery( document ).ready(function() {
initcarousel('splide01');
initcarousel('splide03');

                        WebFont.load({
                            custom: {
                        families: ['Shahab',],
                        urls: ['https://cdn.font-store.ir/shahab.css',]
                        },
                            
                        });

                    initAsoopAnime();
                    });
                    