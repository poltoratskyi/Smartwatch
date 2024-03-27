$(document).ready(function () {
  /* Initializing plugins */

  /* Slick Carousel */
  $(".carousel___content-slider").slick({
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 1200,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    prevArrow:
      '<button type="button" class="carousel_slick-prev"><img src="assets/icons/left.svg"></button>',
    nextArrow:
      '<button type="button" class="carousel_slick-next"><img src="assets/icons/right.svg"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  });

  /* Mask input */
  $("input[name=phone]").mask("+1(23) 999 999", { autoclear: false });

  /* Animate css */
  new WOW().init();

  /* /////////////////////////////////////////////////////////////////////// */

  /* Smooth hiding block */

  /* Arrow to-up */
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".scroll__to-up").fadeIn();
    } else {
      $(".scroll__to-up").fadeOut();
    }
  });

  /* /////////////////////////////////////////////////////////////////////// */

  /* Menu block */

  /* Hamburger */
  const hamburger = $(".hamburger");
  const mobileMenu = $(".mobile-menu");
  let menuVisible = false;

  $(hamburger).on("click", function () {
    $(this).toggleClass("hamburger_active");

    if ($(this).hasClass("hamburger_active")) {
      $(mobileMenu).slideDown(500);
      menuVisible = true;
    } else {
      $(mobileMenu).slideUp(500);
      menuVisible = false;
    }

    if (menuVisible) {
      document.body.style.overflow = "hidden";
      $(mobileMenuDropdown).slideUp(0);
    } else {
      document.body.style.overflow = "auto";
    }
  });

  /* Dropdown menu */
  const menuDropdown = $(".header__content-dropdown");
  const dropdownLink = $(".header__content-dropdown-item-link");

  const mobileMenuDropdown = $(".mobile-menu-dropdown");
  const mobileMenuDropdownLink = $(".mobile-menu-dropdown-item-link");

  /* Click -> dropdown btn */
  const headerMenuItem = $(".header__content-menu-item");
  const mobileMenuItem = $(".mobile-menu-item");

  const dropdownActive = (element, elementMenu) => {
    element.on("click", function () {
      const dropdownMenu = $(this).find(elementMenu);

      /* Dropdown menu is visibile */
      if (dropdownMenu.is(":visible")) {
        dropdownMenu.slideUp(500);
      } else {
        /* Dropdown menu is hidden */
        dropdownMenu.slideDown();
      }
    });
  };

  dropdownActive(headerMenuItem, menuDropdown);
  dropdownActive(mobileMenuItem, mobileMenuDropdown);

  /* Click -> main links */
  const generalMenulinks = $(".header__content-menu-item-link");
  const mobileMenuLinks = $(".mobile-menu-item-link");

  const menuLinks = (link, menu) => {
    link.each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(menu).slideUp(500);
        $(mobileMenu).slideUp(500);
        $(hamburger).removeClass("hamburger_active");
        document.body.style.overflow = "auto";
      });
    });
  };

  menuLinks(generalMenulinks, menuDropdown);
  menuLinks(mobileMenuLinks, mobileMenuDropdown);

  /* Click -> dropdown links */
  const dropdownMenuLinks = (link, menu) => {
    $(link).on("click", function (e) {
      e.preventDefault();

      const dropdownMenu = $(this).closest(menu);

      /* Dropdown menu is visibile */
      if (dropdownMenu.is(":visible")) {
        dropdownMenu.slideUp(500);
        $(mobileMenu).slideUp(500);

        /* isMenuOpen = false; */
        $(hamburger).removeClass("hamburger_active");
        document.body.style.overflow = "auto";
      }
      /* return isMenuOpen; */
    });
  };

  dropdownMenuLinks(dropdownLink, menuDropdown);
  dropdownMenuLinks(mobileMenuDropdownLink, mobileMenuDropdown);

  /* /////////////////////////////////////////////////////////////////////// */

  /* Registration form block */

  /* Modal callback window */
  const modalCallbackClose = $(".modal-callback__close");
  const modalOverlay = $(".modal-overlay");

  /* Success window */
  const successClose = $(".success__close");
  const success = $(".success");

  /* Open modal window of registration form -> btn */
  $("[data-modal=consultation]").on("click", function (e) {
    e.preventDefault();
    $(modalOverlay).fadeIn(500);
    document.body.style.overflow = "hidden";
  });

  /* Close modal windows -> btn */
  const closeModalWindow = (item, value) => {
    item.on("click", function (e) {
      e.preventDefault();
      $(value).fadeOut(500);
      document.body.style.overflow = "auto";
    });
  };

  closeModalWindow(modalCallbackClose, modalOverlay);
  closeModalWindow(successClose, success);

  /* Close modal window of registration form -> keydown Escape */
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      $(modalOverlay).fadeOut(500);
      $(basketOverlay).fadeOut(500);
      $(success).fadeOut(500);
      document.body.style.overflow = "auto";
    }
  });

  /* Registration validation and sumbit the form window */
  $(".consultation__form, .modal-callback__form").submit(function (e) {
    e.preventDefault();

    let isValid = true;
    let formInputs = $(this).find(
      ".consultation__form-input, .modal-callback__form-input"
    );

    formInputs.each(function () {
      if (!this.checkValidity()) {
        isValid = false;
        return false;
      }
    });

    if (isValid) {
      formInputs.val("");
      $(modalOverlay).fadeOut(500);
      $(success).fadeIn(500);
      document.body.style.overflow = "auto";
      setTimeout(() => {
        $(success).fadeOut(500);
      }, 6000);
    }
  });

  /* /////////////////////////////////////////////////////////////////////// */

  /* Smooth scroll link block */

  /* Arrow to-up and header catalog link */
  $(
    ".header__content-menu-item-link, .header__content-logo-link, .header__content-dropdown-item-link, .mobile-menu-item-link, .mobile-menu-dropdown-item-link, .scroll__to-up, .header__consultation-link"
  ).click(function () {
    var target = $($(this).attr("href"));
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top + "px",
        },
        {
          duration: 500,
          easing: "swing",
        }
      );
      return false;
    }
  });

  /* /////////////////////////////////////////////////////////////////////// */

  /* Tab functionality block */

  $(".catalog__tab").each(function () {
    $(this).on("click", function () {
      if (!$(this).hasClass("catalog__tab_active")) {
        $(".catalog__tab").removeClass("catalog__tab_active");
        $(this).addClass("catalog__tab_active");
      }

      const dataProffessional = $("[data-modal=proffessional]");
      const dataRunners = $("[data-modal=runners]");

      const correctId = (itemId, firstDataItem, secondDataItem) => {
        if ($(this).attr("id") === "fitness") {
          secondDataItem.addClass("catalog__content_hidden");
          firstDataItem.addClass("catalog__content_hidden");

          setTimeout(() => {
            firstDataItem.removeClass("catalog__content_hidden");
            secondDataItem.removeClass("catalog__content_hidden");
          }, 100);
        }

        if ($(this).attr("id") === itemId) {
          secondDataItem.addClass("catalog__content_hidden");
          firstDataItem.addClass("catalog__content_hidden");

          setTimeout(() => {
            firstDataItem.removeClass("catalog__content_hidden");
            secondDataItem.addClass("catalog__content_hidden");
          }, 100);
        }
      };

      correctId("", dataRunners, dataProffessional);
      correctId("runners", dataRunners, dataProffessional);
      correctId("proffessional", dataProffessional, dataRunners);
    });
  });

  /* /////////////////////////////////////////////////////////////////////// */

  /* Catalog block */

  /* Catalog btn */
  const basketOverlay = $(".basket-overlay");
  const basketCloseBtn = $(".basket__title-close");

  let totalAmount = 0;

  $("[data-modal='append']").each(function () {
    $(this).on("click", function () {
      /* Get the product name */
      const productName = $(this)
        .closest(".catalog__content-wrapper-price")
        .siblings(".catalog__content-label");

      /* Get the product -> default price */
      const productDefaultPrice = parseFloat(
        $(this).siblings(".catalog__content-default-price").text()
      );

      /* Get the product -> discount price */
      const productPrice = parseFloat(
        $(this).siblings(".catalog__content-discount-price").text()
      );

      /* Adding default/discount price -> header-basket */
      const priceToAdd = productPrice || productDefaultPrice;
      totalAmount += priceToAdd;
      $(".header__content-basket-descr").text(`${totalAmount} $`);

      /* Off event click */
      $(this).off("click");

      /* Update btn event */
      $(this).addClass("button_catalog_active").text("В корзине");

      /* Basket modal window -> open */
      $(this).on("click", function () {
        $(basketOverlay).fadeIn(500);
        document.body.style.overflow = "hidden";
      });

      /* Modal window -> close */
      basketClose($(basketCloseBtn));
    });
  });

  /* Basket modal window -> open header-btn */
  $("#header-basket").on("click", function () {
    document.body.style.overflow = "hidden";
    $(basketOverlay).fadeIn(500);
    basketClose($(basketCloseBtn));
  });

  /* Basket modal window -> close */
  const basketClose = (element) => {
    $(element).on("click", function () {
      document.body.style.overflow = "auto";
      $(basketOverlay).fadeOut(500);
    });
  };

  basketClose(btn_order);

  /* /////////////////////////////////////////////////////////////////////// */
});
