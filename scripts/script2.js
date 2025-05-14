document.addEventListener('DOMContentLoaded', () => {
  const images = [
    "img/portfolio-image1.png",
    "img/portfolio-image2.png",
    // Замени на свои изображения
  ];

  const mainWrapper = document.querySelector('.portfolio .portfolio__gallery-main .swiper-wrapper');
  const previewImage = document.querySelector('.portfolio .portfolio__gallery-preview img');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // Проверка, что все элементы найдены
  if (!mainWrapper || !previewImage || !prevBtn || !nextBtn) {
    console.error('One or more gallery elements not found');
    return;
  }

  // Добавление слайдов
  images.forEach((src, index) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    const img = document.createElement('img');
    img.classList.add('portfolio__gallery-image');
    img.src = src;
    img.alt = `Изображение ${index + 1}`;
    slide.appendChild(img);
    mainWrapper.appendChild(slide);
  });

  // Инициализация Swiper
  const mainSwiper = new Swiper('.portfolio .portfolio__gallery-main', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    observer: true,
    observeParents: true,
  });

  // Обновление превью
  function updatePreview() {
    const nextIndex = (mainSwiper.realIndex + 1) % images.length;
    previewImage.src = images[nextIndex];
    previewImage.alt = `Превью изображения ${nextIndex + 1}`;
  }

  // Привязка событий
  mainSwiper.on('init slideChange', updatePreview);
  prevBtn.addEventListener('click', () => mainSwiper.slidePrev());
  nextBtn.addEventListener('click', () => mainSwiper.slideNext());

  // Управление автопрокруткой
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      mainSwiper.autoplay.stop();
    } else {
      mainSwiper.autoplay.start();
    }
  });
});