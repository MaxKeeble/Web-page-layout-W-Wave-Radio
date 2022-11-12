(function () {
  window.addEventListener('DOMContentLoaded', function () {

    // Бургер-меню
    const BURGER = document.querySelector('.burger');
    const BURGER_MENU_TOP = document.querySelector('.header-top-nav');
    const BURGER_MENU_BOTTOM = document.querySelector('.header-bottom-nav');

    BURGER.addEventListener('click', function (event) {
      BURGER.classList.toggle('burger_opened');
      BURGER_MENU_TOP.classList.toggle('header-top-nav_opened');
      BURGER_MENU_BOTTOM.classList.toggle('header-bottom-nav_opened');
      event.stopPropagation();
    })

    BURGER_MENU_TOP.addEventListener('click', function (event) {
      event.stopPropagation();
    })
    BURGER_MENU_BOTTOM.addEventListener('click', function (event) {
      event.stopPropagation();
    })

    document.body.addEventListener('click', function (event) {
      BURGER.classList.remove('burger_opened');
      BURGER_MENU_TOP.classList.remove('header-top-nav_opened');
      BURGER_MENU_BOTTOM.classList.remove('header-bottom-nav_opened');
    })

    // Поиск
    const SEARCH_BUTTON = document.querySelector('.search-link');
    SEARCH_BUTTON.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('.search-input-wrapper').classList.toggle('search-input-wrapper_hidden');
    })

    // Кнопка "Вход"
    const MODAL_BTN_ENTRY = document.querySelector('.entry-button');
    const MODAL_BTN_EXIT = document.querySelector('.modal-entry__btn-exit');
    const MODAL_MENU = document.querySelector('.modal-entry-wrapper');

    MODAL_BTN_ENTRY.addEventListener('click', function (event) {
      event.preventDefault();
      MODAL_MENU.style.visibility = 'visible';
      MODAL_MENU.style.opacity = '1';
      document.querySelector('html').style.overflow = 'hidden';
    })
    MODAL_BTN_EXIT.addEventListener('click', function (event) {
      MODAL_MENU.style.visibility = 'hidden';
      MODAL_MENU.style.opacity = '0';
      setTimeout(() => {
        document.documentElement.style.overflow = 'visible';
      }, 400);
    })

    // Скролл бар
    new SimpleBar(document.getElementsByClassName('scroll-bar')[0], {
      scrollbarMaxSize: 200,
      autoHide: false,
    });

    // Кнопка "Что в эфире?"
    const HEADER_BOTTOM = document.querySelector('.header__bottom');

    HEADER_BOTTOM.addEventListener('click', function (event) {
      HEADER_BOTTOM.classList.toggle('header__bottom_opened');
      event.stopPropagation();
    })

    document.body.addEventListener('click', function (event) {
      HEADER_BOTTOM.classList.remove('header__bottom_opened');
    })

    // Кнопка "Ещё подкасты"
    const PODCASTS_MORE_BUTTON = document.querySelector('.podcasts__link');
    PODCASTS_MORE_BUTTON.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.podcasts__item').forEach(el => el.classList.add('podcasts__item_visible'));
      PODCASTS_MORE_BUTTON.remove();
    });

    // Селект
    const ELEMENT = document.querySelector('#select-custom');
    const CHOICES = new Choices(ELEMENT, {
      searchEnabled: false,
      sorter: undefined,
      itemSelectText: '',
    });
    CHOICES.containerOuter.element.setAttribute('aria-label', 'Авторы');

    // Аккордеон
    $(function () {
      $("#accordion").accordion({
        heightStyle: 'content',
        header: '.details__title',
        collapsible: true,
        icons: false,
      });
    });

    // Табы
    const GUEST_LINKS = document.querySelectorAll('.details__link');

    GUEST_LINKS.forEach(el => el.addEventListener('click', function (event) {
      event.preventDefault();

      GUEST_LINKS.forEach(el => el.classList.remove('details__link_active'));
      event.target.classList.add('details__link_active');

      document.querySelector('.guest_active').classList.remove('guest_active');
      let tabId = event.target.getAttribute('data-tab') || 'plug';
      let currentGuest = document.querySelector(`.guest[data-tab='${tabId}']`);
      currentGuest.classList.add('guest_active');

      if (window.innerWidth <= 1023) {
        currentGuest.scrollIntoView({
          behavior: 'smooth',
          block: currentGuest.offsetHeight < window.innerHeight ? 'center' : 'start',
        });
      }
    }));

    // Валидация формы
    const VALIDATION_FEEDBACK = new JustValidate('.form', {
      errorFieldStyle: {
      },
      errorLabelStyle: {
      }
    });
    const VALIDATION_MODAL_ENTRY = new JustValidate('.modal-entry-form', {
      errorFieldStyle: {
      },
      errorLabelStyle: {
      }
    });

    VALIDATION_FEEDBACK.addField('#message', [
      {
        rule: 'required',
        errorMessage: 'Ошибка обязательное поле'
      },
      {
        rule: 'minLength',
        value: 14,
        errorMessage: 'Ошибка мало букв'
      },
      {
        rule: 'maxLength',
        value: 500,
        errorMessage: 'Ошибка много букв'
      }
    ]);
    VALIDATION_FEEDBACK.addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Ошибка обязательное поле'
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Ошибка мало букв'
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Ошибка много букв'
      },
      {
        rule: 'customRegexp',
        value: /^[a-zA-Zа-яА-ЯёЁ]+$/,
        errorMessage: 'Не верно указано имя'
      }
    ]);
    VALIDATION_FEEDBACK.addField('#mail', [
      {
        rule: 'required',
        errorMessage: 'Ошибка обязательное поле'
      },
      {
        rule: 'email',
        errorMessage: 'Не верный Email'
      }
    ]);
    VALIDATION_FEEDBACK.addField('#agreement__checkbox', [
      {
        rule: 'required',
        errorMessage: 'Для подтверждения поставьте галочку'
      }
    ]);

    VALIDATION_MODAL_ENTRY.addField('#login', [
      {
        rule: 'required',
        errorMessage: 'Ошибка обязательное поле'
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Ошибка мало букв'
      },
      {
        rule: 'maxLength',
        value: 15,
        errorMessage: 'Ошибка много букв'
      }
    ]);
    VALIDATION_MODAL_ENTRY.addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Ошибка обязательное поле'
      },
      {
        rule: 'minLength',
        value: 6,
        errorMessage: 'Ошибка мало букв'
      }
    ]);

  })

  // Radio fix
  document.querySelectorAll('.radio__label').forEach(label => label.addEventListener('mousedown', e => {
    document.querySelector('#' + e.currentTarget.getAttribute('for')).checked = true;
  }));
  document.querySelectorAll('.radio__input').forEach(radio => radio.addEventListener('mousedown', e => {
    e.currentTarget.checked = true;
  }));
})();