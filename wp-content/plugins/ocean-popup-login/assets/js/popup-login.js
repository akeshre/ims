(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _settings = /*#__PURE__*/new WeakMap();

var OW_Base = /*#__PURE__*/function () {
  function OW_Base() {
    _classCallCheck(this, OW_Base);

    _classPrivateFieldInitSpec(this, _settings, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "elements", void 0);

    this.onInit();
    this.bindEvents();
  }

  _createClass(OW_Base, [{
    key: "getDefaultSettings",
    value: function getDefaultSettings() {
      return {};
    }
  }, {
    key: "getDefaultElements",
    value: function getDefaultElements() {
      return {};
    }
  }, {
    key: "onInit",
    value: function onInit() {
      _classPrivateFieldSet(this, _settings, this.getDefaultSettings());

      this.elements = this.getDefaultElements();
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {}
  }, {
    key: "getSettings",
    value: function getSettings() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!!key) {
        return _classPrivateFieldGet(this, _settings)[key];
      }

      return _classPrivateFieldGet(this, _settings);
    }
  }, {
    key: "setSettings",
    value: function setSettings() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!settings) {
        return;
      }

      _classPrivateFieldSet(this, _settings, Object.assign(_classPrivateFieldGet(this, _settings), settings));
    }
  }]);

  return OW_Base;
}();

var _default = OW_Base;
exports["default"] = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slideUp = exports.slideToggle = exports.slideDown = exports.fadeToggle = exports.fadeOut = exports.fadeIn = void 0;

var slideDown = function slideDown(element) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var display = window.getComputedStyle(element).display;

  if (display === "none") {
    display = "block";
  }

  element.style.transitionProperty = "height";
  element.style.transitionDuration = "".concat(duration, "ms");
  element.style.opacity = 0;
  element.style.display = display;
  var height = element.offsetHeight;
  element.style.height = 0;
  element.style.opacity = 1;
  element.style.overflow = "hidden";
  setTimeout(function () {
    element.style.height = "".concat(height, "px");
  }, 5);
  window.setTimeout(function () {
    element.style.removeProperty("height");
    element.style.removeProperty("overflow");
    element.style.removeProperty("transition-duration");
    element.style.removeProperty("transition-property");
    element.style.removeProperty("opacity");
  }, duration + 50);
};

exports.slideDown = slideDown;

var slideUp = function slideUp(element) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  element.style.boxSizing = "border-box";
  element.style.transitionProperty = "height, margin";
  element.style.transitionDuration = "".concat(duration, "ms");
  element.style.height = "".concat(element.offsetHeight, "px");
  element.style.marginTop = 0;
  element.style.marginBottom = 0;
  element.style.overflow = "hidden";
  setTimeout(function () {
    element.style.height = 0;
  }, 5);
  window.setTimeout(function () {
    element.style.display = "none";
    element.style.removeProperty("height");
    element.style.removeProperty("margin-top");
    element.style.removeProperty("margin-bottom");
    element.style.removeProperty("overflow");
    element.style.removeProperty("transition-duration");
    element.style.removeProperty("transition-property");
  }, duration + 50);
};

exports.slideUp = slideUp;

var slideToggle = function slideToggle(element, duration) {
  window.getComputedStyle(element).display === "none" ? slideDown(element, duration) : slideUp(element, duration);
};

exports.slideToggle = slideToggle;

var fadeIn = function fadeIn(element) {
  var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var options = {
    duration: 300,
    display: null,
    opacity: 1,
    callback: null
  };
  Object.assign(options, _options);
  element.style.opacity = 0;
  element.style.display = options.display || "block";
  setTimeout(function () {
    element.style.transition = "".concat(options.duration, "ms opacity ease");
    element.style.opacity = options.opacity;
  }, 5);
  setTimeout(function () {
    element.style.removeProperty("transition");
    !!options.callback && options.callback();
  }, options.duration + 50);
};

exports.fadeIn = fadeIn;

var fadeOut = function fadeOut(element) {
  var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var options = {
    duration: 300,
    display: null,
    opacity: 0,
    callback: null
  };
  Object.assign(options, _options);
  element.style.opacity = 1;
  element.style.display = options.display || "block";
  setTimeout(function () {
    element.style.transition = "".concat(options.duration, "ms opacity ease");
    element.style.opacity = options.opacity;
  }, 5);
  setTimeout(function () {
    element.style.display = "none";
    element.style.removeProperty("transition");
    !!options.callback && options.callback();
  }, options.duration + 50);
};

exports.fadeOut = fadeOut;

var fadeToggle = function fadeToggle(element, options) {
  window.getComputedStyle(element).display === "none" ? fadeIn(element, options) : fadeOut(element, options);
};

