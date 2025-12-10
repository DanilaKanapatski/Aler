document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".header-search");
    const results = document.querySelector(".search-results");

    // пример данных (позже заменишь под реальные товары)
    const items = [
        {name: "AL-400 PRemium", price: "15 610 руб."},
        {name: "AL-4001 PRemium", price: "12 610 руб."},
        {name: "AL-300 PRemium", price: "10 610 руб."}
    ];

    input.addEventListener("input", () => {
        const value = input.value.trim();

        if (value.length === 0) {
            results.style.display = "none";
            results.innerHTML = "";
            return;
        }

        const filtered = items.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );

        if (filtered.length === 0) {
            results.innerHTML = `<div class="search-item">Ничего не найдено</div>`;
        } else {
            results.innerHTML = filtered
                .map(item => `
                    <div class="search-item">
                        <span class="search-name">${item.name}</span>
                        <span class="search-price">${item.price}</span>
                    </div>
                `)
                .join("");
        }

        results.style.display = "block";
    });

    // скрытие при клике вне
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-wrapper")) {
            results.style.display = "none";
        }
    });
});

const telToggle = document.getElementById('telToggle');
const telDropdown = document.querySelector('.header-tel-dropdown');

telToggle.addEventListener('click', (e) => {
    e.preventDefault();
    telDropdown.style.display =
        telDropdown.style.display === 'flex' ? 'none' : 'flex';
});

// клик вне меню — закрыть
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-tel-wrap')) {
        telDropdown.style.display = 'none';
    }
});

const buttons = document.querySelectorAll('.nav-btn');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const parent = btn.closest('.has-dropdown');
        const dropdown = parent.querySelector('.dropdown');

        const isOpen = dropdown.style.display === "flex";

        // закрываем все
        document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

        // открываем только выбранный
        if (!isOpen) {
            dropdown.style.display = "flex";
            btn.classList.add('active');
        }
    });
});

// закрыть при клике вне
document.addEventListener('click', e => {
    if (!e.target.closest('.has-dropdown')) {
        document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    }
});

// Открытие/закрытие основного каталога
const catalogBtn = document.querySelector('.header-catalog');
const catalogOverlay = document.querySelector('.catalog-overlay');
const catalogClose = document.querySelector('.close-catalog');

catalogBtn.addEventListener('click', () => {
    catalogOverlay.classList.add('open');
});

catalogClose.addEventListener('click', () => {
    catalogOverlay.classList.remove('open');
});

// Открытие правого подменю
const leftItems = document.querySelectorAll('.catalog-overlay ul li');
const submenu = document.createElement('div');
submenu.className = 'catalog-submenu';
catalogOverlay.querySelector('div').appendChild(submenu);

leftItems.forEach((li, index) => {
    li.addEventListener('click', () => {
        leftItems.forEach(el => el.classList.remove('active'));
        li.classList.add('active');

        // Генерация правого меню (пример — поменяешь под себя)
        submenu.innerHTML = `
            <ul>
                <li><a href="#">Пункт 1 для ${index + 1}</a></li>
                <li><a href="#">Пункт 2 для ${index + 1}</a></li>
                <li><a href="#">Пункт 3 для ${index + 1}</a></li>
                <li><a href="#">Пункт 4 для ${index + 1}</a></li>
            </ul>
        `;
        submenu.classList.add('open');
    });
});
catalogBtn.addEventListener('click', () => {
    catalogOverlay.classList.add('open');
    document.body.style.overflow = "hidden"; /* 🔥 */
});

catalogClose.addEventListener('click', () => {
    catalogOverlay.classList.remove('open');
    document.body.style.overflow = ""; /* вернуть */
});