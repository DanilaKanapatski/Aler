document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".stp-item");
    const btn = document.querySelector(".stp-btn");

    const isMobile = window.innerWidth <= 768;
    const initialCount = isMobile ? 5 : 12;

    // показываем первые 12 (или 5)
    items.forEach((item, index) => {
        if (index < initialCount) {
            item.classList.add("visible");
        }
    });

    btn.addEventListener("click", () => {
        items.forEach(item => item.classList.add("visible"));
        btn.style.display = "none"; // скрываем кнопку
    });

});

document.addEventListener("DOMContentLoaded", () => {
    // Мобильный слайдер для information-list
    if (window.innerWidth <= 768) {
        new Swiper('.information-slider', {
            slidesPerView: 'auto',
            spaceBetween: 10,
            allowTouchMove: true,
            slideToClickedSlide: true,
            loop: false,
        });
    }
});


