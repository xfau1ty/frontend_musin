// Определяем интерфейсы для работы с данными
interface ServiceCard {
    icon: string;
    title: string;
    text: string;
  }
  
  interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  
  // === Карточки с данными из JSONPlaceholder API ===
  document.addEventListener('DOMContentLoaded', (): void => {
    const grid: HTMLElement | null = document.getElementById('servicesGrid');
    
    if (!grid) {
      console.error('Element with ID "servicesGrid" not found');
      return;
    }
  
    // Загружаем данные из JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=8')
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        return response.json() as Promise<Post[]>;
      })
      .then((postsData: Post[]) => {
        // Преобразуем данные из API в формат для наших карточек
        const servicesData: ServiceCard[] = postsData.map(post => {
          return {
            icon: "img/ps_lab.png", // Используем существующую иконку
            title: post.title.substring(0, 20) + (post.title.length > 20 ? '...' : ''), // Обрезаем заголовок
            text: post.body.substring(0, 60) + (post.body.length > 60 ? '...' : '')    // Обрезаем текст
          };
        });
        
        // Создаем карточки
        servicesData.forEach((service: ServiceCard, index: number) => {
          const card: HTMLDivElement = document.createElement('div');
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
      })
      .catch((error: Error) => {
        console.error('Ошибка загрузки данных:', error);
        grid.innerHTML = '<p>Не удалось загрузить данные. Пожалуйста, попробуйте позже.</p>';
      });
  });