// Generated by CoffeeScript 1.10.0
(function() {
  var LanguageDector, caf, raf, root, safeParseJSON;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  safeParseJSON = function(s) {
    var e, error;
    try {
      return JSON.parse(s);
    } catch (error) {
      e = error;
      return false;
    }
  };

  raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;

  caf = window.cancelAnimationFrame || window.mozcancelAnimationFrame || window.webkitcancelAnimationFrame || window.ocancelAnimationFrame;

  root.LanguageDector = LanguageDector = (function() {
    function LanguageDector() {
      this.codes = safeParseJSON("[[76,97,116,105,110], [27721,23383], [1575,1604,1593,1585,1576,1610,1577], [2342,2375,2357,2344,2366,2327,2352,2368], [1050,1080,1088,1080,1083,1080,1094,1072], [2476,2494,2434,2482,2494,32,47,32,2437,2488,2478,2496,2479,2492,2494], [20206,21517], [2583,2625,2608,2606,2625,2582,2624], [43415,43438], [54620,44544], [3108,3142,3122,3137,3095,3137], [2980,2990,3007,2996,3021], [3374,3378,3375,3390,3379,3330], [4121,4156,4116,4154,4121,4140], [3652,3607,3618], [7070,7077,7060,7082,7059], [3221,3240,3277,3240,3233], [2711,2753,2716,2736,2750,2724,2752], [3749,3762,3751], [2825,2852,2893,2837,2867], [4877,4821,4829], [3523,3538,3458,3524,3517], [1344,1377,1397,1400,1409], [6017,6098,6040,6082,6042], [917,955,955,951,957,953,954,972], [6674,6682,6664,6673], [1488,1500,1508,1489,1497,1514], [3926,3964,3921,3851], [4325,4304,4320,4311,4323,4314,4312], [41352,41760], [6190,6179,6185,6189,6179,6191], [11612,11593,11580,11593,11599,11568,11606], [1808,1834,1825,1821,1808], [1931,1960,1928,1964,1920,1960], [5123,5316,5251,5198,5200,5222], [5091,5043,5033], [55295]]");
      this.fontSize = 20;
      this.extraHeigth = 15;
      this.height = this.fontSize + this.extraHeigth;
      this.width = 100;
      this.canvas = $("<canvas height='" + this.height + "' width='" + this.width + "'/>").appendTo($('#test_canvases'));
      this.ctx = this.canvas[0].getContext('2d');
      this.results = [];
    }

    LanguageDector.prototype.begin = function(cb) {
      var tester;
      this.cb = cb;
      this.count = 0;
      tester = (function(_this) {
        return function(index) {
          var c, i, len, ref, text;
          if (index === _this.codes.length) {
            console.log(_this.results);
            sender.postLangsDetected(_this.results);
            return _this.cb();
          } else {
            text = "";
            ref = _this.codes[index];
            for (i = 0, len = ref.length; i < len; i++) {
              c = ref[i];
              text += String.fromCharCode(c);
            }
            _this.ctx.fillStyle = "white";
            _this.ctx.fillRect(0, 0, _this.width, _this.height);
            _this.ctx.fillStyle = "black";
            _this.ctx.font = _this.fontSize + "px sans-serif";
            _this.ctx.fillText(text, 5, _this.height - _this.extraHeigth / 2.0);
            _this.results.push({
              w: _this.width,
              h: _this.height,
              pixels: stringify(_this.ctx.getImageData(0, 0, _this.width, _this.height).data)
            });
            return raf(function() {
              return tester(index + 1);
            });
          }
        };
      })(this);
      return raf(function() {
        return tester(0);
      });
    };

    return LanguageDector;

  })();

}).call(this);
