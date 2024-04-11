$(document).ready(function () {
  /*  Preloader block */

  $(".preloader").fadeOut(500);

  /* /////////////////////////////////////////////////////////////////////// */

  /* Initializing plugins block */

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
      arrow.css("transform", "rotate(315deg)");
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
        arrow.css("transform", "rotate(315deg)");
      } else {
        /* Dropdown menu is hidden */
        dropdownMenu.slideDown(500);
        arrow.css("transform", "rotate(135deg)");
      }
    });
  };

  dropdownActive(headerMenuItem, menuDropdown);
  dropdownActive(mobileMenuItem, mobileMenuDropdown);

  /* Click -> footer mobile menu */
  const title = $(".footer__mobile-info-sidebar-title");
  const ul = $(".footer__mobile-info-sidebar-lists");
  const arrow = $(".more-arrow-down");

  const footerDropdownActive = (element) => {
    element.on("click", function () {
      const clickedTitle = $(this).siblings(ul);
      const clickedArrow = $(this).find(arrow);

      /* Ul menu is visibile */
      if (clickedTitle.is(":visible")) {
        clickedTitle.slideUp(500);
        clickedArrow.css("transform", "rotate(315deg)");
      } else {
        /* Ul menu is hidden */
        clickedTitle.slideDown(500);
        clickedArrow.css("transform", "rotate(135deg)");
      }
    });
  };

  footerDropdownActive(title);

  /* Click -> main links */
  const generalMenulinks = $(".header__content-menu-item-link");
  const mobileMenuLinks = $(".mobile-menu-item-link");

  const menuLinks = (link, menu) => {
    link.each(function () {
      $(this).on("click", function (e) {
        $(menu).slideUp(500);
        arrow.css("transform", "rotate(315deg)");
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
      const dropdownMenu = $(this).closest(menu);

      /* Dropdown menu is visibile */
      if (dropdownMenu.is(":visible")) {
        arrow.css("transform", "rotate(315deg)");
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
  $("[data-modal=consultation]").on("click", function () {
    $(modalOverlay).fadeIn(500);
    document.body.style.overflow = "hidden";
  });

  /* Close modal windows -> btn */
  const closeModalWindow = (item, value) => {
    item.on("click", function () {
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
      $(basket).removeClass("basket_active");
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
  const smoothScroll = (element) => {
    element.click(function () {
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
  };

  smoothScroll(
    $(
      ".header__content-menu-item-link, .header__content-logo-link, .header__content-dropdown-item-link, .mobile-menu-item-link, .mobile-menu-dropdown-item-link, .scroll__to-up, .header__consultation-link, #order-link, .main-logo__link"
    )
  );

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

  /* Catalog <-> basket block */

  const basket = $(".basket");
  const basketItems = $(".basket__items");
  const basketOverlay = $(".basket-overlay");
  const basketCloseBtn = $(".basket__title-close");
  const headerBasket = $("#header-basket");
  const headerTotalPrice = $(".header__content-basket-descr");
  const bottomTotalPrice = $(".basket__bottom-total-price-value");

  let totalAmount = 0;
  /* let totalCounter = 1; */

  let selectedProducts =
    JSON.parse(localStorage.getItem("selectedProducts")) || [];

  /* Basket state change */
  const isEmpty = (firstElement, secondElement, thirdElement) => {
    if (selectedProducts.length === 0) {
      $(firstElement).css("display", "flex");
      $(secondElement).css("display", "none");
      $(thirdElement).text("За покупками");
      basketItems.css("overflow-y", "hidden");
    }
  };

  /* Basket modal window -> open */
  const basketOpen = (button) => {
    button.on("click", function () {
      $(basketOverlay).fadeIn(500);
      $(basket).addClass("basket_active");
      document.body.style.overflow = "hidden";
    });
  };

  basketOpen(headerBasket);

  /* Basket modal window -> close */
  const basketClose = (button) => {
    $(button).on("click", function () {
      $(basketOverlay).fadeOut(500);
      $(basket).removeClass("basket_active");
      document.body.style.overflow = "auto";
    });
  };

  basketClose($("#order-link"));
  basketClose(basketCloseBtn);

  /* Counter */
  /* const counterValue = $(".basket__item-info-value");
  const counterPlus = $(".basket__item-info-counter-plus");
  const counterMinus = $(".basket__item-info-counter-minus"); */

  /* Value of counter */
  const valueCounter = 1;

  /* counterPlus.on("click", function () {
    let value = parseInt(counterValue.text());
    counterValue.text(value + 1);
  });

  counterMinus.on("click", function () {
    let value = parseInt(counterValue.text());

    if (value > 1) {
      totalCounter.text(value - 1);
    }
  }); */

  /* Added button state <- localStorage */
  const addedButtonActive = (button) => {
    const productId = button.closest(".catalog__content").attr("data-id");

    const isProductSelected = selectedProducts.some(
      (product) => product.productId === productId
    );

    if (isProductSelected) {
      button.addClass("button_catalog_active").text("В корзине");
    }
  };

  /* Remove button state <- localStorage */
  const removeButtonActive = (button) => {
    $(".basket__item-del").on("click", function () {
      const productId = $(this).closest(".basket__item").data("id");

      const isProductSelected = selectedProducts.some(
        (product) => product.productId === productId
      );

      if (!isProductSelected) {
        button
          .closest(".catalog__content")
          .find("[data-modal='append']")
          .removeClass("button_catalog_active")
          .text("Добавить в корзину");
      }
    });
  };

  /* Remove product */
  const removeProduct = () => {
    $(".basket__item-del").on("click", function () {
      /* Get the id product */
      const productId = $(this).closest(".basket__item").attr("data-id");

      /* Remove product -> localStorage */
      selectedProducts = selectedProducts.filter(
        (product) => Number(product.productId) !== Number(productId)
      );

      /* Update basket items -> localStorage */
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(selectedProducts)
      );

      /* Update total price state -> localStorage */
      updateTotalPrice();

      /* Remove product -> basket */
      $(this).closest(".basket__item").slideUp(250);

      /* Update empty basket state -> Basket */
      isEmpty($(".basket__items-empty"), $("#order"), $("#order-link"));
    });
  };

  /* Update basket state <- localStorage */
  const updateBasket = () => {
    selectedProducts.forEach(function (product) {
      const cartItemHTML = `
    <li data-id=${product.productId} class="basket__item">
        <picture class="basket__item-img">
            <source
                srcset="${product.productImgWebP}"
                type="image/webp"
            />

            <img
                class="basket__item-icon"
                src="${product.productImg}"
                alt="pulsometr"
            />
        </picture>

        <div class="basket__item-info">
            <span class="basket__item-info-name">
                    ${product.productName} 
            </span> 

            <span class="basket__item-info-availability">
              В наличии 
            </span> 

            <div class="basket__item-info-wrapper">
                <div class="basket__item-info-counter">
                    <span class="basket__item-info-counter-minus">-</span>

                    <span class="basket__item-info-value">
                        ${product.valueCounter}
                    </span>

                    <span class="basket__item-info-counter-plus">+</span>
                </div>

                <span class="basket__item-info-price">
                    ${product.totalPrice} $
                </span>
            </div>
        </div>

        <span class="basket__item-del">
            &#x2715; 
        </span> 
    </li>`;

      basketItems.prepend(cartItemHTML);

      /* Search the current id element -> li */
      const catalogContentId = $(
        `.catalog__content[data-id="${product.productId}"]`
      );

      /* Find the current button -> li */
      const currentButton = catalogContentId.find("[data-modal='append']");

      /* Remove button active <- localStorage  */
      removeButtonActive(currentButton);

      /* Update empty basket state <- localStorage */
      $(".basket__items-empty").css("display", "none");
    });
  };

  updateBasket();

  /* Update empty basket state after loading localStorage -> Basket */
  isEmpty($(".basket__items-empty"), $("#order"), $("#order-link"));

  /* Update total price state -> localStorage */
  const updateTotalPrice = () => {
    totalAmount = selectedProducts.reduce(
      (sum, product) => sum + product.totalPrice,
      0
    );

    if (totalAmount === 0) {
      headerTotalPrice.text("Корзина");
      bottomTotalPrice.text(`${0} $`);
    } else {
      headerTotalPrice.text(`${totalAmount} $`);
      bottomTotalPrice.text(`${totalAmount} $`);
    }
  };

  $("[data-modal='append']").each(function () {
    const button = $(this);

    /* Dynamic update added btn state -> localStorage */
    addedButtonActive(button);

    /* Dynamic total price state -> localStorage */
    updateTotalPrice();

    /* Open basket modal window */
    basketOpen(button);

    button.on("click", function () {
      /* Toggle scroll -> basket */
      basketItems.css("overflow-y", "auto");

      const productId = button.closest(".catalog__content").attr("data-id");

      const isProductSelected = selectedProducts.some(
        (product) => Number(product.productId) === Number(productId)
      );

      if (!isProductSelected) {
        /* Get the id product */
        const productId = button.closest(".catalog__content").attr("data-id");

        /* Get the img product */
        const productImg = button
          .closest(".catalog__content")
          .find(".catalog__content-img img")
          .attr("src");

        /* Get the WebP img product */
        const productImgWebP = button
          .closest(".catalog__content")
          .find(".catalog__content-img source")
          .attr("srcset");

        /* Get the product name */
        const productName = button
          .closest(".catalog__content-wrapper-price")
          .siblings(".catalog__content-label")
          .text();

        /* Get the product descr */
        const productDescr = button
          .closest(".catalog__content-wrapper-price")
          .siblings(".catalog__content-description")
          .text()
          .trim();

        /* Get the product -> default price */
        const productDefaultPrice = parseInt(
          button.siblings(".catalog__content-default-price").text()
        );

        /* Get the product -> discount price */
        const productPrice = parseInt(
          button.siblings(".catalog__content-discount-price").text()
        );

        /* Adding default/discount price -> header total price */
        const totalPrice = productPrice || productDefaultPrice;
        totalAmount += totalPrice;
        headerTotalPrice.text(`${totalAmount} $`);
        bottomTotalPrice.text(`${totalAmount} $`);

        /* Update btn state -> click */
        button.addClass("button_catalog_active").text("В корзине");

        /* Adding product info -> localStorage  */
        selectedProducts.push({
          productId: productId,
          productImg: productImg,
          productImgWebP: productImgWebP,
          productName: productName,
          productDescr: productDescr,
          totalPrice: totalPrice,
          valueCounter: valueCounter,
        });

        localStorage.setItem(
          "selectedProducts",
          JSON.stringify(selectedProducts)
        );

        const cartItemHTML = `
        <li data-id=${productId} class="basket__item">
            <picture class="basket__item-img">
                <source
                    srcset="${productImgWebP}"
                    type="image/webp"
                />

                <img
                    class="basket__item-icon"
                    src="${productImg}"
                    alt="pulsometr"
                />
            </picture>

            <div class="basket__item-info">
                <span class="basket__item-info-name">
                    ${productName} 
                </span> 

                <span class="basket__item-info-availability">
                  В наличии 
                </span> 

                <div class="basket__item-info-wrapper">
                    <div class="basket__item-info-counter">
                        <span class="basket__item-info-counter-minus">-</span>

                        <span class="basket__item-info-value">${valueCounter}</span>

                        <span class="basket__item-info-counter-plus">+</span>
                    </div>

                    <span class="basket__item-info-price">${totalPrice} $</span>
                </div>
            </div>

            <span class="basket__item-del">
                &#x2715; 
            </span> 
        </li>`;

        basketItems.prepend(cartItemHTML);

        /* Open basket modal window */
        basketOpen(button);

        /* Remove the product -> Basket */
        removeProduct();

        /* Update empty basket state -> Basket */
        $(".basket__items-empty").css("display", "none");
        $("#order").css("display", "block");
        $("#order-link").text("Добавить другие товары");

        /* Remove btn state -> Basket */
        removeButtonActive(button);
      }
    });
  });

  /* Remove the product -> localStorage */
  removeProduct();
});
