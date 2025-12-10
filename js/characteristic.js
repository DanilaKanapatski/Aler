document.addEventListener("DOMContentLoaded", () => {
    const list = document.querySelector(".item-characteristic__list");
    const items = list.querySelectorAll("li");
    const btn = document.querySelector(".item-about__btn");

    const SHOW_COUNT = 10;

    // Скрываем всё, что после первых 10
    items.forEach((li, i) => {
        if (i >= SHOW_COUNT) {
            li.style.display = "none";
        }
    });

    // Клик по кнопке — показать всё
    btn.addEventListener("click", () => {
        items.forEach(li => li.style.display = "flex");
        btn.style.display = "none";
    });



});

document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.querySelector(".open-popup-request");
    const overlay = document.querySelector(".popup-overlay-request");
    const closeBtn = document.querySelector(".popup-close-request");

    openBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    // закрытие по клику на фон
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const openBtn1 = document.querySelector(".open-popup-question");
    const overlay1 = document.querySelector(".popup-overlay-question");
    const closeBtn1 = document.querySelector(".popup-close-question");

    openBtn1.addEventListener("click", () => {
        overlay1.style.display = "flex";
    });

    closeBtn1.addEventListener("click", () => {
        overlay1.style.display = "none";
    });

    // закрытие по клику на фон
    overlay1.addEventListener("click", (e) => {
        if (e.target === overlay1) overlay1.style.display = "none";
    });
});