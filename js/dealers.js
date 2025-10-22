const dealers = document.getElementsByClassName('dealers-btn');
const desc = document.getElementsByClassName('dealers-desc');

// Добавляем обработчик для каждой кнопки
for (let i = 0; i < dealers.length; i++) {
    dealers[i].addEventListener('click', (e) => {
        // Предотвращаем всплытие события, если нужно
        e.stopPropagation();
        // Переключаем класс у соответствующего описания
        desc[i].classList.toggle('active');
    });
}