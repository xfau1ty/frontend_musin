// === Карточки ===
document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('servicesGrid');
    // Проверяем, существует ли элемент
    if (!grid) {
        console.error('Элемент с идентификатором servicesGrid не найден.');
        return;
    }
    // Загружаем данные из внешнего API вместо локального JSON файла
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=8')
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных');
        }
        return response.json();
    })
        .then(function (postsData) {
        // Преобразуем данные из API в формат для наших карточек
        var servicesData = postsData.map(function (post) {
            return {
                icon: "img/ps_lab.png", // Используем существующую иконку
                title: post.title.substring(0, 20) + (post.title.length > 20 ? '...' : ''), // Обрезаем заголовок, если он слишком длинный
                text: post.body.substring(0, 60) + (post.body.length > 60 ? '...' : '') // Обрезаем текст, если он слишком длинный
            };
        });
        // Создаем карточки
        createCards(servicesData, grid);
    })
        .catch(function (error) {
        console.error('Ошибка:', error);
        // Fallback на случай ошибки - загружаем данные из локального файла
        fetch('data/services.json')
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных из локального файла');
            }
            return response.json();
        })
            .then(function (fallbackData) {
            // Создаем карточки из fallback данных
            createCards(fallbackData, grid);
        })
            .catch(function (fallbackError) {
            console.error('Fallback error:', fallbackError);
            grid.innerHTML = '<p>Не удалось загрузить данные. Пожалуйста, попробуйте позже.</p>';
        });
    });
});
// Функция для создания карточек
function createCards(data, grid) {
    data.forEach(function (service, index) {
        var card = document.createElement('div');
        card.classList.add('services__card');
        card.innerHTML = "\n      <img src=\"".concat(service.icon, "\" alt=\"").concat(service.title, "\" class=\"services__card-icon\">\n      <h3 class=\"services__card-title\">").concat(service.title, "</h3>\n      <p class=\"services__card-text\">").concat(service.text, "</p>\n    ");
        grid.appendChild(card);
        // Анимация появления
        setTimeout(function () {
            card.classList.add('visible');
        }, index * 100);
    });
}
