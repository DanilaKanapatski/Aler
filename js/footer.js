document.addEventListener('DOMContentLoaded', function() {
    const footerBlocks = document.querySelectorAll('.footer-block');

    // Функция для проверки ширины экрана
    function isMobileScreen() {
        return window.innerWidth <= 768;
    }

    // Функция инициализации/деинициализации аккордеона
    function toggleAccordion() {
        if (isMobileScreen()) {
            // Инициализируем аккордеон для мобильных
            footerBlocks.forEach(block => {
                const title = block.querySelector('.subtitle');
                const list = block.querySelector('.footer-list');

                // Удаляем предыдущие обработчики, чтобы избежать дублирования
                title.removeEventListener('click', handleTitleClick);
                title.addEventListener('click', handleTitleClick);

                // Инициализация - все списки закрыты
                list.style.maxHeight = '0';
            });
        } else {
            // Деинициализируем для десктопов - убираем ограничения высоты
            footerBlocks.forEach(block => {
                const title = block.querySelector('.subtitle');
                const list = block.querySelector('.footer-list');

                // Удаляем обработчики
                title.removeEventListener('click', handleTitleClick);

                // Убираем классы и стили
                title.classList.remove('active');
                list.classList.remove('active');
                list.style.maxHeight = '';
            });
        }
    }

    // Обработчик клика по заголовку
    function handleTitleClick() {
        const list = this.nextElementSibling || this.parentElement.querySelector('.footer-list');

        // Переключаем активный класс для стрелки
        this.classList.toggle('active');

        // Переключаем активный класс для списка
        list.classList.toggle('active');

        // Если список открывается, устанавливаем правильную высоту
        if (list.classList.contains('active')) {
            list.style.maxHeight = list.scrollHeight + 'px';
        } else {
            list.style.maxHeight = '0';
        }
    }

    // Инициализация при загрузке
    toggleAccordion();

    // Обработчик изменения размера окна
    window.addEventListener('resize', toggleAccordion);
});