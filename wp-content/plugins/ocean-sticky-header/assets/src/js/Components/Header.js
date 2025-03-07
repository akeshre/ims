// header.js
import DOM from "../Utils/DOM";
import Utility from "../Utils/Utility";
import Helpers from "../Utils/Helpers";

export default class Header {
    #lastScrolBarPosition = 0;

    getHeaderHeight = () => {

      if (window.innerWidth <= 480) {
        return 43;
      }
      let totalHeight = 0;

      if (DOM.header && (DOM.header.classList.contains('transparent-header') || DOM.header.classList.contains('full_screen-header')) && DOM.header.hasAttribute('data-height')) {
          totalHeight += parseInt(DOM.header.getAttribute('data-height'), 10) + 1;
      } else if (DOM.header && (DOM.header.classList.contains('medium-header')  && DOM.header.hasAttribute('data-height')) ){
          const siteHeader = document.getElementById('site-header');
          totalHeight += siteHeader.offsetHeight / 2 - 32;
      } else if (DOM.header && (DOM.header.classList.contains('center-header')  && DOM.header.hasAttribute('data-height')) ){
          const siteHeader = document.getElementById('site-header');
          // totalHeight += siteHeader.offsetHeight - 60;
          totalHeight += siteHeader.offsetHeight;
      } else if (DOM.header.classList.contains('minimal-header')) {
          const siteHeader = document.getElementById('site-header');
          const stickyHeaderHolder = document.querySelector('.oceanwp-sticky-header-holder');
          if (stickyHeaderHolder && stickyHeaderHolder.classList.contains('is-sticky')) {
              totalHeight += parseInt(DOM.header.getAttribute('data-height'), 10);
          } else {
              totalHeight += siteHeader.offsetHeight;
          }
      } else if (DOM.header.classList.contains('vertical-header')) {
        totalHeight = 0;
      } else if (DOM.header) { // Fallback to offsetHeight if condition isn't met
          totalHeight += DOM.header.offsetHeight;
      }


      // Get WP Adminbar height
      const adminBar = document.getElementById('wpadminbar');
      if (adminBar) {
          totalHeight += adminBar.offsetHeight;
      }

      // console.log("Sticky Header Height:", totalHeight);
      return totalHeight;
  };


    sticky = () => {
        if (this.#noSticky()) {
            return;
        }

        if (!(DOM.headerWrapper || DOM.siteHeader || DOM.header)) {
            return;
        }

        let currentPosition = Utility.elemOffset(DOM.headerWrapper).top - Header.getOffset();
        let slideStickyCurrentPosition = currentPosition;

        // If slide effect
        if (Helpers.slideStickyEffect() && !DOM.siteHeader?.classList.contains("vertical-header")) {
            currentPosition = currentPosition + DOM.headerWrapper.offsetHeight;
        }

        // When scrolling
        if (Utility.scrollBarTopPosition() !== 0 && Utility.scrollBarTopPosition() >= currentPosition) {
            DOM.headerWrapper.classList.add("is-sticky");

            DOM.header.style.top = Header.getOffset() + "px";
            DOM.header.style.width = DOM.headerWrapper.offsetWidth + "px";

            // If slide effect
            if (Helpers.slideStickyEffect() && !DOM.siteHeader.classList.contains("vertical-header")) {
                DOM.siteHeader.classList.add("show");
            }
        } else {
            // If is not slide effect
            if (!Helpers.slideStickyEffect()) {
                // Remove sticky wrap class
                DOM.headerWrapper.classList.remove("is-sticky");

                DOM.header.style.top = "";
                DOM.header.style.width = "";
            }
        }

        // If slide effect
        if (Helpers.slideStickyEffect() && !DOM.siteHeader.classList.contains("vertical-header")) {
            // Remove sticky class when window top
            if (Utility.scrollBarTopPosition() <= slideStickyCurrentPosition) {
                // Remove sticky wrap class
                DOM.headerWrapper.classList.remove("is-sticky");

                DOM.header.style.top = "";
                DOM.header.style.width = "";

                // Remove slide effect class
                DOM.siteHeader.classList.remove("show");
            }
        }
    };

