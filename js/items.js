document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".items .items-list li");
    const btn = document.getElementById("items-new");
    console.log(items)
    const SHOW_COUNT = 12;

    // Показать первые 12
    items.forEach((item, index) => {
        if (index < SHOW_COUNT) item.classList.add("visible");
    });

    // При клике – показать остальные
    btn.addEventListener("click", () => {
        items.forEach(item => item.classList.add("visible"));
        btn.style.display = "none"; // спрятать кнопку
    });

    const popular = document.querySelectorAll(".popular .items-list li");
    const pop = document.getElementById("items-popular");
    const POPULAR_COUNT = 8;

    // Показать первые 12
    popular.forEach((item, index) => {
        if (index < POPULAR_COUNT) item.classList.add("visible");
    });

    // При клике – показать остальные
    pop.addEventListener("click", () => {
        popular.forEach(item => item.classList.add("visible"));
        pop.style.display = "none"; // спрятать кнопку
    });
});


