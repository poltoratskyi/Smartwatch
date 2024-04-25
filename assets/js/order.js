$(document).ready(function () {
  /*  Preloader block */

  $(".preloader").fadeOut(500);

  /* /////////////////////////////////////////////////////////////////////// */

  /* Initializing plugins block */

  /* Mask input */
  $("input[name=phone]").mask("+380(99) 999 99 99", { autoclear: false });

  /* Registration validation and sumbit the form */
  $.validator.addMethod(
    "cyrillic",
    function (value, element) {
      return this.optional(element) || /^[а-яА-ЯёЁ]+$/i.test(value);
    },
    "Пожалуйста, введите только кириллические символы"
  );

  $.validator.addMethod(
    "numberUA",
    function (value, element) {
      return (
        this.optional(element) ||
        /^\+380\((?:50|66|95|99|63|67|68|96|97|98|39|73|93)\) \d{3} \d{2} \d{2}$/i.test(
          value
        )
      );
    },
    "Пожалуйста, введите корректный номер телефона в формате +380(XX) XXX XX XX"
  );

  $.validator.addMethod(
    "emailPublic",
    function (value, element) {
      return (
        this.optional(element) ||
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|yandex\.ru)$/i.test(
          value
        )
      );
    },
    "Пожалуйста, введите корректный Email"
  );

  jQuery.validator.setDefaults({
    success: "valid",
  });

  const formValidate = (form) => {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
          cyrillic: true,
        },
        surname: {
          required: true,
          minlength: 2,
          cyrillic: true,
        },
        phone: {
          required: true,
          numberUA: true,
        },
        email: {
          required: true,
          emailPublic: true,
        },
        city: {
          required: true,
          minlength: 2,
          cyrillic: true,
        },
        address: {
          required: true,
          minlength: 1,
        },
      },

      messages: {
        name: {
          required: "Пожалуйста, введите ваше имя",
          minlength: "Имя должно быть не короче двух символов",
        },
        surname: {
          required: "Пожалуйста, введите вашу фамилию",
          minlength: "Фамилия должна быть не короче двух символов",
        },
        phone: {
          required: "Пожалуйста, введите ваш номер телефона",
        },
        email: {
          required: "Пожалуйста, введите ваш Email",
          email: "Пожалуйста, введите корректный Email",
        },
        city: {
          required: "Пожалуйста, введите ваш город",
          minlength: "Название города должно быть не короче двух символов",
        },
        address: {
          required: "Пожалуйста, введите вашу улицу",
          minlength:
            "Название вашей улицы должно быть не короче одного символа",
        },
      },

      submitHandler: function (form, event) {
        event.preventDefault();

        /* Create the new array counter item -> localStorage*/
        let orderCounter =
          JSON.parse(localStorage.getItem("orderCounter")) || 0;

        orderCounter += 1;

        /* Create the new array persone info -> localStorage*/
        let personalInfo =
          JSON.parse(localStorage.getItem("personalInfo")) || [];

        /* Get all inputs */
        const formData = {
          name: $(form).find("input[name='name']").val(),
          surname: $(form).find("input[name='surname']").val(),
          phone: $(form).find("input[name='phone']").val(),
          email: $(form).find("input[name='email']").val(),
          city: $(form).find("input[name='city']").val(),
          address: $(form).find("input[name='address']").val(),
          orderNumber: orderCounter,
        };

        /* Adding form data -> localStorage  */
        personalInfo.push(formData);

        /* Updated array -> LocalStorage */
        localStorage.setItem("personalInfo", JSON.stringify(personalInfo));

        /* Updated array -> LocalStorage */
        localStorage.setItem("orderCounter", JSON.stringify(orderCounter));

        /* Clear all found inputs */
        setTimeout(() => {
          $(form)
            .find('input[type="text"], input[type="tel"], input[type="email"]')
            .val("");

          /* Open the success page */
          window.location.href = "success.html";
        }, 1000);
      },
    });
  };
  formValidate("#orderForm");

  /* /////////////////////////////////////////////////////////////////////// */

  /* Catalog <-> basket block */
  const basket = $(".basket");
  const basketOverlay = $(".basket-overlay");
  const basketItems = $(".basket__items");
  const checkoutBtnBasket = $("#checkout-basket");
  const basketCloseBtn = $(".basket__title-close");
  const orderItems = $(".review-items");

  let selectedProducts =
    JSON.parse(localStorage.getItem("selectedProducts")) || [];

  /* Basket modal window -> open */
  const basketOpen = (button) => {
    button.on("click", function () {
      $(basketOverlay).fadeIn(500);
      $(basket).addClass("basket_active");
      document.body.style.overflow = "hidden";
    });
  };

  basketOpen(checkoutBtnBasket);

  /* Basket modal window -> close */
  const basketClose = (button) => {
    $(button).on("click", function () {
      $(basketOverlay).fadeOut(500);
      $(basket).removeClass("basket_active");
      document.body.style.overflow = "auto";

      /* Reload the page */
      if (selectedProducts.length > 0) {
        setTimeout(() => {
          location.reload();
        }, 500);
      } else {
        setTimeout(() => {
          isEmpty(selectedProducts);
        }, 500);
      }
    });
  };

  basketClose(basketCloseBtn);

  /* Basket state change */
  const isEmpty = (ls) => {
    if (ls.length === 0) {
      window.location.href = "index.html#to-catalog";
    }
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

      /* Basket state */
      setTimeout(() => {
        isEmpty(selectedProducts);
      }, 500);
    });
  };

  /* Cart products <- localStorage */
  const orderBasket = (element, ls) => {
    ls.forEach(function (product) {
      const cartItemHTML = ` <li data-id=${
        product.productId
      } class="review-item">

            <picture class="review-item__info-img">
                <source
                    srcset="${product.productImgWebP}"
                    type="image/webp"
                />

                <img
                    class="review-item__info-icon"
                    src="${product.productImg}"
                    alt="pulsometr"
                />
            </picture>

            <div class="review-item__info">

                <div class="review-item__info-product">
                    <span class="review-item__info-product-name">
                        ${product.productName}
                    </span>
                    
                    <span class="review-item__info-product-quantity">
                        ${product.valueCounter} шт.
                    </span>
                </div>

                <div class="review-item__info-product">
                    <p class="review-item__info-product-descr">
                        ${product.productDescr}
                    </p>
                </div>

                <div class="review-item__info-product">
                    <span class="review-item__info-product-total-descr">
                        Цена
                    </span>

                    <span class="review-item__info-product-price">
                    ${
                      product.productPrice
                        ? product.productPrice + " $"
                        : product.productDefaultPrice + " $"
                    }
                    </span>
                </div>
            </div>
        </li>`;

      element.prepend(cartItemHTML);
    });
  };

  orderBasket(orderItems, selectedProducts);

  /* Update basket state <- localStorage */
  const updateOrderBasket = () => {
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
  
              <div class="basket__item-info-wrapper basket__item-info-wrapper_order">
                  <div class="basket__item-info-counter">
                        <button data-modal="minus"  class="basket__item-info-counter-minus">
                            -
                        </button>
  
                        <span class="basket__item-info-value basket__item-info-value_order">
                            ${product.valueCounter}
                        </span>
  
                        <button data-modal="plus" class="basket__item-info-counter-plus">
                            +
                        </button>
                  </div>

                  <span class="basket__item-info-price">
                  ${product.totalPrice + " $"}
                  </span>
              </div>
          </div>
  
          <span class="basket__item-del">
              &#x2715; 
          </span> 
      </li>`;

      basketItems.prepend(cartItemHTML);

      /* Update empty basket state <- localStorage */
      $(".basket__items-empty").css("display", "none");
    });
  };

  updateOrderBasket();

  /* Remove the product -> localStorage */
  removeProduct();

  /* Basket state -> localStorage */
  isEmpty(selectedProducts);

  /* Counter */
  const Counter = () => {
    /* Plus btn */
    $("[data-modal=plus]").each(function () {
      const selectedPlusBtn = $(this);

      /* Find item id -> basket */
      const selectedItemId = selectedPlusBtn
        .closest(".basket__item")
        .attr("data-id");

      /* Click - plus */
      selectedPlusBtn.on("click", function () {
        /* Find product index / localStorage <-> Item id / Basket */
        const selectedProductIndex = selectedProducts.findIndex(
          (item) => Number(item.productId) === Number(selectedItemId)
        );

        if (selectedProductIndex >= 0) {
          /* Found product index */
          const selectedProduct = selectedProducts[selectedProductIndex];

          /* Inc counter -> localStorage */
          selectedProduct.valueCounter += 1;

          /* Find total price value -> Basket */
          const totalPriceElement = selectedPlusBtn
            .closest(".basket__item-info-counter")
            .siblings(".basket__item-info-price");

          if (selectedProduct.isDiscountPrice) {
            /* Inc total product price + Product price -> localStorage */
            selectedProduct.totalPrice += selectedProduct.productPrice;

            /* Change total price value -> Basket */
            totalPriceElement.text(`${selectedProduct.totalPrice} $`);
          } else {
            /* if discount price === true  */
            selectedProduct.totalPrice += selectedProduct.productDefaultPrice;

            /* Change total price value -> Basket */
            totalPriceElement.text(`${selectedProduct.totalPrice} $`);
          }

          /* Find price value -> Basket */
          const counterElement = selectedPlusBtn.siblings(
            ".basket__item-info-value"
          );

          /* Change counter value -> Basket */
          counterElement.text(selectedProduct.valueCounter);

          /* Update localStorage */
          localStorage.setItem(
            "selectedProducts",
            JSON.stringify(selectedProducts)
          );
        }
      });
    });

    /* Minus btn */
    $("[data-modal=minus]").each(function () {
      const selectedMinusBtn = $(this);

      /* Click - minus */
      selectedMinusBtn.on("click", function () {
        /* Find item id -> basket */
        const selectedItemId = selectedMinusBtn
          .closest(".basket__item")
          .attr("data-id");

        /* Find product index / localStorage <-> Item id / Basket */
        const selectedProductIndex = selectedProducts.findIndex(
          (item) => Number(item.productId) === Number(selectedItemId)
        );

        if (selectedProductIndex >= 0) {
          /* Found product index */
          const selectedProduct = selectedProducts[selectedProductIndex];

          /* Decrease counter -> localStorage */
          if (selectedProduct.valueCounter > 1) {
            selectedProduct.valueCounter -= 1;

            /* Find total price value -> Basket */
            const totalPriceElement = selectedMinusBtn
              .closest(".basket__item-info-counter")
              .siblings(".basket__item-info-price");

            if (selectedProduct.isDiscountPrice) {
              /* Decrease total product price by Product price -> localStorage */
              selectedProduct.totalPrice -= selectedProduct.productPrice;

              /* Change total price value -> Basket */
              totalPriceElement.text(`${selectedProduct.totalPrice} $`);
            } else {
              /* Decrease total product price by Default product price -> localStorage */
              selectedProduct.totalPrice -= selectedProduct.productDefaultPrice;

              /* Change total price value -> Basket */
              totalPriceElement.text(`${selectedProduct.totalPrice} $`);
            }

            /* Find counter value -> Basket */
            const counterElement = selectedMinusBtn.siblings(
              ".basket__item-info-value"
            );

            /* Change counter value -> Basket */
            counterElement.text(selectedProduct.valueCounter);

            /* Update localStorage */
            localStorage.setItem(
              "selectedProducts",
              JSON.stringify(selectedProducts)
            );
          }
        }
      });
    });
  };

  /* Counter -> localStorage / Basket */
  Counter();

  /* /////////////////////////////////////////////////////////////////////// */

  /* Total price state <- localStorage */
  const totalOrder = $(".review-total-price");

  const updateTotalPrice = (element) => {
    const totalAmount = selectedProducts.reduce(
      (sum, product) => sum + product.totalPrice,
      0
    );

    $(element).text(`${totalAmount} $`);
  };

  updateTotalPrice(totalOrder);

  /* /////////////////////////////////////////////////////////////////////// */

  /* Footer mobile menu block */

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
        clickedTitle.slideUp(300);
        clickedArrow.css("transform", "rotate(315deg)");
      } else {
        /* Ul menu is hidden */
        clickedTitle.slideDown(300);
        clickedArrow.css("transform", "rotate(135deg)");
      }
    });
  };

  footerDropdownActive(title);
});
