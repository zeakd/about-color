// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({12:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getColorIndicesForCoord(x, y, width) {
  var red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}

function draw(canvas, img, resolWidth, resolHeight) {
  var width = canvas.width;
  var height = canvas.height;
  var ctx = canvas.getContext('2d');

  ctx.drawImage(img, 0, 0, width, height);
  var imgData = ctx.getImageData(0, 0, width, height);

  var wRatio = resolWidth / width;
  var hRatio = resolHeight / height;
  for (var w = 0; w < resolWidth; w++) {
    for (var h = 0; h < resolHeight; h++) {
      var count = 0;
      var allR = 0;
      var allG = 0;
      var allB = 0;
      var allA = 0;

      for (var i = Math.round(w / wRatio); i < Math.round((w + 1) / wRatio); i++) {
        for (var j = Math.round(h / hRatio); j < Math.round((h + 1) / hRatio); j++) {
          var colorIndices = getColorIndicesForCoord(i, j, canvas.width);

          var redIndex = colorIndices[0];
          var greenIndex = colorIndices[1];
          var blueIndex = colorIndices[2];
          var alphaIndex = colorIndices[3];

          allR = allR + imgData.data[redIndex];
          allG = allG + imgData.data[greenIndex];
          allB = allB + imgData.data[blueIndex];
          allA = allA + imgData.data[alphaIndex];

          count = count + 1;
        }
      }

      var r = parseInt(allR / count);
      var g = parseInt(allG / count);
      var b = parseInt(allB / count);
      var a = parseInt(allA / count);

      for (var _i = Math.round(w / wRatio); _i < Math.round((w + 1) / wRatio); _i++) {
        for (var _j = Math.round(h / hRatio); _j < Math.round((h + 1) / hRatio); _j++) {
          var _colorIndices = getColorIndicesForCoord(_i, _j, canvas.width);

          var _redIndex = _colorIndices[0];
          var _greenIndex = _colorIndices[1];
          var _blueIndex = _colorIndices[2];
          var _alphaIndex = _colorIndices[3];

          imgData.data[_redIndex] = r;
          imgData.data[_greenIndex] = g;
          imgData.data[_blueIndex] = b;
          imgData.data[_alphaIndex] = a;
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
}

var pixelAndResolution = function pixelAndResolution(img) {
  var resolutionCanvas = document.getElementById('resolution-canvas');

  var widthInput = document.getElementById('resolution-width');
  var heightInput = document.getElementById('resolution-height');

  draw(resolutionCanvas, img, widthInput.value, heightInput.value);

  widthInput.addEventListener('input', function (e) {
    var width = parseInt(widthInput.value);
    var height = parseInt(width / 3 * 4);
    heightInput.value = height;

    draw(resolutionCanvas, img, width, height);
  });

  heightInput.addEventListener('input', function (e) {
    var height = parseInt(heightInput.value);
    var width = parseInt(height / 4 * 3);
    widthInput.value = width;

    draw(resolutionCanvas, img, width, height);
  });
};

exports.default = pixelAndResolution;
},{}],13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function draw(canvas, hex) {
  console.log(canvas.height);
  var height = canvas.height;
  var width = canvas.width;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = hex;
  ctx.fillRect(0, 0, width, height);
}

exports.default = function () {
  var rgbCanvas = document.getElementById('rgb-canvas');

  var rInput = document.getElementById('r-input');
  var gInput = document.getElementById('g-input');
  var bInput = document.getElementById('b-input');
  var hexInput = document.getElementById('hex-input');

  draw(rgbCanvas, rgbToHex(Number(rInput.value), Number(gInput.value), Number(bInput.value)));

  rInput.addEventListener('input', function (e) {
    var hex = rgbToHex(Number(rInput.value), Number(gInput.value), Number(bInput.value));
    hexInput.value = hex;
    draw(rgbCanvas, hex);
  });

  gInput.addEventListener('input', function (e) {
    var hex = rgbToHex(Number(rInput.value), Number(gInput.value), Number(bInput.value));
    hexInput.value = hex;
    draw(rgbCanvas, hex);
  });

  bInput.addEventListener('input', function (e) {
    var hex = rgbToHex(Number(rInput.value), Number(gInput.value), Number(bInput.value));
    hexInput.value = hex;
    draw(rgbCanvas, hex);
  });

  hexInput.addEventListener('input', function (e) {
    var hex = hexInput.value;
    var rgb = hexToRgb(hex);
    rInput.value = rgb.r;
    gInput.value = rgb.g;
    bInput.value = rgb.b;

    draw(rgbCanvas, hex);
  });
};
},{}],10:[function(require,module,exports) {
'use strict';

var _pixelAndResolution = require('./pixelAndResolution');

var _pixelAndResolution2 = _interopRequireDefault(_pixelAndResolution);

var _rgb = require('./rgb');

var _rgb2 = _interopRequireDefault(_rgb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
  var srcImage = document.getElementById('source-image');
  (0, _pixelAndResolution2.default)(srcImage);
  (0, _rgb2.default)();
});
},{"./pixelAndResolution":12,"./rgb":13}],20:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '63369' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[20,10])
//# sourceMappingURL=/main.9e49ad88.map