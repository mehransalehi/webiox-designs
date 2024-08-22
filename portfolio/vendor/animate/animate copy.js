jQuery(document).ready(function(){
// Check if element is scrolled into view
  jQuery("body").on('click','.asoop-anime-click.animated',function() {
      var effect = jQuery(this).attr("asoop-anime");
      var delay = jQuery(this).attr("asoop-anime-delay");
      var dur = jQuery(this).attr("asoop-anime-duration");
      var num = jQuery(this).attr("asoop-anime-num");
      jQuery(this).css("animation-iteration-count",num);
      jQuery(this).css("animation-duration",dur+"ms");
      jQuery(this).css("animation-delay",delay+"ms");
      jQuery(this).addClass(effect).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        jQuery(this).removeClass(effect);
      });
  });
  jQuery("body").on('mouseenter','.asoop-anime-mouseover.animated',function() {
    var effect = jQuery(this).attr("asoop-anime");
    var delay = jQuery(this).attr("asoop-anime-delay");
    var dur = jQuery(this).attr("asoop-anime-duration");
    var num = jQuery(this).attr("asoop-anime-num");
    jQuery(this).css("animation-iteration-count",num);
    jQuery(this).css("animation-duration",dur+"ms");
    jQuery(this).css("animation-delay",delay+"ms");
    jQuery(this).addClass(effect).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      jQuery(this).removeClass(effect);
    });
  });

  asoopAnimeStart();
  // If element is scrolled into view, fade it in
  jQuery(window).scroll(function() {
    asoopAnimeScroll();
    asoopTransformScroll();
  });
});


function isScrolledIntoView(elem) {
  var docViewTop = jQuery(window).scrollTop();
  var docViewBottom = docViewTop + jQuery(window).height();

  var elemTop = jQuery(elem).offset().top;
  var elemBottom = elemTop + jQuery(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
function initAsoopAnime(){
  jQuery("body").find('[asoop-anime-fade="yes"]').each(function() {
    jQuery(this).addClass('asoop-anime-fade');
  });
  asoopAnimeScroll();
  asoopAnimeStart();
}
function asoopAnimeScroll(){
  jQuery("body").find('.asoop-anime-scroll.animated').each(function() {
    if (isScrolledIntoView(this) === true) {
      var effect = jQuery(this).attr("asoop-anime");
      var delay = jQuery(this).attr("asoop-anime-delay");
      var dur = jQuery(this).attr("asoop-anime-duration");
      var num = jQuery(this).attr("asoop-anime-num");
      jQuery(this).css("animation-iteration-count",num);
      jQuery(this).css("animation-duration",dur+"ms");
      jQuery(this).css("animation-delay",delay+"ms");
      jQuery(this).removeClass('asoop-anime-fade');
      jQuery(this).addClass(effect).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      });
    }
  });
}
function asoopAnimeStart(){
  jQuery("body").find('.asoop-anime-start.animated').each(function() {
    var effect = jQuery(this).attr("asoop-anime");
    var delay = jQuery(this).attr("asoop-anime-delay");
    var dur = jQuery(this).attr("asoop-anime-duration");
    var num = jQuery(this).attr("asoop-anime-num");
    jQuery(this).css("animation-iteration-count",num);
    jQuery(this).css("animation-duration",dur+"ms");
    jQuery(this).css("animation-delay",delay+"ms");
    jQuery(this).addClass(effect);
  });
}

//transform animation

function isReachToView(elem) {
  var docViewTop = jQuery(window).scrollTop();
  var docViewBottom = docViewTop + jQuery(window).height();

  var elemTop = jQuery(elem).offset().top;
  var elemBottom = elemTop + jQuery(elem).height();

  return {
    reach : (elemTop <= docViewBottom) && (docViewTop <= elemBottom),
    diff: docViewTop,
  };
}

function asoopTransformScroll(){
  jQuery("body").find('.asoop-transform-scroll').each(function() {
    var res = isReachToView(this);
    var self = this;
    if (res.reach === true) {
      window.requestAnimationFrame(function(){translate(self,res)});
    }
  });
}

function translate(self,res){
  self = jQuery(self);
  if($(window).width()<=991){
    self.removeAttr("style");
    return;
  }
  var keys = [];
  $.each( self[0].attributes, function ( index, attribute ) {
    if(attribute.name.indexOf("data-asoop-parallax") > -1) {
      var tmp = attribute.value;
      tmp = tmp.replace(/'/g,'"');
      tmp = JSON.parse(tmp);
      keys.push(tmp); 
    }
  });
  var ruleStr = '';
  if(keys.length>0){
    for(var i=keys.length-1 ; i>=0;i--){
      var rule = keys[i];
      if(i == 0 && rule.duration){
        self.css("transition","transform "+rule.duration+"ms ease-out"); 
      }
      if(rule.prop == 'translateX'){
        ruleStr += 'translateX('+(res.diff * rule.rate)+'px) ';
      }else if(rule.prop == 'translateY'){
        ruleStr += 'translateY('+(res.diff * rule.rate)+'px) ';
      }else if(rule.prop == 'z'){
        ruleStr += 'translateZ('+(res.diff * rule.rate)+'px) ';
      }else if(rule.prop == 'rotateX'){
        ruleStr += 'rotateX('+(res.diff * rule.rate)+'deg) ';
      }else if(rule.prop == 'rotateY'){
        ruleStr += 'rotateY('+(res.diff * rule.rate)+'deg) ';
      }else if(rule.prop == 'rotateZ'){
        ruleStr += 'rotateZ('+(res.diff * rule.rate)+'deg) ';
      }else if(rule.prop == 'scaleX'){
        ruleStr += 'scaleX('+(1 + (res.diff * rule.rate))+') ';
      }else if(rule.prop == 'scaleY'){
        ruleStr += 'scaleY('+(1 + (res.diff * rule.rate))+') ';
      }else if(rule.prop == 'scaleZ'){
        ruleStr += 'scaleZ('+(res.diff * rule.rate)+') ';
      }else if(rule.prop == 'skewX'){
        ruleStr += 'skewX('+(res.diff * rule.rate)+'deg) ';
      }else if(rule.prop == 'skewY'){
        ruleStr += 'skewY('+(res.diff * rule.rate)+'deg) ';
      }
    }
    self.css("transform",ruleStr);
  }
}