exports.fadeToggle = fadeToggle;

},{}],3:[function(require,module,exports){
"use strict";

var _delegate = _interopRequireDefault(require("delegate"));

var _base = _interopRequireDefault(require("./base/base"));

var _utils = require("./lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var OW_PopupLogin = /*#__PURE__*/function (_OW_Base) {
  _inherits(OW_PopupLogin, _OW_Base);

  var _super = _createSuper(OW_PopupLogin);

  function OW_PopupLogin() {
    _classCallCheck(this, OW_PopupLogin);

    return _super.apply(this, arguments);
  }

  _createClass(OW_PopupLogin, [{
    key: "getDefaultSettings",
    value: function getDefaultSettings() {
      return {
        selectors: {
          popupLogin: "#opl-login-form",
          popupLoginInner: "#opl-login-form .opl-login-wrap",
          triggerButtons: ".opl-link, .opl-link-wrap a, .sidr-class-opl-link",
          closeElements: ".opl-close-button, .opl-overlay",
          customTriggerBtn: ".opl-link-wrap a",
          loginWrapper: ".opl-login",
          loginForm: "#opl_login_form",
          loginUserNameInput: "#opl_user_login",
          loginMessage: ".opl-login .opl-errors",
          backToLoginButtons: ".login-link",
          registerWrapper: ".opl-register",
          registerForm: "#opl_registration_form",
          registerUserNameInput: "#opl_register_login",
          registerMessage: ".opl-register .opl-errors",
          backToRegisterBtn: ".register-link",
          resetPassWrapper: ".opl-reset-password",
          resetPassForm: "#opl_reset_password_form",
          resetPassUserNameInput: "#opl_user_or_email",
          resetPassMessage: ".opl-reset-password .opl-errors",
          backToResetPassBtn: ".forgot-pass-link",
          inputs: ".input-lg",
          messages: ".opl-errors"
        },
        options: oceanwpLocalize
      };
    }
  }, {
    key: "getDefaultElements",
    value: function getDefaultElements() {
      var selectors = this.getSettings("selectors");
      return {
        popupLogin: document.querySelector(selectors.popupLogin),
        popupLoginInner: document.querySelector(selectors.popupLoginInner),
        triggerButtons: document.querySelectorAll(selectors.triggerButtons),
        closeElements: document.querySelectorAll(selectors.closeElements),
        customTriggerBtn: document.querySelector(selectors.customTriggerBtn),
        loginWrapper: document.querySelector(selectors.loginWrapper),
        loginForm: document.querySelector(selectors.loginForm),
        loginUserNameInput: document.querySelector(selectors.loginUserNameInput),
        loginMessage: document.querySelector(selectors.loginMessage),
        backToLoginButtons: document.querySelectorAll(selectors.backToLoginButtons),
        registerWrapper: document.querySelector(selectors.registerWrapper),
        registerForm: document.querySelector(selectors.registerForm),
        registerUserNameInput: document.querySelector(selectors.registerUserNameInput),
        registerMessage: document.querySelector(selectors.registerMessage),
        backToRegisterBtn: document.querySelector(selectors.backToRegisterBtn),
        resetPassWrapper: document.querySelector(selectors.resetPassWrapper),
        resetPassUserNameInput: document.querySelector(selectors.resetPassUserNameInput),
        resetPassForm: document.querySelector(selectors.resetPassForm),
        resetPassMessage: document.querySelector(selectors.resetPassMessage),
        backToResetPassBtn: document.querySelector(selectors.backToResetPassBtn),
        inputs: document.querySelectorAll(selectors.inputs),
        messages: document.querySelectorAll(selectors.messages),
        html: document.querySelector("html")
      };
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this$elements$custom;

      _get(_getPrototypeOf(OW_PopupLogin.prototype), "onInit", this).call(this);

      var options = this.getSettings("options");

      if (options.loggedIn) {
        return;
      } // Add login form ID to custom link href.


      var selectors = this.getSettings("selectors");
      (_this$elements$custom = this.elements.customTriggerBtn) === null || _this$elements$custom === void 0 ? void 0 : _this$elements$custom.setAttribute("href", selectors.popupLogin);
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this$elements$closeE,
          _this = this,
          _this$elements$backTo,
          _this$elements$backTo2,
          _this$elements$backTo3,
          _this$elements$loginF,
          _this$elements$regist,
          _this$elements$resetP;

      var selectors = this.getSettings("selectors"); // Click on triggers buttons.

      (0, _delegate["default"])(document.body, selectors.triggerButtons, "click", this.openPopup.bind(this));
      (0, _delegate["default"])(document.body, selectors.triggerButtons, "touchend", this.openPopup.bind(this)); // Click on close elements.

      (_this$elements$closeE = this.elements.closeElements) === null || _this$elements$closeE === void 0 ? void 0 : _this$elements$closeE.forEach(function (closeElement) {
        closeElement.addEventListener("click", _this.closePopup.bind(_this));
      }); // Click on back to login button.

      (_this$elements$backTo = this.elements.backToLoginButtons) === null || _this$elements$backTo === void 0 ? void 0 : _this$elements$backTo.forEach(function (backToLoginBtn) {
        backToLoginBtn.addEventListener("click", _this.onBackToLoginBtnClick.bind(_this));
      }); // Click on back to register button.

      (_this$elements$backTo2 = this.elements.backToRegisterBtn) === null || _this$elements$backTo2 === void 0 ? void 0 : _this$elements$backTo2.addEventListener("click", this.onBackToRegisterBtnClick.bind(this)); // Click on back to reset password button.

      (_this$elements$backTo3 = this.elements.backToResetPassBtn) === null || _this$elements$backTo3 === void 0 ? void 0 : _this$elements$backTo3.addEventListener("click", this.onBackToResetPassBtnClick.bind(this)); // Submit login form.

      (_this$elements$loginF = this.elements.loginForm) === null || _this$elements$loginF === void 0 ? void 0 : _this$elements$loginF.addEventListener("submit", this.onLoginFormSubmit.bind(this)); // Submit register form.

      (_this$elements$regist = this.elements.registerForm) === null || _this$elements$regist === void 0 ? void 0 : _this$elements$regist.addEventListener("submit", this.onRegisterFormSubmit.bind(this)); // Submit reset password form.

      (_this$elements$resetP = this.elements.resetPassForm) === null || _this$elements$resetP === void 0 ? void 0 : _this$elements$resetP.addEventListener("submit", this.onResetPassFormSubmit.bind(this));
    }
  }, {
    key: "openPopup",
    value: function openPopup(event) {
      event.preventDefault();
      this.elements.html.style.overflow = "hidden";
      this.elements.popupLogin.classList.add("is-visible");
      (0, _utils.fadeIn)(this.elements.popupLogin);
      this.showLogin();
      this.elements.loginUserNameInput.focus();
      this.elements.messages.forEach(function (errorMessage) {
        errorMessage.style.display = "none";
      });
      this.elements.inputs.forEach(function (input) {
        input.value = "";
      });
    }
  }, {
    key: "closePopup",
    value: function closePopup(event) {
      var _this2 = this;

      event.preventDefault();
      setTimeout(function () {
        _this2.elements.html.style.removeProperty("overflow");
      }, 300);
      this.elements.popupLogin.classList.remove("is-visible");
      (0, _utils.fadeOut)(this.elements.popupLogin);
    }
  }, {
    key: "onBackToLoginBtnClick",
    value: function onBackToLoginBtnClick(event) {
      var _this3 = this;

      event.preventDefault();
      this.showLogin();
      setTimeout(function () {
        _this3.elements.loginUserNameInput.focus();
      }, 100);
    }
  }, {
    key: "onBackToRegisterBtnClick",
    value: function onBackToRegisterBtnClick(event) {
      var _this4 = this;

      event.preventDefault();
      this.showRegister();
      setTimeout(function () {
        _this4.elements.registerUserNameInput.focus();
      }, 100);
    }
  }, {
    key: "onBackToResetPassBtnClick",
    value: function onBackToResetPassBtnClick(event) {
      var _this5 = this;

      event.preventDefault();
      this.showResetPass();
      setTimeout(function () {
        _this5.elements.resetPassUserNameInput.focus();
      }, 100);
    }
  }, {
    key: "captchaV3Validate",
    value: function captchaV3Validate(form) {
      if (!jQuery(form).hasClass('validated')) {
        grecaptcha.ready(function () {
          grecaptcha.execute(RecaptchaV3InitParam.key, {
            action: 'submit'
          }).then(function (token) {
            jQuery(form).find('.g-recaptcha-response').remove();
            jQuery(form).append(jQuery('<textarea>', {
              id: 'g-recaptcha-response',
              "class": 'g-recaptcha-response',
              name: 'g-recaptcha-response',
              style: 'width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;'
            }).val(token));
            jQuery(form).addClass('validated');
            var formId = jQuery(form).attr('id');

            if (formId === 'opl_registration_form') {
              jQuery(form).find('#register_button').click();
            } else if (formId === 'opl_login_form') {
              jQuery(form).find('#login_button').click();
            }
          });
        });
      }
    }
  }, {
    key: "onLoginFormSubmit",
    value: function onLoginFormSubmit(event) {
      var _this6 = this;

      event.preventDefault();

      if (typeof RecaptchaV3InitParam !== 'undefined') {
        if ((typeof RecaptchaV3InitParam === "undefined" ? "undefined" : _typeof(RecaptchaV3InitParam)) != RecaptchaV3InitParam.key) {
          this.captchaV3Validate(event.target);
        }

        if (!jQuery(event.target).hasClass('validated')) {
          return false;
        }
      }

      var options = this.getSettings("options");
      var formData = new FormData(this.elements.loginForm);
      var submitBtn = this.elements.loginForm.querySelector("button");
      var loginText = submitBtn.innerHTML;
      var loginLoadingText = submitBtn.dataset.loadingText;
      submitBtn.innerHTML = loginLoadingText;
      axios.post(options.ajaxURL, formData).then(function (_ref) {
        var data = _ref.data;
        _this6.elements.loginMessage.style.display = "block";
        _this6.elements.loginMessage.innerHTML = data.message;

        if (data.error === false) {
          var _this6$elements$login;

          var redirectTo = (_this6$elements$login = _this6.elements.loginForm.querySelector('input[name="redirect_to"]')) === null || _this6$elements$login === void 0 ? void 0 : _this6$elements$login.value;

          _this6.elements.popupLoginInner.classList.add("loading");

          !!redirectTo ? window.location.href = redirectTo : window.location.reload(true);
        }

        submitBtn.innerHTML = loginText;
      });
    }
  }, {
    key: "onRegisterFormSubmit",
    value: function onRegisterFormSubmit(event) {
      var _this7 = this;

      event.preventDefault();

      if (typeof RecaptchaV3InitParam !== 'undefined') {
        if ((typeof RecaptchaV3InitParam === "undefined" ? "undefined" : _typeof(RecaptchaV3InitParam)) != RecaptchaV3InitParam.key) {
          this.captchaV3Validate(event.target);
        }

        if (!jQuery(event.target).hasClass('validated')) {
          return false;
        }
      }

      var options = this.getSettings("options");
      var formData = new FormData(this.elements.registerForm);
      var submitBtn = this.elements.registerForm.querySelector("button");
      var registerText = submitBtn.innerHTML;
      var registerLoadingText = submitBtn.dataset.loadingText;
      submitBtn.innerHTML = registerLoadingText;
      axios.post(options.ajaxURL, formData).then(function (_ref2) {
        var data = _ref2.data;
        _this7.elements.registerMessage.style.display = "block";
        _this7.elements.registerMessage.innerHTML = data.message;

        if (data.error === false) {
          var _this7$elements$regis;

          var redirectTo = (_this7$elements$regis = _this7.elements.registerForm.querySelector('input[name="redirect_to"]')) === null || _this7$elements$regis === void 0 ? void 0 : _this7$elements$regis.value;

          _this7.elements.popupLoginInner.classList.add("loading");

          !!redirectTo ? window.location.href = redirectTo : window.location.reload(true);
        }

        submitBtn.innerHTML = registerText;
      });
    }
  }, {
    key: "onResetPassFormSubmit",
    value: function onResetPassFormSubmit(event) {
      var _this8 = this;

      event.preventDefault();
      var options = this.getSettings("options");
      var formData = new FormData(this.elements.resetPassForm);
      var submitBtn = this.elements.resetPassForm.querySelector("button");
      var resetPassText = submitBtn.innerHTML;
      var resetPassLoadingText = submitBtn.dataset.loadingText;
      submitBtn.innerHTML = resetPassLoadingText;
      axios.post(options.ajaxURL, formData).then(function (_ref3) {
        var data = _ref3.data;
        _this8.elements.resetPassMessage.style.display = "block";
        _this8.elements.resetPassMessage.innerHTML = data.message;
        submitBtn.innerHTML = resetPassText;
      });
    }
  }, {
    key: "showLogin",
    value: function showLogin() {
      var _this$elements$regist2, _this$elements$regist3, _this$elements$resetP2, _this$elements$resetP3;

      this.elements.loginWrapper.classList.remove("opl-hide");
      this.elements.loginWrapper.classList.add("opl-show");
      (_this$elements$regist2 = this.elements.registerWrapper) === null || _this$elements$regist2 === void 0 ? void 0 : _this$elements$regist2.classList.add("opl-hide");
      (_this$elements$regist3 = this.elements.registerWrapper) === null || _this$elements$regist3 === void 0 ? void 0 : _this$elements$regist3.classList.remove("opl-show");
      (_this$elements$resetP2 = this.elements.resetPassWrapper) === null || _this$elements$resetP2 === void 0 ? void 0 : _this$elements$resetP2.classList.add("opl-hide");
      (_this$elements$resetP3 = this.elements.resetPassWrapper) === null || _this$elements$resetP3 === void 0 ? void 0 : _this$elements$resetP3.classList.remove("opl-show");
    }
  }, {
    key: "showRegister",
    value: function showRegister() {
      var _this$elements$loginW, _this$elements$loginW2, _this$elements$resetP4, _this$elements$resetP5;

      this.elements.registerWrapper.classList.remove("opl-hide");
      this.elements.registerWrapper.classList.add("opl-show");
      (_this$elements$loginW = this.elements.loginWrapper) === null || _this$elements$loginW === void 0 ? void 0 : _this$elements$loginW.classList.add("opl-hide");
      (_this$elements$loginW2 = this.elements.loginWrapper) === null || _this$elements$loginW2 === void 0 ? void 0 : _this$elements$loginW2.classList.remove("opl-show");
      (_this$elements$resetP4 = this.elements.resetPassWrapper) === null || _this$elements$resetP4 === void 0 ? void 0 : _this$elements$resetP4.classList.add("opl-hide");
      (_this$elements$resetP5 = this.elements.resetPassWrapper) === null || _this$elements$resetP5 === void 0 ? void 0 : _this$elements$resetP5.classList.remove("opl-show");
    }
  }, {
    key: "showResetPass",
    value: function showResetPass() {
      var _this$elements$loginW3, _this$elements$loginW4, _this$elements$regist4, _this$elements$regist5;

      this.elements.resetPassWrapper.classList.remove("opl-hide");
      this.elements.resetPassWrapper.classList.add("opl-show");
      (_this$elements$loginW3 = this.elements.loginWrapper) === null || _this$elements$loginW3 === void 0 ? void 0 : _this$elements$loginW3.classList.add("opl-hide");
      (_this$elements$loginW4 = this.elements.loginWrapper) === null || _this$elements$loginW4 === void 0 ? void 0 : _this$elements$loginW4.classList.remove("opl-show");
      (_this$elements$regist4 = this.elements.registerWrapper) === null || _this$elements$regist4 === void 0 ? void 0 : _this$elements$regist4.classList.add("opl-hide");
      (_this$elements$regist5 = this.elements.registerWrapper) === null || _this$elements$regist5 === void 0 ? void 0 : _this$elements$regist5.classList.remove("opl-show");
    }
  }]);

  return OW_PopupLogin;
}(_base["default"]);

"use script";
window.addEventListener("DOMContentLoaded", function () {
  new OW_PopupLogin();
});

},{"./base/base":1,"./lib/utils":2,"delegate":5}],4:[function(require,module,exports){
var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;

},{}],5:[function(require,module,exports){
var closest = require('./closest');

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;

},{"./closest":4}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc3JjL2pzL2Jhc2UvYmFzZS5qcyIsImFzc2V0cy9zcmMvanMvbGliL3V0aWxzLmpzIiwiYXNzZXRzL3NyYy9qcy9wb3B1cC1sb2dpbi5qcyIsIm5vZGVfbW9kdWxlcy9kZWxlZ2F0ZS9zcmMvY2xvc2VzdC5qcyIsIm5vZGVfbW9kdWxlcy9kZWxlZ2F0ZS9zcmMvZGVsZWdhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDQU0sTztFQUlGLG1CQUFjO0lBQUE7O0lBQUE7TUFBQTtNQUFBO0lBQUE7O0lBQUE7O0lBQ1YsS0FBSyxNQUFMO0lBQ0EsS0FBSyxVQUFMO0VBQ0g7Ozs7V0FFRCw4QkFBcUI7TUFDakIsT0FBTyxFQUFQO0lBQ0g7OztXQUVELDhCQUFxQjtNQUNqQixPQUFPLEVBQVA7SUFDSDs7O1dBRUQsa0JBQVM7TUFDTCx1Q0FBaUIsS0FBSyxrQkFBTCxFQUFqQjs7TUFDQSxLQUFLLFFBQUwsR0FBZ0IsS0FBSyxrQkFBTCxFQUFoQjtJQUNIOzs7V0FFRCxzQkFBYSxDQUFFOzs7V0FFZix1QkFBd0I7TUFBQSxJQUFaLEdBQVksdUVBQU4sSUFBTTs7TUFDcEIsSUFBSSxDQUFDLENBQUMsR0FBTixFQUFXO1FBQ1AsT0FBTyx1Q0FBZSxHQUFmLENBQVA7TUFDSDs7TUFFRCw2QkFBTyxJQUFQO0lBQ0g7OztXQUVELHVCQUEyQjtNQUFBLElBQWYsUUFBZSx1RUFBSixFQUFJOztNQUN2QixJQUFJLENBQUMsUUFBTCxFQUFlO1FBQ1g7TUFDSDs7TUFFRCx1Q0FBaUIsTUFBTSxDQUFDLE1BQVAsdUJBQWMsSUFBZCxjQUE4QixRQUE5QixDQUFqQjtJQUNIOzs7Ozs7ZUFHVSxPOzs7Ozs7Ozs7OztBQ3pDUixJQUFNLFNBQVMsR0FBRyxTQUFaLFNBQVksQ0FBQyxPQUFELEVBQTZCO0VBQUEsSUFBbkIsUUFBbUIsdUVBQVIsR0FBUTtFQUNsRCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsT0FBL0M7O0VBRUEsSUFBSSxPQUFPLEtBQUssTUFBaEIsRUFBd0I7SUFDcEIsT0FBTyxHQUFHLE9BQVY7RUFDSDs7RUFFRCxPQUFPLENBQUMsS0FBUixDQUFjLGtCQUFkLEdBQW1DLFFBQW5DO0VBQ0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxrQkFBZCxhQUFzQyxRQUF0QztFQUVBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixDQUF4QjtFQUNBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixPQUF4QjtFQUNBLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFyQjtFQUVBLE9BQU8sQ0FBQyxLQUFSLENBQWMsTUFBZCxHQUF1QixDQUF2QjtFQUNBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixDQUF4QjtFQUNBLE9BQU8sQ0FBQyxLQUFSLENBQWMsUUFBZCxHQUF5QixRQUF6QjtFQUVBLFVBQVUsQ0FBQyxZQUFNO0lBQ2IsT0FBTyxDQUFDLEtBQVIsQ0FBYyxNQUFkLGFBQTBCLE1BQTFCO0VBQ0gsQ0FGUyxFQUVQLENBRk8sQ0FBVjtFQUlBLE1BQU0sQ0FBQyxVQUFQLENBQWtCLFlBQU07SUFDcEIsT0FBTyxDQUFDLEtBQVIsQ0FBYyxjQUFkLENBQTZCLFFBQTdCO0lBQ0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxjQUFkLENBQTZCLFVBQTdCO0lBQ0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxjQUFkLENBQTZCLHFCQUE3QjtJQUNBLE9BQU8sQ0FBQyxLQUFSLENBQWMsY0FBZCxDQUE2QixxQkFBN0I7SUFDQSxPQUFPLENBQUMsS0FBUixDQUFjLGNBQWQsQ0FBNkIsU0FBN0I7RUFDSCxDQU5ELEVBTUcsUUFBUSxHQUFHLEVBTmQ7QUFPSCxDQTdCTTs7OztBQStCQSxJQUFNLE9BQU8sR0FBRyxTQUFWLE9BQVUsQ0FBQyxPQUFELEVBQTZCO0VBQUEsSUFBbkIsUUFBbUIsdUVBQVIsR0FBUTtFQUNoRCxPQUFPLENBQUMsS0FBUixDQUFjLFNBQWQsR0FBMEIsWUFBMUI7RUFDQSxPQUFPLENBQUMsS0FBUixDQUFjLGtCQUFkLEdBQW1DLGdCQUFuQztFQUNBLE9BQU8sQ0FBQyxLQUFSLENBQWMsa0JBQWQsYUFBc0MsUUFBdEM7RUFDQSxPQUFPLENBQUMsS0FBUixDQUFjLE1BQWQsYUFBMEIsT0FBTyxDQUFDLFlBQWxDO0VBQ0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxTQUFkLEdBQTBCLENBQTFCO0VBQ0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxZQUFkLEdBQTZCLENBQTdCO0VBQ0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxRQUFkLEdBQXlCLFFBQXpCO0VBRUEsVUFBVSxDQUFDLFlBQU07SUFDYixPQUFPLENBQUMsS0FBUixDQUFjLE1BQWQsR0FBdUIsQ0FBdkI7RUFDSCxDQUZTLEVBRVAsQ0FGTyxDQUFWO0VBSUEsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsWUFBTTtJQUNwQixPQUFPLENBQUMsS0FBUixDQUFjLE9BQWQsR0FBd0IsTUFBeEI7SUFDQSxPQUFPLENBQUMsS0FBUixDQUFjLGNBQWQsQ0FBNkIsUUFBN0I7SUFDQSxPQUFPLENBQUMsS0FBUixDQUFjLGNBQWQsQ0FBNkIsWUFBN0I7SUFDQSxPQUFPLENBQUMsS0FBUixDQUFjLGNBQWQsQ0FBNkIsZUFBN0I7SUFDQSxPQUFPLENBQUMsS0FBUixDQUFjLGNBQWQsQ0FBNkIsVUFBN0I7SUFDQSxPQUFPLENBQUMsS0FBUixDQUFjLGNBQWQsQ0FBNkIscUJBQTdCO0lBQ0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxjQUFkLENBQTZCLHFCQUE3QjtFQUNILENBUkQsRUFRRyxRQUFRLEdBQUcsRUFSZDtBQVNILENBdEJNOzs7O0FBd0JBLElBQU0sV0FBVyxHQUFHLFNBQWQsV0FBYyxDQUFDLE9BQUQsRUFBVSxRQUFWLEVBQXVCO0VBQzlDLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxPQUFqQyxLQUE2QyxNQUE3QyxHQUFzRCxTQUFTLENBQUMsT0FBRCxFQUFVLFFBQVYsQ0FBL0QsR0FBcUYsT0FBTyxDQUFDLE9BQUQsRUFBVSxRQUFWLENBQTVGO0FBQ0gsQ0FGTTs7OztBQUlBLElBQU0sTUFBTSxHQUFHLFNBQVQsTUFBUyxDQUFDLE9BQUQsRUFBNEI7RUFBQSxJQUFsQixRQUFrQix1RUFBUCxFQUFPOztFQUM5QyxJQUFNLE9BQU8sR0FBRztJQUNaLFFBQVEsRUFBRSxHQURFO0lBRVosT0FBTyxFQUFFLElBRkc7SUFHWixPQUFPLEVBQUUsQ0FIRztJQUlaLFFBQVEsRUFBRTtFQUpFLENBQWhCO0VBT0EsTUFBTSxDQUFDLE1BQVAsQ0FBYyxPQUFkLEVBQXVCLFFBQXZCO0VBRUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLENBQXhCO0VBQ0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLE9BQU8sQ0FBQyxPQUFSLElBQW1CLE9BQTNDO0VBRUEsVUFBVSxDQUFDLFlBQU07SUFDYixPQUFPLENBQUMsS0FBUixDQUFjLFVBQWQsYUFBOEIsT0FBTyxDQUFDLFFBQXRDO0lBQ0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLE9BQU8sQ0FBQyxPQUFoQztFQUNILENBSFMsRUFHUCxDQUhPLENBQVY7RUFLQSxVQUFVLENBQUMsWUFBTTtJQUNiLE9BQU8sQ0FBQyxLQUFSLENBQWMsY0FBZCxDQUE2QixZQUE3QjtJQUNBLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBVixJQUFzQixPQUFPLENBQUMsUUFBUixFQUF0QjtFQUNILENBSFMsRUFHUCxPQUFPLENBQUMsUUFBUixHQUFtQixFQUhaLENBQVY7QUFJSCxDQXRCTTs7OztBQXdCQSxJQUFNLE9BQU8sR0FBRyxTQUFWLE9BQVUsQ0FBQyxPQUFELEVBQTRCO0VBQUEsSUFBbEIsUUFBa0IsdUVBQVAsRUFBTzs7RUFDL0MsSUFBTSxPQUFPLEdBQUc7SUFDWixRQUFRLEVBQUUsR0FERTtJQUVaLE9BQU8sRUFBRSxJQUZHO0lBR1osT0FBTyxFQUFFLENBSEc7SUFJWixRQUFRLEVBQUU7RUFKRSxDQUFoQjtFQU9BLE1BQU0sQ0FBQyxNQUFQLENBQWMsT0FBZCxFQUF1QixRQUF2QjtFQUVBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixDQUF4QjtFQUNBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixPQUFPLENBQUMsT0FBUixJQUFtQixPQUEzQztFQUVBLFVBQVUsQ0FBQyxZQUFNO0lBQ2IsT0FBTyxDQUFDLEtBQVIsQ0FBYyxVQUFkLGFBQThCLE9BQU8sQ0FBQyxRQUF0QztJQUNBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixPQUFPLENBQUMsT0FBaEM7RUFDSCxDQUhTLEVBR1AsQ0FITyxDQUFWO0VBS0EsVUFBVSxDQUFDLFlBQU07SUFDYixPQUFPLENBQUMsS0FBUixDQUFjLE9BQWQsR0FBd0IsTUFBeEI7SUFDQSxPQUFPLENBQUMsS0FBUixDQUFjLGNBQWQsQ0FBNkIsWUFBN0I7SUFDQSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVYsSUFBc0IsT0FBTyxDQUFDLFFBQVIsRUFBdEI7RUFDSCxDQUpTLEVBSVAsT0FBTyxDQUFDLFFBQVIsR0FBbUIsRUFKWixDQUFWO0FBS0gsQ0F2Qk07Ozs7QUF5QkEsSUFBTSxVQUFVLEdBQUcsU0FBYixVQUFhLENBQUMsT0FBRCxFQUFVLE9BQVYsRUFBc0I7RUFDNUMsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLE9BQWpDLEtBQTZDLE1BQTdDLEdBQXNELE1BQU0sQ0FBQyxPQUFELEVBQVUsT0FBVixDQUE1RCxHQUFpRixPQUFPLENBQUMsT0FBRCxFQUFVLE9BQVYsQ0FBeEY7QUFDSCxDQUZNOzs7Ozs7O0FDNUdQOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTSxhOzs7Ozs7Ozs7Ozs7O1dBQ0YsOEJBQXFCO01BQ2pCLE9BQU87UUFDSCxTQUFTLEVBQUU7VUFDUCxVQUFVLEVBQUUsaUJBREw7VUFFUCxlQUFlLEVBQUUsaUNBRlY7VUFJUCxjQUFjLEVBQUUsbURBSlQ7VUFLUCxhQUFhLEVBQUUsaUNBTFI7VUFNUCxnQkFBZ0IsRUFBRSxrQkFOWDtVQVFQLFlBQVksRUFBRSxZQVJQO1VBU1AsU0FBUyxFQUFFLGlCQVRKO1VBVVAsa0JBQWtCLEVBQUUsaUJBVmI7VUFXUCxZQUFZLEVBQUUsd0JBWFA7VUFZUCxrQkFBa0IsRUFBRSxhQVpiO1VBY1AsZUFBZSxFQUFFLGVBZFY7VUFlUCxZQUFZLEVBQUUsd0JBZlA7VUFnQlAscUJBQXFCLEVBQUUscUJBaEJoQjtVQWlCUCxlQUFlLEVBQUUsMkJBakJWO1VBa0JQLGlCQUFpQixFQUFFLGdCQWxCWjtVQW9CUCxnQkFBZ0IsRUFBRSxxQkFwQlg7VUFxQlAsYUFBYSxFQUFFLDBCQXJCUjtVQXNCUCxzQkFBc0IsRUFBRSxvQkF0QmpCO1VBdUJQLGdCQUFnQixFQUFFLGlDQXZCWDtVQXdCUCxrQkFBa0IsRUFBRSxtQkF4QmI7VUEwQlAsTUFBTSxFQUFFLFdBMUJEO1VBMkJQLFFBQVEsRUFBRTtRQTNCSCxDQURSO1FBOEJILE9BQU8sRUFBRTtNQTlCTixDQUFQO0lBZ0NIOzs7V0FFRCw4QkFBcUI7TUFDakIsSUFBTSxTQUFTLEdBQUcsS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQWxCO01BRUEsT0FBTztRQUNILFVBQVUsRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUFTLENBQUMsVUFBakMsQ0FEVDtRQUVILGVBQWUsRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUFTLENBQUMsZUFBakMsQ0FGZDtRQUlILGNBQWMsRUFBRSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsU0FBUyxDQUFDLGNBQXBDLENBSmI7UUFLSCxhQUFhLEVBQUUsUUFBUSxDQUFDLGdCQUFULENBQTBCLFNBQVMsQ0FBQyxhQUFwQyxDQUxaO1FBTUgsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBUyxDQUFDLGdCQUFqQyxDQU5mO1FBUUgsWUFBWSxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQVMsQ0FBQyxZQUFqQyxDQVJYO1FBU0gsU0FBUyxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQVMsQ0FBQyxTQUFqQyxDQVRSO1FBVUgsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBUyxDQUFDLGtCQUFqQyxDQVZqQjtRQVdILFlBQVksRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUFTLENBQUMsWUFBakMsQ0FYWDtRQVlILGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixTQUFTLENBQUMsa0JBQXBDLENBWmpCO1FBY0gsZUFBZSxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQVMsQ0FBQyxlQUFqQyxDQWRkO1FBZUgsWUFBWSxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQVMsQ0FBQyxZQUFqQyxDQWZYO1FBZ0JILHFCQUFxQixFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQVMsQ0FBQyxxQkFBakMsQ0FoQnBCO1FBaUJILGVBQWUsRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUFTLENBQUMsZUFBakMsQ0FqQmQ7UUFrQkgsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBUyxDQUFDLGlCQUFqQyxDQWxCaEI7UUFvQkgsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBUyxDQUFDLGdCQUFqQyxDQXBCZjtRQXFCSCxzQkFBc0IsRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUFTLENBQUMsc0JBQWpDLENBckJyQjtRQXNCSCxhQUFhLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBUyxDQUFDLGFBQWpDLENBdEJaO1FBdUJILGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQVMsQ0FBQyxnQkFBakMsQ0F2QmY7UUF3Qkgsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBUyxDQUFDLGtCQUFqQyxDQXhCakI7UUEwQkgsTUFBTSxFQUFFLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixTQUFTLENBQUMsTUFBcEMsQ0ExQkw7UUEyQkgsUUFBUSxFQUFFLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixTQUFTLENBQUMsUUFBcEMsQ0EzQlA7UUE2QkgsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLE1BQXZCO01BN0JILENBQVA7SUErQkg7OztXQUVELGtCQUFTO01BQUE7O01BQ0w7O01BRUEsSUFBTSxPQUFPLEdBQUcsS0FBSyxXQUFMLENBQWlCLFNBQWpCLENBQWhCOztNQUVBLElBQUksT0FBTyxDQUFDLFFBQVosRUFBc0I7UUFDbEI7TUFDSCxDQVBJLENBU0w7OztNQUNBLElBQU0sU0FBUyxHQUFHLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUFsQjtNQUNBLDhCQUFLLFFBQUwsQ0FBYyxnQkFBZCxnRkFBZ0MsWUFBaEMsQ0FBNkMsTUFBN0MsRUFBcUQsU0FBUyxDQUFDLFVBQS9EO0lBQ0g7OztXQUVELHNCQUFhO01BQUE7TUFBQTtNQUFBO01BQUE7TUFBQTtNQUFBO01BQUE7TUFBQTs7TUFDVCxJQUFNLFNBQVMsR0FBRyxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBbEIsQ0FEUyxDQUdUOztNQUNBLElBQUEsb0JBQUEsRUFBUyxRQUFRLENBQUMsSUFBbEIsRUFBd0IsU0FBUyxDQUFDLGNBQWxDLEVBQWtELE9BQWxELEVBQTJELEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsSUFBcEIsQ0FBM0Q7TUFDQSxJQUFBLG9CQUFBLEVBQVMsUUFBUSxDQUFDLElBQWxCLEVBQXdCLFNBQVMsQ0FBQyxjQUFsQyxFQUFrRCxVQUFsRCxFQUE4RCxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLElBQXBCLENBQTlELEVBTFMsQ0FPVDs7TUFDQSw4QkFBSyxRQUFMLENBQWMsYUFBZCxnRkFBNkIsT0FBN0IsQ0FBcUMsVUFBQyxZQUFELEVBQWtCO1FBQ25ELFlBQVksQ0FBQyxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxLQUFJLENBQUMsVUFBTCxDQUFnQixJQUFoQixDQUFxQixLQUFyQixDQUF2QztNQUNILENBRkQsRUFSUyxDQVlUOztNQUNBLDhCQUFLLFFBQUwsQ0FBYyxrQkFBZCxnRkFBa0MsT0FBbEMsQ0FBMEMsVUFBQyxjQUFELEVBQW9CO1FBQzFELGNBQWMsQ0FBQyxnQkFBZixDQUFnQyxPQUFoQyxFQUF5QyxLQUFJLENBQUMscUJBQUwsQ0FBMkIsSUFBM0IsQ0FBZ0MsS0FBaEMsQ0FBekM7TUFDSCxDQUZELEVBYlMsQ0FnQlQ7O01BQ0EsK0JBQUssUUFBTCxDQUFjLGlCQUFkLGtGQUFpQyxnQkFBakMsQ0FBa0QsT0FBbEQsRUFBMkQsS0FBSyx3QkFBTCxDQUE4QixJQUE5QixDQUFtQyxJQUFuQyxDQUEzRCxFQWpCUyxDQWtCVDs7TUFDQSwrQkFBSyxRQUFMLENBQWMsa0JBQWQsa0ZBQWtDLGdCQUFsQyxDQUFtRCxPQUFuRCxFQUE0RCxLQUFLLHlCQUFMLENBQStCLElBQS9CLENBQW9DLElBQXBDLENBQTVELEVBbkJTLENBcUJUOztNQUNBLDhCQUFLLFFBQUwsQ0FBYyxTQUFkLGdGQUF5QixnQkFBekIsQ0FBMEMsUUFBMUMsRUFBb0QsS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUFwRCxFQXRCUyxDQXVCVDs7TUFDQSw4QkFBSyxRQUFMLENBQWMsWUFBZCxnRkFBNEIsZ0JBQTVCLENBQTZDLFFBQTdDLEVBQXVELEtBQUssb0JBQUwsQ0FBMEIsSUFBMUIsQ0FBK0IsSUFBL0IsQ0FBdkQsRUF4QlMsQ0F5QlQ7O01BQ0EsOEJBQUssUUFBTCxDQUFjLGFBQWQsZ0ZBQTZCLGdCQUE3QixDQUE4QyxRQUE5QyxFQUF3RCxLQUFLLHFCQUFMLENBQTJCLElBQTNCLENBQWdDLElBQWhDLENBQXhEO0lBQ0g7OztXQUVELG1CQUFVLEtBQVYsRUFBaUI7TUFDYixLQUFLLENBQUMsY0FBTjtNQUVBLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBbkIsQ0FBeUIsUUFBekIsR0FBb0MsUUFBcEM7TUFDQSxLQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLFNBQXpCLENBQW1DLEdBQW5DLENBQXVDLFlBQXZDO01BRUEsSUFBQSxhQUFBLEVBQU8sS0FBSyxRQUFMLENBQWMsVUFBckI7TUFDQSxLQUFLLFNBQUw7TUFFQSxLQUFLLFFBQUwsQ0FBYyxrQkFBZCxDQUFpQyxLQUFqQztNQUVBLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsT0FBdkIsQ0FBK0IsVUFBQyxZQUFELEVBQWtCO1FBQzdDLFlBQVksQ0FBQyxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE1BQTdCO01BQ0gsQ0FGRDtNQUlBLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsT0FBckIsQ0FBNkIsVUFBQyxLQUFELEVBQVc7UUFDcEMsS0FBSyxDQUFDLEtBQU4sR0FBYyxFQUFkO01BQ0gsQ0FGRDtJQUdIOzs7V0FFRCxvQkFBVyxLQUFYLEVBQWtCO01BQUE7O01BQ2QsS0FBSyxDQUFDLGNBQU47TUFFQSxVQUFVLENBQUMsWUFBTTtRQUNiLE1BQUksQ0FBQyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFuQixDQUF5QixjQUF6QixDQUF3QyxVQUF4QztNQUNILENBRlMsRUFFUCxHQUZPLENBQVY7TUFJQSxLQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLFNBQXpCLENBQW1DLE1BQW5DLENBQTBDLFlBQTFDO01BQ0EsSUFBQSxjQUFBLEVBQVEsS0FBSyxRQUFMLENBQWMsVUFBdEI7SUFDSDs7O1dBRUQsK0JBQXNCLEtBQXRCLEVBQTZCO01BQUE7O01BQ3pCLEtBQUssQ0FBQyxjQUFOO01BRUEsS0FBSyxTQUFMO01BRUEsVUFBVSxDQUFDLFlBQU07UUFDYixNQUFJLENBQUMsUUFBTCxDQUFjLGtCQUFkLENBQWlDLEtBQWpDO01BQ0gsQ0FGUyxFQUVQLEdBRk8sQ0FBVjtJQUdIOzs7V0FFRCxrQ0FBeUIsS0FBekIsRUFBZ0M7TUFBQTs7TUFDNUIsS0FBSyxDQUFDLGNBQU47TUFFQSxLQUFLLFlBQUw7TUFFQSxVQUFVLENBQUMsWUFBTTtRQUNiLE1BQUksQ0FBQyxRQUFMLENBQWMscUJBQWQsQ0FBb0MsS0FBcEM7TUFDSCxDQUZTLEVBRVAsR0FGTyxDQUFWO0lBR0g7OztXQUVELG1DQUEwQixLQUExQixFQUFpQztNQUFBOztNQUM3QixLQUFLLENBQUMsY0FBTjtNQUVBLEtBQUssYUFBTDtNQUVBLFVBQVUsQ0FBQyxZQUFNO1FBQ2IsTUFBSSxDQUFDLFFBQUwsQ0FBYyxzQkFBZCxDQUFxQyxLQUFyQztNQUNILENBRlMsRUFFUCxHQUZPLENBQVY7SUFHSDs7O1dBRUQsMkJBQWtCLElBQWxCLEVBQXdCO01BQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBRCxDQUFOLENBQWEsUUFBYixDQUFzQixXQUF0QixDQUFMLEVBQXlDO1FBQ3ZDLFVBQVUsQ0FBQyxLQUFYLENBQWlCLFlBQVk7VUFDM0IsVUFBVSxDQUFDLE9BQVgsQ0FBbUIsb0JBQW9CLENBQUMsR0FBeEMsRUFBNkM7WUFBRSxNQUFNLEVBQUU7VUFBVixDQUE3QyxFQUFtRSxJQUFuRSxDQUF3RSxVQUFVLEtBQVYsRUFBaUI7WUFDdkYsTUFBTSxDQUFDLElBQUQsQ0FBTixDQUFhLElBQWIsQ0FBa0IsdUJBQWxCLEVBQTJDLE1BQTNDO1lBQ0EsTUFBTSxDQUFDLElBQUQsQ0FBTixDQUFhLE1BQWIsQ0FBb0IsTUFBTSxDQUFDLFlBQUQsRUFBZTtjQUN2QyxFQUFFLEVBQUUsc0JBRG1DO2NBRXZDLFNBQU8sc0JBRmdDO2NBR3ZDLElBQUksRUFBRSxzQkFIaUM7Y0FJdkMsS0FBSyxFQUFFO1lBSmdDLENBQWYsQ0FBTixDQUtqQixHQUxpQixDQUtiLEtBTGEsQ0FBcEI7WUFNQSxNQUFNLENBQUMsSUFBRCxDQUFOLENBQWEsUUFBYixDQUFzQixXQUF0QjtZQUNBLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFELENBQU4sQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBQWY7O1lBQ0EsSUFBSSxNQUFNLEtBQUssdUJBQWYsRUFBeUM7Y0FDdkMsTUFBTSxDQUFDLElBQUQsQ0FBTixDQUFhLElBQWIsQ0FBa0Isa0JBQWxCLEVBQXNDLEtBQXRDO1lBQ0QsQ0FGRCxNQUVPLElBQUksTUFBTSxLQUFLLGdCQUFmLEVBQWtDO2NBQ3ZDLE1BQU0sQ0FBQyxJQUFELENBQU4sQ0FBYSxJQUFiLENBQWtCLGVBQWxCLEVBQW1DLEtBQW5DO1lBQ0Q7VUFDRixDQWZEO1FBZ0JELENBakJEO01Ba0JEO0lBQ0o7OztXQUVELDJCQUFrQixLQUFsQixFQUF5QjtNQUFBOztNQUNyQixLQUFLLENBQUMsY0FBTjs7TUFDQSxJQUFHLE9BQU8sb0JBQVAsS0FBOEIsV0FBakMsRUFBOEM7UUFDMUMsSUFBSSxRQUFPLG9CQUFQLHlDQUFPLG9CQUFQLE1BQStCLG9CQUFvQixDQUFDLEdBQXhELEVBQTZEO1VBQzNELEtBQUssaUJBQUwsQ0FBdUIsS0FBSyxDQUFDLE1BQTdCO1FBQ0Q7O1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBUCxDQUFOLENBQXFCLFFBQXJCLENBQThCLFdBQTlCLENBQUwsRUFBa0Q7VUFDaEQsT0FBTyxLQUFQO1FBQ0Q7TUFDSjs7TUFFRCxJQUFNLE9BQU8sR0FBRyxLQUFLLFdBQUwsQ0FBaUIsU0FBakIsQ0FBaEI7TUFDQSxJQUFNLFFBQVEsR0FBRyxJQUFJLFFBQUosQ0FBYSxLQUFLLFFBQUwsQ0FBYyxTQUEzQixDQUFqQjtNQUNBLElBQU0sU0FBUyxHQUFHLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsYUFBeEIsQ0FBc0MsUUFBdEMsQ0FBbEI7TUFDQSxJQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBNUI7TUFDQSxJQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxPQUFWLENBQWtCLFdBQTNDO01BRUEsU0FBUyxDQUFDLFNBQVYsR0FBc0IsZ0JBQXRCO01BRUEsS0FBSyxDQUFDLElBQU4sQ0FBVyxPQUFPLENBQUMsT0FBbkIsRUFBNEIsUUFBNUIsRUFBc0MsSUFBdEMsQ0FBMkMsZ0JBQWM7UUFBQSxJQUFYLElBQVcsUUFBWCxJQUFXO1FBQ3JELE1BQUksQ0FBQyxRQUFMLENBQWMsWUFBZCxDQUEyQixLQUEzQixDQUFpQyxPQUFqQyxHQUEyQyxPQUEzQztRQUNBLE1BQUksQ0FBQyxRQUFMLENBQWMsWUFBZCxDQUEyQixTQUEzQixHQUF1QyxJQUFJLENBQUMsT0FBNUM7O1FBRUEsSUFBSSxJQUFJLENBQUMsS0FBTCxLQUFlLEtBQW5CLEVBQTBCO1VBQUE7O1VBQ3RCLElBQU0sVUFBVSw0QkFBRyxNQUFJLENBQUMsUUFBTCxDQUFjLFNBQWQsQ0FBd0IsYUFBeEIsQ0FBc0MsMkJBQXRDLENBQUgsMERBQUcsc0JBQW9FLEtBQXZGOztVQUVBLE1BQUksQ0FBQyxRQUFMLENBQWMsZUFBZCxDQUE4QixTQUE5QixDQUF3QyxHQUF4QyxDQUE0QyxTQUE1Qzs7VUFDQSxDQUFDLENBQUMsVUFBRixHQUFnQixNQUFNLENBQUMsUUFBUCxDQUFnQixJQUFoQixHQUF1QixVQUF2QyxHQUFxRCxNQUFNLENBQUMsUUFBUCxDQUFnQixNQUFoQixDQUF1QixJQUF2QixDQUFyRDtRQUNIOztRQUVELFNBQVMsQ0FBQyxTQUFWLEdBQXNCLFNBQXRCO01BQ0gsQ0FaRDtJQWFIOzs7V0FFRCw4QkFBcUIsS0FBckIsRUFBNEI7TUFBQTs7TUFDeEIsS0FBSyxDQUFDLGNBQU47O01BRUEsSUFBRyxPQUFPLG9CQUFQLEtBQThCLFdBQWpDLEVBQThDO1FBQzFDLElBQUksUUFBTyxvQkFBUCx5Q0FBTyxvQkFBUCxNQUErQixvQkFBb0IsQ0FBQyxHQUF4RCxFQUE2RDtVQUMzRCxLQUFLLGlCQUFMLENBQXVCLEtBQUssQ0FBQyxNQUE3QjtRQUNEOztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQVAsQ0FBTixDQUFxQixRQUFyQixDQUE4QixXQUE5QixDQUFMLEVBQWtEO1VBQ2hELE9BQU8sS0FBUDtRQUNEO01BQ0o7O01BRUQsSUFBTSxPQUFPLEdBQUcsS0FBSyxXQUFMLENBQWlCLFNBQWpCLENBQWhCO01BQ0EsSUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFKLENBQWEsS0FBSyxRQUFMLENBQWMsWUFBM0IsQ0FBakI7TUFDQSxJQUFNLFNBQVMsR0FBRyxLQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLGFBQTNCLENBQXlDLFFBQXpDLENBQWxCO01BQ0EsSUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLFNBQS9CO01BQ0EsSUFBTSxtQkFBbUIsR0FBRyxTQUFTLENBQUMsT0FBVixDQUFrQixXQUE5QztNQUVBLFNBQVMsQ0FBQyxTQUFWLEdBQXNCLG1CQUF0QjtNQUVBLEtBQUssQ0FBQyxJQUFOLENBQVcsT0FBTyxDQUFDLE9BQW5CLEVBQTRCLFFBQTVCLEVBQXNDLElBQXRDLENBQTJDLGlCQUFjO1FBQUEsSUFBWCxJQUFXLFNBQVgsSUFBVztRQUNyRCxNQUFJLENBQUMsUUFBTCxDQUFjLGVBQWQsQ0FBOEIsS0FBOUIsQ0FBb0MsT0FBcEMsR0FBOEMsT0FBOUM7UUFDQSxNQUFJLENBQUMsUUFBTCxDQUFjLGVBQWQsQ0FBOEIsU0FBOUIsR0FBMEMsSUFBSSxDQUFDLE9BQS9DOztRQUVBLElBQUksSUFBSSxDQUFDLEtBQUwsS0FBZSxLQUFuQixFQUEwQjtVQUFBOztVQUN0QixJQUFNLFVBQVUsNEJBQUcsTUFBSSxDQUFDLFFBQUwsQ0FBYyxZQUFkLENBQTJCLGFBQTNCLENBQXlDLDJCQUF6QyxDQUFILDBEQUFHLHNCQUF1RSxLQUExRjs7VUFFQSxNQUFJLENBQUMsUUFBTCxDQUFjLGVBQWQsQ0FBOEIsU0FBOUIsQ0FBd0MsR0FBeEMsQ0FBNEMsU0FBNUM7O1VBQ0EsQ0FBQyxDQUFDLFVBQUYsR0FBZ0IsTUFBTSxDQUFDLFFBQVAsQ0FBZ0IsSUFBaEIsR0FBdUIsVUFBdkMsR0FBcUQsTUFBTSxDQUFDLFFBQVAsQ0FBZ0IsTUFBaEIsQ0FBdUIsSUFBdkIsQ0FBckQ7UUFDSDs7UUFFRCxTQUFTLENBQUMsU0FBVixHQUFzQixZQUF0QjtNQUNILENBWkQ7SUFhSDs7O1dBRUQsK0JBQXNCLEtBQXRCLEVBQTZCO01BQUE7O01BQ3pCLEtBQUssQ0FBQyxjQUFOO01BRUEsSUFBTSxPQUFPLEdBQUcsS0FBSyxXQUFMLENBQWlCLFNBQWpCLENBQWhCO01BQ0EsSUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFKLENBQWEsS0FBSyxRQUFMLENBQWMsYUFBM0IsQ0FBakI7TUFDQSxJQUFNLFNBQVMsR0FBRyxLQUFLLFFBQUwsQ0FBYyxhQUFkLENBQTRCLGFBQTVCLENBQTBDLFFBQTFDLENBQWxCO01BQ0EsSUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLFNBQWhDO01BQ0EsSUFBTSxvQkFBb0IsR0FBRyxTQUFTLENBQUMsT0FBVixDQUFrQixXQUEvQztNQUVBLFNBQVMsQ0FBQyxTQUFWLEdBQXNCLG9CQUF0QjtNQUVBLEtBQUssQ0FBQyxJQUFOLENBQVcsT0FBTyxDQUFDLE9BQW5CLEVBQTRCLFFBQTVCLEVBQXNDLElBQXRDLENBQTJDLGlCQUFjO1FBQUEsSUFBWCxJQUFXLFNBQVgsSUFBVztRQUNyRCxNQUFJLENBQUMsUUFBTCxDQUFjLGdCQUFkLENBQStCLEtBQS9CLENBQXFDLE9BQXJDLEdBQStDLE9BQS9DO1FBQ0EsTUFBSSxDQUFDLFFBQUwsQ0FBYyxnQkFBZCxDQUErQixTQUEvQixHQUEyQyxJQUFJLENBQUMsT0FBaEQ7UUFFQSxTQUFTLENBQUMsU0FBVixHQUFzQixhQUF0QjtNQUNILENBTEQ7SUFNSDs7O1dBRUQscUJBQVk7TUFBQTs7TUFDUixLQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLFNBQTNCLENBQXFDLE1BQXJDLENBQTRDLFVBQTVDO01BQ0EsS0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixTQUEzQixDQUFxQyxHQUFyQyxDQUF5QyxVQUF6QztNQUVBLCtCQUFLLFFBQUwsQ0FBYyxlQUFkLGtGQUErQixTQUEvQixDQUF5QyxHQUF6QyxDQUE2QyxVQUE3QztNQUNBLCtCQUFLLFFBQUwsQ0FBYyxlQUFkLGtGQUErQixTQUEvQixDQUF5QyxNQUF6QyxDQUFnRCxVQUFoRDtNQUVBLCtCQUFLLFFBQUwsQ0FBYyxnQkFBZCxrRkFBZ0MsU0FBaEMsQ0FBMEMsR0FBMUMsQ0FBOEMsVUFBOUM7TUFDQSwrQkFBSyxRQUFMLENBQWMsZ0JBQWQsa0ZBQWdDLFNBQWhDLENBQTBDLE1BQTFDLENBQWlELFVBQWpEO0lBQ0g7OztXQUVELHdCQUFlO01BQUE7O01BQ1gsS0FBSyxRQUFMLENBQWMsZUFBZCxDQUE4QixTQUE5QixDQUF3QyxNQUF4QyxDQUErQyxVQUEvQztNQUNBLEtBQUssUUFBTCxDQUFjLGVBQWQsQ0FBOEIsU0FBOUIsQ0FBd0MsR0FBeEMsQ0FBNEMsVUFBNUM7TUFFQSw4QkFBSyxRQUFMLENBQWMsWUFBZCxnRkFBNEIsU0FBNUIsQ0FBc0MsR0FBdEMsQ0FBMEMsVUFBMUM7TUFDQSwrQkFBSyxRQUFMLENBQWMsWUFBZCxrRkFBNEIsU0FBNUIsQ0FBc0MsTUFBdEMsQ0FBNkMsVUFBN0M7TUFFQSwrQkFBSyxRQUFMLENBQWMsZ0JBQWQsa0ZBQWdDLFNBQWhDLENBQTBDLEdBQTFDLENBQThDLFVBQTlDO01BQ0EsK0JBQUssUUFBTCxDQUFjLGdCQUFkLGtGQUFnQyxTQUFoQyxDQUEwQyxNQUExQyxDQUFpRCxVQUFqRDtJQUNIOzs7V0FFRCx5QkFBZ0I7TUFBQTs7TUFDWixLQUFLLFFBQUwsQ0FBYyxnQkFBZCxDQUErQixTQUEvQixDQUF5QyxNQUF6QyxDQUFnRCxVQUFoRDtNQUNBLEtBQUssUUFBTCxDQUFjLGdCQUFkLENBQStCLFNBQS9CLENBQXlDLEdBQXpDLENBQTZDLFVBQTdDO01BRUEsK0JBQUssUUFBTCxDQUFjLFlBQWQsa0ZBQTRCLFNBQTVCLENBQXNDLEdBQXRDLENBQTBDLFVBQTFDO01BQ0EsK0JBQUssUUFBTCxDQUFjLFlBQWQsa0ZBQTRCLFNBQTVCLENBQXNDLE1BQXRDLENBQTZDLFVBQTdDO01BRUEsK0JBQUssUUFBTCxDQUFjLGVBQWQsa0ZBQStCLFNBQS9CLENBQXlDLEdBQXpDLENBQTZDLFVBQTdDO01BQ0EsK0JBQUssUUFBTCxDQUFjLGVBQWQsa0ZBQStCLFNBQS9CLENBQXlDLE1BQXpDLENBQWdELFVBQWhEO0lBQ0g7Ozs7RUE5VHVCLGdCOztBQWlVM0IsWUFBRDtBQUNBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixrQkFBeEIsRUFBNEMsWUFBTTtFQUM5QyxJQUFJLGFBQUo7QUFDSCxDQUZEOzs7QUN0VUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY2xhc3MgT1dfQmFzZSB7XG4gICAgI3NldHRpbmdzO1xuICAgIGVsZW1lbnRzO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub25Jbml0KCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIGdldERlZmF1bHRTZXR0aW5ncygpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIGdldERlZmF1bHRFbGVtZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIG9uSW5pdCgpIHtcbiAgICAgICAgdGhpcy4jc2V0dGluZ3MgPSB0aGlzLmdldERlZmF1bHRTZXR0aW5ncygpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0gdGhpcy5nZXREZWZhdWx0RWxlbWVudHMoKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge31cblxuICAgIGdldFNldHRpbmdzKGtleSA9IG51bGwpIHtcbiAgICAgICAgaWYgKCEha2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4jc2V0dGluZ3Nba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLiNzZXR0aW5ncztcbiAgICB9XG5cbiAgICBzZXRTZXR0aW5ncyhzZXR0aW5ncyA9IHt9KSB7XG4gICAgICAgIGlmICghc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuI3NldHRpbmdzID0gT2JqZWN0LmFzc2lnbih0aGlzLiNzZXR0aW5ncywgc2V0dGluZ3MpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT1dfQmFzZTtcbiIsImV4cG9ydCBjb25zdCBzbGlkZURvd24gPSAoZWxlbWVudCwgZHVyYXRpb24gPSAzMDApID0+IHtcbiAgICBsZXQgZGlzcGxheSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmRpc3BsYXk7XG5cbiAgICBpZiAoZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG5cbiAgICBlbGVtZW50LnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9IFwiaGVpZ2h0XCI7XG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBgJHtkdXJhdGlvbn1tc2A7XG5cbiAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XG4gICAgbGV0IGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAwO1xuICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgZWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xuICAgIH0sIDUpO1xuXG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiaGVpZ2h0XCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwib3ZlcmZsb3dcIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNpdGlvbi1wcm9wZXJ0eVwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm9wYWNpdHlcIik7XG4gICAgfSwgZHVyYXRpb24gKyA1MCk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2xpZGVVcCA9IChlbGVtZW50LCBkdXJhdGlvbiA9IDMwMCkgPT4ge1xuICAgIGVsZW1lbnQuc3R5bGUuYm94U2l6aW5nID0gXCJib3JkZXItYm94XCI7XG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSBcImhlaWdodCwgbWFyZ2luXCI7XG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBgJHtkdXJhdGlvbn1tc2A7XG4gICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtlbGVtZW50Lm9mZnNldEhlaWdodH1weGA7XG4gICAgZWxlbWVudC5zdHlsZS5tYXJnaW5Ub3AgPSAwO1xuICAgIGVsZW1lbnQuc3R5bGUubWFyZ2luQm90dG9tID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9IDA7XG4gICAgfSwgNSk7XG5cbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiaGVpZ2h0XCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwibWFyZ2luLXRvcFwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm1hcmdpbi1ib3R0b21cIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvdmVyZmxvd1wiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInRyYW5zaXRpb24tZHVyYXRpb25cIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0cmFuc2l0aW9uLXByb3BlcnR5XCIpO1xuICAgIH0sIGR1cmF0aW9uICsgNTApO1xufTtcblxuZXhwb3J0IGNvbnN0IHNsaWRlVG9nZ2xlID0gKGVsZW1lbnQsIGR1cmF0aW9uKSA9PiB7XG4gICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZGlzcGxheSA9PT0gXCJub25lXCIgPyBzbGlkZURvd24oZWxlbWVudCwgZHVyYXRpb24pIDogc2xpZGVVcChlbGVtZW50LCBkdXJhdGlvbik7XG59O1xuXG5leHBvcnQgY29uc3QgZmFkZUluID0gKGVsZW1lbnQsIF9vcHRpb25zID0ge30pID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICBkaXNwbGF5OiBudWxsLFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBjYWxsYmFjazogbnVsbCxcbiAgICB9O1xuXG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCBfb3B0aW9ucyk7XG5cbiAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IG9wdGlvbnMuZGlzcGxheSB8fCBcImJsb2NrXCI7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gYCR7b3B0aW9ucy5kdXJhdGlvbn1tcyBvcGFjaXR5IGVhc2VgO1xuICAgICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBvcHRpb25zLm9wYWNpdHk7XG4gICAgfSwgNSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInRyYW5zaXRpb25cIik7XG4gICAgICAgICEhb3B0aW9ucy5jYWxsYmFjayAmJiBvcHRpb25zLmNhbGxiYWNrKCk7XG4gICAgfSwgb3B0aW9ucy5kdXJhdGlvbiArIDUwKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmYWRlT3V0ID0gKGVsZW1lbnQsIF9vcHRpb25zID0ge30pID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICBkaXNwbGF5OiBudWxsLFxuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBjYWxsYmFjazogbnVsbCxcbiAgICB9O1xuXG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCBfb3B0aW9ucyk7XG5cbiAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IG9wdGlvbnMuZGlzcGxheSB8fCBcImJsb2NrXCI7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gYCR7b3B0aW9ucy5kdXJhdGlvbn1tcyBvcGFjaXR5IGVhc2VgO1xuICAgICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBvcHRpb25zLm9wYWNpdHk7XG4gICAgfSwgNSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0cmFuc2l0aW9uXCIpO1xuICAgICAgICAhIW9wdGlvbnMuY2FsbGJhY2sgJiYgb3B0aW9ucy5jYWxsYmFjaygpO1xuICAgIH0sIG9wdGlvbnMuZHVyYXRpb24gKyA1MCk7XG59O1xuXG5leHBvcnQgY29uc3QgZmFkZVRvZ2dsZSA9IChlbGVtZW50LCBvcHRpb25zKSA9PiB7XG4gICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZGlzcGxheSA9PT0gXCJub25lXCIgPyBmYWRlSW4oZWxlbWVudCwgb3B0aW9ucykgOiBmYWRlT3V0KGVsZW1lbnQsIG9wdGlvbnMpO1xufTtcbiIsImltcG9ydCBkZWxlZ2F0ZSBmcm9tIFwiZGVsZWdhdGVcIjtcbmltcG9ydCBPV19CYXNlIGZyb20gXCIuL2Jhc2UvYmFzZVwiO1xuaW1wb3J0IHsgZmFkZUluLCBmYWRlT3V0IH0gZnJvbSBcIi4vbGliL3V0aWxzXCI7XG5cbmNsYXNzIE9XX1BvcHVwTG9naW4gZXh0ZW5kcyBPV19CYXNlIHtcbiAgICBnZXREZWZhdWx0U2V0dGluZ3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZWxlY3RvcnM6IHtcbiAgICAgICAgICAgICAgICBwb3B1cExvZ2luOiBcIiNvcGwtbG9naW4tZm9ybVwiLFxuICAgICAgICAgICAgICAgIHBvcHVwTG9naW5Jbm5lcjogXCIjb3BsLWxvZ2luLWZvcm0gLm9wbC1sb2dpbi13cmFwXCIsXG5cbiAgICAgICAgICAgICAgICB0cmlnZ2VyQnV0dG9uczogXCIub3BsLWxpbmssIC5vcGwtbGluay13cmFwIGEsIC5zaWRyLWNsYXNzLW9wbC1saW5rXCIsXG4gICAgICAgICAgICAgICAgY2xvc2VFbGVtZW50czogXCIub3BsLWNsb3NlLWJ1dHRvbiwgLm9wbC1vdmVybGF5XCIsXG4gICAgICAgICAgICAgICAgY3VzdG9tVHJpZ2dlckJ0bjogXCIub3BsLWxpbmstd3JhcCBhXCIsXG5cbiAgICAgICAgICAgICAgICBsb2dpbldyYXBwZXI6IFwiLm9wbC1sb2dpblwiLFxuICAgICAgICAgICAgICAgIGxvZ2luRm9ybTogXCIjb3BsX2xvZ2luX2Zvcm1cIixcbiAgICAgICAgICAgICAgICBsb2dpblVzZXJOYW1lSW5wdXQ6IFwiI29wbF91c2VyX2xvZ2luXCIsXG4gICAgICAgICAgICAgICAgbG9naW5NZXNzYWdlOiBcIi5vcGwtbG9naW4gLm9wbC1lcnJvcnNcIixcbiAgICAgICAgICAgICAgICBiYWNrVG9Mb2dpbkJ1dHRvbnM6IFwiLmxvZ2luLWxpbmtcIixcblxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyV3JhcHBlcjogXCIub3BsLXJlZ2lzdGVyXCIsXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJGb3JtOiBcIiNvcGxfcmVnaXN0cmF0aW9uX2Zvcm1cIixcbiAgICAgICAgICAgICAgICByZWdpc3RlclVzZXJOYW1lSW5wdXQ6IFwiI29wbF9yZWdpc3Rlcl9sb2dpblwiLFxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyTWVzc2FnZTogXCIub3BsLXJlZ2lzdGVyIC5vcGwtZXJyb3JzXCIsXG4gICAgICAgICAgICAgICAgYmFja1RvUmVnaXN0ZXJCdG46IFwiLnJlZ2lzdGVyLWxpbmtcIixcblxuICAgICAgICAgICAgICAgIHJlc2V0UGFzc1dyYXBwZXI6IFwiLm9wbC1yZXNldC1wYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgIHJlc2V0UGFzc0Zvcm06IFwiI29wbF9yZXNldF9wYXNzd29yZF9mb3JtXCIsXG4gICAgICAgICAgICAgICAgcmVzZXRQYXNzVXNlck5hbWVJbnB1dDogXCIjb3BsX3VzZXJfb3JfZW1haWxcIixcbiAgICAgICAgICAgICAgICByZXNldFBhc3NNZXNzYWdlOiBcIi5vcGwtcmVzZXQtcGFzc3dvcmQgLm9wbC1lcnJvcnNcIixcbiAgICAgICAgICAgICAgICBiYWNrVG9SZXNldFBhc3NCdG46IFwiLmZvcmdvdC1wYXNzLWxpbmtcIixcblxuICAgICAgICAgICAgICAgIGlucHV0czogXCIuaW5wdXQtbGdcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlczogXCIub3BsLWVycm9yc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9jZWFud3BMb2NhbGl6ZSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXREZWZhdWx0RWxlbWVudHMoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuZ2V0U2V0dGluZ3MoXCJzZWxlY3RvcnNcIik7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBvcHVwTG9naW46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnBvcHVwTG9naW4pLFxuICAgICAgICAgICAgcG9wdXBMb2dpbklubmVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5wb3B1cExvZ2luSW5uZXIpLFxuXG4gICAgICAgICAgICB0cmlnZ2VyQnV0dG9uczogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcnMudHJpZ2dlckJ1dHRvbnMpLFxuICAgICAgICAgICAgY2xvc2VFbGVtZW50czogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcnMuY2xvc2VFbGVtZW50cyksXG4gICAgICAgICAgICBjdXN0b21UcmlnZ2VyQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5jdXN0b21UcmlnZ2VyQnRuKSxcblxuICAgICAgICAgICAgbG9naW5XcmFwcGVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5sb2dpbldyYXBwZXIpLFxuICAgICAgICAgICAgbG9naW5Gb3JtOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5sb2dpbkZvcm0pLFxuICAgICAgICAgICAgbG9naW5Vc2VyTmFtZUlucHV0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5sb2dpblVzZXJOYW1lSW5wdXQpLFxuICAgICAgICAgICAgbG9naW5NZXNzYWdlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5sb2dpbk1lc3NhZ2UpLFxuICAgICAgICAgICAgYmFja1RvTG9naW5CdXR0b25zOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9ycy5iYWNrVG9Mb2dpbkJ1dHRvbnMpLFxuXG4gICAgICAgICAgICByZWdpc3RlcldyYXBwZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnJlZ2lzdGVyV3JhcHBlciksXG4gICAgICAgICAgICByZWdpc3RlckZvcm06IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnJlZ2lzdGVyRm9ybSksXG4gICAgICAgICAgICByZWdpc3RlclVzZXJOYW1lSW5wdXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnJlZ2lzdGVyVXNlck5hbWVJbnB1dCksXG4gICAgICAgICAgICByZWdpc3Rlck1lc3NhZ2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnJlZ2lzdGVyTWVzc2FnZSksXG4gICAgICAgICAgICBiYWNrVG9SZWdpc3RlckJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuYmFja1RvUmVnaXN0ZXJCdG4pLFxuXG4gICAgICAgICAgICByZXNldFBhc3NXcmFwcGVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5yZXNldFBhc3NXcmFwcGVyKSxcbiAgICAgICAgICAgIHJlc2V0UGFzc1VzZXJOYW1lSW5wdXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnJlc2V0UGFzc1VzZXJOYW1lSW5wdXQpLFxuICAgICAgICAgICAgcmVzZXRQYXNzRm9ybTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMucmVzZXRQYXNzRm9ybSksXG4gICAgICAgICAgICByZXNldFBhc3NNZXNzYWdlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5yZXNldFBhc3NNZXNzYWdlKSxcbiAgICAgICAgICAgIGJhY2tUb1Jlc2V0UGFzc0J0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuYmFja1RvUmVzZXRQYXNzQnRuKSxcblxuICAgICAgICAgICAgaW5wdXRzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9ycy5pbnB1dHMpLFxuICAgICAgICAgICAgbWVzc2FnZXM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JzLm1lc3NhZ2VzKSxcblxuICAgICAgICAgICAgaHRtbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIiksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25Jbml0KCkge1xuICAgICAgICBzdXBlci5vbkluaXQoKTtcblxuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRTZXR0aW5ncyhcIm9wdGlvbnNcIik7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMubG9nZ2VkSW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBsb2dpbiBmb3JtIElEIHRvIGN1c3RvbSBsaW5rIGhyZWYuXG4gICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuZ2V0U2V0dGluZ3MoXCJzZWxlY3RvcnNcIik7XG4gICAgICAgIHRoaXMuZWxlbWVudHMuY3VzdG9tVHJpZ2dlckJ0bj8uc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBzZWxlY3RvcnMucG9wdXBMb2dpbik7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5nZXRTZXR0aW5ncyhcInNlbGVjdG9yc1wiKTtcblxuICAgICAgICAvLyBDbGljayBvbiB0cmlnZ2VycyBidXR0b25zLlxuICAgICAgICBkZWxlZ2F0ZShkb2N1bWVudC5ib2R5LCBzZWxlY3RvcnMudHJpZ2dlckJ1dHRvbnMsIFwiY2xpY2tcIiwgdGhpcy5vcGVuUG9wdXAuYmluZCh0aGlzKSk7XG4gICAgICAgIGRlbGVnYXRlKGRvY3VtZW50LmJvZHksIHNlbGVjdG9ycy50cmlnZ2VyQnV0dG9ucywgXCJ0b3VjaGVuZFwiLCB0aGlzLm9wZW5Qb3B1cC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBDbGljayBvbiBjbG9zZSBlbGVtZW50cy5cbiAgICAgICAgdGhpcy5lbGVtZW50cy5jbG9zZUVsZW1lbnRzPy5mb3JFYWNoKChjbG9zZUVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNsb3NlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbG9zZVBvcHVwLmJpbmQodGhpcykpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDbGljayBvbiBiYWNrIHRvIGxvZ2luIGJ1dHRvbi5cbiAgICAgICAgdGhpcy5lbGVtZW50cy5iYWNrVG9Mb2dpbkJ1dHRvbnM/LmZvckVhY2goKGJhY2tUb0xvZ2luQnRuKSA9PiB7XG4gICAgICAgICAgICBiYWNrVG9Mb2dpbkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkJhY2tUb0xvZ2luQnRuQ2xpY2suYmluZCh0aGlzKSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBDbGljayBvbiBiYWNrIHRvIHJlZ2lzdGVyIGJ1dHRvbi5cbiAgICAgICAgdGhpcy5lbGVtZW50cy5iYWNrVG9SZWdpc3RlckJ0bj8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25CYWNrVG9SZWdpc3RlckJ0bkNsaWNrLmJpbmQodGhpcykpO1xuICAgICAgICAvLyBDbGljayBvbiBiYWNrIHRvIHJlc2V0IHBhc3N3b3JkIGJ1dHRvbi5cbiAgICAgICAgdGhpcy5lbGVtZW50cy5iYWNrVG9SZXNldFBhc3NCdG4/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQmFja1RvUmVzZXRQYXNzQnRuQ2xpY2suYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gU3VibWl0IGxvZ2luIGZvcm0uXG4gICAgICAgIHRoaXMuZWxlbWVudHMubG9naW5Gb3JtPy5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMub25Mb2dpbkZvcm1TdWJtaXQuYmluZCh0aGlzKSk7XG4gICAgICAgIC8vIFN1Ym1pdCByZWdpc3RlciBmb3JtLlxuICAgICAgICB0aGlzLmVsZW1lbnRzLnJlZ2lzdGVyRm9ybT8uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLm9uUmVnaXN0ZXJGb3JtU3VibWl0LmJpbmQodGhpcykpO1xuICAgICAgICAvLyBTdWJtaXQgcmVzZXQgcGFzc3dvcmQgZm9ybS5cbiAgICAgICAgdGhpcy5lbGVtZW50cy5yZXNldFBhc3NGb3JtPy5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMub25SZXNldFBhc3NGb3JtU3VibWl0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIG9wZW5Qb3B1cChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudHMuaHRtbC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICAgIHRoaXMuZWxlbWVudHMucG9wdXBMb2dpbi5jbGFzc0xpc3QuYWRkKFwiaXMtdmlzaWJsZVwiKTtcblxuICAgICAgICBmYWRlSW4odGhpcy5lbGVtZW50cy5wb3B1cExvZ2luKTtcbiAgICAgICAgdGhpcy5zaG93TG9naW4oKTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRzLmxvZ2luVXNlck5hbWVJbnB1dC5mb2N1cygpO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudHMubWVzc2FnZXMuZm9yRWFjaCgoZXJyb3JNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2Uuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRzLmlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbG9zZVBvcHVwKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmh0bWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvdmVyZmxvd1wiKTtcbiAgICAgICAgfSwgMzAwKTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRzLnBvcHVwTG9naW4uY2xhc3NMaXN0LnJlbW92ZShcImlzLXZpc2libGVcIik7XG4gICAgICAgIGZhZGVPdXQodGhpcy5lbGVtZW50cy5wb3B1cExvZ2luKTtcbiAgICB9XG5cbiAgICBvbkJhY2tUb0xvZ2luQnRuQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLnNob3dMb2dpbigpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5sb2dpblVzZXJOYW1lSW5wdXQuZm9jdXMoKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG5cbiAgICBvbkJhY2tUb1JlZ2lzdGVyQnRuQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLnNob3dSZWdpc3RlcigpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5yZWdpc3RlclVzZXJOYW1lSW5wdXQuZm9jdXMoKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG5cbiAgICBvbkJhY2tUb1Jlc2V0UGFzc0J0bkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5zaG93UmVzZXRQYXNzKCk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLnJlc2V0UGFzc1VzZXJOYW1lSW5wdXQuZm9jdXMoKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG5cbiAgICBjYXB0Y2hhVjNWYWxpZGF0ZShmb3JtKSB7XG4gICAgICAgIGlmICghalF1ZXJ5KGZvcm0pLmhhc0NsYXNzKCd2YWxpZGF0ZWQnKSkge1xuICAgICAgICAgIGdyZWNhcHRjaGEucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZ3JlY2FwdGNoYS5leGVjdXRlKFJlY2FwdGNoYVYzSW5pdFBhcmFtLmtleSwgeyBhY3Rpb246ICdzdWJtaXQnIH0pLnRoZW4oZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICAgIGpRdWVyeShmb3JtKS5maW5kKCcuZy1yZWNhcHRjaGEtcmVzcG9uc2UnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgalF1ZXJ5KGZvcm0pLmFwcGVuZChqUXVlcnkoJzx0ZXh0YXJlYT4nLCB7XG4gICAgICAgICAgICAgICAgaWQ6ICdnLXJlY2FwdGNoYS1yZXNwb25zZScsXG4gICAgICAgICAgICAgICAgY2xhc3M6ICdnLXJlY2FwdGNoYS1yZXNwb25zZScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ2ctcmVjYXB0Y2hhLXJlc3BvbnNlJyxcbiAgICAgICAgICAgICAgICBzdHlsZTogJ3dpZHRoOiAyNTBweDsgaGVpZ2h0OiA0MHB4OyBib3JkZXI6IDFweCBzb2xpZCByZ2IoMTkzLCAxOTMsIDE5Myk7IG1hcmdpbjogMTBweCAyNXB4OyBwYWRkaW5nOiAwcHg7IHJlc2l6ZTogbm9uZTsgZGlzcGxheTogbm9uZTsnLFxuICAgICAgICAgICAgICB9KS52YWwodG9rZW4pKTtcbiAgICAgICAgICAgICAgalF1ZXJ5KGZvcm0pLmFkZENsYXNzKCd2YWxpZGF0ZWQnKTtcbiAgICAgICAgICAgICAgY29uc3QgZm9ybUlkID0galF1ZXJ5KGZvcm0pLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICAgIGlmKCBmb3JtSWQgPT09ICdvcGxfcmVnaXN0cmF0aW9uX2Zvcm0nICkge1xuICAgICAgICAgICAgICAgIGpRdWVyeShmb3JtKS5maW5kKCcjcmVnaXN0ZXJfYnV0dG9uJykuY2xpY2soKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmKCBmb3JtSWQgPT09ICdvcGxfbG9naW5fZm9ybScgKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KGZvcm0pLmZpbmQoJyNsb2dpbl9idXR0b24nKS5jbGljaygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9naW5Gb3JtU3VibWl0KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmKHR5cGVvZiBSZWNhcHRjaGFWM0luaXRQYXJhbSE9PSd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIFJlY2FwdGNoYVYzSW5pdFBhcmFtICE9IFJlY2FwdGNoYVYzSW5pdFBhcmFtLmtleSkge1xuICAgICAgICAgICAgICB0aGlzLmNhcHRjaGFWM1ZhbGlkYXRlKGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiggIWpRdWVyeShldmVudC50YXJnZXQpLmhhc0NsYXNzKCd2YWxpZGF0ZWQnKSApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldFNldHRpbmdzKFwib3B0aW9uc1wiKTtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEodGhpcy5lbGVtZW50cy5sb2dpbkZvcm0pO1xuICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSB0aGlzLmVsZW1lbnRzLmxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpO1xuICAgICAgICBjb25zdCBsb2dpblRleHQgPSBzdWJtaXRCdG4uaW5uZXJIVE1MO1xuICAgICAgICBjb25zdCBsb2dpbkxvYWRpbmdUZXh0ID0gc3VibWl0QnRuLmRhdGFzZXQubG9hZGluZ1RleHQ7XG5cbiAgICAgICAgc3VibWl0QnRuLmlubmVySFRNTCA9IGxvZ2luTG9hZGluZ1RleHQ7XG5cbiAgICAgICAgYXhpb3MucG9zdChvcHRpb25zLmFqYXhVUkwsIGZvcm1EYXRhKS50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5sb2dpbk1lc3NhZ2Uuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMubG9naW5NZXNzYWdlLmlubmVySFRNTCA9IGRhdGEubWVzc2FnZTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3IgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVkaXJlY3RUbyA9IHRoaXMuZWxlbWVudHMubG9naW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJyZWRpcmVjdF90b1wiXScpPy52YWx1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMucG9wdXBMb2dpbklubmVyLmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nXCIpO1xuICAgICAgICAgICAgICAgICEhcmVkaXJlY3RUbyA/ICh3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZGlyZWN0VG8pIDogd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3VibWl0QnRuLmlubmVySFRNTCA9IGxvZ2luVGV4dDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25SZWdpc3RlckZvcm1TdWJtaXQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZih0eXBlb2YgUmVjYXB0Y2hhVjNJbml0UGFyYW0hPT0ndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBSZWNhcHRjaGFWM0luaXRQYXJhbSAhPSBSZWNhcHRjaGFWM0luaXRQYXJhbS5rZXkpIHtcbiAgICAgICAgICAgICAgdGhpcy5jYXB0Y2hhVjNWYWxpZGF0ZShldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoICFqUXVlcnkoZXZlbnQudGFyZ2V0KS5oYXNDbGFzcygndmFsaWRhdGVkJykgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldFNldHRpbmdzKFwib3B0aW9uc1wiKTtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEodGhpcy5lbGVtZW50cy5yZWdpc3RlckZvcm0pO1xuICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSB0aGlzLmVsZW1lbnRzLnJlZ2lzdGVyRm9ybS5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpO1xuICAgICAgICBjb25zdCByZWdpc3RlclRleHQgPSBzdWJtaXRCdG4uaW5uZXJIVE1MO1xuICAgICAgICBjb25zdCByZWdpc3RlckxvYWRpbmdUZXh0ID0gc3VibWl0QnRuLmRhdGFzZXQubG9hZGluZ1RleHQ7XG5cbiAgICAgICAgc3VibWl0QnRuLmlubmVySFRNTCA9IHJlZ2lzdGVyTG9hZGluZ1RleHQ7XG5cbiAgICAgICAgYXhpb3MucG9zdChvcHRpb25zLmFqYXhVUkwsIGZvcm1EYXRhKS50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5yZWdpc3Rlck1lc3NhZ2Uuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMucmVnaXN0ZXJNZXNzYWdlLmlubmVySFRNTCA9IGRhdGEubWVzc2FnZTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3IgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVkaXJlY3RUbyA9IHRoaXMuZWxlbWVudHMucmVnaXN0ZXJGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJyZWRpcmVjdF90b1wiXScpPy52YWx1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMucG9wdXBMb2dpbklubmVyLmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nXCIpO1xuICAgICAgICAgICAgICAgICEhcmVkaXJlY3RUbyA/ICh3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZGlyZWN0VG8pIDogd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3VibWl0QnRuLmlubmVySFRNTCA9IHJlZ2lzdGVyVGV4dDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25SZXNldFBhc3NGb3JtU3VibWl0KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0U2V0dGluZ3MoXCJvcHRpb25zXCIpO1xuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSh0aGlzLmVsZW1lbnRzLnJlc2V0UGFzc0Zvcm0pO1xuICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSB0aGlzLmVsZW1lbnRzLnJlc2V0UGFzc0Zvcm0ucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKTtcbiAgICAgICAgY29uc3QgcmVzZXRQYXNzVGV4dCA9IHN1Ym1pdEJ0bi5pbm5lckhUTUw7XG4gICAgICAgIGNvbnN0IHJlc2V0UGFzc0xvYWRpbmdUZXh0ID0gc3VibWl0QnRuLmRhdGFzZXQubG9hZGluZ1RleHQ7XG5cbiAgICAgICAgc3VibWl0QnRuLmlubmVySFRNTCA9IHJlc2V0UGFzc0xvYWRpbmdUZXh0O1xuXG4gICAgICAgIGF4aW9zLnBvc3Qob3B0aW9ucy5hamF4VVJMLCBmb3JtRGF0YSkudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMucmVzZXRQYXNzTWVzc2FnZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5yZXNldFBhc3NNZXNzYWdlLmlubmVySFRNTCA9IGRhdGEubWVzc2FnZTtcblxuICAgICAgICAgICAgc3VibWl0QnRuLmlubmVySFRNTCA9IHJlc2V0UGFzc1RleHQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3dMb2dpbigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5sb2dpbldyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wbC1oaWRlXCIpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLmxvZ2luV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwib3BsLXNob3dcIik7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50cy5yZWdpc3RlcldyYXBwZXI/LmNsYXNzTGlzdC5hZGQoXCJvcGwtaGlkZVwiKTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5yZWdpc3RlcldyYXBwZXI/LmNsYXNzTGlzdC5yZW1vdmUoXCJvcGwtc2hvd1wiKTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRzLnJlc2V0UGFzc1dyYXBwZXI/LmNsYXNzTGlzdC5hZGQoXCJvcGwtaGlkZVwiKTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5yZXNldFBhc3NXcmFwcGVyPy5jbGFzc0xpc3QucmVtb3ZlKFwib3BsLXNob3dcIik7XG4gICAgfVxuXG4gICAgc2hvd1JlZ2lzdGVyKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRzLnJlZ2lzdGVyV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwib3BsLWhpZGVcIik7XG4gICAgICAgIHRoaXMuZWxlbWVudHMucmVnaXN0ZXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJvcGwtc2hvd1wiKTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRzLmxvZ2luV3JhcHBlcj8uY2xhc3NMaXN0LmFkZChcIm9wbC1oaWRlXCIpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLmxvZ2luV3JhcHBlcj8uY2xhc3NMaXN0LnJlbW92ZShcIm9wbC1zaG93XCIpO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudHMucmVzZXRQYXNzV3JhcHBlcj8uY2xhc3NMaXN0LmFkZChcIm9wbC1oaWRlXCIpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLnJlc2V0UGFzc1dyYXBwZXI/LmNsYXNzTGlzdC5yZW1vdmUoXCJvcGwtc2hvd1wiKTtcbiAgICB9XG5cbiAgICBzaG93UmVzZXRQYXNzKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRzLnJlc2V0UGFzc1dyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wbC1oaWRlXCIpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLnJlc2V0UGFzc1dyYXBwZXIuY2xhc3NMaXN0LmFkZChcIm9wbC1zaG93XCIpO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudHMubG9naW5XcmFwcGVyPy5jbGFzc0xpc3QuYWRkKFwib3BsLWhpZGVcIik7XG4gICAgICAgIHRoaXMuZWxlbWVudHMubG9naW5XcmFwcGVyPy5jbGFzc0xpc3QucmVtb3ZlKFwib3BsLXNob3dcIik7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50cy5yZWdpc3RlcldyYXBwZXI/LmNsYXNzTGlzdC5hZGQoXCJvcGwtaGlkZVwiKTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5yZWdpc3RlcldyYXBwZXI/LmNsYXNzTGlzdC5yZW1vdmUoXCJvcGwtc2hvd1wiKTtcbiAgICB9XG59XG5cbihcInVzZSBzY3JpcHRcIik7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIG5ldyBPV19Qb3B1cExvZ2luKCk7XG59KTtcbiIsInZhciBET0NVTUVOVF9OT0RFX1RZUEUgPSA5O1xuXG4vKipcbiAqIEEgcG9seWZpbGwgZm9yIEVsZW1lbnQubWF0Y2hlcygpXG4gKi9cbmlmICh0eXBlb2YgRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcbiAgICB2YXIgcHJvdG8gPSBFbGVtZW50LnByb3RvdHlwZTtcblxuICAgIHByb3RvLm1hdGNoZXMgPSBwcm90by5tYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvdG8ubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb3RvLm9NYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvdG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xufVxuXG4vKipcbiAqIEZpbmRzIHRoZSBjbG9zZXN0IHBhcmVudCB0aGF0IG1hdGNoZXMgYSBzZWxlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGNsb3Nlc3QgKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgd2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlVHlwZSAhPT0gRE9DVU1FTlRfTk9ERV9UWVBFKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZWxlbWVudC5tYXRjaGVzID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAgICAgICBlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvc2VzdDtcbiIsInZhciBjbG9zZXN0ID0gcmVxdWlyZSgnLi9jbG9zZXN0Jyk7XG5cbi8qKlxuICogRGVsZWdhdGVzIGV2ZW50IHRvIGEgc2VsZWN0b3IuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHBhcmFtIHtCb29sZWFufSB1c2VDYXB0dXJlXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIF9kZWxlZ2F0ZShlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcbiAgICB2YXIgbGlzdGVuZXJGbiA9IGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lckZuLCB1c2VDYXB0dXJlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBEZWxlZ2F0ZXMgZXZlbnQgdG8gYSBzZWxlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR8U3RyaW5nfEFycmF5fSBbZWxlbWVudHNdXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHBhcmFtIHtCb29sZWFufSB1c2VDYXB0dXJlXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGRlbGVnYXRlKGVsZW1lbnRzLCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcbiAgICAvLyBIYW5kbGUgdGhlIHJlZ3VsYXIgRWxlbWVudCB1c2FnZVxuICAgIGlmICh0eXBlb2YgZWxlbWVudHMuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gX2RlbGVnYXRlLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIEVsZW1lbnQtbGVzcyB1c2FnZSwgaXQgZGVmYXVsdHMgdG8gZ2xvYmFsIGRlbGVnYXRpb25cbiAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gVXNlIGBkb2N1bWVudGAgYXMgdGhlIGZpcnN0IHBhcmFtZXRlciwgdGhlbiBhcHBseSBhcmd1bWVudHNcbiAgICAgICAgLy8gVGhpcyBpcyBhIHNob3J0IHdheSB0byAudW5zaGlmdCBgYXJndW1lbnRzYCB3aXRob3V0IHJ1bm5pbmcgaW50byBkZW9wdGltaXphdGlvbnNcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZS5iaW5kKG51bGwsIGRvY3VtZW50KS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBTZWxlY3Rvci1iYXNlZCB1c2FnZVxuICAgIGlmICh0eXBlb2YgZWxlbWVudHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIEFycmF5LWxpa2UgYmFzZWQgdXNhZ2VcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gX2RlbGVnYXRlKGVsZW1lbnQsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogRmluZHMgY2xvc2VzdCBtYXRjaCBhbmQgaW52b2tlcyBjYWxsYmFjay5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gbGlzdGVuZXIoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5kZWxlZ2F0ZVRhcmdldCA9IGNsb3Nlc3QoZS50YXJnZXQsIHNlbGVjdG9yKTtcblxuICAgICAgICBpZiAoZS5kZWxlZ2F0ZVRhcmdldCkge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChlbGVtZW50LCBlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWxlZ2F0ZTtcbiJdfQ==