    updateSticky = () => {
        // Return if is vertical header style
        if (window.innerWidth > 960 && DOM.siteHeader?.classList.contains("vertical-header")) {
            return;
        }

        if (!DOM.headerWrapper?.classList.contains("is-sticky") && !!DOM.header) {
            if ( DOM.headerWrapper ) {
                DOM.headerWrapper.style.height = DOM.header.offsetHeight + "px";
            }
        }

        if (Utility.scrollBarTopPosition() !== 0) {
            if (!!DOM.header && !!DOM.headerWrapper) {
                DOM.header.style.top = Header.getOffset() + "px";
                DOM.header.style.width = DOM.headerWrapper.offsetWidth + "px";
            }
        }
    };

    addVerticalHeaderSticky = () => {
        // Return if is not vertical header style and transparent
        if (!DOM.verticalHeader?.classList.contains("is-transparent")) {
            return;
        }

        // Return if no header wrapper
        if (!DOM.headerWrapper) {
            return;
        }

        let currentPosition = Utility.elemOffset(DOM.headerWrapper).top;

        // When scrolling
        if (Utility.scrollBarTopPosition() !== 0 && Utility.scrollBarTopPosition() >= currentPosition) {
            DOM.headerWrapper.classList.add("is-sticky");
        } else {
            DOM.headerWrapper.classList.remove("is-sticky");
        }
    };

    stickyEffects = () => {
        // Return if is vertical header style
        if (DOM.siteHeader?.classList.contains("vertical-header")) {
            return;
        }

        // Return if no header wrapper
        if (!DOM.headerWrapper) {
            return;
        }

        // If show up effect
        if (Helpers.upStickyEffect()) {
            const currentPosition = Utility.elemOffset(DOM.headerWrapper).top + DOM.headerWrapper.offsetHeight;
            const scrollBarTopPosition = document.documentElement.scrollTop;

            if (scrollBarTopPosition >= this.#lastScrolBarPosition && scrollBarTopPosition >= currentPosition) {
                DOM.siteHeader.classList.remove("header-down");
                DOM.siteHeader.classList.add("header-up");
            } else {
                DOM.siteHeader.classList.remove("header-up");
                DOM.siteHeader.classList.add("header-down");
            }

            this.#lastScrolBarPosition = scrollBarTopPosition;
        }
    };

    createStickyWrapper = () => {
        // Create header sticky wrapper element
        DOM.headerWrapper = document.createElement("div");
        DOM.headerWrapper.setAttribute("id", "site-header-sticky-wrapper");
        DOM.headerWrapper.setAttribute("class", "oceanwp-sticky-header-holder");

        // Wrap header sticky wrapper around header
        if (!!DOM.header) {
            DOM.headerWrapper?.oceanWrapAll(DOM.header);
        }

        // Set header sticky wrapper height
        if (!DOM.siteHeader?.classList.contains("vertical-header")) {
            if (!!DOM.headerWrapper && !!DOM.header) {
                DOM.headerWrapper.style.height = DOM.header.offsetHeight + "px";
            }
        }
    };

    static getOffset = () => {
        let offset = 0;

        // Add WP Adminbar offset
        if (Utility.isWPAdminbarVisible()) {
            if (!!DOM.WPAdminbar) {
                offset = offset + DOM.WPAdminbar.offsetHeight;
            }
        }

        // Offset topbar sticky
        if (Helpers.isTopbarStickyEnabled()) {
            if (!!DOM.topbar) {
                offset = offset + DOM.topbar.offsetHeight;
            }
        }

        return offset;
    };

    #noSticky = () => {
        if (DOM.siteHeader?.classList.contains("vertical-header")) {
            if (window.innerWidth <= 960) {
                return !DOM.headerWrapper || Helpers.isMobileStickyDisabled();
            }
        }

        return !DOM.headerWrapper || Helpers.isMobileStickyDisabled() || !DOM.siteHeader?.classList.contains("fixed-scroll");
    };
}
