    document.addEventListener('DOMContentLoaded', function() {
    // Создаем модальное окно
    const modalHTML = `
        <div class="image-modal">
            <button class="close-modal">&times;</button>
            <div class="modal-content">
                <img class="modal-image" src="" alt="">
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.querySelector('.image-modal');
    const modalImage = document.querySelector('.modal-image');
    const closeBtn = document.querySelector('.close-modal');

    // Обработчик клика на иконку лупы
    document.querySelectorAll('.zoom-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
    e.stopPropagation();

    // Получаем URL полноразмерного изображения
    const fullSizeSrc = this.getAttribute('data-fullsize-src') ||
    this.closest('.article-img').querySelector('img').src;

    // Устанавливаем изображение в модальное окно
    modalImage.src = fullSizeSrc;
    modalImage.alt = this.closest('.article-img').querySelector('img').alt || 'Увеличенное изображение';

    // Показываем модальное окно
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
});
});

    // Закрытие модального окна
    function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

    closeBtn.addEventListener('click', closeModal);

    // Закрытие по клику вне изображения
    modal.addEventListener('click', function(e) {
    if (e.target === modal) {
    closeModal();
}
});

    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
}
});
});
