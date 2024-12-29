import delegate from "delegate";
import OW_Base from "./base/base";
import { fadeIn, fadeOut } from "./lib/utils";

class OW_PopupLogin extends OW_Base {
    getDefaultSettings() {
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
                messages: ".opl-errors",
            },
            options: oceanwpLocalize,
        };
    }

    getDefaultElements() {
        const selectors = this.getSettings("selectors");

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

            html: document.querySelector("html"),
        };
    }

    onInit() {
        super.onInit();

        const options = this.getSettings("options");

        if (options.loggedIn) {
            return;
        }

        // Add login form ID to custom link href.
        const selectors = this.getSettings("selectors");
        this.elements.customTriggerBtn?.setAttribute("href", selectors.popupLogin);
    }

    bindEvents() {
        const selectors = this.getSettings("selectors");

        // Click on triggers buttons.
        delegate(document.body, selectors.triggerButtons, "click", this.openPopup.bind(this));
        delegate(document.body, selectors.triggerButtons, "touchend", this.openPopup.bind(this));

        // Click on close elements.
        this.elements.closeElements?.forEach((closeElement) => {
            closeElement.addEventListener("click", this.closePopup.bind(this));
        });

        // Click on back to login button.
        this.elements.backToLoginButtons?.forEach((backToLoginBtn) => {
            backToLoginBtn.addEventListener("click", this.onBackToLoginBtnClick.bind(this));
        });
        // Click on back to register button.
        this.elements.backToRegisterBtn?.addEventListener("click", this.onBackToRegisterBtnClick.bind(this));
        // Click on back to reset password button.
        this.elements.backToResetPassBtn?.addEventListener("click", this.onBackToResetPassBtnClick.bind(this));

        // Submit login form.
        this.elements.loginForm?.addEventListener("submit", this.onLoginFormSubmit.bind(this));
        // Submit register form.
        this.elements.registerForm?.addEventListener("submit", this.onRegisterFormSubmit.bind(this));
        // Submit reset password form.
        this.elements.resetPassForm?.addEventListener("submit", this.onResetPassFormSubmit.bind(this));
    }

    openPopup(event) {
        event.preventDefault();

        this.elements.html.style.overflow = "hidden";
        this.elements.popupLogin.classList.add("is-visible");

        fadeIn(this.elements.popupLogin);
        this.showLogin();

        this.elements.loginUserNameInput.focus();

        this.elements.messages.forEach((errorMessage) => {
            errorMessage.style.display = "none";
        });

        this.elements.inputs.forEach((input) => {
            input.value = "";
        });
    }

    closePopup(event) {
        event.preventDefault();

        setTimeout(() => {
            this.elements.html.style.removeProperty("overflow");
        }, 300);

        this.elements.popupLogin.classList.remove("is-visible");
        fadeOut(this.elements.popupLogin);
    }

    onBackToLoginBtnClick(event) {
        event.preventDefault();

        this.showLogin();

        setTimeout(() => {
            this.elements.loginUserNameInput.focus();
        }, 100);
    }

    onBackToRegisterBtnClick(event) {
        event.preventDefault();

        this.showRegister();

        setTimeout(() => {
            this.elements.registerUserNameInput.focus();
        }, 100);
    }

    onBackToResetPassBtnClick(event) {
        event.preventDefault();

        this.showResetPass();

        setTimeout(() => {
            this.elements.resetPassUserNameInput.focus();
        }, 100);
    }

    captchaV3Validate(form) {
        if (!jQuery(form).hasClass('validated')) {
          grecaptcha.ready(function () {
            grecaptcha.execute(RecaptchaV3InitParam.key, { action: 'submit' }).then(function (token) {
              jQuery(form).find('.g-recaptcha-response').remove();
              jQuery(form).append(jQuery('<textarea>', {
                id: 'g-recaptcha-response',
                class: 'g-recaptcha-response',
                name: 'g-recaptcha-response',
                style: 'width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;',
              }).val(token));
              jQuery(form).addClass('validated');
              const formId = jQuery(form).attr('id');
              if( formId === 'opl_registration_form' ) {
                jQuery(form).find('#register_button').click();
              } else if( formId === 'opl_login_form' ) {
                jQuery(form).find('#login_button').click();
              }
            });
          });
        }
    }

    onLoginFormSubmit(event) {
        event.preventDefault();
        if(typeof RecaptchaV3InitParam!=='undefined') {
            if (typeof RecaptchaV3InitParam != RecaptchaV3InitParam.key) {
              this.captchaV3Validate(event.target);
            }
            if( !jQuery(event.target).hasClass('validated') ) {
              return false;
            }
        }
          
        const options = this.getSettings("options");
        const formData = new FormData(this.elements.loginForm);
        const submitBtn = this.elements.loginForm.querySelector("button");
        const loginText = submitBtn.innerHTML;
        const loginLoadingText = submitBtn.dataset.loadingText;

        submitBtn.innerHTML = loginLoadingText;

        axios.post(options.ajaxURL, formData).then(({ data }) => {
            this.elements.loginMessage.style.display = "block";
            this.elements.loginMessage.innerHTML = data.message;

            if (data.error === false) {
                const redirectTo = this.elements.loginForm.querySelector('input[name="redirect_to"]')?.value;

                this.elements.popupLoginInner.classList.add("loading");
                !!redirectTo ? (window.location.href = redirectTo) : window.location.reload(true);
            }

            submitBtn.innerHTML = loginText;
        });
    }

    onRegisterFormSubmit(event) {
        event.preventDefault();

        if(typeof RecaptchaV3InitParam!=='undefined') {
            if (typeof RecaptchaV3InitParam != RecaptchaV3InitParam.key) {
              this.captchaV3Validate(event.target);
            }
            if( !jQuery(event.target).hasClass('validated') ) {
              return false;
            }
        }

        const options = this.getSettings("options");
        const formData = new FormData(this.elements.registerForm);
        const submitBtn = this.elements.registerForm.querySelector("button");
        const registerText = submitBtn.innerHTML;
        const registerLoadingText = submitBtn.dataset.loadingText;

        submitBtn.innerHTML = registerLoadingText;

        axios.post(options.ajaxURL, formData).then(({ data }) => {
            this.elements.registerMessage.style.display = "block";
            this.elements.registerMessage.innerHTML = data.message;

            if (data.error === false) {
                const redirectTo = this.elements.registerForm.querySelector('input[name="redirect_to"]')?.value;

                this.elements.popupLoginInner.classList.add("loading");
                !!redirectTo ? (window.location.href = redirectTo) : window.location.reload(true);
            }

            submitBtn.innerHTML = registerText;
        });
    }

    onResetPassFormSubmit(event) {
        event.preventDefault();

        const options = this.getSettings("options");
        const formData = new FormData(this.elements.resetPassForm);
        const submitBtn = this.elements.resetPassForm.querySelector("button");
        const resetPassText = submitBtn.innerHTML;
        const resetPassLoadingText = submitBtn.dataset.loadingText;

        submitBtn.innerHTML = resetPassLoadingText;

        axios.post(options.ajaxURL, formData).then(({ data }) => {
            this.elements.resetPassMessage.style.display = "block";
            this.elements.resetPassMessage.innerHTML = data.message;

            submitBtn.innerHTML = resetPassText;
        });
    }

    showLogin() {
        this.elements.loginWrapper.classList.remove("opl-hide");
        this.elements.loginWrapper.classList.add("opl-show");

        this.elements.registerWrapper?.classList.add("opl-hide");
        this.elements.registerWrapper?.classList.remove("opl-show");

        this.elements.resetPassWrapper?.classList.add("opl-hide");
        this.elements.resetPassWrapper?.classList.remove("opl-show");
    }

    showRegister() {
        this.elements.registerWrapper.classList.remove("opl-hide");
        this.elements.registerWrapper.classList.add("opl-show");

        this.elements.loginWrapper?.classList.add("opl-hide");
        this.elements.loginWrapper?.classList.remove("opl-show");

        this.elements.resetPassWrapper?.classList.add("opl-hide");
        this.elements.resetPassWrapper?.classList.remove("opl-show");
    }

    showResetPass() {
        this.elements.resetPassWrapper.classList.remove("opl-hide");
        this.elements.resetPassWrapper.classList.add("opl-show");

        this.elements.loginWrapper?.classList.add("opl-hide");
        this.elements.loginWrapper?.classList.remove("opl-show");

        this.elements.registerWrapper?.classList.add("opl-hide");
        this.elements.registerWrapper?.classList.remove("opl-show");
    }
}

("use script");
window.addEventListener("DOMContentLoaded", () => {
    new OW_PopupLogin();
});
