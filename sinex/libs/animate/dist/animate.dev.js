"use strict";

function initAsoopAnime() {
  console.log("inti Animations");
  initElements();
}

function initElements() {
  document.querySelectorAll('[asoop-animation]').forEach(function (e) {
    var animation = JSON.parse(e.getAttribute("asoop-animation"));

    var listener = function listener(event) {
      animate(e, event.type);
    };

    e.removeEventListener('click', listener);
    e.removeEventListener('mouseenter', listener);

    if (animation != {}) {
      if (animation.event == 'start') {
        animate(e);
      } else if (animation.event == 'click') {
        e.addEventListener('click', listener);
      } else if (animation.event == 'mouseenter') {
        e.addEventListener('mouseenter', listener);
      } else if (animation.event == 'scroll') {
        var observer = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting === true) animate(e, 'scroll');
        }, {
          threshold: [0]
        });
        observer.observe(e);
      }
    }
  });
}

function animate(node, type) {
  var animation = JSON.parse(node.getAttribute("asoop-animation"));
  if (type != animation.event) return false;
  new Promise(function (resolve, reject) {
    if (node.classList.contains('animate__animated') || animation == {}) {
      return false;
    }

    node.style.setProperty('--animate-delay', animation.delay + "ms");
    node.style.setProperty('animation-delay', animation.delay + "ms");

    if (animation.duration > 0) {
      node.style.setProperty('--animate-duration', animation.duration + "ms");
      node.style.setProperty('animation-duration', animation.duration + "ms");
    }

    if (animation.number < 1) {
      node.style.setProperty('animation-iteration-count', 'infinite');
    } else {
      node.style.setProperty('--animate-repeat', animation.number);
      node.style.setProperty('animation-iteration-count', animation.number);
    }

    node.classList.add("animate__animated", "animate__".concat(animation.animation));

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.style.removeProperty('--animate-duration');
      node.style.removeProperty('--animate-delay');
      node.style.removeProperty('animation-duration');
      node.style.removeProperty('animation-delay');
      node.style.removeProperty('--animate-repeat');
      node.style.removeProperty('animation-iteration-count');
      var classes = node.className.split(" ").filter(function (c) {
        return !c.startsWith('animate__');
      });
      node.className = classes.join(" ").trim();
      resolve('Animation ended');
    }

    if (!animation.fade) node.addEventListener('animationend', handleAnimationEnd, {
      once: true
    });
  });
} //paralex animation


addEventListener('scroll', function (event) {
  document.querySelectorAll('[asoop-paralex-animation]').forEach(function (e) {
    var pos = reachToView(e);

    if (pos.reach === true) {
      window.requestAnimationFrame(function () {
        translate(e, pos);
      });
    }
  });
});

function reachToView(node) {
  var bounding = node.getBoundingClientRect();
  var myElementHeight = node.offsetHeight;
  return {
    reach: bounding.top >= -myElementHeight && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + myElementHeight,
    diff: window.scrollY
  };
}

function translate(node, res) {
  if (window.innerWidth <= 991) {
    node.removeAttribute("style");
    return;
  }

  var animation = JSON.parse(node.getAttribute("asoop-paralex-animation"));
  var ruleStr = '';

  if (animation && animation.length > 0) {
    node.style.setProperty("transition", "transform ".concat(animation[0].duration, "ms ease-out"));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = animation[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var rule = _step.value;

        if (rule.prop == 'translateX') {
          ruleStr += 'translateX(' + res.diff * rule.rate + 'px) ';
        } else if (rule.prop == 'translateY') {
          ruleStr += 'translateY(' + res.diff * rule.rate + 'px) ';
        } else if (rule.prop == 'z') {
          ruleStr += 'translateZ(' + res.diff * rule.rate + 'px) ';
        } else if (rule.prop == 'rotateX') {
          ruleStr += 'rotateX(' + res.diff * rule.rate + 'deg) ';
        } else if (rule.prop == 'rotateY') {
          ruleStr += 'rotateY(' + res.diff * rule.rate + 'deg) ';
        } else if (rule.prop == 'rotateZ') {
          ruleStr += 'rotateZ(' + res.diff * rule.rate + 'deg) ';
        } else if (rule.prop == 'scaleX') {
          ruleStr += 'scaleX(' + (1 + res.diff * rule.rate) + ') ';
        } else if (rule.prop == 'scaleY') {
          ruleStr += 'scaleY(' + (1 + res.diff * rule.rate) + ') ';
        } else if (rule.prop == 'scaleZ') {
          ruleStr += 'scaleZ(' + res.diff * rule.rate + ') ';
        } else if (rule.prop == 'skewX') {
          ruleStr += 'skewX(' + res.diff * rule.rate + 'deg) ';
        } else if (rule.prop == 'skewY') {
          ruleStr += 'skewY(' + res.diff * rule.rate + 'deg) ';
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    node.style.setProperty("transform", ruleStr);
  }
}