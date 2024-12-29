(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _DOM = _interopRequireDefault(require("../Utils/DOM"));
var _Utility = _interopRequireDefault(require("../Utils/Utility"));
var _Helpers = _interopRequireDefault(require("../Utils/Helpers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; } // header.js
var _lastScrolBarPosition = /*#__PURE__*/new WeakMap();
var _noSticky = /*#__PURE__*/new WeakMap();
var Header = /*#__PURE__*/_createClass(function Header() {
  var _this = this;
  _classCallCheck(this, Header);
  _classPrivateFieldInitSpec(this, _lastScrolBarPosition, {
    writable: true,
    value: 0
  });
  _defineProperty(this, "getHeaderHeight", function () {
    if (window.innerWidth <= 480) {
      return 43;
    }
    var totalHeight = 0;
    if (_DOM["default"].header && (_DOM["default"].header.classList.contains('transparent-header') || _DOM["default"].header.classList.contains('full_screen-header')) && _DOM["default"].header.hasAttribute('data-height')) {
      totalHeight += parseInt(_DOM["default"].header.getAttribute('data-height'), 10) + 1;
    } else if (_DOM["default"].header && _DOM["default"].header.classList.contains('medium-header') && _DOM["default"].header.hasAttribute('data-height')) {
      var siteHeader = document.getElementById('site-header');
      totalHeight += siteHeader.offsetHeight / 2 - 32;
    } else if (_DOM["default"].header && _DOM["default"].header.classList.contains('center-header') && _DOM["default"].header.hasAttribute('data-height')) {
      var _siteHeader = document.getElementById('site-header');
      // totalHeight += siteHeader.offsetHeight - 60;
      totalHeight += _siteHeader.offsetHeight;
    } else if (_DOM["default"].header.classList.contains('minimal-header')) {
      var _siteHeader2 = document.getElementById('site-header');
      var stickyHeaderHolder = document.querySelector('.oceanwp-sticky-header-holder');
      if (stickyHeaderHolder && stickyHeaderHolder.classList.contains('is-sticky')) {
        totalHeight += parseInt(_DOM["default"].header.getAttribute('data-height'), 10);
      } else {
        totalHeight += _siteHeader2.offsetHeight;
      }
    } else if (_DOM["default"].header.classList.contains('vertical-header')) {
      totalHeight = 0;
    } else if (_DOM["default"].header) {
      // Fallback to offsetHeight if condition isn't met
      totalHeight += _DOM["default"].header.offsetHeight;
    }

    // Get WP Adminbar height
    var adminBar = document.getElementById('wpadminbar');
    if (adminBar) {
      totalHeight += adminBar.offsetHeight;
    }

    // console.log("Sticky Header Height:", totalHeight);
    return totalHeight;
  });
  _defineProperty(this, "sticky", function () {
    var _DOM$siteHeader;
    if (_classPrivateFieldGet(_this, _noSticky).call(_this)) {
      return;
    }
    if (!(_DOM["default"].headerWrapper || _DOM["default"].siteHeader || _DOM["default"].header)) {
      return;
    }
    var currentPosition = _Utility["default"].elemOffset(_DOM["default"].headerWrapper).top - Header.getOffset();
    var slideStickyCurrentPosition = currentPosition;

    // If slide effect
    if (_Helpers["default"].slideStickyEffect() && !((_DOM$siteHeader = _DOM["default"].siteHeader) !== null && _DOM$siteHeader !== void 0 && _DOM$siteHeader.classList.contains("vertical-header"))) {
      currentPosition = currentPosition + _DOM["default"].headerWrapper.offsetHeight;
    }

    // When scrolling
    if (_Utility["default"].scrollBarTopPosition() !== 0 && _Utility["default"].scrollBarTopPosition() >= currentPosition) {
      _DOM["default"].headerWrapper.classList.add("is-sticky");
      _DOM["default"].header.style.top = Header.getOffset() + "px";
      _DOM["default"].header.style.width = _DOM["default"].headerWrapper.offsetWidth + "px";

      // If slide effect
      if (_Helpers["default"].slideStickyEffect() && !_DOM["default"].siteHeader.classList.contains("vertical-header")) {
        _DOM["default"].siteHeader.classList.add("show");
      }
    } else {
      // If is not slide effect
      if (!_Helpers["default"].slideStickyEffect()) {
        // Remove sticky wrap class
        _DOM["default"].headerWrapper.classList.remove("is-sticky");
        _DOM["default"].header.style.top = "";
        _DOM["default"].header.style.width = "";
      }
    }

    // If slide effect
    if (_Helpers["default"].slideStickyEffect() && !_DOM["default"].siteHeader.classList.contains("vertical-header")) {
      // Remove sticky class when window top
      if (_Utility["default"].scrollBarTopPosition() <= slideStickyCurrentPosition) {
        // Remove sticky wrap class
        _DOM["default"].headerWrapper.classList.remove("is-sticky");
        _DOM["default"].header.style.top = "";
        _DOM["default"].header.style.width = "";

        // Remove slide effect class
        _DOM["default"].siteHeader.classList.remove("show");
      }
    }
  });
  _defineProperty(this, "updateSticky", function () {
    var _DOM$siteHeader2, _DOM$headerWrapper;
    // Return if is vertical header style
    if (window.innerWidth > 960 && (_DOM$siteHeader2 = _DOM["default"].siteHeader) !== null && _DOM$siteHeader2 !== void 0 && _DOM$siteHeader2.classList.contains("vertical-header")) {
      return;
    }
    if (!((_DOM$headerWrapper = _DOM["default"].headerWrapper) !== null && _DOM$headerWrapper !== void 0 && _DOM$headerWrapper.classList.contains("is-sticky")) && !!_DOM["default"].header) {
      if (_DOM["default"].headerWrapper) {
        _DOM["default"].headerWrapper.style.height = _DOM["default"].header.offsetHeight + "px";
      }
    }
    if (_Utility["default"].scrollBarTopPosition() !== 0) {
      if (!!_DOM["default"].header && !!_DOM["default"].headerWrapper) {
        _DOM["default"].header.style.top = Header.getOffset() + "px";
        _DOM["default"].header.style.width = _DOM["default"].headerWrapper.offsetWidth + "px";
      }
    }
  });
  _defineProperty(this, "addVerticalHeaderSticky", function () {
    var _DOM$verticalHeader;
    // Return if is not vertical header style and transparent
    if (!((_DOM$verticalHeader = _DOM["default"].verticalHeader) !== null && _DOM$verticalHeader !== void 0 && _DOM$verticalHeader.classList.contains("is-transparent"))) {
      return;
    }

    // Return if no header wrapper
    if (!_DOM["default"].headerWrapper) {
      return;
    }
    var currentPosition = _Utility["default"].elemOffset(_DOM["default"].headerWrapper).top;

    // When scrolling
    if (_Utility["default"].scrollBarTopPosition() !== 0 && _Utility["default"].scrollBarTopPosition() >= currentPosition) {
      _DOM["default"].headerWrapper.classList.add("is-sticky");
    } else {
      _DOM["default"].headerWrapper.classList.remove("is-sticky");
    }
  });
  _defineProperty(this, "stickyEffects", function () {
    var _DOM$siteHeader3;
    // Return if is vertical header style
    if ((_DOM$siteHeader3 = _DOM["default"].siteHeader) !== null && _DOM$siteHeader3 !== void 0 && _DOM$siteHeader3.classList.contains("vertical-header")) {
      return;
    }

    // Return if no header wrapper
    if (!_DOM["default"].headerWrapper) {
      return;
    }

    // If show up effect
    if (_Helpers["default"].upStickyEffect()) {
      var currentPosition = _Utility["default"].elemOffset(_DOM["default"].headerWrapper).top + _DOM["default"].headerWrapper.offsetHeight;
      var scrollBarTopPosition = document.documentElement.scrollTop;
      if (scrollBarTopPosition >= _classPrivateFieldGet(_this, _lastScrolBarPosition) && scrollBarTopPosition >= currentPosition) {
        _DOM["default"].siteHeader.classList.remove("header-down");
        _DOM["default"].siteHeader.classList.add("header-up");
      } else {
        _DOM["default"].siteHeader.classList.remove("header-up");
        _DOM["default"].siteHeader.classList.add("header-down");
      }
      _classPrivateFieldSet(_this, _lastScrolBarPosition, scrollBarTopPosition);
    }
  });
  _defineProperty(this, "createStickyWrapper", function () {
    var _DOM$siteHeader4;
    // Create header sticky wrapper element
    _DOM["default"].headerWrapper = document.createElement("div");
    _DOM["default"].headerWrapper.setAttribute("id", "site-header-sticky-wrapper");
    _DOM["default"].headerWrapper.setAttribute("class", "oceanwp-sticky-header-holder");

    // Wrap header sticky wrapper around header
    if (!!_DOM["default"].header) {
      var _DOM$headerWrapper2;
      (_DOM$headerWrapper2 = _DOM["default"].headerWrapper) === null || _DOM$headerWrapper2 === void 0 ? void 0 : _DOM$headerWrapper2.oceanWrapAll(_DOM["default"].header);
    }

    // Set header sticky wrapper height
    if (!((_DOM$siteHeader4 = _DOM["default"].siteHeader) !== null && _DOM$siteHeader4 !== void 0 && _DOM$siteHeader4.classList.contains("vertical-header"))) {
      if (!!_DOM["default"].headerWrapper && !!_DOM["default"].header) {
        _DOM["default"].headerWrapper.style.height = _DOM["default"].header.offsetHeight + "px";
      }
    }
  });
  _classPrivateFieldInitSpec(this, _noSticky, {
    writable: true,
    value: function value() {
      var _DOM$siteHeader5, _DOM$siteHeader6;
      if ((_DOM$siteHeader5 = _DOM["default"].siteHeader) !== null && _DOM$siteHeader5 !== void 0 && _DOM$siteHeader5.classList.contains("vertical-header")) {
        if (window.innerWidth <= 960) {
          return !_DOM["default"].headerWrapper || _Helpers["default"].isMobileStickyDisabled();
        }
      }
      return !_DOM["default"].headerWrapper || _Helpers["default"].isMobileStickyDisabled() || !((_DOM$siteHeader6 = _DOM["default"].siteHeader) !== null && _DOM$siteHeader6 !== void 0 && _DOM$siteHeader6.classList.contains("fixed-scroll"));
    }
  });
});
exports["default"] = Header;
_defineProperty(Header, "getOffset", function () {
  var offset = 0;

  // Add WP Adminbar offset
  if (_Utility["default"].isWPAdminbarVisible()) {
    if (!!_DOM["default"].WPAdminbar) {
      offset = offset + _DOM["default"].WPAdminbar.offsetHeight;
    }
  }

  // Offset topbar sticky
  if (_Helpers["default"].isTopbarStickyEnabled()) {
    if (!!_DOM["default"].topbar) {
      offset = offset + _DOM["default"].topbar.offsetHeight;
    }
  }
  return offset;
});

},{"../Utils/DOM":4,"../Utils/Helpers":6,"../Utils/Utility":7}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _DOM = _interopRequireDefault(require("../Utils/DOM"));
var _Helpers = _interopRequireDefault(require("../Utils/Helpers"));
var _Utility = _interopRequireDefault(require("../Utils/Utility"));
var _Header = _interopRequireDefault(require("./Header"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } } // logo.js
var _logo = /*#__PURE__*/new WeakMap();
var _customLogo = /*#__PURE__*/new WeakMap();
var _returnOnSomeHeaderStyles = /*#__PURE__*/new WeakMap();
var Logo = /*#__PURE__*/_createClass(function Logo() {
  var _this = this;
  _classCallCheck(this, Logo);
  _classPrivateFieldInitSpec(this, _logo, {
    writable: true,
    value: void 0
  });
  _classPrivateFieldInitSpec(this, _customLogo, {
    writable: true,
    value: void 0
  });
  _defineProperty(this, "setMaxHeight", function () {
    var _DOM$siteHeader, _DOM$logoWrapper;
    // If header style is center
    if ((_DOM$siteHeader = _DOM["default"].siteHeader) !== null && _DOM$siteHeader !== void 0 && _DOM$siteHeader.classList.contains("center-header")) {
      _classPrivateFieldSet(_this, _logo, _DOM["default"].middleLogo);
      _classPrivateFieldSet(_this, _customLogo, _DOM["default"].customMiddleLogo);
    }

    // Return if not shrink style and on some header styles
    if (_classPrivateFieldGet(_this, _returnOnSomeHeaderStyles).call(_this)) {
      return;
    }

    // If mobile logo exists
    if ((_DOM$logoWrapper = _DOM["default"].logoWrapper) !== null && _DOM$logoWrapper !== void 0 && _DOM$logoWrapper.classList.contains("has-responsive-logo") && _Utility["default"].elemVisible(_DOM["default"].mobileLogo)) {
      _classPrivateFieldSet(_this, _customLogo, _DOM["default"].mobileLogo);
    }

    // Get logo position
    var initialLogoHeight;
    if (_classPrivateFieldGet(_this, _customLogo)) {
      initialLogoHeight = _classPrivateFieldGet(_this, _customLogo).offsetHeight;
    }
    var currentPosition = _Utility["default"].elemOffset(_DOM["default"].headerWrapper).top - _Header["default"].getOffset();
    window.addEventListener("scroll", function () {
      // When scrolling
      if (_Utility["default"].scrollBarTopPosition() !== 0 && _Utility["default"].scrollBarTopPosition() >= currentPosition) {
        Array.from(_classPrivateFieldGet(_this, _logo)).forEach(function (elem) {
          return elem.style.maxHeight = _Helpers["default"].getShrinkLogoHeight() + "px";
        });
      } else if (!!initialLogoHeight) {
        Array.from(_classPrivateFieldGet(_this, _logo)).forEach(function (elem) {
          return elem.style.maxHeight = initialLogoHeight + "px";
        });
      }
    });
  });
  _classPrivateFieldInitSpec(this, _returnOnSomeHeaderStyles, {
    writable: true,
    value: function value() {
      var _DOM$siteHeader2, _DOM$siteHeader3, _DOM$siteHeader4, _DOM$siteHeader5;
      return !_Helpers["default"].shrinkStickyStyle() || !_classPrivateFieldGet(_this, _logo) || !_DOM["default"].headerWrapper || _Helpers["default"].isMobileStickyDisabled() || _Helpers["default"].manualSticky() || !((_DOM$siteHeader2 = _DOM["default"].siteHeader) !== null && _DOM$siteHeader2 !== void 0 && _DOM$siteHeader2.classList.contains("fixed-scroll")) || ((_DOM$siteHeader3 = _DOM["default"].siteHeader) === null || _DOM$siteHeader3 === void 0 ? void 0 : _DOM$siteHeader3.classList.contains("top-header")) || ((_DOM$siteHeader4 = _DOM["default"].siteHeader) === null || _DOM$siteHeader4 === void 0 ? void 0 : _DOM$siteHeader4.classList.contains("vertical-header")) || ((_DOM$siteHeader5 = _DOM["default"].siteHeader) === null || _DOM$siteHeader5 === void 0 ? void 0 : _DOM$siteHeader5.classList.contains("medium-header")) && _DOM["default"].bottomHeader.classList.contains("fixed-scroll");
    }
  });
  _classPrivateFieldSet(this, _logo, _DOM["default"].logo);
  _classPrivateFieldSet(this, _customLogo, _DOM["default"].customLogo);
});
exports["default"] = Logo;

},{"../Utils/DOM":4,"../Utils/Helpers":6,"../Utils/Utility":7,"./Header":1}],3:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _DOM = _interopRequireDefault(require("../Utils/DOM"));
var _Utility = _interopRequireDefault(require("../Utils/Utility"));
var _Helpers = _interopRequireDefault(require("../Utils/Helpers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; } // topbar.js
var _noSticky = /*#__PURE__*/new WeakMap();
var Topbar = /*#__PURE__*/_createClass(function Topbar() {
  var _this = this;
  _classCallCheck(this, Topbar);
  _defineProperty(this, "sticky", function () {
    if (_classPrivateFieldGet(_this, _noSticky).call(_this)) {
      return;
    }
    var currentPosition = 0;
    if (!!_DOM["default"].topbarWrapper) {
      currentPosition = _Utility["default"].elemOffset(_DOM["default"].topbarWrapper).top - _this.getOffset();
    }

    // When scrolling
    if (_Utility["default"].scrollBarTopPosition() !== 0 && _Utility["default"].scrollBarTopPosition() >= currentPosition) {
      var _DOM$topbarWrapper, _DOM$topbarWrapper2;
      (_DOM$topbarWrapper = _DOM["default"].topbarWrapper) === null || _DOM$topbarWrapper === void 0 ? void 0 : _DOM$topbarWrapper.classList.add("is-sticky");
      _DOM["default"].topbar.style.top = _this.getOffset() + "px";
      _DOM["default"].topbar.style.width = ((_DOM$topbarWrapper2 = _DOM["default"].topbarWrapper) === null || _DOM$topbarWrapper2 === void 0 ? void 0 : _DOM$topbarWrapper2.offsetWidth) + "px";
    } else {
      var _DOM$topbarWrapper3;
      (_DOM$topbarWrapper3 = _DOM["default"].topbarWrapper) === null || _DOM$topbarWrapper3 === void 0 ? void 0 : _DOM$topbarWrapper3.classList.remove("is-sticky");
      _DOM["default"].topbar.style.top = "";
      _DOM["default"].topbar.style.width = "";
    }
  });
  _defineProperty(this, "updateSticky", function () {
    if (!_DOM["default"].topbar || !_DOM["default"].topbarWrapper || !_Helpers["default"].isTopbarStickyEnabled()) {
      return;
    }
    if (!_DOM["default"].topbarWrapper.classList.contains("is-sticky")) {
      _DOM["default"].topbarWrapper.style.height = _DOM["default"].topbar.offsetHeight + "px";
    }
    if (_Utility["default"].scrollBarTopPosition() !== 0) {
      var _DOM$topbarWrapper4;
      _DOM["default"].topbar.style.top = _this.getOffset() + "px";
      _DOM["default"].topbar.style.width = ((_DOM$topbarWrapper4 = _DOM["default"].topbarWrapper) === null || _DOM$topbarWrapper4 === void 0 ? void 0 : _DOM$topbarWrapper4.offsetWidth) + "px";
    }
  });
  _defineProperty(this, "createStickyWrapper", function () {
    if (!_Helpers["default"].isTopbarStickyEnabled()) {
      return;
    }

    // Create topbar sticky wrapper element
    _DOM["default"].topbarWrapper = document.createElement("div");
    _DOM["default"].topbarWrapper.setAttribute("id", "top-bar-sticky-wrapper");
    _DOM["default"].topbarWrapper.setAttribute("class", "oceanwp-sticky-top-bar-holder");

    // Wrap topbar sticky wrapper around topbar
    if (!!_DOM["default"].topbar) {
      var _DOM$topbarWrapper5;
      (_DOM$topbarWrapper5 = _DOM["default"].topbarWrapper) === null || _DOM$topbarWrapper5 === void 0 ? void 0 : _DOM$topbarWrapper5.oceanWrapAll(_DOM["default"].topbar);

      // Set topbar sticky wrapper height
      _DOM["default"].topbarWrapper.style.height = _DOM["default"].topbar.offsetHeight + "px";
    }
  });
  _defineProperty(this, "getOffset", function () {
    var offset = 0;

    // Add WP Adminbar offset
    if (_Utility["default"].isWPAdminbarVisible()) {
      var _DOM$WPAdminbar;
      offset = offset + ((_DOM$WPAdminbar = _DOM["default"].WPAdminbar) === null || _DOM$WPAdminbar === void 0 ? void 0 : _DOM$WPAdminbar.offsetHeight);
    }
    return offset;
  });
  _classPrivateFieldInitSpec(this, _noSticky, {
    writable: true,
    value: function value() {
      return !_Helpers["default"].isTopbarStickyEnabled() || !_DOM["default"].topbar || _Helpers["default"].isMobileStickyDisabled();
    }
  });
});
exports["default"] = Topbar;

},{"../Utils/DOM":4,"../Utils/Helpers":6,"../Utils/Utility":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Helpers = _interopRequireDefault(require("./Helpers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//dom.js

var DOM = {
  WPAdminbar: document.querySelector("#wpadminbar"),
  topbar: document.querySelector("#top-bar-wrap"),
  siteHeader: document.querySelector("#site-header"),
  verticalHeader: document.querySelector("#site-header.vertical-header"),
  bottomHeader: document.querySelector(".bottom-header-wrap"),
  logoWrapper: document.querySelector("#site-logo"),
  logo: document.querySelectorAll("#site-logo img"),
  customLogo: document.querySelector("#site-logo .custom-logo"),
  middleLogo: document.querySelectorAll(".middle-site-logo img"),
  customMiddleLogo: document.querySelector(".middle-site-logo .custom-logo"),
  mobileLogo: document.querySelector("#site-logo .responsive-logo")
};
DOM.getHeader = function () {
  var _DOM$siteHeader, _DOM$siteHeader2, _DOM$bottomHeader;
  var headerClass;

  // If manual sticky
  if (_Helpers["default"].manualSticky()) {
    headerClass = ".owp-sticky";
  } else {
    headerClass = "#site-header";
  }

  // If top header style
  if ((_DOM$siteHeader = DOM.siteHeader) !== null && _DOM$siteHeader !== void 0 && _DOM$siteHeader.classList.contains("top-header")) {
    headerClass = "#site-header .header-top";
  }

  // Medium header style
  if ((_DOM$siteHeader2 = DOM.siteHeader) !== null && _DOM$siteHeader2 !== void 0 && _DOM$siteHeader2.classList.contains("medium-header") && (_DOM$bottomHeader = DOM.bottomHeader) !== null && _DOM$bottomHeader !== void 0 && _DOM$bottomHeader.classList.contains("fixed-scroll")) {
    headerClass = ".bottom-header-wrap";
  }
  return document.querySelector(headerClass);
};
DOM.header = DOM.getHeader();
var _default = DOM;
exports["default"] = _default;

},{"./Helpers":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//dommethods.js
var _default = function () {
  // Wrap an HTMLElement around each element in an HTMLElement array.
  HTMLElement.prototype.oceanWrap = function (elms) {
    // Convert `elms` to an array, if necessary.
    if (!elms.length) elms = [elms];

    // Loops backwards to prevent having to clone the wrapper on the
    // first element (see `child` below).
    for (var i = elms.length - 1; i >= 0; i--) {
      var child = i > 0 ? this.cloneNode(true) : this;
      var el = elms[i];

      // Cache the current parent and sibling.
      var parent = el.parentNode;
      var sibling = el.nextSibling;

      // Wrap the element (is automatically removed from its current
      // parent).
      child.appendChild(el);

      // If the element had a sibling, insert the wrapper before
      // the sibling to maintain the HTML structure; otherwise, just
      // append it to the parent.
      if (sibling) {
        parent.insertBefore(child, sibling);
      } else {
        parent.appendChild(child);
      }
    }
  };

  // Wrap an HTMLElement around another HTMLElement or an array of them.
  HTMLElement.prototype.oceanWrapAll = function (elms) {
    var el = !!elms && elms.length ? elms[0] : elms;

    // Cache the current parent and sibling of the first element.
    var parent = el.parentNode;
    var sibling = el.nextSibling;

    // Wrap the first element (is automatically removed from its
    // current parent).
    this.appendChild(el);

    // Wrap all other elements (if applicable). Each element is
    // automatically removed from its current parent and from the elms
    // array.
    while (elms.length) {
      this.appendChild(elms[0]);
    }

    // If the first element had a sibling, insert the wrapper before the
    // sibling to maintain the HTML structure; otherwise, just append it
    // to the parent.
    if (sibling) {
      parent.insertBefore(this, sibling);
    } else {
      parent.appendChild(this);
    }
  };
}();
exports["default"] = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
//helpers.js
var Helpers = /*#__PURE__*/_createClass(function Helpers() {
  _classCallCheck(this, Helpers);
});
exports["default"] = Helpers;
_defineProperty(Helpers, "isTopbarStickyEnabled", function () {
  return oceanwpLocalize.hasStickyTopBar == true;
});
_defineProperty(Helpers, "isMobileStickyDisabled", function () {
  return window.innerWidth <= 960 && oceanwpLocalize.hasStickyMobile != true;
});
_defineProperty(Helpers, "slideStickyEffect", function () {
  return oceanwpLocalize.stickyEffect == "slide";
});
_defineProperty(Helpers, "upStickyEffect", function () {
  return oceanwpLocalize.stickyEffect == "up";
});
_defineProperty(Helpers, "manualSticky", function () {
  return oceanwpLocalize.stickyChoose == "manual";
});
_defineProperty(Helpers, "shrinkStickyStyle", function () {
  return oceanwpLocalize.stickyStyle == "shrink";
});
_defineProperty(Helpers, "getShrinkLogoHeight", function () {
  var shrinkLogoHeight = parseInt(oceanwpLocalize.shrinkLogoHeight);
  return shrinkLogoHeight ? shrinkLogoHeight : 30;
});

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _DOM = _interopRequireDefault(require("./DOM"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // utility.js
var Utility = /*#__PURE__*/_createClass(function Utility() {
  _classCallCheck(this, Utility);
});
exports["default"] = Utility;
_defineProperty(Utility, "scrollBarTopPosition", function () {
  return window.pageYOffset;
});
_defineProperty(Utility, "elemExists", function (elem) {
  return elem && elem !== null;
});
_defineProperty(Utility, "elemVisible", function (elem) {
  return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
});
_defineProperty(Utility, "elemOffset", function (elem) {
  if (!elem.getClientRects().length) {
    return {
      top: 0,
      left: 0
    };
  }

  // Get document-relative position by adding viewport scroll to viewport-relative gBCR
  var rect = elem.getBoundingClientRect();
  var win = elem.ownerDocument.defaultView;
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };
});
_defineProperty(Utility, "isWPAdminbarVisible", function () {
  return Utility.elemExists(_DOM["default"].WPAdminbar) && window.innerWidth > 600;
});

},{"./DOM":4}],8:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("./Utils/DOMMethods");
var _Utility = _interopRequireDefault(require("./Utils/Utility"));
var _Topbar = _interopRequireDefault(require("./Components/Topbar"));
var _Header = _interopRequireDefault(require("./Components/Header"));
var _Logo = _interopRequireDefault(require("./Components/Logo"));
var _DOM = _interopRequireDefault(require("./Utils/DOM"));
var _Helpers = _interopRequireDefault(require("./Utils/Helpers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } } // sticky-header.js
var _scrollBarlatestTopPosition = /*#__PURE__*/new WeakMap();
var _setupEventListeners = /*#__PURE__*/new WeakMap();
var _getAnchorFromHref = /*#__PURE__*/new WeakMap();
var _adjustForAnchor = /*#__PURE__*/new WeakMap();
var _setupAnchorClickEvents = /*#__PURE__*/new WeakMap();
var _handleInitialPageLoadHighlight = /*#__PURE__*/new WeakMap();
var _setupScrollSpy = /*#__PURE__*/new WeakMap();
var _onClickScrollOffset = /*#__PURE__*/new WeakMap();
var _onWindowLoad = /*#__PURE__*/new WeakMap();
var _onClickLoad = /*#__PURE__*/new WeakMap();
var _onWindowScroll = /*#__PURE__*/new WeakMap();
var _onWindowResize = /*#__PURE__*/new WeakMap();
var OW_StickyHeader = /*#__PURE__*/_createClass(function OW_StickyHeader() {
  var _this = this;
  _classCallCheck(this, OW_StickyHeader);
  _classPrivateFieldInitSpec(this, _scrollBarlatestTopPosition, {
    writable: true,
    value: void 0
  });
  _defineProperty(this, "start", function () {
    _classPrivateFieldSet(_this, _scrollBarlatestTopPosition, _Utility["default"].scrollBarTopPosition());
    _classPrivateFieldGet(_this, _setupEventListeners).call(_this);
    _classPrivateFieldGet(_this, _adjustForAnchor).call(_this);
    _classPrivateFieldGet(_this, _setupAnchorClickEvents).call(_this);
    _classPrivateFieldGet(_this, _setupScrollSpy).call(_this);
  });
  _classPrivateFieldInitSpec(this, _setupEventListeners, {
    writable: true,
    value: function value() {
      window.addEventListener("load", _classPrivateFieldGet(_this, _onWindowLoad));
      window.addEventListener("hashchange", _classPrivateFieldGet(_this, _onClickLoad));
      window.addEventListener("scroll", _classPrivateFieldGet(_this, _onWindowScroll));
      window.addEventListener("resize", _classPrivateFieldGet(_this, _onWindowResize));
      window.addEventListener("orientationchange", _classPrivateFieldGet(_this, _onWindowResize));
    }
  });
  _classPrivateFieldInitSpec(this, _getAnchorFromHref, {
    writable: true,
    value: function value(href) {
      var url = new URL(href, window.location.origin);
      return url.hash.replace('#', '');
    }
  });
  _classPrivateFieldInitSpec(this, _adjustForAnchor, {
    writable: true,
    value: function value() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var anchorId = id;

      // If the 'id' is not passed to the function, then retrieve it from the window.location.hash
      if (!anchorId && window.location.hash) {
        anchorId = window.location.hash.replace("#", "");
      }
      var element = document.getElementById(anchorId);
      if (element) {
        setTimeout(function () {
          var adjustment = _this.header.getHeaderHeight();

          // If WP Admin bar is visible, adjust for its height as well
          if (_Utility["default"].isWPAdminbarVisible() && _DOM["default"].WPAdminbar) {
            adjustment += _DOM["default"].WPAdminbar.offsetHeight;
          }

          // Adjust the scroll position to take into account the header height and any other adjustments
          var scrollPosition = element.getBoundingClientRect().top + window.pageYOffset - adjustment;
          window.scrollTo({
            top: scrollPosition,
            behavior: "smooth"
          });
        }, 20); // Delay is to ensure all rendering is done.
      }
    }
  });
  _classPrivateFieldInitSpec(this, _setupAnchorClickEvents, {
    writable: true,
    value: function value() {
      var anchorLinks = document.querySelectorAll('a[href*="#"]:not([href="#"])');
      anchorLinks.forEach(function (link) {
        // Exclude specified classes
        if (!link.classList.contains("oew-off-canvas-button") && !link.parentNode.classList.contains("oew-off-canvas-button") && !link.classList.contains("oec-off-canvas-button") && !link.parentNode.classList.contains("oec-off-canvas-button")) {
          link.addEventListener('click', function (e) {
            var id = _classPrivateFieldGet(_this, _getAnchorFromHref).call(_this, link.getAttribute('href'));
            if (window.location.pathname === new URL(link.href).pathname) {
              _classPrivateFieldGet(_this, _adjustForAnchor).call(_this, id); // Use the modified adjustForAnchor function
            }
          });
        }
      });
    }
  });
  _classPrivateFieldInitSpec(this, _handleInitialPageLoadHighlight, {
    writable: true,
    value: function value() {
      // Collect all menu items into an array
      var menuItems = _toConsumableArray(document.querySelectorAll('li > a[href*="#"]:not([href="#"])')).map(function (link) {
        return link.parentNode;
      });
      var currentHash = _classPrivateFieldGet(_this, _getAnchorFromHref).call(_this, window.location.href);

      // First, remove highlight from all menu items.
      menuItems.forEach(function (menuItem) {
        menuItem.classList.remove('current-menu-item');
      });

      // If there's a hash, highlight the corresponding menu item.
      if (currentHash) {
        menuItems.forEach(function (menuItem) {
          var anchor = _classPrivateFieldGet(_this, _getAnchorFromHref).call(_this, menuItem.querySelector('a').getAttribute('href'));
          if (anchor === currentHash) {
            menuItem.classList.add('current-menu-item');
          }
        });
      }
    }
  });
  _classPrivateFieldInitSpec(this, _setupScrollSpy, {
    writable: true,
    value: function value() {
      var sections = document.querySelectorAll('section[id]');
      window.addEventListener('scroll', function () {
        var currentSection = null;
        sections.forEach(function (section) {
          var sectionTop = section.offsetTop - _this.header.getHeaderHeight();
          if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
          }
        });
        document.querySelectorAll('li > a[href*="#"]:not([href="#"])').forEach(function (link) {
          var anchor = _classPrivateFieldGet(_this, _getAnchorFromHref).call(_this, link.getAttribute('href'));
          var listItem = link.parentElement;
          listItem.classList.remove('current-menu-item');
          if (anchor === currentSection) {
            listItem.classList.add('current-menu-item');
          }
        });
      });
    }
  });
  _classPrivateFieldInitSpec(this, _onClickScrollOffset, {
    writable: true,
    value: function value(event) {
      event.preventDefault();
      event.stopPropagation();
      if (_Helpers["default"].upStickyEffect()) {
        return;
      }
      var stickyOffset = _DOM["default"].headerWrapper.offsetHeight;
      var target = document.querySelector(':target');
      if (target) {
        target.style["scroll-margin-top"] = stickyOffset + 'px';
        target.scrollIntoView({
          top: stickyOffset,
          behavior: 'smooth'
        });
      }
      document.querySelectorAll('a.local[href*="#"]:not([href="#"]), .local a[href*="#"]:not([href="#"]), a.menu-link[href*="#"]:not([href="#"]), a.sidr-class-menu-link[href*="#"]:not([href="#"]), #mobile-dropdown a[href*="#"]:not([href="#"])').forEach(function (navLink) {
        if (!navLink.classList.contains("omw-open-modal") && !navLink.closest(".omw-open-modal") && !navLink.classList.contains("oew-modal-button") && !navLink.closest(".oew-modal-button") && !navLink.classList.contains("opl-link") && !navLink.parentNode.classList.contains("opl-link") && !navLink.classList.contains("oew-off-canvas-button") && !navLink.parentNode.classList.contains("oew-off-canvas-button") && !navLink.classList.contains("oec-off-canvas-button") && !navLink.parentNode.classList.contains("oec-off-canvas-button")) {
          return;
        }
        navLink.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          var href = navLink.getAttribute("href");
          var anchorId = '';
          if (href) {
            anchorId = document.querySelector(href);
          }
          if (anchorId) {
            anchorId.style["scroll-margin-top"] = stickyOffset + 'px';
            anchorId.scrollIntoView({
              top: stickyOffset,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  });
  _classPrivateFieldInitSpec(this, _onWindowLoad, {
    writable: true,
    value: function value(e) {
      _this.topbar.createStickyWrapper();
      _this.header.createStickyWrapper();
      _this.header.addVerticalHeaderSticky();
      _this.logo.setMaxHeight();
      _classPrivateFieldGet(_this, _onClickScrollOffset).call(_this, e);
      _classPrivateFieldGet(_this, _handleInitialPageLoadHighlight).call(_this);

      // Adjust for anchor if there is a hash in the URL
      if (window.location.hash) {
        var id = window.location.hash.replace("#", "");
        _classPrivateFieldGet(_this, _adjustForAnchor).call(_this, id);
      }
    }
  });
  _classPrivateFieldInitSpec(this, _onClickLoad, {
    writable: true,
    value: function value(e) {
      _classPrivateFieldGet(_this, _onClickScrollOffset).call(_this, e);
    }
  });
  _classPrivateFieldInitSpec(this, _onWindowScroll, {
    writable: true,
    value: function value() {
      if (_Utility["default"].scrollBarTopPosition() != _classPrivateFieldGet(_this, _scrollBarlatestTopPosition)) {
        _this.topbar.sticky();
        _this.header.sticky();
        _this.header.stickyEffects();
        _this.header.addVerticalHeaderSticky();
        _classPrivateFieldSet(_this, _scrollBarlatestTopPosition, _Utility["default"].scrollBarTopPosition());
      }
    }
  });
  _classPrivateFieldInitSpec(this, _onWindowResize, {
    writable: true,
    value: function value() {
      _this.topbar.updateSticky();
      _this.header.updateSticky();
    }
  });
  this.topbar = new _Topbar["default"]();
  this.header = new _Header["default"]();
  this.logo = new _Logo["default"]();
});
"use strict";
var stickyHeader = new OW_StickyHeader();
stickyHeader.start();

},{"./Components/Header":1,"./Components/Logo":2,"./Components/Topbar":3,"./Utils/DOM":4,"./Utils/DOMMethods":5,"./Utils/Helpers":6,"./Utils/Utility":7}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc3JjL2pzL0NvbXBvbmVudHMvSGVhZGVyLmpzIiwiYXNzZXRzL3NyYy9qcy9Db21wb25lbnRzL0xvZ28uanMiLCJhc3NldHMvc3JjL2pzL0NvbXBvbmVudHMvVG9wYmFyLmpzIiwiYXNzZXRzL3NyYy9qcy9VdGlscy9ET00uanMiLCJhc3NldHMvc3JjL2pzL1V0aWxzL0RPTU1ldGhvZHMuanMiLCJhc3NldHMvc3JjL2pzL1V0aWxzL0hlbHBlcnMuanMiLCJhc3NldHMvc3JjL2pzL1V0aWxzL1V0aWxpdHkuanMiLCJhc3NldHMvc3JjL2pzL3N0aWNreS1oZWFkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQ0EsSUFBQSxJQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxRQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxRQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBO0FBQXVDLFNBQUEsdUJBQUEsR0FBQSxXQUFBLEdBQUEsSUFBQSxHQUFBLENBQUEsVUFBQSxHQUFBLEdBQUEsZ0JBQUEsR0FBQTtBQUFBLFNBQUEsa0JBQUEsTUFBQSxFQUFBLEtBQUEsYUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxVQUFBLFVBQUEsR0FBQSxLQUFBLENBQUEsQ0FBQSxHQUFBLFVBQUEsQ0FBQSxVQUFBLEdBQUEsVUFBQSxDQUFBLFVBQUEsV0FBQSxVQUFBLENBQUEsWUFBQSx3QkFBQSxVQUFBLEVBQUEsVUFBQSxDQUFBLFFBQUEsU0FBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE1BQUEsRUFBQSxjQUFBLENBQUEsVUFBQSxDQUFBLEdBQUEsR0FBQSxVQUFBO0FBQUEsU0FBQSxhQUFBLFdBQUEsRUFBQSxVQUFBLEVBQUEsV0FBQSxRQUFBLFVBQUEsRUFBQSxpQkFBQSxDQUFBLFdBQUEsQ0FBQSxTQUFBLEVBQUEsVUFBQSxPQUFBLFdBQUEsRUFBQSxpQkFBQSxDQUFBLFdBQUEsRUFBQSxXQUFBLEdBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxXQUFBLGlCQUFBLFFBQUEsbUJBQUEsV0FBQTtBQUFBLFNBQUEsZ0JBQUEsUUFBQSxFQUFBLFdBQUEsVUFBQSxRQUFBLFlBQUEsV0FBQSxlQUFBLFNBQUE7QUFBQSxTQUFBLGdCQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsS0FBQSxJQUFBLEdBQUEsR0FBQSxjQUFBLENBQUEsR0FBQSxPQUFBLEdBQUEsSUFBQSxHQUFBLElBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBQSxJQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUEsVUFBQSxRQUFBLFlBQUEsUUFBQSxRQUFBLG9CQUFBLEdBQUEsQ0FBQSxHQUFBLElBQUEsS0FBQSxXQUFBLEdBQUE7QUFBQSxTQUFBLGVBQUEsR0FBQSxRQUFBLEdBQUEsR0FBQSxZQUFBLENBQUEsR0FBQSxvQkFBQSxPQUFBLENBQUEsR0FBQSxpQkFBQSxHQUFBLEdBQUEsTUFBQSxDQUFBLEdBQUE7QUFBQSxTQUFBLGFBQUEsS0FBQSxFQUFBLElBQUEsUUFBQSxPQUFBLENBQUEsS0FBQSxrQkFBQSxLQUFBLGtCQUFBLEtBQUEsTUFBQSxJQUFBLEdBQUEsS0FBQSxDQUFBLE1BQUEsQ0FBQSxXQUFBLE9BQUEsSUFBQSxLQUFBLFNBQUEsUUFBQSxHQUFBLEdBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLEVBQUEsSUFBQSxvQkFBQSxPQUFBLENBQUEsR0FBQSx1QkFBQSxHQUFBLFlBQUEsU0FBQSw0REFBQSxJQUFBLGdCQUFBLE1BQUEsR0FBQSxNQUFBLEVBQUEsS0FBQTtBQUFBLFNBQUEsMkJBQUEsR0FBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLElBQUEsMEJBQUEsQ0FBQSxHQUFBLEVBQUEsVUFBQSxHQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxFQUFBLEtBQUE7QUFBQSxTQUFBLDJCQUFBLEdBQUEsRUFBQSxp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QUEsS0FBQSxDQUFBLENBQUEsR0FBQSxVQUFBLENBQUEsVUFBQSxHQUFBLFVBQUEsQ0FBQSxVQUFBLFdBQUEsVUFBQSxDQUFBLFlBQUEsd0JBQUEsVUFBQSxFQUFBLFVBQUEsQ0FBQSxRQUFBLFNBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxNQUFBLEVBQUEsY0FBQSxDQUFBLFVBQUEsQ0FBQSxHQUFBLEdBQUEsVUFBQTtBQUFBLFNBQUEsYUFBQSxXQUFBLEVBQUEsVUFBQSxFQUFBLFdBQUEsUUFBQSxVQUFBLEVBQUEsaUJBQUEsQ0FBQSxXQUFBLENBQUEsU0FBQSxFQUFBLFVBQUEsT0FBQSxXQUFBLEVBQUEsaUJBQUEsQ0FBQSxXQUFBLEVBQUEsV0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsV0FBQSxpQkFBQSxRQUFBLG1CQUFBLFdBQUE7QUFBQSxTQUFBLGdCQUFBLFFBQUEsRUFBQSxXQUFBLFVBQUEsUUFBQSxZQUFBLFdBQUEsZUFBQSxTQUFBO0FBQUEsU0FBQSxnQkFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEtBQUEsSUFBQSxHQUFBLEdBQUEsY0FBQSxDQUFBLEdBQUEsT0FBQSxHQUFBLElBQUEsR0FBQSxJQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsSUFBQSxLQUFBLEVBQUEsS0FBQSxFQUFBLFVBQUEsUUFBQSxZQUFBLFFBQUEsUUFBQSxvQkFBQSxHQUFBLENBQUEsR0FBQSxJQUFBLEtBQUEsV0FBQSxHQUFBO0FBQUEsU0FBQSxlQUFBLEdBQUEsUUFBQSxHQUFBLEdBQUEsWUFBQSxDQUFBLEdBQUEsb0JBQUEsT0FBQSxDQUFBLEdBQUEsaUJBQUEsR0FBQSxHQUFBLE1BQUEsQ0FBQSxHQUFBO0FBQUEsU0FBQSxhQUFBLEtBQUEsRUFBQSxJQUFBLFFBQUEsT0FBQSxDQUFBLEtBQUEsa0JBQUEsS0FBQSxrQkFBQSxLQUFBLE1BQUEsSUFBQSxHQUFBLEtBQUEsQ0FBQSxNQUFBLENBQUEsV0FBQSxPQUFBLElBQUEsS0FBQSxTQUFBLFFBQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxFQUFBLElBQUEsb0JBQUEsT0FBQSxDQUFBLEdBQUEsdUJBQUEsR0FBQSxZQUFBLFNBQUEsNERBQUEsSUFBQSxnQkFBQSxNQUFBLEdBQUEsTUFBQSxFQUFBLEtBQUE7QUFBQSxTQUFBLDJCQUFBLEdBQUEsRUFBQSxVQUFBLEVBQUEsS0FBQSxJQUFBLDBCQUFBLENBQUEsR0FBQSxFQUFBLFVBQUEsR0FBQSxVQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsRUFBQSxLQUFBO0FBQUEsU0FBQSwyQkFBQSxHQUFBLEVBQUEsaUJBQUEsUUFBQSxpQkFBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLGVBQUEsU0FBQTtBQUFBLFNBQUEsc0JBQUEsUUFBQSxFQUFBLFVBQUEsUUFBQSxVQUFBLEdBQUEsNEJBQUEsQ0FBQSxRQUFBLEVBQUEsVUFBQSxpQkFBQSx3QkFBQSxDQUFBLFFBQUEsRUFBQSxVQUFBO0FBQUEsU0FBQSx5QkFBQSxRQUFBLEVBQUEsVUFBQSxRQUFBLFVBQUEsQ0FBQSxHQUFBLFdBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxZQUFBLFVBQUEsQ0FBQSxLQUFBO0FBQUEsU0FBQSxzQkFBQSxRQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsUUFBQSxVQUFBLEdBQUEsNEJBQUEsQ0FBQSxRQUFBLEVBQUEsVUFBQSxVQUFBLHdCQUFBLENBQUEsUUFBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLFVBQUEsS0FBQTtBQUFBLFNBQUEsNkJBQUEsUUFBQSxFQUFBLFVBQUEsRUFBQSxNQUFBLFNBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQSxRQUFBLGVBQUEsU0FBQSxtQkFBQSxNQUFBLCtDQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUEsUUFBQTtBQUFBLFNBQUEseUJBQUEsUUFBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLFFBQUEsVUFBQSxDQUFBLEdBQUEsSUFBQSxVQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsS0FBQSxpQkFBQSxVQUFBLENBQUEsUUFB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QUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxJQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxRQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBO0FBQXNDLFNBQUEsdUJBQUEsR0FBQSxXQUFBLEdBQUEsSUFBQSxHQUFBLENBQUEsVUFBQSxHQUFBLEdBQUEsZ0JBQUEsR0FBQTtBQUFBLFNBQUEsbUJBQUEsR0FBQSxXQUFBLGtCQUFBLENBQUEsR0FBQSxLQUFBLGdCQUFBLENBQUEsR0FBQSxLQUFBLDJCQUFBLENBQUEsR0FBQSxLQUFBLGtCQUFBO0FBQUEsU0FBQSxtQkFBQSxjQUFBLFNBQUE7QUFBQSxTQUFBLDRCQUFBLENBQUEsRUFBQSxNQUFBLFNBQUEsQ0FBQSxxQkFBQSxDQUFBLHNCQUFBLGlCQUFBLENBQUEsQ0FBQSxFQUFBLE1BQUEsT0FBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxRQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxLQUFBLGFBQUEsQ0FBQSxpQkFBQSxDQUFBLENBQUEsV0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsV0FBQSxDQUFBLElBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxtQkFBQSxLQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsT0FBQSxDQUFBLCtEQUFBLElBQUEsQ0FBQSxDQUFBLFVBQUEsaUJBQUEsQ0FBQSxDQUFBLEVBQUEsTUFBQTtBQUFBLFNBQUEsaUJBQUEsSUFBQSxlQUFBLE1BQUEsb0JBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxRQUFBLGFBQUEsSUFBQSwrQkFBQSxLQUFBLENBQUEsSUFBQSxDQUFBLElBQUE7QUFBQSxTQUFBLG1CQUFBLEdBQUEsUUFBQSxLQUFBLENBQUEsT0FBQSxDQUFBLEdBQUEsVUFBQSxpQkFBQSxDQUFBLEdBQUE7QUFBQSxTQUFBLGtCQUFBLEdBQUEsRUFBQSxHQUFBLFFBQUEsR0FBQSxZQUFBLEdBQUEsR0FBQSxHQUFBLENBQUEsTUFBQSxFQUFBLEdBQUEsR0FBQSxHQUFBLENBQUEsTUFBQSxXQUFBLENBQUEsTUFBQSxJQUFBLE9BQUEsS0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLEdBQUEsR0FBQSxFQUFBLENBQUEsSUFBQSxJQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxDQUFBLFVBQUEsSUFBQTtBQUFBLFNBQUEsa0JBQUEsTUFBQSxFQUFBLEtBQUEsYUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxVQUFBLFVBQUEsR0FBQSxLQUFBLENBQUEsQ0FBQSxHQUFBLFVBQUEsQ0FBQSxVQUFBLEdBQUEsVUFBQSxDQUFBLFVBQUEsV0FBQSxVQUFBLENBQUEsWUFBQSx3QkFBQSxVQUFBLEVBQUEsVUFBQSxDQUFBLFFBQUEsU0FBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE1BQUEsRUFBQSxjQUFBLENBQUEsVUFBQSxDQUFBLEdBQUEsR0FBQSxVQUFBO0FBQUEsU0FBQSxhQUFBLFdBQUEsRUFBQSxVQUFBLEVBQUEsV0FBQSxRQUFBLFVBQUEsRUFBQSxpQkFBQSxDQUFBLFdBQUEsQ0FBQSxTQUFBLEVBQUEsVUFBQSxPQUFBLFdBQUEsRUFBQSxpQkFBQSxDQUFBLFdBQUEsRUFBQSxXQUFBLEdBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxXQUFBLGlCQUFBLFFBQUEsbUJBQUEsV0FBQTtBQUFBLFNBQUEsZ0JBQUEsUUFBQSxFQUFBLFdBQUEsVUFBQSxRQUFBLFlBQUEsV0FBQSxlQUFBLFNBQUE7QUFBQSxTQUFBLGdCQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsS0FBQSxJQUFBLEdBQUEsR0FBQSxjQUFBLENBQUEsR0FBQSxPQUFBLEdBQUEsSUFBQSxHQUFBLElBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBQSxJQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUEsVUFBQSxRQUFBLFlBQUEsUUFBQSxRQUFBLG9CQUFBLEdBQUEsQ0FBQSxHQUFBLElBQUEsS0FBQSxXQUFBLEdBQUE7QUFBQSxTQUFBLGVBQUEsR0FBQSxRQUFBLEdBQUEsR0FBQSxZQUFBLENBQUEsR0FBQSxvQkFBQSxPQUFBLENBQUEsR0FBQSxpQkFBQSxHQUFBLEdBQUEsTUFBQSxDQUFBLEdBQUE7QUFBQSxTQUFBLGFBQUEsS0FBQSxFQUFBLElBQUEsUUFBQSxPQUFBLENBQUEsS0FBQSxrQkFBQSxLQUFBLGtCQUFBLEtBQUEsTUFBQSxJQUFBLEdBQUEsS0FBQSxDQUFBLE1BQUEsQ0FBQSxXQUFBLE9BQUEsSUFBQSxLQUFBLFNBQUEsUUFBQSxHQUFBLEdBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLEVBQUEsSUFBQSxvQkFBQSxPQUFBLENBQUEsR0FBQSx1QkFBQSxHQUFBLFlBQUEsU0FBQSw0REFBQSxJQUFBLGdCQUFBLE1BQUEsR0FBQSxNQUFBLEVBQUEsS0FBQTtBQUFBLFNBQUEsMkJBQUEsR0FBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLElBQUEsMEJBQUEsQ0FBQSxHQUFBLEVBQUEsVUFBQSxHQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxFQUFBLEtBQUE7QUFBQSxTQUFBLDJCQUFBLEdBQUEsRUFBQSxpQkFBQSxRQUFBLGlCQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsZUFBQSxTQUFBO0FBQUEsU0FBQSxzQkFBQSxRQUFBLEVBQUEsVUFBQSxRQUFBLFVBQUEsR0FBQSw0QkFBQSxDQUFBLFFBQUEsRUFBQSxVQUFBLGlCQUFBLHdCQUFBLENBQUEsUUFBQSxFQUFBLFVBQUE7QUFBQSxTQUFBLHlCQUFBLFFBQUEsRUFBQSxVQUFBLFFBQUEsVUFBQSxDQUFBLEdBQUEsV0FBQSxVQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLFlBQUEsVUFBQSxDQUFBLEtBQUE7QUFBQSxTQUFBLHNCQUFBLFFBQUEsRUFBQSxVQUFBLEVBQUEsS0FBQSxRQUFBLFVBQUEsR0FBQSw0QkFBQSxDQUFBLFFBQUEsRUFBQSxVQUFBLFVBQUEsd0JBQUEsQ0FBQSxRQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsVUFBQSxLQUFBO0FBQUEsU0FBQSw2QkFBQSxRQUFBLEVBQUEsVUFBQSxFQUFBLE1BQUEsU0FBQSxVQUFBLENBQUEsR0FBQSxDQUFBLFFBQUEsZUFBQSxTQUFBLG1CQUFBLE1BQUEsK0NBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQSxRQUFBO0FBQUEsU0FBQSx5QkFBQSxRQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsUUFBQSxVQUFBLENBQUEsR0FBQSxJQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBLFFBQUEsRUFBQSxLQUFBLGlCQUFBLFVBQUEsQ0FBQSxRQUFBLGNBQUEsU0FBQSxnREFBQSxVQUFBLENBQUEsS0FBQSxHQUFBLEtBQUEsTUFQdEM7QUFBQSxJQUFBLDJCQUFBLG9CQUFBLE9BQUE7QUFBQSxJQUFBLG9CQUFBLG9CQUFBLE9BQUE7QUFBQSxJQUFBLGtCQUFBLG9CQUFBLE9BQUE7QUFBQSxJQUFBLGdCQUFBLG9CQUFBLE9BQUE7QUFBQSxJQUFBLHVCQUFBLG9CQUFBLE9BQUE7QUFBQSxJQUFBLCtCQUFBLG9CQUFBLE9BQUE7QUFBQSxJQUFBLGVBQUEsb0JBQUEsT0FBQTtBQUFBLElBQUEsb0JBQUEsb0JBQUEsT0FBQTtBQUFBLElBQUEsYUFBQSxvQkFBQSxPQUFBO0FBQUEsSUFBQSxZQUFBLG9CQUFBLE9BQUE7QUFBQSxJQUFBLGVBQUEsb0JBQUEsT0FBQTtBQUFBLElBQUEsZUFBQSxvQkFBQSxPQUFBO0FBQUEsSUFTTSxlQUFlLGdCQUFBLFlBQUEsQ0FHbkIsU0FBQSxnQkFBQSxFQUFjO0VBQUEsSUFBQSxLQUFBO0VBQUEsZUFBQSxPQUFBLGVBQUE7RUFBQSwwQkFBQSxPQUFBLDJCQUFBO0lBQUEsUUFBQTtJQUFBLEtBQUE7RUFBQTtFQUFBLGVBQUEsZ0JBTU4sWUFBTTtJQUNaLHFCQUFBLENBQUEsS0FBSSxFQUFBLDJCQUFBLEVBQStCLG1CQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUVqRSxxQkFBQSxDQUFBLEtBQUksRUFBQSxvQkFBQSxFQUFBLElBQUEsQ0FBSixLQUFJO0lBQ0oscUJBQUEsQ0FBQSxLQUFJLEVBQUEsZ0JBQUEsRUFBQSxJQUFBLENBQUosS0FBSTtJQUNKLHFCQUFBLENBQUEsS0FBSSxFQUFBLHVCQUFBLEVBQUEsSUFBQSxDQUFKLEtBQUk7SUFDQSxxQkFBQSxDQUFBLEtBQUksRUFBQSxlQUFBLEVBQUEsSUFBQSxDQUFKLEtBQUk7RUFDVixDQUFDO0VBQUEsMEJBQUEsT0FBQSxvQkFBQTtJQUFBLFFBQUE7SUFBQSxLQUFBLEVBRXNCLFNBQUEsTUFBQSxFQUFNO01BQzNCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUEscUJBQUEsQ0FBRSxLQUFJLEVBQUEsYUFBQSxDQUFjLENBQUM7TUFDbkQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBQSxxQkFBQSxDQUFFLEtBQUksRUFBQSxZQUFBLENBQWEsQ0FBQztNQUN4RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFBLHFCQUFBLENBQUUsS0FBSSxFQUFBLGVBQUEsQ0FBZ0IsQ0FBQztNQUN2RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFBLHFCQUFBLENBQUUsS0FBSSxFQUFBLGVBQUEsQ0FBZ0IsQ0FBQztNQUN2RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUEscUJBQUEsQ0FBRSxLQUFJLEVBQUEsZUFBQSxDQUFnQixDQUFDO0lBQ3BFO0VBQUM7RUFBQSwwQkFBQSxPQUFBLGtCQUFBO0lBQUEsUUFBQTtJQUFBLEtBQUEsRUFFc0IsU0FBQSxNQUFDLElBQUksRUFBSztNQUM3QixJQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7TUFDakQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO0lBQ2xDO0VBQUM7RUFBQSwwQkFBQSxPQUFBLGdCQUFBO0lBQUEsUUFBQTtJQUFBLEtBQUEsRUFFa0IsU0FBQSxNQUFBLEVBQWU7TUFBQSxJQUFkLEVBQUUsR0FBQSxTQUFBLENBQUEsTUFBQSxRQUFBLFNBQUEsUUFBQSxTQUFBLEdBQUEsU0FBQSxNQUFHLElBQUk7TUFDM0IsSUFBSSxRQUFRLEdBQUcsRUFBRTs7TUFFakI7TUFDQSxJQUFJLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1FBQ25DLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztNQUNwRDtNQUVBLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDO01BQ2pELElBQUksT0FBTyxFQUFFO1FBQ1QsVUFBVSxDQUFDLFlBQU07VUFDYixJQUFJLFVBQVUsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDOztVQUU5QztVQUNBLElBQUksbUJBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksZUFBRyxDQUFDLFVBQVUsRUFBRTtZQUNqRCxVQUFVLElBQUksZUFBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZO1VBQzdDOztVQUVBO1VBQ0EsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxVQUFVO1VBQzVGLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFBRSxHQUFHLEVBQUUsY0FBYztZQUFFLFFBQVEsRUFBRTtVQUFTLENBQUMsQ0FBQztRQUNoRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztNQUNaO0lBQ0o7RUFBQztFQUFBLDBCQUFBLE9BQUEsdUJBQUE7SUFBQSxRQUFBO0lBQUEsS0FBQSxFQUl5QixTQUFBLE1BQUEsRUFBTTtNQUM5QixJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsOEJBQThCLENBQUM7TUFDN0UsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtRQUN4QjtRQUNBLElBQ0ksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUNqRCxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUM1RCxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQ2pELENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLEVBQzlEO1VBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUMsRUFBSztZQUNsQyxJQUFNLEVBQUUsR0FBQSxxQkFBQSxDQUFHLEtBQUksRUFBQSxrQkFBQSxFQUFBLElBQUEsQ0FBSixLQUFJLEVBQW9CLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0QsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO2NBQzFELHFCQUFBLENBQUEsS0FBSSxFQUFBLGdCQUFBLEVBQUEsSUFBQSxDQUFKLEtBQUksRUFBa0IsRUFBRSxFQUFFLENBQUM7WUFDL0I7VUFDSixDQUFDLENBQUM7UUFDTjtNQUNKLENBQUMsQ0FBQztJQUNOO0VBQUM7RUFBQSwwQkFBQSxPQUFBLCtCQUFBO0lBQUEsUUFBQTtJQUFBLEtBQUEsRUFHcUMsU0FBQSxNQUFBLEVBQU07TUFDdEM7TUFDQSxJQUFNLFNBQVMsR0FBRyxrQkFBQSxDQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxtQ0FBbUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxVQUFBLElBQUk7UUFBQSxPQUFJLElBQUksQ0FBQyxVQUFVO01BQUEsRUFBQztNQUNsSCxJQUFNLFdBQVcsR0FBQSxxQkFBQSxDQUFHLEtBQUksRUFBQSxrQkFBQSxFQUFBLElBQUEsQ0FBSixLQUFJLEVBQW9CLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDOztNQUVqRTtNQUNBLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRLEVBQUk7UUFDMUIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUM7TUFDbEQsQ0FBQyxDQUFDOztNQUVGO01BQ0EsSUFBSSxXQUFXLEVBQUU7UUFDYixTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUSxFQUFJO1VBQzFCLElBQU0sTUFBTSxHQUFBLHFCQUFBLENBQUcsS0FBSSxFQUFBLGtCQUFBLEVBQUEsSUFBQSxDQUFKLEtBQUksRUFBb0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7VUFDeEYsSUFBSSxNQUFNLEtBQUssV0FBVyxFQUFFO1lBQ3hCLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO1VBQy9DO1FBQ0osQ0FBQyxDQUFDO01BQ047SUFDRjtFQUFDO0VBQUEsMEJBQUEsT0FBQSxlQUFBO0lBQUEsUUFBQTtJQUFBLEtBQUEsRUFFaUIsU0FBQSxNQUFBLEVBQU07TUFDdEIsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztNQUV6RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFlBQU07UUFDcEMsSUFBSSxjQUFjLEdBQUcsSUFBSTtRQUV6QixRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTyxFQUFJO1VBQ3hCLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztVQUNwRSxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksVUFBVSxFQUFFO1lBQzlCLGNBQWMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztVQUMvQztRQUNKLENBQUMsQ0FBQztRQUVGLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtVQUMzRSxJQUFNLE1BQU0sR0FBQSxxQkFBQSxDQUFHLEtBQUksRUFBQSxrQkFBQSxFQUFBLElBQUEsQ0FBSixLQUFJLEVBQW9CLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7VUFDakUsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWE7VUFDbkMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUM7VUFDOUMsSUFBSSxNQUFNLEtBQUssY0FBYyxFQUFFO1lBQzNCLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO1VBQy9DO1FBQ0osQ0FBQyxDQUFDO01BQ04sQ0FBQyxDQUFDO0lBQ0o7RUFBQztFQUFBLDBCQUFBLE9BQUEsb0JBQUE7SUFBQSxRQUFBO0lBQUEsS0FBQSxFQUlvQixTQUFBLE1BQUMsS0FBSyxFQUFLO01BQ2hDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztNQUN0QixLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7TUFDdkIsSUFBSSxtQkFBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUU7UUFDNUI7TUFDRjtNQUNBLElBQU0sWUFBWSxHQUFHLGVBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWTtNQUVuRCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFFLFNBQVUsQ0FBQztNQUVoRCxJQUFLLE1BQU0sRUFBRztRQUNaLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsR0FBRyxZQUFZLEdBQUcsSUFBSTtRQUV2RCxNQUFNLENBQUMsY0FBYyxDQUFDO1VBQ3BCLEdBQUcsRUFBRSxZQUFZO1VBQ2pCLFFBQVEsRUFBRTtRQUNaLENBQUMsQ0FBQztNQUNKO01BRUEsUUFBUSxDQUNQLGdCQUFnQixDQUFDLG1OQUFtTixDQUFDLENBQ3JPLE9BQU8sQ0FBQyxVQUFBLE9BQU8sRUFBSTtRQUNsQixJQUNFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFDN0MsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQ25DLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFDL0MsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQ3JDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQ3ZDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUNsRCxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQ3BELENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQy9ELENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsSUFDcEQsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsRUFDOUQ7VUFDRDtRQUNGO1FBQ0EsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUMsRUFBSztVQUN2QyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7VUFDbEIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1VBQ25CLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1VBQ3pDLElBQUksUUFBUSxHQUFHLEVBQUU7VUFDakIsSUFBSyxJQUFJLEVBQUc7WUFDVixRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7VUFDekM7VUFDQSxJQUFLLFFBQVEsRUFBRztZQUNkLFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsR0FBRyxZQUFZLEdBQUcsSUFBSTtZQUN6RCxRQUFRLENBQUMsY0FBYyxDQUFDO2NBQ3RCLEdBQUcsRUFBRSxZQUFZO2NBQ2pCLFFBQVEsRUFBRTtZQUNaLENBQUMsQ0FBQztVQUNKO1FBQ0YsQ0FBQyxDQUFDO01BQ0osQ0FBQyxDQUFDO0lBR0o7RUFBQztFQUFBLDBCQUFBLE9BQUEsYUFBQTtJQUFBLFFBQUE7SUFBQSxLQUFBLEVBR2lCLFNBQUEsTUFBQyxDQUFDLEVBQUs7TUFDckIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO01BQ2pDLEtBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztNQUNqQyxLQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7TUFDckMsS0FBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztNQUN4QixxQkFBQSxDQUFBLEtBQUksRUFBQSxvQkFBQSxFQUFBLElBQUEsQ0FBSixLQUFJLEVBQXNCLENBQUM7TUFDM0IscUJBQUEsQ0FBQSxLQUFJLEVBQUEsK0JBQUEsRUFBQSxJQUFBLENBQUosS0FBSTs7TUFFSjtNQUNBLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDdEIsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDaEQscUJBQUEsQ0FBQSxLQUFJLEVBQUEsZ0JBQUEsRUFBQSxJQUFBLENBQUosS0FBSSxFQUFrQixFQUFFO01BQzVCO0lBQ0o7RUFBQztFQUFBLDBCQUFBLE9BQUEsWUFBQTtJQUFBLFFBQUE7SUFBQSxLQUFBLEVBR2MsU0FBQSxNQUFDLENBQUMsRUFBSztNQUNwQixxQkFBQSxDQUFBLEtBQUksRUFBQSxvQkFBQSxFQUFBLElBQUEsQ0FBSixLQUFJLEVBQXNCLENBQUM7SUFDN0I7RUFBQztFQUFBLDBCQUFBLE9BQUEsZUFBQTtJQUFBLFFBQUE7SUFBQSxLQUFBLEVBR2lCLFNBQUEsTUFBQSxFQUFNO01BQ3RCLElBQUksbUJBQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUEscUJBQUEsQ0FBSSxLQUFJLEVBQUEsMkJBQUEsQ0FBNEIsRUFBRTtRQUN0RSxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQixLQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFckMscUJBQUEsQ0FBQSxLQUFJLEVBQUEsMkJBQUEsRUFBK0IsbUJBQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO01BQ25FO0lBRUY7RUFBQztFQUFBLDBCQUFBLE9BQUEsZUFBQTtJQUFBLFFBQUE7SUFBQSxLQUFBLEVBRWlCLFNBQUEsTUFBQSxFQUFNO01BQ3RCLEtBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7TUFDMUIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QjtFQUFDO0VBeE5DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxrQkFBTSxDQUFDLENBQUM7RUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtCQUFNLENBQUMsQ0FBQztFQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksZ0JBQUksQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUF3TkYsWUFBWTtBQUViLElBQU0sWUFBWSxHQUFHLElBQUksZUFBZSxDQUFDLENBQUM7QUFDMUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gaGVhZGVyLmpzXG5pbXBvcnQgRE9NIGZyb20gXCIuLi9VdGlscy9ET01cIjtcbmltcG9ydCBVdGlsaXR5IGZyb20gXCIuLi9VdGlscy9VdGlsaXR5XCI7XG5pbXBvcnQgSGVscGVycyBmcm9tIFwiLi4vVXRpbHMvSGVscGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIge1xuICAgICNsYXN0U2Nyb2xCYXJQb3NpdGlvbiA9IDA7XG5cbiAgICBnZXRIZWFkZXJIZWlnaHQgPSAoKSA9PiB7XG5cbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSA0ODApIHtcbiAgICAgICAgcmV0dXJuIDQzO1xuICAgICAgfVxuICAgICAgbGV0IHRvdGFsSGVpZ2h0ID0gMDtcblxuICAgICAgaWYgKERPTS5oZWFkZXIgJiYgKERPTS5oZWFkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCd0cmFuc3BhcmVudC1oZWFkZXInKSB8fCBET00uaGVhZGVyLmNsYXNzTGlzdC5jb250YWlucygnZnVsbF9zY3JlZW4taGVhZGVyJykpICYmIERPTS5oZWFkZXIuaGFzQXR0cmlidXRlKCdkYXRhLWhlaWdodCcpKSB7XG4gICAgICAgICAgdG90YWxIZWlnaHQgKz0gcGFyc2VJbnQoRE9NLmhlYWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtaGVpZ2h0JyksIDEwKSArIDE7XG4gICAgICB9IGVsc2UgaWYgKERPTS5oZWFkZXIgJiYgKERPTS5oZWFkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZWRpdW0taGVhZGVyJykgICYmIERPTS5oZWFkZXIuaGFzQXR0cmlidXRlKCdkYXRhLWhlaWdodCcpKSApe1xuICAgICAgICAgIGNvbnN0IHNpdGVIZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2l0ZS1oZWFkZXInKTtcbiAgICAgICAgICB0b3RhbEhlaWdodCArPSBzaXRlSGVhZGVyLm9mZnNldEhlaWdodCAvIDIgLSAzMjtcbiAgICAgIH0gZWxzZSBpZiAoRE9NLmhlYWRlciAmJiAoRE9NLmhlYWRlci5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbnRlci1oZWFkZXInKSAgJiYgRE9NLmhlYWRlci5oYXNBdHRyaWJ1dGUoJ2RhdGEtaGVpZ2h0JykpICl7XG4gICAgICAgICAgY29uc3Qgc2l0ZUhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaXRlLWhlYWRlcicpO1xuICAgICAgICAgIC8vIHRvdGFsSGVpZ2h0ICs9IHNpdGVIZWFkZXIub2Zmc2V0SGVpZ2h0IC0gNjA7XG4gICAgICAgICAgdG90YWxIZWlnaHQgKz0gc2l0ZUhlYWRlci5vZmZzZXRIZWlnaHQ7XG4gICAgICB9IGVsc2UgaWYgKERPTS5oZWFkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaW5pbWFsLWhlYWRlcicpKSB7XG4gICAgICAgICAgY29uc3Qgc2l0ZUhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaXRlLWhlYWRlcicpO1xuICAgICAgICAgIGNvbnN0IHN0aWNreUhlYWRlckhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vY2VhbndwLXN0aWNreS1oZWFkZXItaG9sZGVyJyk7XG4gICAgICAgICAgaWYgKHN0aWNreUhlYWRlckhvbGRlciAmJiBzdGlja3lIZWFkZXJIb2xkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1zdGlja3knKSkge1xuICAgICAgICAgICAgICB0b3RhbEhlaWdodCArPSBwYXJzZUludChET00uaGVhZGVyLmdldEF0dHJpYnV0ZSgnZGF0YS1oZWlnaHQnKSwgMTApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRvdGFsSGVpZ2h0ICs9IHNpdGVIZWFkZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoRE9NLmhlYWRlci5jbGFzc0xpc3QuY29udGFpbnMoJ3ZlcnRpY2FsLWhlYWRlcicpKSB7XG4gICAgICAgIHRvdGFsSGVpZ2h0ID0gMDtcbiAgICAgIH0gZWxzZSBpZiAoRE9NLmhlYWRlcikgeyAvLyBGYWxsYmFjayB0byBvZmZzZXRIZWlnaHQgaWYgY29uZGl0aW9uIGlzbid0IG1ldFxuICAgICAgICAgIHRvdGFsSGVpZ2h0ICs9IERPTS5oZWFkZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgfVxuXG5cbiAgICAgIC8vIEdldCBXUCBBZG1pbmJhciBoZWlnaHRcbiAgICAgIGNvbnN0IGFkbWluQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dwYWRtaW5iYXInKTtcbiAgICAgIGlmIChhZG1pbkJhcikge1xuICAgICAgICAgIHRvdGFsSGVpZ2h0ICs9IGFkbWluQmFyLm9mZnNldEhlaWdodDtcbiAgICAgIH1cblxuICAgICAgLy8gY29uc29sZS5sb2coXCJTdGlja3kgSGVhZGVyIEhlaWdodDpcIiwgdG90YWxIZWlnaHQpO1xuICAgICAgcmV0dXJuIHRvdGFsSGVpZ2h0O1xuICB9O1xuXG5cbiAgICBzdGlja3kgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLiNub1N0aWNreSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShET00uaGVhZGVyV3JhcHBlciB8fCBET00uc2l0ZUhlYWRlciB8fCBET00uaGVhZGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IFV0aWxpdHkuZWxlbU9mZnNldChET00uaGVhZGVyV3JhcHBlcikudG9wIC0gSGVhZGVyLmdldE9mZnNldCgpO1xuICAgICAgICBsZXQgc2xpZGVTdGlja3lDdXJyZW50UG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG5cbiAgICAgICAgLy8gSWYgc2xpZGUgZWZmZWN0XG4gICAgICAgIGlmIChIZWxwZXJzLnNsaWRlU3RpY2t5RWZmZWN0KCkgJiYgIURPTS5zaXRlSGVhZGVyPy5jbGFzc0xpc3QuY29udGFpbnMoXCJ2ZXJ0aWNhbC1oZWFkZXJcIikpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbiArIERPTS5oZWFkZXJXcmFwcGVyLm9mZnNldEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdoZW4gc2Nyb2xsaW5nXG4gICAgICAgIGlmIChVdGlsaXR5LnNjcm9sbEJhclRvcFBvc2l0aW9uKCkgIT09IDAgJiYgVXRpbGl0eS5zY3JvbGxCYXJUb3BQb3NpdGlvbigpID49IGN1cnJlbnRQb3NpdGlvbikge1xuICAgICAgICAgICAgRE9NLmhlYWRlcldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImlzLXN0aWNreVwiKTtcblxuICAgICAgICAgICAgRE9NLmhlYWRlci5zdHlsZS50b3AgPSBIZWFkZXIuZ2V0T2Zmc2V0KCkgKyBcInB4XCI7XG4gICAgICAgICAgICBET00uaGVhZGVyLnN0eWxlLndpZHRoID0gRE9NLmhlYWRlcldyYXBwZXIub2Zmc2V0V2lkdGggKyBcInB4XCI7XG5cbiAgICAgICAgICAgIC8vIElmIHNsaWRlIGVmZmVjdFxuICAgICAgICAgICAgaWYgKEhlbHBlcnMuc2xpZGVTdGlja3lFZmZlY3QoKSAmJiAhRE9NLnNpdGVIZWFkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmVydGljYWwtaGVhZGVyXCIpKSB7XG4gICAgICAgICAgICAgICAgRE9NLnNpdGVIZWFkZXIuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJZiBpcyBub3Qgc2xpZGUgZWZmZWN0XG4gICAgICAgICAgICBpZiAoIUhlbHBlcnMuc2xpZGVTdGlja3lFZmZlY3QoKSkge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBzdGlja3kgd3JhcCBjbGFzc1xuICAgICAgICAgICAgICAgIERPTS5oZWFkZXJXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1zdGlja3lcIik7XG5cbiAgICAgICAgICAgICAgICBET00uaGVhZGVyLnN0eWxlLnRvcCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgRE9NLmhlYWRlci5zdHlsZS53aWR0aCA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBzbGlkZSBlZmZlY3RcbiAgICAgICAgaWYgKEhlbHBlcnMuc2xpZGVTdGlja3lFZmZlY3QoKSAmJiAhRE9NLnNpdGVIZWFkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmVydGljYWwtaGVhZGVyXCIpKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgc3RpY2t5IGNsYXNzIHdoZW4gd2luZG93IHRvcFxuICAgICAgICAgICAgaWYgKFV0aWxpdHkuc2Nyb2xsQmFyVG9wUG9zaXRpb24oKSA8PSBzbGlkZVN0aWNreUN1cnJlbnRQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBzdGlja3kgd3JhcCBjbGFzc1xuICAgICAgICAgICAgICAgIERPTS5oZWFkZXJXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1zdGlja3lcIik7XG5cbiAgICAgICAgICAgICAgICBET00uaGVhZGVyLnN0eWxlLnRvcCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgRE9NLmhlYWRlci5zdHlsZS53aWR0aCA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgc2xpZGUgZWZmZWN0IGNsYXNzXG4gICAgICAgICAgICAgICAgRE9NLnNpdGVIZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdXBkYXRlU3RpY2t5ID0gKCkgPT4ge1xuICAgICAgICAvLyBSZXR1cm4gaWYgaXMgdmVydGljYWwgaGVhZGVyIHN0eWxlXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDk2MCAmJiBET00uc2l0ZUhlYWRlcj8uY2xhc3NMaXN0LmNvbnRhaW5zKFwidmVydGljYWwtaGVhZGVyXCIpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIURPTS5oZWFkZXJXcmFwcGVyPy5jbGFzc0xpc3QuY29udGFpbnMoXCJpcy1zdGlja3lcIikgJiYgISFET00uaGVhZGVyKSB7XG4gICAgICAgICAgICBpZiAoIERPTS5oZWFkZXJXcmFwcGVyICkge1xuICAgICAgICAgICAgICAgIERPTS5oZWFkZXJXcmFwcGVyLnN0eWxlLmhlaWdodCA9IERPTS5oZWFkZXIub2Zmc2V0SGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFV0aWxpdHkuc2Nyb2xsQmFyVG9wUG9zaXRpb24oKSAhPT0gMCkge1xuICAgICAgICAgICAgaWYgKCEhRE9NLmhlYWRlciAmJiAhIURPTS5oZWFkZXJXcmFwcGVyKSB7XG4gICAgICAgICAgICAgICAgRE9NLmhlYWRlci5zdHlsZS50b3AgPSBIZWFkZXIuZ2V0T2Zmc2V0KCkgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgRE9NLmhlYWRlci5zdHlsZS53aWR0aCA9IERPTS5oZWFkZXJXcmFwcGVyLm9mZnNldFdpZHRoICsgXCJweFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGFkZFZlcnRpY2FsSGVhZGVyU3RpY2t5ID0gKCkgPT4ge1xuICAgICAgICAvLyBSZXR1cm4gaWYgaXMgbm90IHZlcnRpY2FsIGhlYWRlciBzdHlsZSBhbmQgdHJhbnNwYXJlbnRcbiAgICAgICAgaWYgKCFET00udmVydGljYWxIZWFkZXI/LmNsYXNzTGlzdC5jb250YWlucyhcImlzLXRyYW5zcGFyZW50XCIpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gaWYgbm8gaGVhZGVyIHdyYXBwZXJcbiAgICAgICAgaWYgKCFET00uaGVhZGVyV3JhcHBlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IFV0aWxpdHkuZWxlbU9mZnNldChET00uaGVhZGVyV3JhcHBlcikudG9wO1xuXG4gICAgICAgIC8vIFdoZW4gc2Nyb2xsaW5nXG4gICAgICAgIGlmIChVdGlsaXR5LnNjcm9sbEJhclRvcFBvc2l0aW9uKCkgIT09IDAgJiYgVXRpbGl0eS5zY3JvbGxCYXJUb3BQb3NpdGlvbigpID49IGN1cnJlbnRQb3NpdGlvbikge1xuICAgICAgICAgICAgRE9NLmhlYWRlcldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImlzLXN0aWNreVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIERPTS5oZWFkZXJXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1zdGlja3lcIik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc3RpY2t5RWZmZWN0cyA9ICgpID0+IHtcbiAgICAgICAgLy8gUmV0dXJuIGlmIGlzIHZlcnRpY2FsIGhlYWRlciBzdHlsZVxuICAgICAgICBpZiAoRE9NLnNpdGVIZWFkZXI/LmNsYXNzTGlzdC5jb250YWlucyhcInZlcnRpY2FsLWhlYWRlclwiKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmV0dXJuIGlmIG5vIGhlYWRlciB3cmFwcGVyXG4gICAgICAgIGlmICghRE9NLmhlYWRlcldyYXBwZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHNob3cgdXAgZWZmZWN0XG4gICAgICAgIGlmIChIZWxwZXJzLnVwU3RpY2t5RWZmZWN0KCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IFV0aWxpdHkuZWxlbU9mZnNldChET00uaGVhZGVyV3JhcHBlcikudG9wICsgRE9NLmhlYWRlcldyYXBwZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsQmFyVG9wUG9zaXRpb24gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuXG4gICAgICAgICAgICBpZiAoc2Nyb2xsQmFyVG9wUG9zaXRpb24gPj0gdGhpcy4jbGFzdFNjcm9sQmFyUG9zaXRpb24gJiYgc2Nyb2xsQmFyVG9wUG9zaXRpb24gPj0gY3VycmVudFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgRE9NLnNpdGVIZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcImhlYWRlci1kb3duXCIpO1xuICAgICAgICAgICAgICAgIERPTS5zaXRlSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJoZWFkZXItdXBcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIERPTS5zaXRlSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoZWFkZXItdXBcIik7XG4gICAgICAgICAgICAgICAgRE9NLnNpdGVIZWFkZXIuY2xhc3NMaXN0LmFkZChcImhlYWRlci1kb3duXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLiNsYXN0U2Nyb2xCYXJQb3NpdGlvbiA9IHNjcm9sbEJhclRvcFBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNyZWF0ZVN0aWNreVdyYXBwZXIgPSAoKSA9PiB7XG4gICAgICAgIC8vIENyZWF0ZSBoZWFkZXIgc3RpY2t5IHdyYXBwZXIgZWxlbWVudFxuICAgICAgICBET00uaGVhZGVyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIERPTS5oZWFkZXJXcmFwcGVyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic2l0ZS1oZWFkZXItc3RpY2t5LXdyYXBwZXJcIik7XG4gICAgICAgIERPTS5oZWFkZXJXcmFwcGVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwib2NlYW53cC1zdGlja3ktaGVhZGVyLWhvbGRlclwiKTtcblxuICAgICAgICAvLyBXcmFwIGhlYWRlciBzdGlja3kgd3JhcHBlciBhcm91bmQgaGVhZGVyXG4gICAgICAgIGlmICghIURPTS5oZWFkZXIpIHtcbiAgICAgICAgICAgIERPTS5oZWFkZXJXcmFwcGVyPy5vY2VhbldyYXBBbGwoRE9NLmhlYWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgaGVhZGVyIHN0aWNreSB3cmFwcGVyIGhlaWdodFxuICAgICAgICBpZiAoIURPTS5zaXRlSGVhZGVyPy5jbGFzc0xpc3QuY29udGFpbnMoXCJ2ZXJ0aWNhbC1oZWFkZXJcIikpIHtcbiAgICAgICAgICAgIGlmICghIURPTS5oZWFkZXJXcmFwcGVyICYmICEhRE9NLmhlYWRlcikge1xuICAgICAgICAgICAgICAgIERPTS5oZWFkZXJXcmFwcGVyLnN0eWxlLmhlaWdodCA9IERPTS5oZWFkZXIub2Zmc2V0SGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHN0YXRpYyBnZXRPZmZzZXQgPSAoKSA9PiB7XG4gICAgICAgIGxldCBvZmZzZXQgPSAwO1xuXG4gICAgICAgIC8vIEFkZCBXUCBBZG1pbmJhciBvZmZzZXRcbiAgICAgICAgaWYgKFV0aWxpdHkuaXNXUEFkbWluYmFyVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICBpZiAoISFET00uV1BBZG1pbmJhcikge1xuICAgICAgICAgICAgICAgIG9mZnNldCA9IG9mZnNldCArIERPTS5XUEFkbWluYmFyLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9mZnNldCB0b3BiYXIgc3RpY2t5XG4gICAgICAgIGlmIChIZWxwZXJzLmlzVG9wYmFyU3RpY2t5RW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBpZiAoISFET00udG9wYmFyKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0ICsgRE9NLnRvcGJhci5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xuICAgIH07XG5cbiAgICAjbm9TdGlja3kgPSAoKSA9PiB7XG4gICAgICAgIGlmIChET00uc2l0ZUhlYWRlcj8uY2xhc3NMaXN0LmNvbnRhaW5zKFwidmVydGljYWwtaGVhZGVyXCIpKSB7XG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gOTYwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFET00uaGVhZGVyV3JhcHBlciB8fCBIZWxwZXJzLmlzTW9iaWxlU3RpY2t5RGlzYWJsZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhRE9NLmhlYWRlcldyYXBwZXIgfHwgSGVscGVycy5pc01vYmlsZVN0aWNreURpc2FibGVkKCkgfHwgIURPTS5zaXRlSGVhZGVyPy5jbGFzc0xpc3QuY29udGFpbnMoXCJmaXhlZC1zY3JvbGxcIik7XG4gICAgfTtcbn1cbiIsIi8vIGxvZ28uanNcbmltcG9ydCBET00gZnJvbSBcIi4uL1V0aWxzL0RPTVwiO1xuaW1wb3J0IEhlbHBlcnMgZnJvbSBcIi4uL1V0aWxzL0hlbHBlcnNcIjtcbmltcG9ydCBVdGlsaXR5IGZyb20gXCIuLi9VdGlscy9VdGlsaXR5XCI7XG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuL0hlYWRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dvIHtcbiAgICAjbG9nbztcbiAgICAjY3VzdG9tTG9nbztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLiNsb2dvID0gRE9NLmxvZ287XG4gICAgICAgIHRoaXMuI2N1c3RvbUxvZ28gPSBET00uY3VzdG9tTG9nbztcbiAgICB9XG5cbiAgICBzZXRNYXhIZWlnaHQgPSAoKSA9PiB7XG4gICAgICAgIC8vIElmIGhlYWRlciBzdHlsZSBpcyBjZW50ZXJcbiAgICAgICAgaWYgKERPTS5zaXRlSGVhZGVyPy5jbGFzc0xpc3QuY29udGFpbnMoXCJjZW50ZXItaGVhZGVyXCIpKSB7XG4gICAgICAgICAgICB0aGlzLiNsb2dvID0gRE9NLm1pZGRsZUxvZ287XG4gICAgICAgICAgICB0aGlzLiNjdXN0b21Mb2dvID0gRE9NLmN1c3RvbU1pZGRsZUxvZ287XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gaWYgbm90IHNocmluayBzdHlsZSBhbmQgb24gc29tZSBoZWFkZXIgc3R5bGVzXG4gICAgICAgIGlmICh0aGlzLiNyZXR1cm5PblNvbWVIZWFkZXJTdHlsZXMoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgbW9iaWxlIGxvZ28gZXhpc3RzXG4gICAgICAgIGlmIChET00ubG9nb1dyYXBwZXI/LmNsYXNzTGlzdC5jb250YWlucyhcImhhcy1yZXNwb25zaXZlLWxvZ29cIikgJiYgVXRpbGl0eS5lbGVtVmlzaWJsZShET00ubW9iaWxlTG9nbykpIHtcbiAgICAgICAgICAgIHRoaXMuI2N1c3RvbUxvZ28gPSBET00ubW9iaWxlTG9nbztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBsb2dvIHBvc2l0aW9uXG4gICAgICAgIGxldCBpbml0aWFsTG9nb0hlaWdodDtcbiAgICAgICAgaWYgKHRoaXMuI2N1c3RvbUxvZ28pIHtcbiAgICAgICAgICAgIGluaXRpYWxMb2dvSGVpZ2h0ID0gdGhpcy4jY3VzdG9tTG9nby5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gVXRpbGl0eS5lbGVtT2Zmc2V0KERPTS5oZWFkZXJXcmFwcGVyKS50b3AgLSBIZWFkZXIuZ2V0T2Zmc2V0KCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gV2hlbiBzY3JvbGxpbmdcbiAgICAgICAgICAgIGlmIChVdGlsaXR5LnNjcm9sbEJhclRvcFBvc2l0aW9uKCkgIT09IDAgJiYgVXRpbGl0eS5zY3JvbGxCYXJUb3BQb3NpdGlvbigpID49IGN1cnJlbnRQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy4jbG9nbykuZm9yRWFjaCgoZWxlbSkgPT4gKGVsZW0uc3R5bGUubWF4SGVpZ2h0ID0gSGVscGVycy5nZXRTaHJpbmtMb2dvSGVpZ2h0KCkgKyBcInB4XCIpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoISFpbml0aWFsTG9nb0hlaWdodCkge1xuICAgICAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy4jbG9nbykuZm9yRWFjaCgoZWxlbSkgPT4gKGVsZW0uc3R5bGUubWF4SGVpZ2h0ID0gaW5pdGlhbExvZ29IZWlnaHQgKyBcInB4XCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICNyZXR1cm5PblNvbWVIZWFkZXJTdHlsZXMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhSGVscGVycy5zaHJpbmtTdGlja3lTdHlsZSgpIHx8XG4gICAgICAgICAgICAhdGhpcy4jbG9nbyB8fFxuICAgICAgICAgICAgIURPTS5oZWFkZXJXcmFwcGVyIHx8XG4gICAgICAgICAgICBIZWxwZXJzLmlzTW9iaWxlU3RpY2t5RGlzYWJsZWQoKSB8fFxuICAgICAgICAgICAgSGVscGVycy5tYW51YWxTdGlja3koKSB8fFxuICAgICAgICAgICAgIURPTS5zaXRlSGVhZGVyPy5jbGFzc0xpc3QuY29udGFpbnMoXCJmaXhlZC1zY3JvbGxcIikgfHxcbiAgICAgICAgICAgIERPTS5zaXRlSGVhZGVyPy5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b3AtaGVhZGVyXCIpIHx8XG4gICAgICAgICAgICBET00uc2l0ZUhlYWRlcj8uY2xhc3NMaXN0LmNvbnRhaW5zKFwidmVydGljYWwtaGVhZGVyXCIpIHx8XG4gICAgICAgICAgICAoRE9NLnNpdGVIZWFkZXI/LmNsYXNzTGlzdC5jb250YWlucyhcIm1lZGl1bS1oZWFkZXJcIikgJiYgRE9NLmJvdHRvbUhlYWRlci5jbGFzc0xpc3QuY29udGFpbnMoXCJmaXhlZC1zY3JvbGxcIikpXG4gICAgICAgICk7XG4gICAgfTtcbn1cbiIsIi8vIHRvcGJhci5qc1xuaW1wb3J0IERPTSBmcm9tIFwiLi4vVXRpbHMvRE9NXCI7XG5pbXBvcnQgVXRpbGl0eSBmcm9tIFwiLi4vVXRpbHMvVXRpbGl0eVwiO1xuaW1wb3J0IEhlbHBlcnMgZnJvbSBcIi4uL1V0aWxzL0hlbHBlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9wYmFyIHtcbiAgICBzdGlja3kgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLiNub1N0aWNreSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gMDtcblxuICAgICAgICBpZiAoISFET00udG9wYmFyV3JhcHBlcikge1xuICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uID0gVXRpbGl0eS5lbGVtT2Zmc2V0KERPTS50b3BiYXJXcmFwcGVyKS50b3AgLSB0aGlzLmdldE9mZnNldCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2hlbiBzY3JvbGxpbmdcbiAgICAgICAgaWYgKFV0aWxpdHkuc2Nyb2xsQmFyVG9wUG9zaXRpb24oKSAhPT0gMCAmJiBVdGlsaXR5LnNjcm9sbEJhclRvcFBvc2l0aW9uKCkgPj0gY3VycmVudFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBET00udG9wYmFyV3JhcHBlcj8uY2xhc3NMaXN0LmFkZChcImlzLXN0aWNreVwiKTtcblxuICAgICAgICAgICAgRE9NLnRvcGJhci5zdHlsZS50b3AgPSB0aGlzLmdldE9mZnNldCgpICsgXCJweFwiO1xuICAgICAgICAgICAgRE9NLnRvcGJhci5zdHlsZS53aWR0aCA9IERPTS50b3BiYXJXcmFwcGVyPy5vZmZzZXRXaWR0aCArIFwicHhcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIERPTS50b3BiYXJXcmFwcGVyPy5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtc3RpY2t5XCIpO1xuXG4gICAgICAgICAgICBET00udG9wYmFyLnN0eWxlLnRvcCA9IFwiXCI7XG4gICAgICAgICAgICBET00udG9wYmFyLnN0eWxlLndpZHRoID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB1cGRhdGVTdGlja3kgPSAoKSA9PiB7XG4gICAgICAgIGlmICghRE9NLnRvcGJhciB8fCAhRE9NLnRvcGJhcldyYXBwZXIgfHwgIUhlbHBlcnMuaXNUb3BiYXJTdGlja3lFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghRE9NLnRvcGJhcldyYXBwZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaXMtc3RpY2t5XCIpKSB7XG4gICAgICAgICAgICBET00udG9wYmFyV3JhcHBlci5zdHlsZS5oZWlnaHQgPSBET00udG9wYmFyLm9mZnNldEhlaWdodCArIFwicHhcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChVdGlsaXR5LnNjcm9sbEJhclRvcFBvc2l0aW9uKCkgIT09IDApIHtcbiAgICAgICAgICAgIERPTS50b3BiYXIuc3R5bGUudG9wID0gdGhpcy5nZXRPZmZzZXQoKSArIFwicHhcIjtcbiAgICAgICAgICAgIERPTS50b3BiYXIuc3R5bGUud2lkdGggPSBET00udG9wYmFyV3JhcHBlcj8ub2Zmc2V0V2lkdGggKyBcInB4XCI7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY3JlYXRlU3RpY2t5V3JhcHBlciA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFIZWxwZXJzLmlzVG9wYmFyU3RpY2t5RW5hYmxlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgdG9wYmFyIHN0aWNreSB3cmFwcGVyIGVsZW1lbnRcbiAgICAgICAgRE9NLnRvcGJhcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBET00udG9wYmFyV3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInRvcC1iYXItc3RpY2t5LXdyYXBwZXJcIik7XG4gICAgICAgIERPTS50b3BiYXJXcmFwcGVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwib2NlYW53cC1zdGlja3ktdG9wLWJhci1ob2xkZXJcIik7XG5cbiAgICAgICAgLy8gV3JhcCB0b3BiYXIgc3RpY2t5IHdyYXBwZXIgYXJvdW5kIHRvcGJhclxuICAgICAgICBpZiAoISFET00udG9wYmFyKSB7XG4gICAgICAgICAgICBET00udG9wYmFyV3JhcHBlcj8ub2NlYW5XcmFwQWxsKERPTS50b3BiYXIpO1xuXG4gICAgICAgICAgICAvLyBTZXQgdG9wYmFyIHN0aWNreSB3cmFwcGVyIGhlaWdodFxuICAgICAgICAgICAgRE9NLnRvcGJhcldyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gRE9NLnRvcGJhci5vZmZzZXRIZWlnaHQgKyBcInB4XCI7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZ2V0T2Zmc2V0ID0gKCkgPT4ge1xuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcblxuICAgICAgICAvLyBBZGQgV1AgQWRtaW5iYXIgb2Zmc2V0XG4gICAgICAgIGlmIChVdGlsaXR5LmlzV1BBZG1pbmJhclZpc2libGUoKSkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0ICsgRE9NLldQQWRtaW5iYXI/Lm9mZnNldEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvZmZzZXQ7XG4gICAgfTtcblxuICAgICNub1N0aWNreSA9ICgpID0+ICFIZWxwZXJzLmlzVG9wYmFyU3RpY2t5RW5hYmxlZCgpIHx8ICFET00udG9wYmFyIHx8IEhlbHBlcnMuaXNNb2JpbGVTdGlja3lEaXNhYmxlZCgpO1xufVxuIiwiLy9kb20uanNcbmltcG9ydCBIZWxwZXJzIGZyb20gXCIuL0hlbHBlcnNcIjtcblxuY29uc3QgRE9NID0ge1xuICAgIFdQQWRtaW5iYXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd3BhZG1pbmJhclwiKSxcbiAgICB0b3BiYXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9wLWJhci13cmFwXCIpLFxuICAgIHNpdGVIZWFkZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2l0ZS1oZWFkZXJcIiksXG4gICAgdmVydGljYWxIZWFkZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2l0ZS1oZWFkZXIudmVydGljYWwtaGVhZGVyXCIpLFxuICAgIGJvdHRvbUhlYWRlcjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib3R0b20taGVhZGVyLXdyYXBcIiksXG4gICAgbG9nb1dyYXBwZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2l0ZS1sb2dvXCIpLFxuICAgIGxvZ286IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjc2l0ZS1sb2dvIGltZ1wiKSxcbiAgICBjdXN0b21Mb2dvOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NpdGUtbG9nbyAuY3VzdG9tLWxvZ29cIiksXG4gICAgbWlkZGxlTG9nbzogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5taWRkbGUtc2l0ZS1sb2dvIGltZ1wiKSxcbiAgICBjdXN0b21NaWRkbGVMb2dvOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1pZGRsZS1zaXRlLWxvZ28gLmN1c3RvbS1sb2dvXCIpLFxuICAgIG1vYmlsZUxvZ286IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2l0ZS1sb2dvIC5yZXNwb25zaXZlLWxvZ29cIiksXG59O1xuXG5ET00uZ2V0SGVhZGVyID0gKCkgPT4ge1xuICAgIGxldCBoZWFkZXJDbGFzcztcblxuICAgIC8vIElmIG1hbnVhbCBzdGlja3lcbiAgICBpZiAoSGVscGVycy5tYW51YWxTdGlja3koKSkge1xuICAgICAgICBoZWFkZXJDbGFzcyA9IFwiLm93cC1zdGlja3lcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBoZWFkZXJDbGFzcyA9IFwiI3NpdGUtaGVhZGVyXCI7XG4gICAgfVxuXG4gICAgLy8gSWYgdG9wIGhlYWRlciBzdHlsZVxuICAgIGlmIChET00uc2l0ZUhlYWRlcj8uY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9wLWhlYWRlclwiKSkge1xuICAgICAgICBoZWFkZXJDbGFzcyA9IFwiI3NpdGUtaGVhZGVyIC5oZWFkZXItdG9wXCI7XG4gICAgfVxuXG4gICAgLy8gTWVkaXVtIGhlYWRlciBzdHlsZVxuICAgIGlmIChET00uc2l0ZUhlYWRlcj8uY2xhc3NMaXN0LmNvbnRhaW5zKFwibWVkaXVtLWhlYWRlclwiKSAmJiBET00uYm90dG9tSGVhZGVyPy5jbGFzc0xpc3QuY29udGFpbnMoXCJmaXhlZC1zY3JvbGxcIikpIHtcbiAgICAgICAgaGVhZGVyQ2xhc3MgPSBcIi5ib3R0b20taGVhZGVyLXdyYXBcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoZWFkZXJDbGFzcyk7XG59O1xuXG5ET00uaGVhZGVyID0gRE9NLmdldEhlYWRlcigpO1xuXG5leHBvcnQgZGVmYXVsdCBET007XG4iLCIvL2RvbW1ldGhvZHMuanNcbmV4cG9ydCBkZWZhdWx0ICgoKSA9PiB7XG4gICAgLy8gV3JhcCBhbiBIVE1MRWxlbWVudCBhcm91bmQgZWFjaCBlbGVtZW50IGluIGFuIEhUTUxFbGVtZW50IGFycmF5LlxuICAgIEhUTUxFbGVtZW50LnByb3RvdHlwZS5vY2VhbldyYXAgPSBmdW5jdGlvbiAoZWxtcykge1xuICAgICAgICAvLyBDb252ZXJ0IGBlbG1zYCB0byBhbiBhcnJheSwgaWYgbmVjZXNzYXJ5LlxuICAgICAgICBpZiAoIWVsbXMubGVuZ3RoKSBlbG1zID0gW2VsbXNdO1xuXG4gICAgICAgIC8vIExvb3BzIGJhY2t3YXJkcyB0byBwcmV2ZW50IGhhdmluZyB0byBjbG9uZSB0aGUgd3JhcHBlciBvbiB0aGVcbiAgICAgICAgLy8gZmlyc3QgZWxlbWVudCAoc2VlIGBjaGlsZGAgYmVsb3cpLlxuICAgICAgICBmb3IgKGxldCBpID0gZWxtcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBpID4gMCA/IHRoaXMuY2xvbmVOb2RlKHRydWUpIDogdGhpcztcbiAgICAgICAgICAgIGNvbnN0IGVsID0gZWxtc1tpXTtcblxuICAgICAgICAgICAgLy8gQ2FjaGUgdGhlIGN1cnJlbnQgcGFyZW50IGFuZCBzaWJsaW5nLlxuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gZWwucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGNvbnN0IHNpYmxpbmcgPSBlbC5uZXh0U2libGluZztcblxuICAgICAgICAgICAgLy8gV3JhcCB0aGUgZWxlbWVudCAoaXMgYXV0b21hdGljYWxseSByZW1vdmVkIGZyb20gaXRzIGN1cnJlbnRcbiAgICAgICAgICAgIC8vIHBhcmVudCkuXG4gICAgICAgICAgICBjaGlsZC5hcHBlbmRDaGlsZChlbCk7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBlbGVtZW50IGhhZCBhIHNpYmxpbmcsIGluc2VydCB0aGUgd3JhcHBlciBiZWZvcmVcbiAgICAgICAgICAgIC8vIHRoZSBzaWJsaW5nIHRvIG1haW50YWluIHRoZSBIVE1MIHN0cnVjdHVyZTsgb3RoZXJ3aXNlLCBqdXN0XG4gICAgICAgICAgICAvLyBhcHBlbmQgaXQgdG8gdGhlIHBhcmVudC5cbiAgICAgICAgICAgIGlmIChzaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgc2libGluZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gV3JhcCBhbiBIVE1MRWxlbWVudCBhcm91bmQgYW5vdGhlciBIVE1MRWxlbWVudCBvciBhbiBhcnJheSBvZiB0aGVtLlxuICAgIEhUTUxFbGVtZW50LnByb3RvdHlwZS5vY2VhbldyYXBBbGwgPSBmdW5jdGlvbiAoZWxtcykge1xuICAgICAgICBjb25zdCBlbCA9ICEhZWxtcyAmJiBlbG1zLmxlbmd0aCA/IGVsbXNbMF0gOiBlbG1zO1xuXG4gICAgICAgIC8vIENhY2hlIHRoZSBjdXJyZW50IHBhcmVudCBhbmQgc2libGluZyBvZiB0aGUgZmlyc3QgZWxlbWVudC5cbiAgICAgICAgY29uc3QgcGFyZW50ID0gZWwucGFyZW50Tm9kZTtcbiAgICAgICAgY29uc3Qgc2libGluZyA9IGVsLm5leHRTaWJsaW5nO1xuXG4gICAgICAgIC8vIFdyYXAgdGhlIGZpcnN0IGVsZW1lbnQgKGlzIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZCBmcm9tIGl0c1xuICAgICAgICAvLyBjdXJyZW50IHBhcmVudCkuXG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoZWwpO1xuXG4gICAgICAgIC8vIFdyYXAgYWxsIG90aGVyIGVsZW1lbnRzIChpZiBhcHBsaWNhYmxlKS4gRWFjaCBlbGVtZW50IGlzXG4gICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZCBmcm9tIGl0cyBjdXJyZW50IHBhcmVudCBhbmQgZnJvbSB0aGUgZWxtc1xuICAgICAgICAvLyBhcnJheS5cbiAgICAgICAgd2hpbGUgKGVsbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkKGVsbXNbMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlIGZpcnN0IGVsZW1lbnQgaGFkIGEgc2libGluZywgaW5zZXJ0IHRoZSB3cmFwcGVyIGJlZm9yZSB0aGVcbiAgICAgICAgLy8gc2libGluZyB0byBtYWludGFpbiB0aGUgSFRNTCBzdHJ1Y3R1cmU7IG90aGVyd2lzZSwganVzdCBhcHBlbmQgaXRcbiAgICAgICAgLy8gdG8gdGhlIHBhcmVudC5cbiAgICAgICAgaWYgKHNpYmxpbmcpIHtcbiAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUodGhpcywgc2libGluZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcbiIsIi8vaGVscGVycy5qc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVscGVycyB7XG4gICAgc3RhdGljIGlzVG9wYmFyU3RpY2t5RW5hYmxlZCA9ICgpID0+IG9jZWFud3BMb2NhbGl6ZS5oYXNTdGlja3lUb3BCYXIgPT0gdHJ1ZTtcblxuICAgIHN0YXRpYyBpc01vYmlsZVN0aWNreURpc2FibGVkID0gKCkgPT4gd2luZG93LmlubmVyV2lkdGggPD0gOTYwICYmIG9jZWFud3BMb2NhbGl6ZS5oYXNTdGlja3lNb2JpbGUgIT0gdHJ1ZTtcblxuICAgIHN0YXRpYyBzbGlkZVN0aWNreUVmZmVjdCA9ICgpID0+IG9jZWFud3BMb2NhbGl6ZS5zdGlja3lFZmZlY3QgPT0gXCJzbGlkZVwiO1xuXG4gICAgc3RhdGljIHVwU3RpY2t5RWZmZWN0ID0gKCkgPT4gb2NlYW53cExvY2FsaXplLnN0aWNreUVmZmVjdCA9PSBcInVwXCI7XG5cbiAgICBzdGF0aWMgbWFudWFsU3RpY2t5ID0gKCkgPT4gb2NlYW53cExvY2FsaXplLnN0aWNreUNob29zZSA9PSBcIm1hbnVhbFwiO1xuXG4gICAgc3RhdGljIHNocmlua1N0aWNreVN0eWxlID0gKCkgPT4gb2NlYW53cExvY2FsaXplLnN0aWNreVN0eWxlID09IFwic2hyaW5rXCI7XG5cbiAgICBzdGF0aWMgZ2V0U2hyaW5rTG9nb0hlaWdodCA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2hyaW5rTG9nb0hlaWdodCA9IHBhcnNlSW50KG9jZWFud3BMb2NhbGl6ZS5zaHJpbmtMb2dvSGVpZ2h0KTtcblxuICAgICAgICByZXR1cm4gc2hyaW5rTG9nb0hlaWdodCA/IHNocmlua0xvZ29IZWlnaHQgOiAzMDtcbiAgICB9O1xufVxuIiwiLy8gdXRpbGl0eS5qc1xuaW1wb3J0IERPTSBmcm9tIFwiLi9ET01cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbGl0eSB7XG4gICAgc3RhdGljIHNjcm9sbEJhclRvcFBvc2l0aW9uID0gKCkgPT4gd2luZG93LnBhZ2VZT2Zmc2V0O1xuXG4gICAgc3RhdGljIGVsZW1FeGlzdHMgPSAoZWxlbSkgPT4ge1xuICAgICAgICByZXR1cm4gZWxlbSAmJiBlbGVtICE9PSBudWxsO1xuICAgIH07XG5cbiAgICBzdGF0aWMgZWxlbVZpc2libGUgPSAoZWxlbSkgPT4gISEoZWxlbS5vZmZzZXRXaWR0aCB8fCBlbGVtLm9mZnNldEhlaWdodCB8fCBlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoKTtcblxuICAgIHN0YXRpYyBlbGVtT2Zmc2V0ID0gKGVsZW0pID0+IHtcbiAgICAgICAgaWYgKCFlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBkb2N1bWVudC1yZWxhdGl2ZSBwb3NpdGlvbiBieSBhZGRpbmcgdmlld3BvcnQgc2Nyb2xsIHRvIHZpZXdwb3J0LXJlbGF0aXZlIGdCQ1JcbiAgICAgICAgY29uc3QgcmVjdCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IHdpbiA9IGVsZW0ub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQsXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW4ucGFnZVhPZmZzZXQsXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHN0YXRpYyBpc1dQQWRtaW5iYXJWaXNpYmxlID0gKCkgPT4gdGhpcy5lbGVtRXhpc3RzKERPTS5XUEFkbWluYmFyKSAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDYwMDtcbn1cbiIsIi8vIHN0aWNreS1oZWFkZXIuanNcbmltcG9ydCBcIi4vVXRpbHMvRE9NTWV0aG9kc1wiO1xuaW1wb3J0IFV0aWxpdHkgZnJvbSBcIi4vVXRpbHMvVXRpbGl0eVwiO1xuaW1wb3J0IFRvcGJhciBmcm9tIFwiLi9Db21wb25lbnRzL1RvcGJhclwiO1xuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi9Db21wb25lbnRzL0hlYWRlclwiO1xuaW1wb3J0IExvZ28gZnJvbSBcIi4vQ29tcG9uZW50cy9Mb2dvXCI7XG5pbXBvcnQgRE9NIGZyb20gXCIuL1V0aWxzL0RPTVwiO1xuaW1wb3J0IEhlbHBlcnMgZnJvbSBcIi4vVXRpbHMvSGVscGVyc1wiO1xuXG5jbGFzcyBPV19TdGlja3lIZWFkZXIge1xuXHRcdCNzY3JvbGxCYXJsYXRlc3RUb3BQb3NpdGlvbjtcblxuXHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHR0aGlzLnRvcGJhciA9IG5ldyBUb3BiYXIoKTtcblx0XHRcdFx0dGhpcy5oZWFkZXIgPSBuZXcgSGVhZGVyKCk7XG5cdFx0XHRcdHRoaXMubG9nbyA9IG5ldyBMb2dvKCk7XG5cdFx0fVxuXG5cdFx0c3RhcnQgPSAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuI3Njcm9sbEJhcmxhdGVzdFRvcFBvc2l0aW9uID0gVXRpbGl0eS5zY3JvbGxCYXJUb3BQb3NpdGlvbigpO1xuXG5cdFx0XHRcdHRoaXMuI3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcblx0XHRcdFx0dGhpcy4jYWRqdXN0Rm9yQW5jaG9yKCk7XG5cdFx0XHRcdHRoaXMuI3NldHVwQW5jaG9yQ2xpY2tFdmVudHMoKTtcbiAgICAgICAgdGhpcy4jc2V0dXBTY3JvbGxTcHkoKTtcblx0XHR9O1xuXG5cdFx0I3NldHVwRXZlbnRMaXN0ZW5lcnMgPSAoKSA9PiB7XG5cdFx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCB0aGlzLiNvbldpbmRvd0xvYWQpO1xuXHRcdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgdGhpcy4jb25DbGlja0xvYWQpO1xuXHRcdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLiNvbldpbmRvd1Njcm9sbCk7XG5cdFx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuI29uV2luZG93UmVzaXplKTtcblx0XHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCB0aGlzLiNvbldpbmRvd1Jlc2l6ZSk7XG5cdFx0fTtcblxuICAgICNnZXRBbmNob3JGcm9tSHJlZiA9IChocmVmKSA9PiB7XG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGhyZWYsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuICAgICAgcmV0dXJuIHVybC5oYXNoLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgfTtcblxuICAgICNhZGp1c3RGb3JBbmNob3IgPSAoaWQgPSBudWxsKSA9PiB7XG4gICAgICBsZXQgYW5jaG9ySWQgPSBpZDtcblxuICAgICAgLy8gSWYgdGhlICdpZCcgaXMgbm90IHBhc3NlZCB0byB0aGUgZnVuY3Rpb24sIHRoZW4gcmV0cmlldmUgaXQgZnJvbSB0aGUgd2luZG93LmxvY2F0aW9uLmhhc2hcbiAgICAgIGlmICghYW5jaG9ySWQgJiYgd2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgICAgICBhbmNob3JJZCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoXCIjXCIsIFwiXCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW5jaG9ySWQpO1xuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgbGV0IGFkanVzdG1lbnQgPSB0aGlzLmhlYWRlci5nZXRIZWFkZXJIZWlnaHQoKTtcblxuICAgICAgICAgICAgICAvLyBJZiBXUCBBZG1pbiBiYXIgaXMgdmlzaWJsZSwgYWRqdXN0IGZvciBpdHMgaGVpZ2h0IGFzIHdlbGxcbiAgICAgICAgICAgICAgaWYgKFV0aWxpdHkuaXNXUEFkbWluYmFyVmlzaWJsZSgpICYmIERPTS5XUEFkbWluYmFyKSB7XG4gICAgICAgICAgICAgICAgICBhZGp1c3RtZW50ICs9IERPTS5XUEFkbWluYmFyLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIEFkanVzdCB0aGUgc2Nyb2xsIHBvc2l0aW9uIHRvIHRha2UgaW50byBhY2NvdW50IHRoZSBoZWFkZXIgaGVpZ2h0IGFuZCBhbnkgb3RoZXIgYWRqdXN0bWVudHNcbiAgICAgICAgICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCAtIGFkanVzdG1lbnQ7XG4gICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogc2Nyb2xsUG9zaXRpb24sIGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xuICAgICAgICAgIH0sIDIwKTsgLy8gRGVsYXkgaXMgdG8gZW5zdXJlIGFsbCByZW5kZXJpbmcgaXMgZG9uZS5cbiAgICAgIH1cbiAgfTtcblxuXG5cbiAgI3NldHVwQW5jaG9yQ2xpY2tFdmVudHMgPSAoKSA9PiB7XG4gICAgY29uc3QgYW5jaG9yTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpO1xuICAgIGFuY2hvckxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgIC8vIEV4Y2x1ZGUgc3BlY2lmaWVkIGNsYXNzZXNcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIWxpbmsuY2xhc3NMaXN0LmNvbnRhaW5zKFwib2V3LW9mZi1jYW52YXMtYnV0dG9uXCIpICYmXG4gICAgICAgICAgICAhbGluay5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucyhcIm9ldy1vZmYtY2FudmFzLWJ1dHRvblwiKSAmJlxuICAgICAgICAgICAgIWxpbmsuY2xhc3NMaXN0LmNvbnRhaW5zKFwib2VjLW9mZi1jYW52YXMtYnV0dG9uXCIpICYmXG4gICAgICAgICAgICAhbGluay5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucyhcIm9lYy1vZmYtY2FudmFzLWJ1dHRvblwiKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gdGhpcy4jZ2V0QW5jaG9yRnJvbUhyZWYobGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gbmV3IFVSTChsaW5rLmhyZWYpLnBhdGhuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuI2FkanVzdEZvckFuY2hvcihpZCk7IC8vIFVzZSB0aGUgbW9kaWZpZWQgYWRqdXN0Rm9yQW5jaG9yIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cblxuICAgICNoYW5kbGVJbml0aWFsUGFnZUxvYWRIaWdobGlnaHQgPSAoKSA9PiB7XG4gICAgICAvLyBDb2xsZWN0IGFsbCBtZW51IGl0ZW1zIGludG8gYW4gYXJyYXlcbiAgICAgIGNvbnN0IG1lbnVJdGVtcyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaSA+IGFbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJyldLm1hcChsaW5rID0+IGxpbmsucGFyZW50Tm9kZSk7XG4gICAgICBjb25zdCBjdXJyZW50SGFzaCA9IHRoaXMuI2dldEFuY2hvckZyb21IcmVmKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLy8gRmlyc3QsIHJlbW92ZSBoaWdobGlnaHQgZnJvbSBhbGwgbWVudSBpdGVtcy5cbiAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKG1lbnVJdGVtID0+IHtcbiAgICAgICAgICBtZW51SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LW1lbnUtaXRlbScpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIElmIHRoZXJlJ3MgYSBoYXNoLCBoaWdobGlnaHQgdGhlIGNvcnJlc3BvbmRpbmcgbWVudSBpdGVtLlxuICAgICAgaWYgKGN1cnJlbnRIYXNoKSB7XG4gICAgICAgICAgbWVudUl0ZW1zLmZvckVhY2gobWVudUl0ZW0gPT4ge1xuICAgICAgICAgICAgICBjb25zdCBhbmNob3IgPSB0aGlzLiNnZXRBbmNob3JGcm9tSHJlZihtZW51SXRlbS5xdWVyeVNlbGVjdG9yKCdhJykuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuICAgICAgICAgICAgICBpZiAoYW5jaG9yID09PSBjdXJyZW50SGFzaCkge1xuICAgICAgICAgICAgICAgICAgbWVudUl0ZW0uY2xhc3NMaXN0LmFkZCgnY3VycmVudC1tZW51LWl0ZW0nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAjc2V0dXBTY3JvbGxTcHkgPSAoKSA9PiB7XG4gICAgICBjb25zdCBzZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlY3Rpb25baWRdJyk7XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRTZWN0aW9uID0gbnVsbDtcblxuICAgICAgICAgIHNlY3Rpb25zLmZvckVhY2goc2VjdGlvbiA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25Ub3AgPSBzZWN0aW9uLm9mZnNldFRvcCAtIHRoaXMuaGVhZGVyLmdldEhlYWRlckhlaWdodCgpO1xuICAgICAgICAgICAgICBpZiAod2luZG93LnNjcm9sbFkgPj0gc2VjdGlvblRvcCkge1xuICAgICAgICAgICAgICAgICAgY3VycmVudFNlY3Rpb24gPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGkgPiBhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IHRoaXMuI2dldEFuY2hvckZyb21IcmVmKGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuICAgICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGxpbmsucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1tZW51LWl0ZW0nKTtcbiAgICAgICAgICAgICAgaWYgKGFuY2hvciA9PT0gY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtbWVudS1pdGVtJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cblxuXG5cdFx0I29uQ2xpY2tTY3JvbGxPZmZzZXQgPSAoZXZlbnQpID0+IHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdGlmIChIZWxwZXJzLnVwU3RpY2t5RWZmZWN0KCkpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb25zdCBzdGlja3lPZmZzZXQgPSBET00uaGVhZGVyV3JhcHBlci5vZmZzZXRIZWlnaHQ7XG5cblx0XHRcdFx0bGV0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICc6dGFyZ2V0JyApO1xuXG5cdFx0XHRcdGlmICggdGFyZ2V0ICkge1xuXHRcdFx0XHRcdFx0dGFyZ2V0LnN0eWxlW1wic2Nyb2xsLW1hcmdpbi10b3BcIl0gPSBzdGlja3lPZmZzZXQgKyAncHgnO1xuXG5cdFx0XHRcdFx0XHR0YXJnZXQuc2Nyb2xsSW50b1ZpZXcoe1xuXHRcdFx0XHRcdFx0XHRcdHRvcDogc3RpY2t5T2Zmc2V0LFxuXHRcdFx0XHRcdFx0XHRcdGJlaGF2aW9yOiAnc21vb3RoJ1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRvY3VtZW50XG5cdFx0XHRcdC5xdWVyeVNlbGVjdG9yQWxsKCdhLmxvY2FsW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKSwgLmxvY2FsIGFbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pLCBhLm1lbnUtbGlua1tocmVmKj1cIiNcIl06bm90KFtocmVmPVwiI1wiXSksIGEuc2lkci1jbGFzcy1tZW51LWxpbmtbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pLCAjbW9iaWxlLWRyb3Bkb3duIGFbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJylcblx0XHRcdFx0LmZvckVhY2gobmF2TGluayA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdFx0IW5hdkxpbmsuY2xhc3NMaXN0LmNvbnRhaW5zKFwib213LW9wZW4tbW9kYWxcIikgJiZcblx0XHRcdFx0XHRcdFx0XHQhbmF2TGluay5jbG9zZXN0KFwiLm9tdy1vcGVuLW1vZGFsXCIpICYmXG5cdFx0XHRcdFx0XHRcdFx0IW5hdkxpbmsuY2xhc3NMaXN0LmNvbnRhaW5zKFwib2V3LW1vZGFsLWJ1dHRvblwiKSAmJlxuXHRcdFx0XHRcdFx0XHRcdCFuYXZMaW5rLmNsb3Nlc3QoXCIub2V3LW1vZGFsLWJ1dHRvblwiKSAmJlxuXHRcdFx0XHRcdFx0XHRcdCFuYXZMaW5rLmNsYXNzTGlzdC5jb250YWlucyhcIm9wbC1saW5rXCIpICYmXG5cdFx0XHRcdFx0XHRcdFx0IW5hdkxpbmsucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoXCJvcGwtbGlua1wiKSAmJlxuXHRcdFx0XHRcdFx0XHRcdCFuYXZMaW5rLmNsYXNzTGlzdC5jb250YWlucyhcIm9ldy1vZmYtY2FudmFzLWJ1dHRvblwiKSAmJlxuXHRcdFx0XHRcdFx0XHRcdCFuYXZMaW5rLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwib2V3LW9mZi1jYW52YXMtYnV0dG9uXCIpICYmXG5cdFx0XHRcdFx0XHRcdFx0IW5hdkxpbmsuY2xhc3NMaXN0LmNvbnRhaW5zKFwib2VjLW9mZi1jYW52YXMtYnV0dG9uXCIpICYmXG5cdFx0XHRcdFx0XHRcdFx0IW5hdkxpbmsucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoXCJvZWMtb2ZmLWNhbnZhcy1idXR0b25cIilcblx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bmF2TGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdFx0XHRcdFx0IGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0IGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgaHJlZiA9IG5hdkxpbmsuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcblx0XHRcdFx0XHRcdFx0XHRsZXQgYW5jaG9ySWQgPSAnJztcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGhyZWYgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFuY2hvcklkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihocmVmKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBhbmNob3JJZCApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YW5jaG9ySWQuc3R5bGVbXCJzY3JvbGwtbWFyZ2luLXRvcFwiXSA9IHN0aWNreU9mZnNldCArICdweCc7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFuY2hvcklkLnNjcm9sbEludG9WaWV3KHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRvcDogc3RpY2t5T2Zmc2V0LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YmVoYXZpb3I6ICdzbW9vdGgnXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXG5cblx0XHR9O1xuXG5cbiAgICAjb25XaW5kb3dMb2FkID0gKGUpID0+IHtcbiAgICAgIHRoaXMudG9wYmFyLmNyZWF0ZVN0aWNreVdyYXBwZXIoKTtcbiAgICAgIHRoaXMuaGVhZGVyLmNyZWF0ZVN0aWNreVdyYXBwZXIoKTtcbiAgICAgIHRoaXMuaGVhZGVyLmFkZFZlcnRpY2FsSGVhZGVyU3RpY2t5KCk7XG4gICAgICB0aGlzLmxvZ28uc2V0TWF4SGVpZ2h0KCk7XG4gICAgICB0aGlzLiNvbkNsaWNrU2Nyb2xsT2Zmc2V0KGUpO1xuICAgICAgdGhpcy4jaGFuZGxlSW5pdGlhbFBhZ2VMb2FkSGlnaGxpZ2h0KCk7XG5cbiAgICAgIC8vIEFkanVzdCBmb3IgYW5jaG9yIGlmIHRoZXJlIGlzIGEgaGFzaCBpbiB0aGUgVVJMXG4gICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgICAgICBjb25zdCBpZCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoXCIjXCIsIFwiXCIpO1xuICAgICAgICAgIHRoaXMuI2FkanVzdEZvckFuY2hvcihpZCk7XG4gICAgICB9XG4gIH07XG5cblxuXHRcdCNvbkNsaWNrTG9hZCA9IChlKSA9PiB7XG5cdFx0XHRcdHRoaXMuI29uQ2xpY2tTY3JvbGxPZmZzZXQoZSk7XG5cdFx0fTtcblxuXG5cdFx0I29uV2luZG93U2Nyb2xsID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAoVXRpbGl0eS5zY3JvbGxCYXJUb3BQb3NpdGlvbigpICE9IHRoaXMuI3Njcm9sbEJhcmxhdGVzdFRvcFBvc2l0aW9uKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnRvcGJhci5zdGlja3koKTtcblx0XHRcdFx0XHRcdHRoaXMuaGVhZGVyLnN0aWNreSgpO1xuXHRcdFx0XHRcdFx0dGhpcy5oZWFkZXIuc3RpY2t5RWZmZWN0cygpO1xuXHRcdFx0XHRcdFx0dGhpcy5oZWFkZXIuYWRkVmVydGljYWxIZWFkZXJTdGlja3koKTtcblxuXHRcdFx0XHRcdFx0dGhpcy4jc2Nyb2xsQmFybGF0ZXN0VG9wUG9zaXRpb24gPSBVdGlsaXR5LnNjcm9sbEJhclRvcFBvc2l0aW9uKCk7XG5cdFx0XHRcdH1cblxuXHRcdH07XG5cblx0XHQjb25XaW5kb3dSZXNpemUgPSAoKSA9PiB7XG5cdFx0XHRcdHRoaXMudG9wYmFyLnVwZGF0ZVN0aWNreSgpO1xuXHRcdFx0XHR0aGlzLmhlYWRlci51cGRhdGVTdGlja3koKTtcblx0XHR9O1xufVxuXG4oXCJ1c2Ugc3RyaWN0XCIpO1xuXG5jb25zdCBzdGlja3lIZWFkZXIgPSBuZXcgT1dfU3RpY2t5SGVhZGVyKCk7XG5zdGlja3lIZWFkZXIuc3RhcnQoKTtcbiJdfQ==
