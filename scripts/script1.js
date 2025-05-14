document.addEventListener('DOMContentLoaded', function () {
    // // === Инициализация Swiper с эффектом coverflow ===
    // const swiper = new Swiper('.portfolio-swiper', {
    //   loop: true,
    //   slidesPerView: 1,
    //   spaceBetween: 20,
    //   centeredSlides: true,
    //   autoplay: {
    //     delay: 4000,
    //     disableOnInteraction: false,
    //     pauseOnMouseEnter: true,
    //   },
    //   speed: 10,
    //   effect: 'coverflow',
    //   coverflowEffect: {
    //     rotate: 30,
    //     stretch: 0,
    //     depth: 100,
    //     modifier: 1,
    //     slideShadows: true,
    //   },
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //   },
    //   breakpoints: {
    //     768: {
    //       slidesPerView: 1.2,
    //       spaceBetween: 30,
    //     },
    //   },
    // });

    // === Бургер-меню ===
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.header__nav');

    if (burger && nav) {
      burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('open');
      });

      // Закрытие меню при клике по ссылке (опционально)
      document.querySelectorAll('.header__nav a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('active');
          burger.classList.remove('open');
        });
      });
    }
  });

  // === Прелоудер ===
  window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.classList.add('preloader--hide');
      setTimeout(() => (preloader.style.display = 'none'), 500);
    }
  });

// === анимация счётчиков ===
  document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.about__stat-number');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const countTo = +el.dataset.count;
          let current = 0;

          const step = () => {
            current += Math.ceil(countTo / 50);
            if (current < countTo) {
              el.textContent = `${current}+`;
              requestAnimationFrame(step);
            } else {
              el.textContent = `${countTo}+`;
            }
          };

          step();
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(counter => observer.observe(counter));
  });

  // // === Карточки ===
  // document.addEventListener('DOMContentLoaded', () => {
  //   const grid = document.getElementById('servicesGrid');

  //   // Загружаем данные из внешнего API вместо локального JSON файла
  //   fetch('https://jsonplaceholder.typicode.com/posts?_limit=8')
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Ошибка загрузки данных');
  //       }
  //       return response.json();
  //     })
  //     .then((postsData) => {
  //       // Преобразуем данные из API в формат для наших карточек
  //       const servicesData = postsData.map(post => {
  //         return {
  //           icon: "img/ps_lab.png", // Используем существующую иконку
  //           title: post.title.substring(0, 20) + (post.title.length > 20 ? '...' : ''), // Обрезаем заголовок, если он слишком длинный
  //           text: post.body.substring(0, 60) + (post.body.length > 60 ? '...' : '') // Обрезаем текст, если он слишком длинный
  //         };
  //       });
        
  //       // Создаем карточки
  //       servicesData.forEach((service, index) => {
  //         const card = document.createElement('div');
  //         card.classList.add('services__card');
  //         card.innerHTML = `
  //           <img src="${service.icon}" alt="${service.title}" class="services__card-icon">
  //           <h3 class="services__card-title">${service.title}</h3>
  //           <p class="services__card-text">${service.text}</p>
  //         `;
  //         grid.appendChild(card);
  
  //         // Анимация появления
  //         setTimeout(() => {
  //           card.classList.add('visible');
  //         }, index * 100);
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Ошибка:', error);
  //       // Fallback на случай ошибки - загружаем данные из локального файла
  //       fetch('data/services.json')
  //         .then(response => response.json())
  //         .then(fallbackData => {
  //           // Создаем карточки из fallback данных
  //           fallbackData.forEach((service, index) => {
  //             const card = document.createElement('div');
  //             card.classList.add('services__card');
  //             card.innerHTML = `
  //               <img src="${service.icon}" alt="${service.title}" class="services__card-icon">
  //               <h3 class="services__card-title">${service.title}</h3>
  //               <p class="services__card-text">${service.text}</p>
  //             `;
  //             grid.appendChild(card);
      
  //             // Анимация появления
  //             setTimeout(() => {
  //               card.classList.add('visible');
  //             }, index * 100);
  //           });
  //         })
  //         .catch(fallbackError => {
  //           console.error('Fallback error:', fallbackError);
  //           grid.innerHTML = '<p>Не удалось загрузить данные. Пожалуйста, попробуйте позже.</p>';
  //         });
  //     });
  // });

  // === слайдер 2 ===
  document.addEventListener('DOMContentLoaded', function () {
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
      loop: true,
      effect: 'fade',
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      speed: 80,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  });


 // === форма ===
  // Получаем элементы
const openButton = document.getElementById('openContactForm');
const closeButton = document.getElementById('closeContactForm');
const contactModal = document.getElementById('contactModal');

// Открытие модального окна
openButton.addEventListener('click', (e) => {
  e.preventDefault();
  contactModal.style.display = 'flex';
});

// Закрытие модального окна
closeButton.addEventListener('click', () => {
  contactModal.style.display = 'none';
});

// Закрытие модального окна при клике за пределы формы
contactModal.addEventListener('click', (e) => {
  if (e.target === contactModal) {
    contactModal.style.display = 'none';
  }
});