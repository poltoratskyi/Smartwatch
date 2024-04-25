$(document).ready(function () {
  /*  Preloader block */

  $(".preloader").fadeOut(500);

  /* /////////////////////////////////////////////////////////////////////// */

  /* Order localStorage -> Success block */

  let selectedProducts =
    JSON.parse(localStorage.getItem("selectedProducts")) || [];

  let personalData = JSON.parse(localStorage.getItem("personalInfo")) || [];

  /* Clear -> localStorage */

  const lSkeysToRemove = ["personalInfo", "selectedProducts"];

  $("#comeback, #1").click(function () {
    lSkeysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
  });

  /* is localStorage -> null */
  const isEmpty = (ls) => {
    if (ls.length === 0) {
      window.location.href = "order.html";
    }
  };

  /* Cart products <- localStorage */
  const productDetails = $(".review-items");

  const success = (element, ls) => {
    ls.forEach(function (product) {
      const successItemHTML = ` <li data-id=${
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

      element.prepend(successItemHTML);
    });
  };

  success(productDetails, selectedProducts);

  /* Persone info <- localStorage */
  const dataInfo = $(".personal-info__content-items");

  const displayPersonalInfo = (element, ls) => {
    ls.forEach(function (info) {
      const successItemHTML = ` 
      <li class="personal-info__content-item">
        <span>Номер вашего заказа:</span>
        <span><b>${info.orderNumber}</b></span>
      </li>

    <li class="personal-info__content-item">
      <span>Получатель:</span>
      <span><b> ${info.name}</b></span>
    </li>

    <li class="personal-info__content-item">
      <span>Номер телеофона:</span>
      <span> <b> ${info.phone} </b> </span>
    </li>

    <li class="personal-info__content-item">
      <span>Адрес доставки:</span>
      <span><b> ${info.city}, ${info.address}</b></span>
    </li>`;

      element.prepend(successItemHTML);
    });
  };

  displayPersonalInfo(dataInfo, personalData);

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

  isEmpty(selectedProducts && personalData);
});
