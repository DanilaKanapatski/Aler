document.addEventListener("DOMContentLoaded", function () {

    const isMobile = window.innerWidth <= 768;

    // --- Новинки ---
    const items = document.querySelectorAll(".items .items-list li");
    const btn = document.getElementById("items-new");
    const SHOW_COUNT = 12;

    if (isMobile) {
        // На мобильных — показываем все
        items.forEach(item => item.classList.add("visible"));
        if (btn) btn.style.display = "none"; // кнопка скрыта
    } else {
        // ПК/планшет — обычная логика
        items.forEach((item, index) => {
            if (index < SHOW_COUNT) item.classList.add("visible");
        });

        if (btn) {
            btn.addEventListener("click", () => {
                items.forEach(item => item.classList.add("visible"));
                btn.style.display = "none";
            });
        }
    }

    // --- Популярные ---
    const popular = document.querySelectorAll(".popular .items-list li");
    const pop = document.getElementById("items-popular");
    const POPULAR_COUNT = 8;

    if (isMobile) {
        // На мобильных показываем все
        popular.forEach(item => item.classList.add("visible"));
        if (pop) pop.style.display = "none";
    } else {
        // ПК логика
        popular.forEach((item, index) => {
            if (index < POPULAR_COUNT) item.classList.add("visible");
        });

        if (pop) {
            pop.addEventListener("click", () => {
                popular.forEach(item => item.classList.add("visible"));
                pop.style.display = "none";
            });
        }
    }

    const compatibility = document.querySelectorAll(".item-compatibility .items-list li");
    const COM_COUNT = 8;
    compatibility.forEach(item => item.classList.add("visible"));


});

