
function initAsoopAnime(){
  console.log("inti Animations");
  initElements();
}

function initElements(){
  document.querySelectorAll('[data-asoop-animation]').forEach((e)=>{
    let animation = JSON.parse(e.getAttribute("data-asoop-animation"));

    var listener = function (event){
      animate(e,event.type);
    }

    e.removeEventListener('click', listener);
    e.removeEventListener('mouseenter', listener);

    if(animation != {}){
      if(animation.event == 'start'){
        animate(e,'start');
      }else if(animation.event == 'click'){
        e.addEventListener('click', listener);
      }else if(animation.event == 'mouseenter'){
        e.addEventListener('mouseenter', listener);
      }else if(animation.event == 'scroll'){
        var observer = new IntersectionObserver((entries)=>{
          if(entries[0].isIntersecting === true)
          animate(e,'scroll');
        }, { threshold: [0] });
        
        observer.observe(e);
      }

    }
  });

}

function animate(node,type){
  let animation = JSON.parse(node.getAttribute("data-asoop-animation"));
  if(type != animation.event) return false;
  new Promise((resolve, reject) => {

    if(node.classList.contains('animate__animated') || animation == {}){
      return false;
    }
    node.style.setProperty('--animate-delay', animation.delay+"ms");
    node.style.setProperty('animation-delay', animation.delay+"ms");
    if(animation.duration>0){
      node.style.setProperty('--animate-duration', animation.duration+"ms");
      node.style.setProperty('animation-duration', animation.duration+"ms");
    }
    if(animation.number<1){
      node.style.setProperty('animation-iteration-count', 'infinite');
    }else{
      node.style.setProperty('--animate-repeat', animation.number);
      node.style.setProperty('animation-iteration-count', animation.number);
    }
    node.classList.add(`animate__animated`,`animate__${animation.animation}`);

    
    function handleAnimationEnd(event) {
        event.stopPropagation();
      
        node.style.removeProperty('--animate-duration');
        node.style.removeProperty('--animate-delay');
        node.style.removeProperty('animation-duration');
        node.style.removeProperty('animation-delay');
        node.style.removeProperty('--animate-repeat');
        node.style.removeProperty('animation-iteration-count');
        const classes = node.className.split(" ").filter(c => !c.startsWith('animate__'));
        node.className = classes.join(" ").trim();
      
        resolve('Animation ended');
      }

    if(!animation.fade){
      node.addEventListener('animationend', handleAnimationEnd, {once: true});
    }
  })
  
}


//paralex animation

addEventListener('scroll', (event) => {
  document.querySelectorAll('[data-asoop-paralex-animation]').forEach((e)=>{
    let pos = reachToView(e);
    if (pos.reach === true) {
      window.requestAnimationFrame(function(){translate(e,pos)});
    }
  });
});

function reachToView(node){
  const bounding = node.getBoundingClientRect();
  var myElementHeight = node.offsetHeight;

  return {
    reach : bounding.top >= -myElementHeight 
    && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + myElementHeight, 
    diff : window.scrollY,
  }
}
function translate(node,res){
  if(window.innerWidth<=991){
    node.removeAttribute("style");
    return;
  }
  let animation = JSON.parse(node.getAttribute("data-asoop-paralex-animation"));
  let ruleStr = '';
  if(animation && animation.length>0){
    node.style.setProperty("transition",`transform ${animation[0].duration}ms ease-out`);
    for(let rule of animation){
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
    node.style.setProperty("transform",ruleStr);
  }
}