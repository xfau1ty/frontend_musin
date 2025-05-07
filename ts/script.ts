// === Карточки ===
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('servicesGrid') as HTMLElement;
  
  // Проверяем, существует ли элемент
  if (!grid) {
    console.error('Элемент с идентификатором servicesGrid не найден.');
    return;
  }

  // Загружаем данные из внешнего API вместо локального JSON файла
  fetch('https://jsonplaceholder.typicode.com/posts?_limit=8')
    .then((response): Promise<any> => {
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
      }
      return response.json();
    })
    .then((postsData: any[]) => {
      // Преобразуем данные из API в формат для наших карточек
      const servicesData = postsData.map((post: any) => {
        return {
          icon: "img/ps_lab.png", // Используем существующую иконку
          title: post.title.substring(0, 20) + (post.title.length > 20 ? '...' : ''), // Обрезаем заголовок, если он слишком длинный
          text: post.body.substring(0, 60) + (post.body.length > 60 ? '...' : '') // Обрезаем текст, если он слишком длинный
        };
      });
      
      // Создаем карточки
      createCards(servicesData, grid);
    })
    .catch((error: Error) => {
      console.error('Ошибка:', error);
      // Fallback на случай ошибки - загружаем данные из локального файла
      fetch('data/services.json')
        .then((response): Promise<any> => {
          if (!response.ok) {
            throw new Error('Ошибка загрузки данных из локального файла');
          }
          return response.json();
        })
        .then((fallbackData: any[]) => {
          // Создаем карточки из fallback данных
          createCards(fallbackData, grid);
        })
        .catch((fallbackError: Error) => {
          console.error('Fallback error:', fallbackError);
          grid.innerHTML = '<p>Не удалось загрузить данные. Пожалуйста, попробуйте позже.</p>';
        });
    });
});

// Функция для создания карточек
function createCards(data: { icon: string; title: string; text: string }[], grid: HTMLElement) {
  data.forEach((service, index) => {
    const card = document.createElement('div');
    card.classList.add('services__card');
    card.innerHTML = `
      <img src="${service.icon}" alt="${service.title}" class="services__card-icon">
      <h3 class="services__card-title">${service.title}</h3>
      <p class="services__card-text">${service.text}</p>
    `;
    grid.appendChild(card);

    // Анимация появления
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 100);
  });
}