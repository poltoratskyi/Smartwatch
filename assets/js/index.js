$(document).ready(function () {
  // Инициализация Slick Carousel для слайдера
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

  // Обработчик клика на вкладках каталога
  /*   $("ul.catalog_tabs").on("click", "li:not(.catalog_tab.active)", function () {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active")
      .closest("div.catalog_container")
      .find("div.catalog_content")
      .removeClass("active")
      .eq($(this).index())
      .addClass("active");
  }); */

  // Обработчик клика на элементе вызова консультации

  $("[data-modal=consultation]").on("click", function (e) {
    e.preventDefault();
    $(".overlay").fadeIn("slow");
  });

  // Обработчик события отправки формы

  $(".consultation__form, .modal-callback__form").submit(function (e) {
    e.preventDefault();

    let isValid = true;

    // Поиск инпутов и их итерация
    $(this)
      .find(".consultation__form-input, .modal-callback__form-input")
      .each(function () {
        // Проверка валидности каждого найденного инпута
        // Метод checkValidity проверяет валидность инпута по атрибутам HTML
        if (!this.checkValidity()) {
          // Если одно поле невалидно - false
          isValid = false;
          // Остановка итерации
          return false;
        }
      });

    // Если все поля валидны - true
    if (isValid) {
      $(".overlay").fadeOut("slow");
      // Метод val("") устанавливает инпуты в пустую строку
      $(".consultation__form-input, .modal-callback__form-input").val("");
      $(".success").fadeIn("slow");
      setTimeout(() => {
        $(".success").fadeOut("slow");
      }, 6000);
    }
  });

  // Обработчик клика на элементе закрытия окон

  $(".modal-callback__close").on("click", function (e) {
    e.preventDefault();
    $(".overlay").fadeOut("slow");
  });

  // Обработчик кнопки закрытия окона

  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      $(".overlay").fadeOut("slow");
      $(".success").fadeOut("slow");
    }
  });

  $(".success__close").on("click", function (e) {
    e.preventDefault();
    $(".success").fadeOut("slow");
  });

  // Обработчик клика на кнопках каталога

  /* $(".catalog_footer button").each(function (id) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $("#order .windows_text p").text($(".catalog_text span").eq(i).text());
      $(".windows, #order").fadeIn("slow");
    });
  }); */

  // Инициализация маски для телефонного номера

  $("input[name=phone]").mask("+1(23) 999 999", { autoclear: false });

  // Обработчик прокрутки страницы для кнопки "наверх"

  $(window).scroll(function () {
    $(this).scrollTop() > 1600
      ? $(".scroll__to-up").fadeIn()
      : $(".scroll__to-up").fadeOut();
  });

  // Плавный скролл для ссылки "вверх" и каталога

  $(".scroll__to-up, .header__consultation-link").click(function () {
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top + "px",
      },
      {
        duration: 500,
        easing: "swing",
      }
    );
    return false;
  });
});
