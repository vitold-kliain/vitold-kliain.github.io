(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('aos'), require('jquery'), require('jarallax'), require('@tanem/svg-injector')) :
  typeof define === 'function' && define.amd ? define(['exports', 'aos', 'jquery', 'jarallax', '@tanem/svg-injector'], factory) :
  (global = global || self, factory(global.theme = {}, global.AOS, global.jQuery, global.jarallax, global.SVGInjector));
}(this, function (exports, AOS, jQuery$1, jarallax$1, svgInjector) { 'use strict';

  AOS = AOS && AOS.hasOwnProperty('default') ? AOS['default'] : AOS;
  jQuery$1 = jQuery$1 && jQuery$1.hasOwnProperty('default') ? jQuery$1['default'] : jQuery$1;
  jarallax$1 = jarallax$1 && jarallax$1.hasOwnProperty('default') ? jarallax$1['default'] : jarallax$1;

  //
  $(window).on('load', function () {
    AOS.init({
      once: true
    });
  });

  //

  (function ($) {
    if ('objectFit' in document.documentElement.style === false) {
      $('.bg-image').each(function attachBg() {
        var img = $(this);
        var src = img.attr('src');
        var classes = img.get(0).classList; // Replaces the default <img.bg-image> element with a <div.bg-image>
        // to attach background using legacy friendly CSS rules

        img.before($("<div class=\"" + classes + "\" style=\"background: url(" + src + "); background-size: cover; background-position: 50% 50%;\"></div>")); // Removes original <img.bg-image> as it is no longer required

        img.remove();
      });
    }
  })(jQuery$1);

  //

  var mrUtil = function ($) {
    var VERSION = '1.2.0';
    var Tagname = {
      SCRIPT: 'script'
    };
    var Selector = {
      RECAPTCHA: '[data-recaptcha]'
    }; // Activate tooltips

    $('body').tooltip({
      selector: '[data-toggle="tooltip"]',
      container: 'body'
    }); // Activate popovers

    $('body').popover({
      selector: '[data-toggle="popover"]',
      container: 'body'
    }); // Activate toasts

    $('.toast').toast();
    var Util = {
      version: VERSION,
      selector: Selector,
      activateIframeSrc: function activateIframeSrc(iframe) {
        var $iframe = $(iframe);

        if ($iframe.attr('data-src')) {
          $iframe.attr('src', $iframe.attr('data-src'));
        }
      },
      idleIframeSrc: function idleIframeSrc(iframe) {
        var $iframe = $(iframe);
        $iframe.attr('data-src', $iframe.attr('src')).attr('src', '');
      },
      forEach: function forEach(array, callback, scope) {
        if (array) {
          if (array.length) {
            for (var i = 0; i < array.length; i += 1) {
              callback.call(scope, i, array[i]); // passes back stuff we need
            }
          } else if (array[0] || mrUtil.isElement(array)) {
            callback.call(scope, 0, array);
          }
        }
      },
      dedupArray: function dedupArray(arr) {
        return arr.reduce(function (p, c) {
          // create an identifying String from the object values
          var id = JSON.stringify(c); // if the JSON string is not found in the temp array
          // add the object to the output array
          // and add the key to the temp array

          if (p.temp.indexOf(id) === -1) {
            p.out.push(c);
            p.temp.push(id);
          }

          return p; // return the deduped array
        }, {
          temp: [],
          out: []
        }).out;
      },
      isElement: function isElement(obj) {
        return !!(obj && obj.nodeType === 1);
      },
      getFuncFromString: function getFuncFromString(funcName, context) {
        var findFunc = funcName || null; // if already a function, return

        if (typeof findFunc === 'function') return funcName; // if string, try to find function or method of object (of "obj.func" format)

        if (typeof findFunc === 'string') {
          if (!findFunc.length) return null;
          var target = context || window;
          var func = findFunc.split('.');

          while (func.length) {
            var ns = func.shift();
            if (typeof target[ns] === 'undefined') return null;
            target = target[ns];
          }

          if (typeof target === 'function') return target;
        } // return null if could not parse


        return null;
      },
      getScript: function getScript(source, callback) {
        var script = document.createElement(Tagname.SCRIPT);
        var prior = document.getElementsByTagName(Tagname.SCRIPT)[0];
        script.async = 1;
        script.defer = 1;

        script.onreadystatechange = function (_, isAbort) {
          if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = null;
            script.onreadystatechange = null;
            script = undefined;

            if (!isAbort && callback && typeof callback === 'function') {
              callback();
            }
          }
        };

        script.onload = script.onreadystatechange;
        script.src = source;
        prior.parentNode.insertBefore(script, prior);
      }
    };
    return Util;
  }(jQuery$1);

  //

  (function ($) {
    if (typeof jarallax$1 === 'function') {
      $('.alert-dismissible').on('closed.bs.alert', function () {
        jarallax$1(document.querySelectorAll('[data-jarallax],[data-jarallax-video]'), 'onScroll');
      });
      $(document).on('resized.mr.overlayNav', function () {
        jarallax$1(document.querySelectorAll('[data-jarallax],[data-jarallax-video]'), 'onResize');
      });
      document.addEventListener('injected.mr.SVGInjector', function () {
        jarallax$1(document.querySelectorAll('[data-jarallax],[data-jarallax-video]'), 'onResize');
      });
      var jarallaxOptions = {
        disableParallax: /iPad|iPhone|iPod|Android/,
        disableVideo: /iPad|iPhone|iPod|Android/
      };
      $(window).on('load', function () {
        jarallax$1(document.querySelectorAll('[data-jarallax]'), jarallaxOptions);
        var jarallaxDelay = document.querySelectorAll('[data-jarallax-video-delay]');
        mrUtil.forEach(jarallaxDelay, function (index, elem) {
          var source = elem.getAttribute('data-jarallax-video-delay');
          elem.removeAttribute('data-jarallax-video-delay');
          elem.setAttribute('data-jarallax-video', source);
        });
        jarallax$1(document.querySelectorAll('[data-jarallax-delay],[data-jarallax-video]'), jarallaxOptions);
      });
    }
  })(jQuery$1);

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var smoothScroll_polyfills_min = createCommonjsModule(function (module, exports) {
  /*! smooth-scroll v16.1.0 | (c) 2019 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
  window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),o=this;do{for(t=n.length;0<=--t&&n.item(t)!==o;);}while(t<0&&(o=o.parentElement));return o}),(function(){if("function"==typeof window.CustomEvent)return;function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e;})(),(function(){for(var r=0,e=["ms","moz","webkit","o"],t=0;t<e.length&&!window.requestAnimationFrame;++t)window.requestAnimationFrame=window[e[t]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[t]+"CancelAnimationFrame"]||window[e[t]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,t){var n=(new Date).getTime(),o=Math.max(0,16-(n-r)),a=window.setTimeout((function(){e(n+o);}),o);return r=n+o,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e);});})(),(function(e,t){module.exports=t(e);})("undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof window?window:commonjsGlobal,(function(q){var I={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,speedAsDuration:!1,durationMax:null,durationMin:null,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0},F=function(){var n={};return Array.prototype.forEach.call(arguments,(function(e){for(var t in e){if(!e.hasOwnProperty(t))return;n[t]=e[t];}})),n},r=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,a=-1,r="",i=n.charCodeAt(0);++a<o;){if(0===(t=n.charCodeAt(a)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");1<=t&&t<=31||127==t||0===a&&48<=t&&t<=57||1===a&&48<=t&&t<=57&&45===i?r+="\\"+t.toString(16)+" ":r+=128<=t||45===t||95===t||48<=t&&t<=57||65<=t&&t<=90||97<=t&&t<=122?n.charAt(a):"\\"+n.charAt(a);}return "#"+r},L=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},x=function(e){return e?(t=e,parseInt(q.getComputedStyle(t).height,10)+e.offsetTop):0;var t;},H=function(e,t,n,o){if(t.emitEvents&&"function"==typeof q.CustomEvent){var a=new CustomEvent(e,{bubbles:!0,detail:{anchor:n,toggle:o}});document.dispatchEvent(a);}};return function(o,e){var A,a,O,C,M={};M.cancelScroll=function(e){cancelAnimationFrame(C),C=null,e||H("scrollCancel",A);},M.animateScroll=function(i,c,e){M.cancelScroll();var s=F(A||I,e||{}),u="[object Number]"===Object.prototype.toString.call(i),t=u||!i.tagName?null:i;if(u||t){var l=q.pageYOffset;s.header&&!O&&(O=document.querySelector(s.header));var n,o,a,m,r,d,f,h,p=x(O),g=u?i:(function(e,t,n,o){var a=0;if(e.offsetParent)for(;a+=e.offsetTop,e=e.offsetParent;);return a=Math.max(a-t-n,0),o&&(a=Math.min(a,L()-q.innerHeight)),a})(t,p,parseInt("function"==typeof s.offset?s.offset(i,c):s.offset,10),s.clip),y=g-l,v=L(),w=0,S=(n=y,a=(o=s).speedAsDuration?o.speed:Math.abs(n/1e3*o.speed),o.durationMax&&a>o.durationMax?o.durationMax:o.durationMin&&a<o.durationMin?o.durationMin:parseInt(a,10)),E=function(e,t){var n,o,a,r=q.pageYOffset;if(e==t||r==t||(l<t&&q.innerHeight+r)>=v)return M.cancelScroll(!0),o=t,a=u,0===(n=i)&&document.body.focus(),a||(n.focus(),document.activeElement!==n&&(n.setAttribute("tabindex","-1"),n.focus(),n.style.outline="none"),q.scrollTo(0,o)),H("scrollStop",s,i,c),!(C=m=null)},b=function(e){var t,n,o;m||(m=e),w+=e-m,d=l+y*(n=r=1<(r=0===S?0:w/S)?1:r,"easeInQuad"===(t=s).easing&&(o=n*n),"easeOutQuad"===t.easing&&(o=n*(2-n)),"easeInOutQuad"===t.easing&&(o=n<.5?2*n*n:(4-2*n)*n-1),"easeInCubic"===t.easing&&(o=n*n*n),"easeOutCubic"===t.easing&&(o=--n*n*n+1),"easeInOutCubic"===t.easing&&(o=n<.5?4*n*n*n:(n-1)*(2*n-2)*(2*n-2)+1),"easeInQuart"===t.easing&&(o=n*n*n*n),"easeOutQuart"===t.easing&&(o=1- --n*n*n*n),"easeInOutQuart"===t.easing&&(o=n<.5?8*n*n*n*n:1-8*--n*n*n*n),"easeInQuint"===t.easing&&(o=n*n*n*n*n),"easeOutQuint"===t.easing&&(o=1+--n*n*n*n*n),"easeInOutQuint"===t.easing&&(o=n<.5?16*n*n*n*n*n:1+16*--n*n*n*n*n),t.customEasing&&(o=t.customEasing(n)),o||n),q.scrollTo(0,Math.floor(d)),E(d,g)||(C=q.requestAnimationFrame(b),m=e);};0===q.pageYOffset&&q.scrollTo(0,0),f=i,h=s,u||history.pushState&&h.updateURL&&history.pushState({smoothScroll:JSON.stringify(h),anchor:f.id},document.title,f===document.documentElement?"#top":"#"+f.id),"matchMedia"in q&&q.matchMedia("(prefers-reduced-motion)").matches?q.scrollTo(0,Math.floor(g)):(H("scrollStart",s,i,c),M.cancelScroll(!0),q.requestAnimationFrame(b));}};var t=function(e){if(!e.defaultPrevented&&!(0!==e.button||e.metaKey||e.ctrlKey||e.shiftKey)&&"closest"in e.target&&(a=e.target.closest(o))&&"a"===a.tagName.toLowerCase()&&!e.target.closest(A.ignore)&&a.hostname===q.location.hostname&&a.pathname===q.location.pathname&&/#/.test(a.href)){var t,n=r(a.hash);if("#"===n){if(!A.topOnEmptyHash)return;t=document.documentElement;}else t=document.querySelector(n);(t=t||"#top"!==n?t:document.documentElement)&&(e.preventDefault(),(function(e){if(history.replaceState&&e.updateURL&&!history.state){var t=q.location.hash;t=t||"",history.replaceState({smoothScroll:JSON.stringify(e),anchor:t||q.pageYOffset},document.title,t||q.location.href);}})(A),M.animateScroll(t,a));}},n=function(e){if(null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(A)){var t=history.state.anchor;"string"==typeof t&&t&&!(t=document.querySelector(r(history.state.anchor)))||M.animateScroll(t,null,{updateURL:!1});}};M.destroy=function(){A&&(document.removeEventListener("click",t,!1),q.removeEventListener("popstate",n,!1),M.cancelScroll(),C=O=a=A=null);};return (function(){if(!("querySelector"in document&&"addEventListener"in q&&"requestAnimationFrame"in q&&"closest"in q.Element.prototype))throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";M.destroy(),A=F(I,e||{}),O=A.header?document.querySelector(A.header):null,document.addEventListener("click",t,!1),A.updateURL&&A.popstate&&q.addEventListener("popstate",n,!1);})(),M}}));
  });

  //

  var mrSmoothScroll = function ($) {
    var smoothScroll = new smoothScroll_polyfills_min('a[data-smooth-scroll]', {
      speedAsDuration: true,
      offset: $('body').attr('data-smooth-scroll-offset') || 0
    });
    return smoothScroll;
  }(jQuery$1);

  //

  (function ($) {
    $('.js-canvas-toggle').on('click', function () {
      $('body').toggleClass('is-mobile-menu-visible');

      if ($('body').hasClass('is-mobile-menu-visible')) {
        $('body').addClass('overflow-hidden');
      } else {
        $('body').removeClass('overflow-hidden');
      }
    });
  })(jQuery$1);

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible($this));
      var position = toInteger(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING ? S.charAt(position) : first
          : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod(true)
  };

  var O = 'object';
  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line no-undef
    check(typeof globalThis == O && globalThis) ||
    check(typeof window == O && window) ||
    check(typeof self == O && self) ||
    check(typeof commonjsGlobal == O && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func
    Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var descriptors = !fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  // `ToPrimitive` abstract operation
  // https://tc39.github.io/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var nativeDefineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var hide = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function (key, value) {
    try {
      hide(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    } return value;
  };

  var shared = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.2.1',
    mode:  'global',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });
  });

  var functionToString = shared('native-function-to-string', Function.toString);

  var WeakMap = global_1.WeakMap;

  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$1 = global_1.WeakMap;
  var set, get, has$1;

  var enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap) {
    var store = new WeakMap$1();
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;
    set = function (it, metadata) {
      wmset.call(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      hide(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
  var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f$1
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
  var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$2
  };

  var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(functionToString).split('toString');

  shared('inspectSource', function (it) {
    return functionToString.call(it);
  });

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
    if (O === global_1) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else hide(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
  });
  });

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$1 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    includes: createMethod$1(true),
    // `Array.prototype.indexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$1(false)
  };

  var indexOf = arrayIncludes.indexOf;


  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$4
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        hide(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  // `ToObject` abstract operation
  // https://tc39.github.io/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var correctPrototypeGetter = !fails(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO = sharedKey('IE_PROTO');
  var ObjectPrototype = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
    O = toObject(O);
    if (has(O, IE_PROTO)) return O[IE_PROTO];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype : null;
  };

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var Symbol$1 = global_1.Symbol;
  var store$1 = shared('wks');

  var wellKnownSymbol = function (name) {
    return store$1[name] || (store$1[name] = nativeSymbol && Symbol$1[name]
      || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
  };

  var ITERATOR = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS = false;

  var returnThis = function () { return this; };

  // `%IteratorPrototype%` object
  // https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
  }

  if (IteratorPrototype == undefined) IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  if ( !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
  };

  // `Object.keys` method
  // https://tc39.github.io/ecma262/#sec-object.keys
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var html = getBuiltIn('document', 'documentElement');

  var IE_PROTO$1 = sharedKey('IE_PROTO');

  var PROTOTYPE = 'prototype';
  var Empty = function () { /* empty */ };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var length = enumBugKeys.length;
    var lt = '<';
    var script = 'script';
    var gt = '>';
    var js = 'java' + script + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    iframe.src = String(js);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
    return createDict();
  };

  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE] = anObject(O);
      result = new Empty();
      Empty[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = createDict();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  hiddenKeys[IE_PROTO$1] = true;

  var defineProperty = objectDefineProperty.f;



  var TO_STRING_TAG = wellKnownSymbol('toStringTag');

  var setToStringTag = function (it, TAG, STATIC) {
    if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
      defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };

  var iterators = {};

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





  var returnThis$1 = function () { return this; };

  var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var aPossiblePrototype = function (it) {
    if (!isObject(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };

  // `Object.setPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$1 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis$2 = function () { return this; };

  var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$1]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
        if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
          } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
            hide(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }

    // define iterator
    if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
      hide(IterablePrototype, ITERATOR$1, defaultIterator);
    }
    iterators[NAME] = defaultIterator;

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
    }

    return methods;
  };

  var charAt = stringMultibyte.charAt;



  var STRING_ITERATOR = 'String Iterator';
  var setInternalState = internalState.set;
  var getInternalState = internalState.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  // optional / simple context binding
  var bindContext = function (fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
    } catch (error) {
      var returnMethod = iterator['return'];
      if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
      throw error;
    }
  };

  var ITERATOR$2 = wellKnownSymbol('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$2] === it);
  };

  var createProperty = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  var ITERATOR$3 = wellKnownSymbol('iterator');

  var getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$3]
      || it['@@iterator']
      || iterators[classof(it)];
  };

  // `Array.from` method implementation
  // https://tc39.github.io/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iteratorMethod = getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = bindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
      iterator = iteratorMethod.call(O);
      result = new C();
      for (;!(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping
          ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true)
          : step.value
        );
      }
    } else {
      length = toLength(O.length);
      result = new C(length);
      for (;length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  };

  var ITERATOR$4 = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$4] = function () {
      return this;
    };
    // eslint-disable-next-line no-throw-literal
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$4] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.github.io/ecma262/#sec-array.from
  _export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: arrayFrom
  });

  var from_1 = path.Array.from;

  //
  svgInjector.SVGInjector(document.querySelectorAll('[data-inject-svg]'), {
    afterEach: function afterEach(err, svg) {
      if (typeof jarallax === 'function') {
        svg.dispatchEvent(new CustomEvent('injected.mr.SVGInjector', {
          bubbles: true
        }));
      }
    }
  });

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var flatpickr = createCommonjsModule(function (module, exports) {
  /* flatpickr v4.6.3, @license MIT */
  (function (global, factory) {
       module.exports = factory() ;
  }(commonjsGlobal, function () {
      /*! *****************************************************************************
      Copyright (c) Microsoft Corporation. All rights reserved.
      Licensed under the Apache License, Version 2.0 (the "License"); you may not use
      this file except in compliance with the License. You may obtain a copy of the
      License at http://www.apache.org/licenses/LICENSE-2.0

      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
      KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
      WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
      MERCHANTABLITY OR NON-INFRINGEMENT.

      See the Apache Version 2.0 License for specific language governing permissions
      and limitations under the License.
      ***************************************************************************** */

      var __assign = function() {
          __assign = Object.assign || function __assign(t) {
              for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
              }
              return t;
          };
          return __assign.apply(this, arguments);
      };

      var HOOKS = [
          "onChange",
          "onClose",
          "onDayCreate",
          "onDestroy",
          "onKeyDown",
          "onMonthChange",
          "onOpen",
          "onParseConfig",
          "onReady",
          "onValueUpdate",
          "onYearChange",
          "onPreCalendarPosition",
      ];
      var defaults = {
          _disable: [],
          _enable: [],
          allowInput: false,
          altFormat: "F j, Y",
          altInput: false,
          altInputClass: "form-control input",
          animate: typeof window === "object" &&
              window.navigator.userAgent.indexOf("MSIE") === -1,
          ariaDateFormat: "F j, Y",
          clickOpens: true,
          closeOnSelect: true,
          conjunction: ", ",
          dateFormat: "Y-m-d",
          defaultHour: 12,
          defaultMinute: 0,
          defaultSeconds: 0,
          disable: [],
          disableMobile: false,
          enable: [],
          enableSeconds: false,
          enableTime: false,
          errorHandler: function (err) {
              return typeof console !== "undefined" && console.warn(err);
          },
          getWeek: function (givenDate) {
              var date = new Date(givenDate.getTime());
              date.setHours(0, 0, 0, 0);
              // Thursday in current week decides the year.
              date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
              // January 4 is always in week 1.
              var week1 = new Date(date.getFullYear(), 0, 4);
              // Adjust to Thursday in week 1 and count number of weeks from date to week1.
              return (1 +
                  Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                      3 +
                      ((week1.getDay() + 6) % 7)) /
                      7));
          },
          hourIncrement: 1,
          ignoredFocusElements: [],
          inline: false,
          locale: "default",
          minuteIncrement: 5,
          mode: "single",
          monthSelectorType: "dropdown",
          nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
          noCalendar: false,
          now: new Date(),
          onChange: [],
          onClose: [],
          onDayCreate: [],
          onDestroy: [],
          onKeyDown: [],
          onMonthChange: [],
          onOpen: [],
          onParseConfig: [],
          onReady: [],
          onValueUpdate: [],
          onYearChange: [],
          onPreCalendarPosition: [],
          plugins: [],
          position: "auto",
          positionElement: undefined,
          prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
          shorthandCurrentMonth: false,
          showMonths: 1,
          static: false,
          time_24hr: false,
          weekNumbers: false,
          wrap: false
      };

      var english = {
          weekdays: {
              shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              longhand: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
              ]
          },
          months: {
              shorthand: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
              ],
              longhand: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
              ]
          },
          daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
          firstDayOfWeek: 0,
          ordinal: function (nth) {
              var s = nth % 100;
              if (s > 3 && s < 21)
                  return "th";
              switch (s % 10) {
                  case 1:
                      return "st";
                  case 2:
                      return "nd";
                  case 3:
                      return "rd";
                  default:
                      return "th";
              }
          },
          rangeSeparator: " to ",
          weekAbbreviation: "Wk",
          scrollTitle: "Scroll to increment",
          toggleTitle: "Click to toggle",
          amPM: ["AM", "PM"],
          yearAriaLabel: "Year",
          hourAriaLabel: "Hour",
          minuteAriaLabel: "Minute",
          time_24hr: false
      };

      var pad = function (number) { return ("0" + number).slice(-2); };
      var int = function (bool) { return (bool === true ? 1 : 0); };
      /* istanbul ignore next */
      function debounce(func, wait, immediate) {
          if (immediate === void 0) { immediate = false; }
          var timeout;
          return function () {
              var context = this, args = arguments;
              timeout !== null && clearTimeout(timeout);
              timeout = window.setTimeout(function () {
                  timeout = null;
                  if (!immediate)
                      func.apply(context, args);
              }, wait);
              if (immediate && !timeout)
                  func.apply(context, args);
          };
      }
      var arrayify = function (obj) {
          return obj instanceof Array ? obj : [obj];
      };

      function toggleClass(elem, className, bool) {
          if (bool === true)
              return elem.classList.add(className);
          elem.classList.remove(className);
      }
      function createElement(tag, className, content) {
          var e = window.document.createElement(tag);
          className = className || "";
          content = content || "";
          e.className = className;
          if (content !== undefined)
              e.textContent = content;
          return e;
      }
      function clearNode(node) {
          while (node.firstChild)
              node.removeChild(node.firstChild);
      }
      function findParent(node, condition) {
          if (condition(node))
              return node;
          else if (node.parentNode)
              return findParent(node.parentNode, condition);
          return undefined; // nothing found
      }
      function createNumberInput(inputClassName, opts) {
          var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
          if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
              numInput.type = "number";
          }
          else {
              numInput.type = "text";
              numInput.pattern = "\\d*";
          }
          if (opts !== undefined)
              for (var key in opts)
                  numInput.setAttribute(key, opts[key]);
          wrapper.appendChild(numInput);
          wrapper.appendChild(arrowUp);
          wrapper.appendChild(arrowDown);
          return wrapper;
      }
      function getEventTarget(event) {
          if (typeof event.composedPath === "function") {
              var path = event.composedPath();
              return path[0];
          }
          return event.target;
      }

      var doNothing = function () { return undefined; };
      var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
      var revFormat = {
          D: doNothing,
          F: function (dateObj, monthName, locale) {
              dateObj.setMonth(locale.months.longhand.indexOf(monthName));
          },
          G: function (dateObj, hour) {
              dateObj.setHours(parseFloat(hour));
          },
          H: function (dateObj, hour) {
              dateObj.setHours(parseFloat(hour));
          },
          J: function (dateObj, day) {
              dateObj.setDate(parseFloat(day));
          },
          K: function (dateObj, amPM, locale) {
              dateObj.setHours((dateObj.getHours() % 12) +
                  12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
          },
          M: function (dateObj, shortMonth, locale) {
              dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
          },
          S: function (dateObj, seconds) {
              dateObj.setSeconds(parseFloat(seconds));
          },
          U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
          W: function (dateObj, weekNum, locale) {
              var weekNumber = parseInt(weekNum);
              var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
              date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
              return date;
          },
          Y: function (dateObj, year) {
              dateObj.setFullYear(parseFloat(year));
          },
          Z: function (_, ISODate) { return new Date(ISODate); },
          d: function (dateObj, day) {
              dateObj.setDate(parseFloat(day));
          },
          h: function (dateObj, hour) {
              dateObj.setHours(parseFloat(hour));
          },
          i: function (dateObj, minutes) {
              dateObj.setMinutes(parseFloat(minutes));
          },
          j: function (dateObj, day) {
              dateObj.setDate(parseFloat(day));
          },
          l: doNothing,
          m: function (dateObj, month) {
              dateObj.setMonth(parseFloat(month) - 1);
          },
          n: function (dateObj, month) {
              dateObj.setMonth(parseFloat(month) - 1);
          },
          s: function (dateObj, seconds) {
              dateObj.setSeconds(parseFloat(seconds));
          },
          u: function (_, unixMillSeconds) {
              return new Date(parseFloat(unixMillSeconds));
          },
          w: doNothing,
          y: function (dateObj, year) {
              dateObj.setFullYear(2000 + parseFloat(year));
          }
      };
      var tokenRegex = {
          D: "(\\w+)",
          F: "(\\w+)",
          G: "(\\d\\d|\\d)",
          H: "(\\d\\d|\\d)",
          J: "(\\d\\d|\\d)\\w+",
          K: "",
          M: "(\\w+)",
          S: "(\\d\\d|\\d)",
          U: "(.+)",
          W: "(\\d\\d|\\d)",
          Y: "(\\d{4})",
          Z: "(.+)",
          d: "(\\d\\d|\\d)",
          h: "(\\d\\d|\\d)",
          i: "(\\d\\d|\\d)",
          j: "(\\d\\d|\\d)",
          l: "(\\w+)",
          m: "(\\d\\d|\\d)",
          n: "(\\d\\d|\\d)",
          s: "(\\d\\d|\\d)",
          u: "(.+)",
          w: "(\\d\\d|\\d)",
          y: "(\\d{2})"
      };
      var formats = {
          // get the date in UTC
          Z: function (date) { return date.toISOString(); },
          // weekday name, short, e.g. Thu
          D: function (date, locale, options) {
              return locale.weekdays.shorthand[formats.w(date, locale, options)];
          },
          // full month name e.g. January
          F: function (date, locale, options) {
              return monthToStr(formats.n(date, locale, options) - 1, false, locale);
          },
          // padded hour 1-12
          G: function (date, locale, options) {
              return pad(formats.h(date, locale, options));
          },
          // hours with leading zero e.g. 03
          H: function (date) { return pad(date.getHours()); },
          // day (1-30) with ordinal suffix e.g. 1st, 2nd
          J: function (date, locale) {
              return locale.ordinal !== undefined
                  ? date.getDate() + locale.ordinal(date.getDate())
                  : date.getDate();
          },
          // AM/PM
          K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
          // shorthand month e.g. Jan, Sep, Oct, etc
          M: function (date, locale) {
              return monthToStr(date.getMonth(), true, locale);
          },
          // seconds 00-59
          S: function (date) { return pad(date.getSeconds()); },
          // unix timestamp
          U: function (date) { return date.getTime() / 1000; },
          W: function (date, _, options) {
              return options.getWeek(date);
          },
          // full year e.g. 2016
          Y: function (date) { return date.getFullYear(); },
          // day in month, padded (01-30)
          d: function (date) { return pad(date.getDate()); },
          // hour from 1-12 (am/pm)
          h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
          // minutes, padded with leading zero e.g. 09
          i: function (date) { return pad(date.getMinutes()); },
          // day in month (1-30)
          j: function (date) { return date.getDate(); },
          // weekday name, full, e.g. Thursday
          l: function (date, locale) {
              return locale.weekdays.longhand[date.getDay()];
          },
          // padded month number (01-12)
          m: function (date) { return pad(date.getMonth() + 1); },
          // the month number (1-12)
          n: function (date) { return date.getMonth() + 1; },
          // seconds 0-59
          s: function (date) { return date.getSeconds(); },
          // Unix Milliseconds
          u: function (date) { return date.getTime(); },
          // number of the day of the week
          w: function (date) { return date.getDay(); },
          // last two digits of year e.g. 16 for 2016
          y: function (date) { return String(date.getFullYear()).substring(2); }
      };

      var createDateFormatter = function (_a) {
          var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
          return function (dateObj, frmt, overrideLocale) {
              var locale = overrideLocale || l10n;
              if (config.formatDate !== undefined) {
                  return config.formatDate(dateObj, frmt, locale);
              }
              return frmt
                  .split("")
                  .map(function (c, i, arr) {
                  return formats[c] && arr[i - 1] !== "\\"
                      ? formats[c](dateObj, locale, config)
                      : c !== "\\"
                          ? c
                          : "";
              })
                  .join("");
          };
      };
      var createDateParser = function (_a) {
          var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
          return function (date, givenFormat, timeless, customLocale) {
              if (date !== 0 && !date)
                  return undefined;
              var locale = customLocale || l10n;
              var parsedDate;
              var dateOrig = date;
              if (date instanceof Date)
                  parsedDate = new Date(date.getTime());
              else if (typeof date !== "string" &&
                  date.toFixed !== undefined // timestamp
              )
                  // create a copy
                  parsedDate = new Date(date);
              else if (typeof date === "string") {
                  // date string
                  var format = givenFormat || (config || defaults).dateFormat;
                  var datestr = String(date).trim();
                  if (datestr === "today") {
                      parsedDate = new Date();
                      timeless = true;
                  }
                  else if (/Z$/.test(datestr) ||
                      /GMT$/.test(datestr) // datestrings w/ timezone
                  )
                      parsedDate = new Date(date);
                  else if (config && config.parseDate)
                      parsedDate = config.parseDate(date, format);
                  else {
                      parsedDate =
                          !config || !config.noCalendar
                              ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                              : new Date(new Date().setHours(0, 0, 0, 0));
                      var matched = void 0, ops = [];
                      for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                          var token_1 = format[i];
                          var isBackSlash = token_1 === "\\";
                          var escaped = format[i - 1] === "\\" || isBackSlash;
                          if (tokenRegex[token_1] && !escaped) {
                              regexStr += tokenRegex[token_1];
                              var match = new RegExp(regexStr).exec(date);
                              if (match && (matched = true)) {
                                  ops[token_1 !== "Y" ? "push" : "unshift"]({
                                      fn: revFormat[token_1],
                                      val: match[++matchIndex]
                                  });
                              }
                          }
                          else if (!isBackSlash)
                              regexStr += "."; // don't really care
                          ops.forEach(function (_a) {
                              var fn = _a.fn, val = _a.val;
                              return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
                          });
                      }
                      parsedDate = matched ? parsedDate : undefined;
                  }
              }
              /* istanbul ignore next */
              if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
                  config.errorHandler(new Error("Invalid date provided: " + dateOrig));
                  return undefined;
              }
              if (timeless === true)
                  parsedDate.setHours(0, 0, 0, 0);
              return parsedDate;
          };
      };
      /**
       * Compute the difference in dates, measured in ms
       */
      function compareDates(date1, date2, timeless) {
          if (timeless === void 0) { timeless = true; }
          if (timeless !== false) {
              return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
                  new Date(date2.getTime()).setHours(0, 0, 0, 0));
          }
          return date1.getTime() - date2.getTime();
      }
      var isBetween = function (ts, ts1, ts2) {
          return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
      };
      var duration = {
          DAY: 86400000
      };

      if (typeof Object.assign !== "function") {
          Object.assign = function (target) {
              var args = [];
              for (var _i = 1; _i < arguments.length; _i++) {
                  args[_i - 1] = arguments[_i];
              }
              if (!target) {
                  throw TypeError("Cannot convert undefined or null to object");
              }
              var _loop_1 = function (source) {
                  if (source) {
                      Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
                  }
              };
              for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                  var source = args_1[_a];
                  _loop_1(source);
              }
              return target;
          };
      }

      var DEBOUNCED_CHANGE_MS = 300;
      function FlatpickrInstance(element, instanceConfig) {
          var self = {
              config: __assign({}, defaults, flatpickr.defaultConfig),
              l10n: english
          };
          self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
          self._handlers = [];
          self.pluginElements = [];
          self.loadedPlugins = [];
          self._bind = bind;
          self._setHoursFromDate = setHoursFromDate;
          self._positionCalendar = positionCalendar;
          self.changeMonth = changeMonth;
          self.changeYear = changeYear;
          self.clear = clear;
          self.close = close;
          self._createElement = createElement;
          self.destroy = destroy;
          self.isEnabled = isEnabled;
          self.jumpToDate = jumpToDate;
          self.open = open;
          self.redraw = redraw;
          self.set = set;
          self.setDate = setDate;
          self.toggle = toggle;
          function setupHelperFunctions() {
              self.utils = {
                  getDaysInMonth: function (month, yr) {
                      if (month === void 0) { month = self.currentMonth; }
                      if (yr === void 0) { yr = self.currentYear; }
                      if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                          return 29;
                      return self.l10n.daysInMonth[month];
                  }
              };
          }
          function init() {
              self.element = self.input = element;
              self.isOpen = false;
              parseConfig();
              setupLocale();
              setupInputs();
              setupDates();
              setupHelperFunctions();
              if (!self.isMobile)
                  build();
              bindEvents();
              if (self.selectedDates.length || self.config.noCalendar) {
                  if (self.config.enableTime) {
                      setHoursFromDate(self.config.noCalendar
                          ? self.latestSelectedDateObj || self.config.minDate
                          : undefined);
                  }
                  updateValue(false);
              }
              setCalendarWidth();
              self.showTimeInput =
                  self.selectedDates.length > 0 || self.config.noCalendar;
              var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
              /* TODO: investigate this further
          
                Currently, there is weird positioning behavior in safari causing pages
                to scroll up. https://github.com/chmln/flatpickr/issues/563
          
                However, most browsers are not Safari and positioning is expensive when used
                in scale. https://github.com/chmln/flatpickr/issues/1096
              */
              if (!self.isMobile && isSafari) {
                  positionCalendar();
              }
              triggerEvent("onReady");
          }
          function bindToInstance(fn) {
              return fn.bind(self);
          }
          function setCalendarWidth() {
              var config = self.config;
              if (config.weekNumbers === false && config.showMonths === 1)
                  return;
              else if (config.noCalendar !== true) {
                  window.requestAnimationFrame(function () {
                      if (self.calendarContainer !== undefined) {
                          self.calendarContainer.style.visibility = "hidden";
                          self.calendarContainer.style.display = "block";
                      }
                      if (self.daysContainer !== undefined) {
                          var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                          self.daysContainer.style.width = daysWidth + "px";
                          self.calendarContainer.style.width =
                              daysWidth +
                                  (self.weekWrapper !== undefined
                                      ? self.weekWrapper.offsetWidth
                                      : 0) +
                                  "px";
                          self.calendarContainer.style.removeProperty("visibility");
                          self.calendarContainer.style.removeProperty("display");
                      }
                  });
              }
          }
          /**
           * The handler for all events targeting the time inputs
           */
          function updateTime(e) {
              if (self.selectedDates.length === 0) {
                  setDefaultTime();
              }
              if (e !== undefined && e.type !== "blur") {
                  timeWrapper(e);
              }
              var prevValue = self._input.value;
              setHoursFromInputs();
              updateValue();
              if (self._input.value !== prevValue) {
                  self._debouncedChange();
              }
          }
          function ampm2military(hour, amPM) {
              return (hour % 12) + 12 * int(amPM === self.l10n.amPM[1]);
          }
          function military2ampm(hour) {
              switch (hour % 24) {
                  case 0:
                  case 12:
                      return 12;
                  default:
                      return hour % 12;
              }
          }
          /**
           * Syncs the selected date object time with user's time input
           */
          function setHoursFromInputs() {
              if (self.hourElement === undefined || self.minuteElement === undefined)
                  return;
              var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
                  ? (parseInt(self.secondElement.value, 10) || 0) % 60
                  : 0;
              if (self.amPM !== undefined) {
                  hours = ampm2military(hours, self.amPM.textContent);
              }
              var limitMinHours = self.config.minTime !== undefined ||
                  (self.config.minDate &&
                      self.minDateHasTime &&
                      self.latestSelectedDateObj &&
                      compareDates(self.latestSelectedDateObj, self.config.minDate, true) ===
                          0);
              var limitMaxHours = self.config.maxTime !== undefined ||
                  (self.config.maxDate &&
                      self.maxDateHasTime &&
                      self.latestSelectedDateObj &&
                      compareDates(self.latestSelectedDateObj, self.config.maxDate, true) ===
                          0);
              if (limitMaxHours) {
                  var maxTime = self.config.maxTime !== undefined
                      ? self.config.maxTime
                      : self.config.maxDate;
                  hours = Math.min(hours, maxTime.getHours());
                  if (hours === maxTime.getHours())
                      minutes = Math.min(minutes, maxTime.getMinutes());
                  if (minutes === maxTime.getMinutes())
                      seconds = Math.min(seconds, maxTime.getSeconds());
              }
              if (limitMinHours) {
                  var minTime = self.config.minTime !== undefined
                      ? self.config.minTime
                      : self.config.minDate;
                  hours = Math.max(hours, minTime.getHours());
                  if (hours === minTime.getHours())
                      minutes = Math.max(minutes, minTime.getMinutes());
                  if (minutes === minTime.getMinutes())
                      seconds = Math.max(seconds, minTime.getSeconds());
              }
              setHours(hours, minutes, seconds);
          }
          /**
           * Syncs time input values with a date
           */
          function setHoursFromDate(dateObj) {
              var date = dateObj || self.latestSelectedDateObj;
              if (date)
                  setHours(date.getHours(), date.getMinutes(), date.getSeconds());
          }
          function setDefaultHours() {
              var hours = self.config.defaultHour;
              var minutes = self.config.defaultMinute;
              var seconds = self.config.defaultSeconds;
              if (self.config.minDate !== undefined) {
                  var minHr = self.config.minDate.getHours();
                  var minMinutes = self.config.minDate.getMinutes();
                  hours = Math.max(hours, minHr);
                  if (hours === minHr)
                      minutes = Math.max(minMinutes, minutes);
                  if (hours === minHr && minutes === minMinutes)
                      seconds = self.config.minDate.getSeconds();
              }
              if (self.config.maxDate !== undefined) {
                  var maxHr = self.config.maxDate.getHours();
                  var maxMinutes = self.config.maxDate.getMinutes();
                  hours = Math.min(hours, maxHr);
                  if (hours === maxHr)
                      minutes = Math.min(maxMinutes, minutes);
                  if (hours === maxHr && minutes === maxMinutes)
                      seconds = self.config.maxDate.getSeconds();
              }
              setHours(hours, minutes, seconds);
          }
          /**
           * Sets the hours, minutes, and optionally seconds
           * of the latest selected date object and the
           * corresponding time inputs
           * @param {Number} hours the hour. whether its military
           *                 or am-pm gets inferred from config
           * @param {Number} minutes the minutes
           * @param {Number} seconds the seconds (optional)
           */
          function setHours(hours, minutes, seconds) {
              if (self.latestSelectedDateObj !== undefined) {
                  self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
              }
              if (!self.hourElement || !self.minuteElement || self.isMobile)
                  return;
              self.hourElement.value = pad(!self.config.time_24hr
                  ? ((12 + hours) % 12) + 12 * int(hours % 12 === 0)
                  : hours);
              self.minuteElement.value = pad(minutes);
              if (self.amPM !== undefined)
                  self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
              if (self.secondElement !== undefined)
                  self.secondElement.value = pad(seconds);
          }
          /**
           * Handles the year input and incrementing events
           * @param {Event} event the keyup or increment event
           */
          function onYearInput(event) {
              var year = parseInt(event.target.value) + (event.delta || 0);
              if (year / 1000 > 1 ||
                  (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
                  changeYear(year);
              }
          }
          /**
           * Essentially addEventListener + tracking
           * @param {Element} element the element to addEventListener to
           * @param {String} event the event name
           * @param {Function} handler the event handler
           */
          function bind(element, event, handler, options) {
              if (event instanceof Array)
                  return event.forEach(function (ev) { return bind(element, ev, handler, options); });
              if (element instanceof Array)
                  return element.forEach(function (el) { return bind(el, event, handler, options); });
              element.addEventListener(event, handler, options);
              self._handlers.push({
                  element: element,
                  event: event,
                  handler: handler,
                  options: options
              });
          }
          /**
           * A mousedown handler which mimics click.
           * Minimizes latency, since we don't need to wait for mouseup in most cases.
           * Also, avoids handling right clicks.
           *
           * @param {Function} handler the event handler
           */
          function onClick(handler) {
              return function (evt) {
                  evt.which === 1 && handler(evt);
              };
          }
          function triggerChange() {
              triggerEvent("onChange");
          }
          /**
           * Adds all the necessary event listeners
           */
          function bindEvents() {
              if (self.config.wrap) {
                  ["open", "close", "toggle", "clear"].forEach(function (evt) {
                      Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                          return bind(el, "click", self[evt]);
                      });
                  });
              }
              if (self.isMobile) {
                  setupMobile();
                  return;
              }
              var debouncedResize = debounce(onResize, 50);
              self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
              if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
                  bind(self.daysContainer, "mouseover", function (e) {
                      if (self.config.mode === "range")
                          onMouseOver(e.target);
                  });
              bind(window.document.body, "keydown", onKeyDown);
              if (!self.config.inline && !self.config.static)
                  bind(window, "resize", debouncedResize);
              if (window.ontouchstart !== undefined)
                  bind(window.document, "touchstart", documentClick);
              else
                  bind(window.document, "mousedown", onClick(documentClick));
              bind(window.document, "focus", documentClick, { capture: true });
              if (self.config.clickOpens === true) {
                  bind(self._input, "focus", self.open);
                  bind(self._input, "mousedown", onClick(self.open));
              }
              if (self.daysContainer !== undefined) {
                  bind(self.monthNav, "mousedown", onClick(onMonthNavClick));
                  bind(self.monthNav, ["keyup", "increment"], onYearInput);
                  bind(self.daysContainer, "mousedown", onClick(selectDate));
              }
              if (self.timeContainer !== undefined &&
                  self.minuteElement !== undefined &&
                  self.hourElement !== undefined) {
                  var selText = function (e) {
                      return e.target.select();
                  };
                  bind(self.timeContainer, ["increment"], updateTime);
                  bind(self.timeContainer, "blur", updateTime, { capture: true });
                  bind(self.timeContainer, "mousedown", onClick(timeIncrement));
                  bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
                  if (self.secondElement !== undefined)
                      bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
                  if (self.amPM !== undefined) {
                      bind(self.amPM, "mousedown", onClick(function (e) {
                          updateTime(e);
                          triggerChange();
                      }));
                  }
              }
          }
          /**
           * Set the calendar view to a particular date.
           * @param {Date} jumpDate the date to set the view to
           * @param {boolean} triggerChange if change events should be triggered
           */
          function jumpToDate(jumpDate, triggerChange) {
              var jumpTo = jumpDate !== undefined
                  ? self.parseDate(jumpDate)
                  : self.latestSelectedDateObj ||
                      (self.config.minDate && self.config.minDate > self.now
                          ? self.config.minDate
                          : self.config.maxDate && self.config.maxDate < self.now
                              ? self.config.maxDate
                              : self.now);
              var oldYear = self.currentYear;
              var oldMonth = self.currentMonth;
              try {
                  if (jumpTo !== undefined) {
                      self.currentYear = jumpTo.getFullYear();
                      self.currentMonth = jumpTo.getMonth();
                  }
              }
              catch (e) {
                  /* istanbul ignore next */
                  e.message = "Invalid date supplied: " + jumpTo;
                  self.config.errorHandler(e);
              }
              if (triggerChange && self.currentYear !== oldYear) {
                  triggerEvent("onYearChange");
                  buildMonthSwitch();
              }
              if (triggerChange &&
                  (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
                  triggerEvent("onMonthChange");
              }
              self.redraw();
          }
          /**
           * The up/down arrow handler for time inputs
           * @param {Event} e the click event
           */
          function timeIncrement(e) {
              if (~e.target.className.indexOf("arrow"))
                  incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
          }
          /**
           * Increments/decrements the value of input associ-
           * ated with the up/down arrow by dispatching an
           * "increment" event on the input.
           *
           * @param {Event} e the click event
           * @param {Number} delta the diff (usually 1 or -1)
           * @param {Element} inputElem the input element
           */
          function incrementNumInput(e, delta, inputElem) {
              var target = e && e.target;
              var input = inputElem ||
                  (target && target.parentNode && target.parentNode.firstChild);
              var event = createEvent("increment");
              event.delta = delta;
              input && input.dispatchEvent(event);
          }
          function build() {
              var fragment = window.document.createDocumentFragment();
              self.calendarContainer = createElement("div", "flatpickr-calendar");
              self.calendarContainer.tabIndex = -1;
              if (!self.config.noCalendar) {
                  fragment.appendChild(buildMonthNav());
                  self.innerContainer = createElement("div", "flatpickr-innerContainer");
                  if (self.config.weekNumbers) {
                      var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                      self.innerContainer.appendChild(weekWrapper);
                      self.weekNumbers = weekNumbers;
                      self.weekWrapper = weekWrapper;
                  }
                  self.rContainer = createElement("div", "flatpickr-rContainer");
                  self.rContainer.appendChild(buildWeekdays());
                  if (!self.daysContainer) {
                      self.daysContainer = createElement("div", "flatpickr-days");
                      self.daysContainer.tabIndex = -1;
                  }
                  buildDays();
                  self.rContainer.appendChild(self.daysContainer);
                  self.innerContainer.appendChild(self.rContainer);
                  fragment.appendChild(self.innerContainer);
              }
              if (self.config.enableTime) {
                  fragment.appendChild(buildTime());
              }
              toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
              toggleClass(self.calendarContainer, "animate", self.config.animate === true);
              toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
              self.calendarContainer.appendChild(fragment);
              var customAppend = self.config.appendTo !== undefined &&
                  self.config.appendTo.nodeType !== undefined;
              if (self.config.inline || self.config.static) {
                  self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
                  if (self.config.inline) {
                      if (!customAppend && self.element.parentNode)
                          self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                      else if (self.config.appendTo !== undefined)
                          self.config.appendTo.appendChild(self.calendarContainer);
                  }
                  if (self.config.static) {
                      var wrapper = createElement("div", "flatpickr-wrapper");
                      if (self.element.parentNode)
                          self.element.parentNode.insertBefore(wrapper, self.element);
                      wrapper.appendChild(self.element);
                      if (self.altInput)
                          wrapper.appendChild(self.altInput);
                      wrapper.appendChild(self.calendarContainer);
                  }
              }
              if (!self.config.static && !self.config.inline)
                  (self.config.appendTo !== undefined
                      ? self.config.appendTo
                      : window.document.body).appendChild(self.calendarContainer);
          }
          function createDay(className, date, dayNumber, i) {
              var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
              dayElement.dateObj = date;
              dayElement.$i = i;
              dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
              if (className.indexOf("hidden") === -1 &&
                  compareDates(date, self.now) === 0) {
                  self.todayDateElem = dayElement;
                  dayElement.classList.add("today");
                  dayElement.setAttribute("aria-current", "date");
              }
              if (dateIsEnabled) {
                  dayElement.tabIndex = -1;
                  if (isDateSelected(date)) {
                      dayElement.classList.add("selected");
                      self.selectedDateElem = dayElement;
                      if (self.config.mode === "range") {
                          toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                              compareDates(date, self.selectedDates[0], true) === 0);
                          toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                              compareDates(date, self.selectedDates[1], true) === 0);
                          if (className === "nextMonthDay")
                              dayElement.classList.add("inRange");
                      }
                  }
              }
              else {
                  dayElement.classList.add("flatpickr-disabled");
              }
              if (self.config.mode === "range") {
                  if (isDateInRange(date) && !isDateSelected(date))
                      dayElement.classList.add("inRange");
              }
              if (self.weekNumbers &&
                  self.config.showMonths === 1 &&
                  className !== "prevMonthDay" &&
                  dayNumber % 7 === 1) {
                  self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
              }
              triggerEvent("onDayCreate", dayElement);
              return dayElement;
          }
          function focusOnDayElem(targetNode) {
              targetNode.focus();
              if (self.config.mode === "range")
                  onMouseOver(targetNode);
          }
          function getFirstAvailableDay(delta) {
              var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
              var endMonth = delta > 0 ? self.config.showMonths : -1;
              for (var m = startMonth; m != endMonth; m += delta) {
                  var month = self.daysContainer.children[m];
                  var startIndex = delta > 0 ? 0 : month.children.length - 1;
                  var endIndex = delta > 0 ? month.children.length : -1;
                  for (var i = startIndex; i != endIndex; i += delta) {
                      var c = month.children[i];
                      if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
                          return c;
                  }
              }
              return undefined;
          }
          function getNextAvailableDay(current, delta) {
              var givenMonth = current.className.indexOf("Month") === -1
                  ? current.dateObj.getMonth()
                  : self.currentMonth;
              var endMonth = delta > 0 ? self.config.showMonths : -1;
              var loopDelta = delta > 0 ? 1 : -1;
              for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
                  var month = self.daysContainer.children[m];
                  var startIndex = givenMonth - self.currentMonth === m
                      ? current.$i + delta
                      : delta < 0
                          ? month.children.length - 1
                          : 0;
                  var numMonthDays = month.children.length;
                  for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                      var c = month.children[i];
                      if (c.className.indexOf("hidden") === -1 &&
                          isEnabled(c.dateObj) &&
                          Math.abs(current.$i - i) >= Math.abs(delta))
                          return focusOnDayElem(c);
                  }
              }
              self.changeMonth(loopDelta);
              focusOnDay(getFirstAvailableDay(loopDelta), 0);
              return undefined;
          }
          function focusOnDay(current, offset) {
              var dayFocused = isInView(document.activeElement || document.body);
              var startElem = current !== undefined
                  ? current
                  : dayFocused
                      ? document.activeElement
                      : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
                          ? self.selectedDateElem
                          : self.todayDateElem !== undefined && isInView(self.todayDateElem)
                              ? self.todayDateElem
                              : getFirstAvailableDay(offset > 0 ? 1 : -1);
              if (startElem === undefined)
                  return self._input.focus();
              if (!dayFocused)
                  return focusOnDayElem(startElem);
              getNextAvailableDay(startElem, offset);
          }
          function buildMonthDays(year, month) {
              var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
              var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12);
              var daysInMonth = self.utils.getDaysInMonth(month), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
              var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
              // prepend days from the ending of previous month
              for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
                  days.appendChild(createDay(prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
              }
              // Start at 1 since there is no 0th day
              for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
                  days.appendChild(createDay("", new Date(year, month, dayNumber), dayNumber, dayIndex));
              }
              // append days from the next month
              for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
                  (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
                  days.appendChild(createDay(nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
              }
              //updateNavigationCurrentMonth();
              var dayContainer = createElement("div", "dayContainer");
              dayContainer.appendChild(days);
              return dayContainer;
          }
          function buildDays() {
              if (self.daysContainer === undefined) {
                  return;
              }
              clearNode(self.daysContainer);
              // TODO: week numbers for each month
              if (self.weekNumbers)
                  clearNode(self.weekNumbers);
              var frag = document.createDocumentFragment();
              for (var i = 0; i < self.config.showMonths; i++) {
                  var d = new Date(self.currentYear, self.currentMonth, 1);
                  d.setMonth(self.currentMonth + i);
                  frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
              }
              self.daysContainer.appendChild(frag);
              self.days = self.daysContainer.firstChild;
              if (self.config.mode === "range" && self.selectedDates.length === 1) {
                  onMouseOver();
              }
          }
          function buildMonthSwitch() {
              if (self.config.showMonths > 1 ||
                  self.config.monthSelectorType !== "dropdown")
                  return;
              var shouldBuildMonth = function (month) {
                  if (self.config.minDate !== undefined &&
                      self.currentYear === self.config.minDate.getFullYear() &&
                      month < self.config.minDate.getMonth()) {
                      return false;
                  }
                  return !(self.config.maxDate !== undefined &&
                      self.currentYear === self.config.maxDate.getFullYear() &&
                      month > self.config.maxDate.getMonth());
              };
              self.monthsDropdownContainer.tabIndex = -1;
              self.monthsDropdownContainer.innerHTML = "";
              for (var i = 0; i < 12; i++) {
                  if (!shouldBuildMonth(i))
                      continue;
                  var month = createElement("option", "flatpickr-monthDropdown-month");
                  month.value = new Date(self.currentYear, i).getMonth().toString();
                  month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
                  month.tabIndex = -1;
                  if (self.currentMonth === i) {
                      month.selected = true;
                  }
                  self.monthsDropdownContainer.appendChild(month);
              }
          }
          function buildMonth() {
              var container = createElement("div", "flatpickr-month");
              var monthNavFragment = window.document.createDocumentFragment();
              var monthElement;
              if (self.config.showMonths > 1 ||
                  self.config.monthSelectorType === "static") {
                  monthElement = createElement("span", "cur-month");
              }
              else {
                  self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
                  bind(self.monthsDropdownContainer, "change", function (e) {
                      var target = e.target;
                      var selectedMonth = parseInt(target.value, 10);
                      self.changeMonth(selectedMonth - self.currentMonth);
                      triggerEvent("onMonthChange");
                  });
                  buildMonthSwitch();
                  monthElement = self.monthsDropdownContainer;
              }
              var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
              var yearElement = yearInput.getElementsByTagName("input")[0];
              yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
              if (self.config.minDate) {
                  yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
              }
              if (self.config.maxDate) {
                  yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
                  yearElement.disabled =
                      !!self.config.minDate &&
                          self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
              }
              var currentMonth = createElement("div", "flatpickr-current-month");
              currentMonth.appendChild(monthElement);
              currentMonth.appendChild(yearInput);
              monthNavFragment.appendChild(currentMonth);
              container.appendChild(monthNavFragment);
              return {
                  container: container,
                  yearElement: yearElement,
                  monthElement: monthElement
              };
          }
          function buildMonths() {
              clearNode(self.monthNav);
              self.monthNav.appendChild(self.prevMonthNav);
              if (self.config.showMonths) {
                  self.yearElements = [];
                  self.monthElements = [];
              }
              for (var m = self.config.showMonths; m--;) {
                  var month = buildMonth();
                  self.yearElements.push(month.yearElement);
                  self.monthElements.push(month.monthElement);
                  self.monthNav.appendChild(month.container);
              }
              self.monthNav.appendChild(self.nextMonthNav);
          }
          function buildMonthNav() {
              self.monthNav = createElement("div", "flatpickr-months");
              self.yearElements = [];
              self.monthElements = [];
              self.prevMonthNav = createElement("span", "flatpickr-prev-month");
              self.prevMonthNav.innerHTML = self.config.prevArrow;
              self.nextMonthNav = createElement("span", "flatpickr-next-month");
              self.nextMonthNav.innerHTML = self.config.nextArrow;
              buildMonths();
              Object.defineProperty(self, "_hidePrevMonthArrow", {
                  get: function () { return self.__hidePrevMonthArrow; },
                  set: function (bool) {
                      if (self.__hidePrevMonthArrow !== bool) {
                          toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
                          self.__hidePrevMonthArrow = bool;
                      }
                  }
              });
              Object.defineProperty(self, "_hideNextMonthArrow", {
                  get: function () { return self.__hideNextMonthArrow; },
                  set: function (bool) {
                      if (self.__hideNextMonthArrow !== bool) {
                          toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
                          self.__hideNextMonthArrow = bool;
                      }
                  }
              });
              self.currentYearElement = self.yearElements[0];
              updateNavigationCurrentMonth();
              return self.monthNav;
          }
          function buildTime() {
              self.calendarContainer.classList.add("hasTime");
              if (self.config.noCalendar)
                  self.calendarContainer.classList.add("noCalendar");
              self.timeContainer = createElement("div", "flatpickr-time");
              self.timeContainer.tabIndex = -1;
              var separator = createElement("span", "flatpickr-time-separator", ":");
              var hourInput = createNumberInput("flatpickr-hour", {
                  "aria-label": self.l10n.hourAriaLabel
              });
              self.hourElement = hourInput.getElementsByTagName("input")[0];
              var minuteInput = createNumberInput("flatpickr-minute", {
                  "aria-label": self.l10n.minuteAriaLabel
              });
              self.minuteElement = minuteInput.getElementsByTagName("input")[0];
              self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
              self.hourElement.value = pad(self.latestSelectedDateObj
                  ? self.latestSelectedDateObj.getHours()
                  : self.config.time_24hr
                      ? self.config.defaultHour
                      : military2ampm(self.config.defaultHour));
              self.minuteElement.value = pad(self.latestSelectedDateObj
                  ? self.latestSelectedDateObj.getMinutes()
                  : self.config.defaultMinute);
              self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
              self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
              self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
              self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
              self.minuteElement.setAttribute("min", "0");
              self.minuteElement.setAttribute("max", "59");
              self.timeContainer.appendChild(hourInput);
              self.timeContainer.appendChild(separator);
              self.timeContainer.appendChild(minuteInput);
              if (self.config.time_24hr)
                  self.timeContainer.classList.add("time24hr");
              if (self.config.enableSeconds) {
                  self.timeContainer.classList.add("hasSeconds");
                  var secondInput = createNumberInput("flatpickr-second");
                  self.secondElement = secondInput.getElementsByTagName("input")[0];
                  self.secondElement.value = pad(self.latestSelectedDateObj
                      ? self.latestSelectedDateObj.getSeconds()
                      : self.config.defaultSeconds);
                  self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
                  self.secondElement.setAttribute("min", "0");
                  self.secondElement.setAttribute("max", "59");
                  self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
                  self.timeContainer.appendChild(secondInput);
              }
              if (!self.config.time_24hr) {
                  // add self.amPM if appropriate
                  self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                      ? self.hourElement.value
                      : self.config.defaultHour) > 11)]);
                  self.amPM.title = self.l10n.toggleTitle;
                  self.amPM.tabIndex = -1;
                  self.timeContainer.appendChild(self.amPM);
              }
              return self.timeContainer;
          }
          function buildWeekdays() {
              if (!self.weekdayContainer)
                  self.weekdayContainer = createElement("div", "flatpickr-weekdays");
              else
                  clearNode(self.weekdayContainer);
              for (var i = self.config.showMonths; i--;) {
                  var container = createElement("div", "flatpickr-weekdaycontainer");
                  self.weekdayContainer.appendChild(container);
              }
              updateWeekdays();
              return self.weekdayContainer;
          }
          function updateWeekdays() {
              if (!self.weekdayContainer) {
                  return;
              }
              var firstDayOfWeek = self.l10n.firstDayOfWeek;
              var weekdays = self.l10n.weekdays.shorthand.slice();
              if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
                  weekdays = weekdays.splice(firstDayOfWeek, weekdays.length).concat(weekdays.splice(0, firstDayOfWeek));
              }
              for (var i = self.config.showMonths; i--;) {
                  self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
              }
          }
          /* istanbul ignore next */
          function buildWeeks() {
              self.calendarContainer.classList.add("hasWeeks");
              var weekWrapper = createElement("div", "flatpickr-weekwrapper");
              weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
              var weekNumbers = createElement("div", "flatpickr-weeks");
              weekWrapper.appendChild(weekNumbers);
              return {
                  weekWrapper: weekWrapper,
                  weekNumbers: weekNumbers
              };
          }
          function changeMonth(value, isOffset) {
              if (isOffset === void 0) { isOffset = true; }
              var delta = isOffset ? value : value - self.currentMonth;
              if ((delta < 0 && self._hidePrevMonthArrow === true) ||
                  (delta > 0 && self._hideNextMonthArrow === true))
                  return;
              self.currentMonth += delta;
              if (self.currentMonth < 0 || self.currentMonth > 11) {
                  self.currentYear += self.currentMonth > 11 ? 1 : -1;
                  self.currentMonth = (self.currentMonth + 12) % 12;
                  triggerEvent("onYearChange");
                  buildMonthSwitch();
              }
              buildDays();
              triggerEvent("onMonthChange");
              updateNavigationCurrentMonth();
          }
          function clear(triggerChangeEvent, toInitial) {
              if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
              if (toInitial === void 0) { toInitial = true; }
              self.input.value = "";
              if (self.altInput !== undefined)
                  self.altInput.value = "";
              if (self.mobileInput !== undefined)
                  self.mobileInput.value = "";
              self.selectedDates = [];
              self.latestSelectedDateObj = undefined;
              if (toInitial === true) {
                  self.currentYear = self._initialDate.getFullYear();
                  self.currentMonth = self._initialDate.getMonth();
              }
              self.showTimeInput = false;
              if (self.config.enableTime === true) {
                  setDefaultHours();
              }
              self.redraw();
              if (triggerChangeEvent)
                  // triggerChangeEvent is true (default) or an Event
                  triggerEvent("onChange");
          }
          function close() {
              self.isOpen = false;
              if (!self.isMobile) {
                  if (self.calendarContainer !== undefined) {
                      self.calendarContainer.classList.remove("open");
                  }
                  if (self._input !== undefined) {
                      self._input.classList.remove("active");
                  }
              }
              triggerEvent("onClose");
          }
          function destroy() {
              if (self.config !== undefined)
                  triggerEvent("onDestroy");
              for (var i = self._handlers.length; i--;) {
                  var h = self._handlers[i];
                  h.element.removeEventListener(h.event, h.handler, h.options);
              }
              self._handlers = [];
              if (self.mobileInput) {
                  if (self.mobileInput.parentNode)
                      self.mobileInput.parentNode.removeChild(self.mobileInput);
                  self.mobileInput = undefined;
              }
              else if (self.calendarContainer && self.calendarContainer.parentNode) {
                  if (self.config.static && self.calendarContainer.parentNode) {
                      var wrapper = self.calendarContainer.parentNode;
                      wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                      if (wrapper.parentNode) {
                          while (wrapper.firstChild)
                              wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                          wrapper.parentNode.removeChild(wrapper);
                      }
                  }
                  else
                      self.calendarContainer.parentNode.removeChild(self.calendarContainer);
              }
              if (self.altInput) {
                  self.input.type = "text";
                  if (self.altInput.parentNode)
                      self.altInput.parentNode.removeChild(self.altInput);
                  delete self.altInput;
              }
              if (self.input) {
                  self.input.type = self.input._type;
                  self.input.classList.remove("flatpickr-input");
                  self.input.removeAttribute("readonly");
                  self.input.value = "";
              }
              [
                  "_showTimeInput",
                  "latestSelectedDateObj",
                  "_hideNextMonthArrow",
                  "_hidePrevMonthArrow",
                  "__hideNextMonthArrow",
                  "__hidePrevMonthArrow",
                  "isMobile",
                  "isOpen",
                  "selectedDateElem",
                  "minDateHasTime",
                  "maxDateHasTime",
                  "days",
                  "daysContainer",
                  "_input",
                  "_positionElement",
                  "innerContainer",
                  "rContainer",
                  "monthNav",
                  "todayDateElem",
                  "calendarContainer",
                  "weekdayContainer",
                  "prevMonthNav",
                  "nextMonthNav",
                  "monthsDropdownContainer",
                  "currentMonthElement",
                  "currentYearElement",
                  "navigationCurrentMonth",
                  "selectedDateElem",
                  "config",
              ].forEach(function (k) {
                  try {
                      delete self[k];
                  }
                  catch (_) { }
              });
          }
          function isCalendarElem(elem) {
              if (self.config.appendTo && self.config.appendTo.contains(elem))
                  return true;
              return self.calendarContainer.contains(elem);
          }
          function documentClick(e) {
              if (self.isOpen && !self.config.inline) {
                  var eventTarget_1 = getEventTarget(e);
                  var isCalendarElement = isCalendarElem(eventTarget_1);
                  var isInput = eventTarget_1 === self.input ||
                      eventTarget_1 === self.altInput ||
                      self.element.contains(eventTarget_1) ||
                      // web components
                      // e.path is not present in all browsers. circumventing typechecks
                      (e.path &&
                          e.path.indexOf &&
                          (~e.path.indexOf(self.input) ||
                              ~e.path.indexOf(self.altInput)));
                  var lostFocus = e.type === "blur"
                      ? isInput &&
                          e.relatedTarget &&
                          !isCalendarElem(e.relatedTarget)
                      : !isInput &&
                          !isCalendarElement &&
                          !isCalendarElem(e.relatedTarget);
                  var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                      return elem.contains(eventTarget_1);
                  });
                  if (lostFocus && isIgnored) {
                      if (self.timeContainer !== undefined &&
                          self.minuteElement !== undefined &&
                          self.hourElement !== undefined) {
                          updateTime();
                      }
                      self.close();
                      if (self.config.mode === "range" && self.selectedDates.length === 1) {
                          self.clear(false);
                          self.redraw();
                      }
                  }
              }
          }
          function changeYear(newYear) {
              if (!newYear ||
                  (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
                  (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
                  return;
              var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
              self.currentYear = newYearNum || self.currentYear;
              if (self.config.maxDate &&
                  self.currentYear === self.config.maxDate.getFullYear()) {
                  self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
              }
              else if (self.config.minDate &&
                  self.currentYear === self.config.minDate.getFullYear()) {
                  self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
              }
              if (isNewYear) {
                  self.redraw();
                  triggerEvent("onYearChange");
                  buildMonthSwitch();
              }
          }
          function isEnabled(date, timeless) {
              if (timeless === void 0) { timeless = true; }
              var dateToCheck = self.parseDate(date, undefined, timeless); // timeless
              if ((self.config.minDate &&
                  dateToCheck &&
                  compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
                  (self.config.maxDate &&
                      dateToCheck &&
                      compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
                  return false;
              if (self.config.enable.length === 0 && self.config.disable.length === 0)
                  return true;
              if (dateToCheck === undefined)
                  return false;
              var bool = self.config.enable.length > 0, array = bool ? self.config.enable : self.config.disable;
              for (var i = 0, d = void 0; i < array.length; i++) {
                  d = array[i];
                  if (typeof d === "function" &&
                      d(dateToCheck) // disabled by function
                  )
                      return bool;
                  else if (d instanceof Date &&
                      dateToCheck !== undefined &&
                      d.getTime() === dateToCheck.getTime())
                      // disabled by date
                      return bool;
                  else if (typeof d === "string" && dateToCheck !== undefined) {
                      // disabled by date string
                      var parsed = self.parseDate(d, undefined, true);
                      return parsed && parsed.getTime() === dateToCheck.getTime()
                          ? bool
                          : !bool;
                  }
                  else if (
                  // disabled by range
                  typeof d === "object" &&
                      dateToCheck !== undefined &&
                      d.from &&
                      d.to &&
                      dateToCheck.getTime() >= d.from.getTime() &&
                      dateToCheck.getTime() <= d.to.getTime())
                      return bool;
              }
              return !bool;
          }
          function isInView(elem) {
              if (self.daysContainer !== undefined)
                  return (elem.className.indexOf("hidden") === -1 &&
                      self.daysContainer.contains(elem));
              return false;
          }
          function onKeyDown(e) {
              // e.key                      e.keyCode
              // "Backspace"                        8
              // "Tab"                              9
              // "Enter"                           13
              // "Escape"     (IE "Esc")           27
              // "ArrowLeft"  (IE "Left")          37
              // "ArrowUp"    (IE "Up")            38
              // "ArrowRight" (IE "Right")         39
              // "ArrowDown"  (IE "Down")          40
              // "Delete"     (IE "Del")           46
              var isInput = e.target === self._input;
              var allowInput = self.config.allowInput;
              var allowKeydown = self.isOpen && (!allowInput || !isInput);
              var allowInlineKeydown = self.config.inline && isInput && !allowInput;
              if (e.keyCode === 13 && isInput) {
                  if (allowInput) {
                      self.setDate(self._input.value, true, e.target === self.altInput
                          ? self.config.altFormat
                          : self.config.dateFormat);
                      return e.target.blur();
                  }
                  else {
                      self.open();
                  }
              }
              else if (isCalendarElem(e.target) ||
                  allowKeydown ||
                  allowInlineKeydown) {
                  var isTimeObj = !!self.timeContainer &&
                      self.timeContainer.contains(e.target);
                  switch (e.keyCode) {
                      case 13:
                          if (isTimeObj) {
                              e.preventDefault();
                              updateTime();
                              focusAndClose();
                          }
                          else
                              selectDate(e);
                          break;
                      case 27: // escape
                          e.preventDefault();
                          focusAndClose();
                          break;
                      case 8:
                      case 46:
                          if (isInput && !self.config.allowInput) {
                              e.preventDefault();
                              self.clear();
                          }
                          break;
                      case 37:
                      case 39:
                          if (!isTimeObj && !isInput) {
                              e.preventDefault();
                              if (self.daysContainer !== undefined &&
                                  (allowInput === false ||
                                      (document.activeElement && isInView(document.activeElement)))) {
                                  var delta_1 = e.keyCode === 39 ? 1 : -1;
                                  if (!e.ctrlKey)
                                      focusOnDay(undefined, delta_1);
                                  else {
                                      e.stopPropagation();
                                      changeMonth(delta_1);
                                      focusOnDay(getFirstAvailableDay(1), 0);
                                  }
                              }
                          }
                          else if (self.hourElement)
                              self.hourElement.focus();
                          break;
                      case 38:
                      case 40:
                          e.preventDefault();
                          var delta = e.keyCode === 40 ? 1 : -1;
                          if ((self.daysContainer && e.target.$i !== undefined) ||
                              e.target === self.input ||
                              e.target === self.altInput) {
                              if (e.ctrlKey) {
                                  e.stopPropagation();
                                  changeYear(self.currentYear - delta);
                                  focusOnDay(getFirstAvailableDay(1), 0);
                              }
                              else if (!isTimeObj)
                                  focusOnDay(undefined, delta * 7);
                          }
                          else if (e.target === self.currentYearElement) {
                              changeYear(self.currentYear - delta);
                          }
                          else if (self.config.enableTime) {
                              if (!isTimeObj && self.hourElement)
                                  self.hourElement.focus();
                              updateTime(e);
                              self._debouncedChange();
                          }
                          break;
                      case 9:
                          if (isTimeObj) {
                              var elems = [
                                  self.hourElement,
                                  self.minuteElement,
                                  self.secondElement,
                                  self.amPM,
                              ]
                                  .concat(self.pluginElements)
                                  .filter(function (x) { return x; });
                              var i = elems.indexOf(e.target);
                              if (i !== -1) {
                                  var target = elems[i + (e.shiftKey ? -1 : 1)];
                                  e.preventDefault();
                                  (target || self._input).focus();
                              }
                          }
                          else if (!self.config.noCalendar &&
                              self.daysContainer &&
                              self.daysContainer.contains(e.target) &&
                              e.shiftKey) {
                              e.preventDefault();
                              self._input.focus();
                          }
                          break;
                      default:
                          break;
                  }
              }
              if (self.amPM !== undefined && e.target === self.amPM) {
                  switch (e.key) {
                      case self.l10n.amPM[0].charAt(0):
                      case self.l10n.amPM[0].charAt(0).toLowerCase():
                          self.amPM.textContent = self.l10n.amPM[0];
                          setHoursFromInputs();
                          updateValue();
                          break;
                      case self.l10n.amPM[1].charAt(0):
                      case self.l10n.amPM[1].charAt(0).toLowerCase():
                          self.amPM.textContent = self.l10n.amPM[1];
                          setHoursFromInputs();
                          updateValue();
                          break;
                  }
              }
              if (isInput || isCalendarElem(e.target)) {
                  triggerEvent("onKeyDown", e);
              }
          }
          function onMouseOver(elem) {
              if (self.selectedDates.length !== 1 ||
                  (elem &&
                      (!elem.classList.contains("flatpickr-day") ||
                          elem.classList.contains("flatpickr-disabled"))))
                  return;
              var hoverDate = elem
                  ? elem.dateObj.getTime()
                  : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
              var containsDisabled = false;
              var minRange = 0, maxRange = 0;
              for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
                  if (!isEnabled(new Date(t), true)) {
                      containsDisabled =
                          containsDisabled || (t > rangeStartDate && t < rangeEndDate);
                      if (t < initialDate && (!minRange || t > minRange))
                          minRange = t;
                      else if (t > initialDate && (!maxRange || t < maxRange))
                          maxRange = t;
                  }
              }
              for (var m = 0; m < self.config.showMonths; m++) {
                  var month = self.daysContainer.children[m];
                  var _loop_1 = function (i, l) {
                      var dayElem = month.children[i], date = dayElem.dateObj;
                      var timestamp = date.getTime();
                      var outOfRange = (minRange > 0 && timestamp < minRange) ||
                          (maxRange > 0 && timestamp > maxRange);
                      if (outOfRange) {
                          dayElem.classList.add("notAllowed");
                          ["inRange", "startRange", "endRange"].forEach(function (c) {
                              dayElem.classList.remove(c);
                          });
                          return "continue";
                      }
                      else if (containsDisabled && !outOfRange)
                          return "continue";
                      ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                          dayElem.classList.remove(c);
                      });
                      if (elem !== undefined) {
                          elem.classList.add(hoverDate <= self.selectedDates[0].getTime()
                              ? "startRange"
                              : "endRange");
                          if (initialDate < hoverDate && timestamp === initialDate)
                              dayElem.classList.add("startRange");
                          else if (initialDate > hoverDate && timestamp === initialDate)
                              dayElem.classList.add("endRange");
                          if (timestamp >= minRange &&
                              (maxRange === 0 || timestamp <= maxRange) &&
                              isBetween(timestamp, initialDate, hoverDate))
                              dayElem.classList.add("inRange");
                      }
                  };
                  for (var i = 0, l = month.children.length; i < l; i++) {
                      _loop_1(i, l);
                  }
              }
          }
          function onResize() {
              if (self.isOpen && !self.config.static && !self.config.inline)
                  positionCalendar();
          }
          function setDefaultTime() {
              self.setDate(self.config.minDate !== undefined
                  ? new Date(self.config.minDate.getTime())
                  : new Date(), true);
              setDefaultHours();
              updateValue();
          }
          function open(e, positionElement) {
              if (positionElement === void 0) { positionElement = self._positionElement; }
              if (self.isMobile === true) {
                  if (e) {
                      e.preventDefault();
                      e.target && e.target.blur();
                  }
                  if (self.mobileInput !== undefined) {
                      self.mobileInput.focus();
                      self.mobileInput.click();
                  }
                  triggerEvent("onOpen");
                  return;
              }
              if (self._input.disabled || self.config.inline)
                  return;
              var wasOpen = self.isOpen;
              self.isOpen = true;
              if (!wasOpen) {
                  self.calendarContainer.classList.add("open");
                  self._input.classList.add("active");
                  triggerEvent("onOpen");
                  positionCalendar(positionElement);
              }
              if (self.config.enableTime === true && self.config.noCalendar === true) {
                  if (self.selectedDates.length === 0) {
                      setDefaultTime();
                  }
                  if (self.config.allowInput === false &&
                      (e === undefined ||
                          !self.timeContainer.contains(e.relatedTarget))) {
                      setTimeout(function () { return self.hourElement.select(); }, 50);
                  }
              }
          }
          function minMaxDateSetter(type) {
              return function (date) {
                  var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
                  var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
                  if (dateObj !== undefined) {
                      self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                          dateObj.getHours() > 0 ||
                              dateObj.getMinutes() > 0 ||
                              dateObj.getSeconds() > 0;
                  }
                  if (self.selectedDates) {
                      self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                      if (!self.selectedDates.length && type === "min")
                          setHoursFromDate(dateObj);
                      updateValue();
                  }
                  if (self.daysContainer) {
                      redraw();
                      if (dateObj !== undefined)
                          self.currentYearElement[type] = dateObj.getFullYear().toString();
                      else
                          self.currentYearElement.removeAttribute(type);
                      self.currentYearElement.disabled =
                          !!inverseDateObj &&
                              dateObj !== undefined &&
                              inverseDateObj.getFullYear() === dateObj.getFullYear();
                  }
              };
          }
          function parseConfig() {
              var boolOpts = [
                  "wrap",
                  "weekNumbers",
                  "allowInput",
                  "clickOpens",
                  "time_24hr",
                  "enableTime",
                  "noCalendar",
                  "altInput",
                  "shorthandCurrentMonth",
                  "inline",
                  "static",
                  "enableSeconds",
                  "disableMobile",
              ];
              var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
              var formats = {};
              self.config.parseDate = userConfig.parseDate;
              self.config.formatDate = userConfig.formatDate;
              Object.defineProperty(self.config, "enable", {
                  get: function () { return self.config._enable; },
                  set: function (dates) {
                      self.config._enable = parseDateRules(dates);
                  }
              });
              Object.defineProperty(self.config, "disable", {
                  get: function () { return self.config._disable; },
                  set: function (dates) {
                      self.config._disable = parseDateRules(dates);
                  }
              });
              var timeMode = userConfig.mode === "time";
              if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
                  var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
                  formats.dateFormat =
                      userConfig.noCalendar || timeMode
                          ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                          : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
              }
              if (userConfig.altInput &&
                  (userConfig.enableTime || timeMode) &&
                  !userConfig.altFormat) {
                  var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
                  formats.altFormat =
                      userConfig.noCalendar || timeMode
                          ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                          : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
              }
              if (!userConfig.altInputClass) {
                  self.config.altInputClass =
                      self.input.className + " " + self.config.altInputClass;
              }
              Object.defineProperty(self.config, "minDate", {
                  get: function () { return self.config._minDate; },
                  set: minMaxDateSetter("min")
              });
              Object.defineProperty(self.config, "maxDate", {
                  get: function () { return self.config._maxDate; },
                  set: minMaxDateSetter("max")
              });
              var minMaxTimeSetter = function (type) { return function (val) {
                  self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
              }; };
              Object.defineProperty(self.config, "minTime", {
                  get: function () { return self.config._minTime; },
                  set: minMaxTimeSetter("min")
              });
              Object.defineProperty(self.config, "maxTime", {
                  get: function () { return self.config._maxTime; },
                  set: minMaxTimeSetter("max")
              });
              if (userConfig.mode === "time") {
                  self.config.noCalendar = true;
                  self.config.enableTime = true;
              }
              Object.assign(self.config, formats, userConfig);
              for (var i = 0; i < boolOpts.length; i++)
                  self.config[boolOpts[i]] =
                      self.config[boolOpts[i]] === true ||
                          self.config[boolOpts[i]] === "true";
              HOOKS.filter(function (hook) { return self.config[hook] !== undefined; }).forEach(function (hook) {
                  self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
              });
              self.isMobile =
                  !self.config.disableMobile &&
                      !self.config.inline &&
                      self.config.mode === "single" &&
                      !self.config.disable.length &&
                      !self.config.enable.length &&
                      !self.config.weekNumbers &&
                      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
              for (var i = 0; i < self.config.plugins.length; i++) {
                  var pluginConf = self.config.plugins[i](self) || {};
                  for (var key in pluginConf) {
                      if (HOOKS.indexOf(key) > -1) {
                          self.config[key] = arrayify(pluginConf[key])
                              .map(bindToInstance)
                              .concat(self.config[key]);
                      }
                      else if (typeof userConfig[key] === "undefined")
                          self.config[key] = pluginConf[key];
                  }
              }
              triggerEvent("onParseConfig");
          }
          function setupLocale() {
              if (typeof self.config.locale !== "object" &&
                  typeof flatpickr.l10ns[self.config.locale] === "undefined")
                  self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
              self.l10n = __assign({}, flatpickr.l10ns["default"], (typeof self.config.locale === "object"
                  ? self.config.locale
                  : self.config.locale !== "default"
                      ? flatpickr.l10ns[self.config.locale]
                      : undefined));
              tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
              var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
              if (userConfig.time_24hr === undefined &&
                  flatpickr.defaultConfig.time_24hr === undefined) {
                  self.config.time_24hr = self.l10n.time_24hr;
              }
              self.formatDate = createDateFormatter(self);
              self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
          }
          function positionCalendar(customPositionElement) {
              if (self.calendarContainer === undefined)
                  return;
              triggerEvent("onPreCalendarPosition");
              var positionElement = customPositionElement || self._positionElement;
              var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function (acc, child) { return acc + child.offsetHeight; }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
                  (configPosVertical !== "below" &&
                      distanceFromBottom < calendarHeight &&
                      inputBounds.top > calendarHeight);
              var top = window.pageYOffset +
                  inputBounds.top +
                  (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
              toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
              toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
              if (self.config.inline)
                  return;
              var left = window.pageXOffset +
                  inputBounds.left -
                  (configPosHorizontal != null && configPosHorizontal === "center"
                      ? (calendarWidth - inputBounds.width) / 2
                      : 0);
              var right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
              var rightMost = left + calendarWidth > window.document.body.offsetWidth;
              var centerMost = right + calendarWidth > window.document.body.offsetWidth;
              toggleClass(self.calendarContainer, "rightMost", rightMost);
              if (self.config.static)
                  return;
              self.calendarContainer.style.top = top + "px";
              if (!rightMost) {
                  self.calendarContainer.style.left = left + "px";
                  self.calendarContainer.style.right = "auto";
              }
              else if (!centerMost) {
                  self.calendarContainer.style.left = "auto";
                  self.calendarContainer.style.right = right + "px";
              }
              else {
                  var doc = document.styleSheets[0];
                  // some testing environments don't have css support
                  if (doc === undefined)
                      return;
                  var bodyWidth = window.document.body.offsetWidth;
                  var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
                  var centerBefore = ".flatpickr-calendar.centerMost:before";
                  var centerAfter = ".flatpickr-calendar.centerMost:after";
                  var centerIndex = doc.cssRules.length;
                  var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
                  toggleClass(self.calendarContainer, "rightMost", false);
                  toggleClass(self.calendarContainer, "centerMost", true);
                  doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
                  self.calendarContainer.style.left = centerLeft + "px";
                  self.calendarContainer.style.right = "auto";
              }
          }
          function redraw() {
              if (self.config.noCalendar || self.isMobile)
                  return;
              updateNavigationCurrentMonth();
              buildDays();
          }
          function focusAndClose() {
              self._input.focus();
              if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
                  navigator.msMaxTouchPoints !== undefined) {
                  // hack - bugs in the way IE handles focus keeps the calendar open
                  setTimeout(self.close, 0);
              }
              else {
                  self.close();
              }
          }
          function selectDate(e) {
              e.preventDefault();
              e.stopPropagation();
              var isSelectable = function (day) {
                  return day.classList &&
                      day.classList.contains("flatpickr-day") &&
                      !day.classList.contains("flatpickr-disabled") &&
                      !day.classList.contains("notAllowed");
              };
              var t = findParent(e.target, isSelectable);
              if (t === undefined)
                  return;
              var target = t;
              var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
              var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
                  selectedDate.getMonth() >
                      self.currentMonth + self.config.showMonths - 1) &&
                  self.config.mode !== "range";
              self.selectedDateElem = target;
              if (self.config.mode === "single")
                  self.selectedDates = [selectedDate];
              else if (self.config.mode === "multiple") {
                  var selectedIndex = isDateSelected(selectedDate);
                  if (selectedIndex)
                      self.selectedDates.splice(parseInt(selectedIndex), 1);
                  else
                      self.selectedDates.push(selectedDate);
              }
              else if (self.config.mode === "range") {
                  if (self.selectedDates.length === 2) {
                      self.clear(false, false);
                  }
                  self.latestSelectedDateObj = selectedDate;
                  self.selectedDates.push(selectedDate);
                  // unless selecting same date twice, sort ascendingly
                  if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                      self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
              }
              setHoursFromInputs();
              if (shouldChangeMonth) {
                  var isNewYear = self.currentYear !== selectedDate.getFullYear();
                  self.currentYear = selectedDate.getFullYear();
                  self.currentMonth = selectedDate.getMonth();
                  if (isNewYear) {
                      triggerEvent("onYearChange");
                      buildMonthSwitch();
                  }
                  triggerEvent("onMonthChange");
              }
              updateNavigationCurrentMonth();
              buildDays();
              updateValue();
              if (self.config.enableTime)
                  setTimeout(function () { return (self.showTimeInput = true); }, 50);
              // maintain focus
              if (!shouldChangeMonth &&
                  self.config.mode !== "range" &&
                  self.config.showMonths === 1)
                  focusOnDayElem(target);
              else if (self.selectedDateElem !== undefined &&
                  self.hourElement === undefined) {
                  self.selectedDateElem && self.selectedDateElem.focus();
              }
              if (self.hourElement !== undefined)
                  self.hourElement !== undefined && self.hourElement.focus();
              if (self.config.closeOnSelect) {
                  var single = self.config.mode === "single" && !self.config.enableTime;
                  var range = self.config.mode === "range" &&
                      self.selectedDates.length === 2 &&
                      !self.config.enableTime;
                  if (single || range) {
                      focusAndClose();
                  }
              }
              triggerChange();
          }
          var CALLBACKS = {
              locale: [setupLocale, updateWeekdays],
              showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
              minDate: [jumpToDate],
              maxDate: [jumpToDate]
          };
          function set(option, value) {
              if (option !== null && typeof option === "object") {
                  Object.assign(self.config, option);
                  for (var key in option) {
                      if (CALLBACKS[key] !== undefined)
                          CALLBACKS[key].forEach(function (x) { return x(); });
                  }
              }
              else {
                  self.config[option] = value;
                  if (CALLBACKS[option] !== undefined)
                      CALLBACKS[option].forEach(function (x) { return x(); });
                  else if (HOOKS.indexOf(option) > -1)
                      self.config[option] = arrayify(value);
              }
              self.redraw();
              updateValue(false);
          }
          function setSelectedDate(inputDate, format) {
              var dates = [];
              if (inputDate instanceof Array)
                  dates = inputDate.map(function (d) { return self.parseDate(d, format); });
              else if (inputDate instanceof Date || typeof inputDate === "number")
                  dates = [self.parseDate(inputDate, format)];
              else if (typeof inputDate === "string") {
                  switch (self.config.mode) {
                      case "single":
                      case "time":
                          dates = [self.parseDate(inputDate, format)];
                          break;
                      case "multiple":
                          dates = inputDate
                              .split(self.config.conjunction)
                              .map(function (date) { return self.parseDate(date, format); });
                          break;
                      case "range":
                          dates = inputDate
                              .split(self.l10n.rangeSeparator)
                              .map(function (date) { return self.parseDate(date, format); });
                          break;
                      default:
                          break;
                  }
              }
              else
                  self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
              self.selectedDates = dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); });
              if (self.config.mode === "range")
                  self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
          }
          function setDate(date, triggerChange, format) {
              if (triggerChange === void 0) { triggerChange = false; }
              if (format === void 0) { format = self.config.dateFormat; }
              if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
                  return self.clear(triggerChange);
              setSelectedDate(date, format);
              self.showTimeInput = self.selectedDates.length > 0;
              self.latestSelectedDateObj =
                  self.selectedDates[self.selectedDates.length - 1];
              self.redraw();
              jumpToDate();
              setHoursFromDate();
              if (self.selectedDates.length === 0) {
                  self.clear(false);
              }
              updateValue(triggerChange);
              if (triggerChange)
                  triggerEvent("onChange");
          }
          function parseDateRules(arr) {
              return arr
                  .slice()
                  .map(function (rule) {
                  if (typeof rule === "string" ||
                      typeof rule === "number" ||
                      rule instanceof Date) {
                      return self.parseDate(rule, undefined, true);
                  }
                  else if (rule &&
                      typeof rule === "object" &&
                      rule.from &&
                      rule.to)
                      return {
                          from: self.parseDate(rule.from, undefined),
                          to: self.parseDate(rule.to, undefined)
                      };
                  return rule;
              })
                  .filter(function (x) { return x; }); // remove falsy values
          }
          function setupDates() {
              self.selectedDates = [];
              self.now = self.parseDate(self.config.now) || new Date();
              // Workaround IE11 setting placeholder as the input's value
              var preloadedDate = self.config.defaultDate ||
                  ((self.input.nodeName === "INPUT" ||
                      self.input.nodeName === "TEXTAREA") &&
                      self.input.placeholder &&
                      self.input.value === self.input.placeholder
                      ? null
                      : self.input.value);
              if (preloadedDate)
                  setSelectedDate(preloadedDate, self.config.dateFormat);
              self._initialDate =
                  self.selectedDates.length > 0
                      ? self.selectedDates[0]
                      : self.config.minDate &&
                          self.config.minDate.getTime() > self.now.getTime()
                          ? self.config.minDate
                          : self.config.maxDate &&
                              self.config.maxDate.getTime() < self.now.getTime()
                              ? self.config.maxDate
                              : self.now;
              self.currentYear = self._initialDate.getFullYear();
              self.currentMonth = self._initialDate.getMonth();
              if (self.selectedDates.length > 0)
                  self.latestSelectedDateObj = self.selectedDates[0];
              if (self.config.minTime !== undefined)
                  self.config.minTime = self.parseDate(self.config.minTime, "H:i");
              if (self.config.maxTime !== undefined)
                  self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
              self.minDateHasTime =
                  !!self.config.minDate &&
                      (self.config.minDate.getHours() > 0 ||
                          self.config.minDate.getMinutes() > 0 ||
                          self.config.minDate.getSeconds() > 0);
              self.maxDateHasTime =
                  !!self.config.maxDate &&
                      (self.config.maxDate.getHours() > 0 ||
                          self.config.maxDate.getMinutes() > 0 ||
                          self.config.maxDate.getSeconds() > 0);
              Object.defineProperty(self, "showTimeInput", {
                  get: function () { return self._showTimeInput; },
                  set: function (bool) {
                      self._showTimeInput = bool;
                      if (self.calendarContainer)
                          toggleClass(self.calendarContainer, "showTimeInput", bool);
                      self.isOpen && positionCalendar();
                  }
              });
          }
          function setupInputs() {
              self.input = self.config.wrap
                  ? element.querySelector("[data-input]")
                  : element;
              /* istanbul ignore next */
              if (!self.input) {
                  self.config.errorHandler(new Error("Invalid input element specified"));
                  return;
              }
              // hack: store previous type to restore it after destroy()
              self.input._type = self.input.type;
              self.input.type = "text";
              self.input.classList.add("flatpickr-input");
              self._input = self.input;
              if (self.config.altInput) {
                  // replicate self.element
                  self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
                  self._input = self.altInput;
                  self.altInput.placeholder = self.input.placeholder;
                  self.altInput.disabled = self.input.disabled;
                  self.altInput.required = self.input.required;
                  self.altInput.tabIndex = self.input.tabIndex;
                  self.altInput.type = "text";
                  self.input.setAttribute("type", "hidden");
                  if (!self.config.static && self.input.parentNode)
                      self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
              }
              if (!self.config.allowInput)
                  self._input.setAttribute("readonly", "readonly");
              self._positionElement = self.config.positionElement || self._input;
          }
          function setupMobile() {
              var inputType = self.config.enableTime
                  ? self.config.noCalendar
                      ? "time"
                      : "datetime-local"
                  : "date";
              self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
              self.mobileInput.step = self.input.getAttribute("step") || "any";
              self.mobileInput.tabIndex = 1;
              self.mobileInput.type = inputType;
              self.mobileInput.disabled = self.input.disabled;
              self.mobileInput.required = self.input.required;
              self.mobileInput.placeholder = self.input.placeholder;
              self.mobileFormatStr =
                  inputType === "datetime-local"
                      ? "Y-m-d\\TH:i:S"
                      : inputType === "date"
                          ? "Y-m-d"
                          : "H:i:S";
              if (self.selectedDates.length > 0) {
                  self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
              }
              if (self.config.minDate)
                  self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
              if (self.config.maxDate)
                  self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
              self.input.type = "hidden";
              if (self.altInput !== undefined)
                  self.altInput.type = "hidden";
              try {
                  if (self.input.parentNode)
                      self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
              }
              catch (_a) { }
              bind(self.mobileInput, "change", function (e) {
                  self.setDate(e.target.value, false, self.mobileFormatStr);
                  triggerEvent("onChange");
                  triggerEvent("onClose");
              });
          }
          function toggle(e) {
              if (self.isOpen === true)
                  return self.close();
              self.open(e);
          }
          function triggerEvent(event, data) {
              // If the instance has been destroyed already, all hooks have been removed
              if (self.config === undefined)
                  return;
              var hooks = self.config[event];
              if (hooks !== undefined && hooks.length > 0) {
                  for (var i = 0; hooks[i] && i < hooks.length; i++)
                      hooks[i](self.selectedDates, self.input.value, self, data);
              }
              if (event === "onChange") {
                  self.input.dispatchEvent(createEvent("change"));
                  // many front-end frameworks bind to the input event
                  self.input.dispatchEvent(createEvent("input"));
              }
          }
          function createEvent(name) {
              var e = document.createEvent("Event");
              e.initEvent(name, true, true);
              return e;
          }
          function isDateSelected(date) {
              for (var i = 0; i < self.selectedDates.length; i++) {
                  if (compareDates(self.selectedDates[i], date) === 0)
                      return "" + i;
              }
              return false;
          }
          function isDateInRange(date) {
              if (self.config.mode !== "range" || self.selectedDates.length < 2)
                  return false;
              return (compareDates(date, self.selectedDates[0]) >= 0 &&
                  compareDates(date, self.selectedDates[1]) <= 0);
          }
          function updateNavigationCurrentMonth() {
              if (self.config.noCalendar || self.isMobile || !self.monthNav)
                  return;
              self.yearElements.forEach(function (yearElement, i) {
                  var d = new Date(self.currentYear, self.currentMonth, 1);
                  d.setMonth(self.currentMonth + i);
                  if (self.config.showMonths > 1 ||
                      self.config.monthSelectorType === "static") {
                      self.monthElements[i].textContent =
                          monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
                  }
                  else {
                      self.monthsDropdownContainer.value = d.getMonth().toString();
                  }
                  yearElement.value = d.getFullYear().toString();
              });
              self._hidePrevMonthArrow =
                  self.config.minDate !== undefined &&
                      (self.currentYear === self.config.minDate.getFullYear()
                          ? self.currentMonth <= self.config.minDate.getMonth()
                          : self.currentYear < self.config.minDate.getFullYear());
              self._hideNextMonthArrow =
                  self.config.maxDate !== undefined &&
                      (self.currentYear === self.config.maxDate.getFullYear()
                          ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                          : self.currentYear > self.config.maxDate.getFullYear());
          }
          function getDateStr(format) {
              return self.selectedDates
                  .map(function (dObj) { return self.formatDate(dObj, format); })
                  .filter(function (d, i, arr) {
                  return self.config.mode !== "range" ||
                      self.config.enableTime ||
                      arr.indexOf(d) === i;
              })
                  .join(self.config.mode !== "range"
                  ? self.config.conjunction
                  : self.l10n.rangeSeparator);
          }
          /**
           * Updates the values of inputs associated with the calendar
           */
          function updateValue(triggerChange) {
              if (triggerChange === void 0) { triggerChange = true; }
              if (self.mobileInput !== undefined && self.mobileFormatStr) {
                  self.mobileInput.value =
                      self.latestSelectedDateObj !== undefined
                          ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                          : "";
              }
              self.input.value = getDateStr(self.config.dateFormat);
              if (self.altInput !== undefined) {
                  self.altInput.value = getDateStr(self.config.altFormat);
              }
              if (triggerChange !== false)
                  triggerEvent("onValueUpdate");
          }
          function onMonthNavClick(e) {
              var isPrevMonth = self.prevMonthNav.contains(e.target);
              var isNextMonth = self.nextMonthNav.contains(e.target);
              if (isPrevMonth || isNextMonth) {
                  changeMonth(isPrevMonth ? -1 : 1);
              }
              else if (self.yearElements.indexOf(e.target) >= 0) {
                  e.target.select();
              }
              else if (e.target.classList.contains("arrowUp")) {
                  self.changeYear(self.currentYear + 1);
              }
              else if (e.target.classList.contains("arrowDown")) {
                  self.changeYear(self.currentYear - 1);
              }
          }
          function timeWrapper(e) {
              e.preventDefault();
              var isKeyDown = e.type === "keydown", input = e.target;
              if (self.amPM !== undefined && e.target === self.amPM) {
                  self.amPM.textContent =
                      self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
              }
              var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
                  (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
              var newValue = curValue + step * delta;
              if (typeof input.value !== "undefined" && input.value.length === 2) {
                  var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
                  if (newValue < min) {
                      newValue =
                          max +
                              newValue +
                              int(!isHourElem) +
                              (int(isHourElem) && int(!self.amPM));
                      if (isMinuteElem)
                          incrementNumInput(undefined, -1, self.hourElement);
                  }
                  else if (newValue > max) {
                      newValue =
                          input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                      if (isMinuteElem)
                          incrementNumInput(undefined, 1, self.hourElement);
                  }
                  if (self.amPM &&
                      isHourElem &&
                      (step === 1
                          ? newValue + curValue === 23
                          : Math.abs(newValue - curValue) > step)) {
                      self.amPM.textContent =
                          self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
                  }
                  input.value = pad(newValue);
              }
          }
          init();
          return self;
      }
      /* istanbul ignore next */
      function _flatpickr(nodeList, config) {
          // static list
          var nodes = Array.prototype.slice
              .call(nodeList)
              .filter(function (x) { return x instanceof HTMLElement; });
          var instances = [];
          for (var i = 0; i < nodes.length; i++) {
              var node = nodes[i];
              try {
                  if (node.getAttribute("data-fp-omit") !== null)
                      continue;
                  if (node._flatpickr !== undefined) {
                      node._flatpickr.destroy();
                      node._flatpickr = undefined;
                  }
                  node._flatpickr = FlatpickrInstance(node, config || {});
                  instances.push(node._flatpickr);
              }
              catch (e) {
                  console.error(e);
              }
          }
          return instances.length === 1 ? instances[0] : instances;
      }
      /* istanbul ignore next */
      if (typeof HTMLElement !== "undefined" &&
          typeof HTMLCollection !== "undefined" &&
          typeof NodeList !== "undefined") {
          // browser env
          HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
              return _flatpickr(this, config);
          };
          HTMLElement.prototype.flatpickr = function (config) {
              return _flatpickr([this], config);
          };
      }
      /* istanbul ignore next */
      var flatpickr = function (selector, config) {
          if (typeof selector === "string") {
              return _flatpickr(window.document.querySelectorAll(selector), config);
          }
          else if (selector instanceof Node) {
              return _flatpickr([selector], config);
          }
          else {
              return _flatpickr(selector, config);
          }
      };
      /* istanbul ignore next */
      flatpickr.defaultConfig = {};
      flatpickr.l10ns = {
          en: __assign({}, english),
          "default": __assign({}, english)
      };
      flatpickr.localize = function (l10n) {
          flatpickr.l10ns["default"] = __assign({}, flatpickr.l10ns["default"], l10n);
      };
      flatpickr.setDefaults = function (config) {
          flatpickr.defaultConfig = __assign({}, flatpickr.defaultConfig, config);
      };
      flatpickr.parseDate = createDateParser({});
      flatpickr.formatDate = createDateFormatter({});
      flatpickr.compareDates = compareDates;
      /* istanbul ignore next */
      if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
          jQuery.fn.flatpickr = function (config) {
              return _flatpickr(this, config);
          };
      }
      // eslint-disable-next-line @typescript-eslint/camelcase
      Date.prototype.fp_incr = function (days) {
          return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
      };
      if (typeof window !== "undefined") {
          window.flatpickr = flatpickr;
      }

      return flatpickr;

  }));
  });

  var mrFlatpickr = function ($) {
    /**
     * Check for flatpickr dependency
     */
    if (typeof flatpickr === 'undefined') {
      throw new Error('mrFlatpickr requires flatpickr.js (https://github.com/flatpickr/flatpickr)');
    }
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


    var NAME = 'mrFlatpickr';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.flatpickr';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var Selector = {
      FLATPICKR: '[data-flatpickr]'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Flatpickr =
    /*#__PURE__*/
    function () {
      function Flatpickr(element) {
        // The current flatpickr element
        this.element = element; // const $element = $(element);

        this.initflatpickr();
      } // getters


      var _proto = Flatpickr.prototype;

      _proto.initflatpickr = function initflatpickr() {
        var options = $(this.element).data();
        this.instance = flatpickr(this.element, options);
      };

      Flatpickr.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachFlatpickr() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Flatpickr(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(Flatpickr, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Flatpickr;
    }(); // END Class definition

    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */


    $(window).on(Event.LOAD_DATA_API, function () {
      var pickers = $.makeArray($(Selector.FLATPICKR));
      /* eslint-disable no-plusplus */

      for (var i = pickers.length; i--;) {
        var $flatpickr = $(pickers[i]);
        Flatpickr.jQueryInterface.call($flatpickr, $flatpickr.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = Flatpickr.jQueryInterface;
    $.fn[NAME].Constructor = Flatpickr;

    $.fn[NAME].noConflict = function flatpickrNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Flatpickr.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return Flatpickr;
  }(jQuery$1);

  (function () {
    if (typeof $ === 'undefined') {
      throw new TypeError('Medium Rare JavaScript requires jQuery. jQuery must be included before theme.js.');
    }
  })();

  exports.mrFlatpickr = mrFlatpickr;
  exports.mrSmoothScroll = mrSmoothScroll;
  exports.mrUtil = mrUtil;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=theme.js.map
