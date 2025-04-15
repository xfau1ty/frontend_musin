document.addEventListener('DOMContentLoaded', function () {
    // === Инициализация Swiper с эффектом coverflow ===
    const swiper = new Swiper('.portfolio-swiper', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 1000,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 1.2,
          spaceBetween: 30,
        },
      },
    });

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

// === карточки ===
  // Массив с данными карточек
  const servicesData = [
    { icon: 'img/ps_lab.png', title: 'Branding Design', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt sed mi posuere.' },
    { icon: 'img/ps_lab.png', title: 'UI/UX Design', text: 'Nulla tincidunt sed mi posuere in amet turpis nunc, nisl.' },
    { icon: 'img/ps_lab.png', title: 'Web Development', text: 'Curabitur tincidunt, purus non tincidunt, augue mi congue.' },
    { icon: 'img/ps_lab.png', title: 'Mobile Apps', text: 'Fusce tristique metus ut leo congue, a posuere lorem pulvinar.' },
    { icon: 'img/ps_lab.png', title: 'SEO Optimization', text: 'Praesent ultricies, sem at pulvinar lacinia, magna turpis.' },
    { icon: 'img/ps_lab.png', title: 'Content Marketing', text: 'Aliquam erat volutpat. Duis a dui non felis.' },
    { icon: 'img/ps_lab.png', title: 'Consulting', text: 'Maecenas sit amet pretium urna. Vivamus venenatis.' },
    { icon: 'img/ps_lab.png', title: 'Cloud Services', text: 'Donec et nulla porta, tincidunt mi et, luctus risus.' }
  ];
  
  // Функция загрузки карточек
  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('servicesGrid');
    
    servicesData.forEach((service, index) => {
      // Создаем элемент карточки
      const card = document.createElement('div');
      card.classList.add('services__card');
      card.innerHTML = `
        <img src="${service.icon}" alt="${service.title}" class="services__card-icon">
        <h3 class="services__card-title">${service.title}</h3>
        <p class="services__card-text">${service.text}</p>
      `;
      grid.appendChild(card);
      
      // Анимация появления карточек с небольшим интервалом
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 100);
    });
  });


  // === слайдер 2 ===
  document.addEventListener('DOMContentLoaded', function () {
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
      loop: true,
      effect: 'fade',
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      speed: 800,
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
