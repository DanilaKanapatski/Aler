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

const catalogBtn = document.querySelector('.header-catalog');
const catalogOverlay = document.querySelector('.catalog-overlay');
const catalogClose = document.querySelector('.close-catalog');
const catalogBlock = document.querySelector('.catalog-block');

const leftItems = document.querySelectorAll('.catalog-block > ul > li');

// Открытие каталога
catalogBtn.addEventListener('click', () => {
    catalogOverlay.classList.add('open');
    document.body.style.overflow = "hidden";
});

// Закрытие по крестику
catalogClose.addEventListener('click', () => {
    catalogOverlay.classList.remove('open');
    document.body.style.overflow = "";
});

// Закрытие по клику вне блока
catalogOverlay.addEventListener('click', (e) => {
    if (!catalogBlock.contains(e.target)) {
        catalogOverlay.classList.remove('open');
        document.body.style.overflow = "";
    }
});

// Клик по левым пунктам
leftItems.forEach(li => {
    li.addEventListener('click', () => {

        // убираем актив со всех
        leftItems.forEach(i => {
            i.classList.remove('active');

            const sm = i.querySelector('.catalog-submenu');
            if (sm) sm.classList.remove('open');
        });

        // ставим актив текущему
        li.classList.add('active');

        // открываем его подменю (если есть)
        const submenu = li.querySelector('.catalog-submenu');
        if (submenu) submenu.classList.add('open');
    });
});

const headerWrapper = document.querySelector('.header-wrapper');
const headerInfo = document.querySelector('.header-info');

const wrapperOffset = headerWrapper.offsetTop;

window.addEventListener('scroll', () => {
    if (window.scrollY >= wrapperOffset) {
        headerWrapper.classList.add('is-fixed');
        headerInfo.style.paddingTop = headerWrapper.offsetHeight + 'px';
    } else {
        headerWrapper.classList.remove('is-fixed');
        headerInfo.style.paddingTop = '0px';
    }
});
