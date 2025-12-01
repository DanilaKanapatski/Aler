const itemsPerPage = 12;
const newsList = document.querySelectorAll('.news-list li');
const loadMoreBtn = document.querySelector('.news-btn');

let currentlyShown = itemsPerPage;

// скрываем лишние новости
function hideExtraNews() {
    newsList.forEach((item, index) => {
        if (index >= currentlyShown) item.style.display = 'none';
        else item.style.display = 'flex';
    });

    if (currentlyShown >= newsList.length) {
        loadMoreBtn.style.display = 'none';
    }
}

hideExtraNews();

loadMoreBtn.addEventListener('click', () => {
    currentlyShown += itemsPerPage;
    hideExtraNews();
});

const paginationContainer = document.querySelector('.pagination');

let currentPage = 1;
let totalPages = Math.ceil(newsList.length / itemsPerPage);

function renderPagination() {
    paginationContainer.innerHTML = '';

    // стрелка назад
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '  <path d="M10 12L6 8L10 4" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />\n' +
        '</svg>';
    prevBtn.onclick = () => goToPage(currentPage - 1);
    prevBtn.disabled = currentPage === 1;
    paginationContainer.appendChild(prevBtn);

    // первая страница
    createPageButton(1);

    // точки …
    if (currentPage > 3) {
        const dots = document.createElement('span');
        dots.className = 'dots';
        dots.textContent = '...';
        paginationContainer.appendChild(dots);
    }

    // соседние страницы
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 1 && i < totalPages) {
            createPageButton(i);
        }
    }

    // точки …
    if (currentPage < totalPages - 2) {
        const dots = document.createElement('span');
        dots.className = 'dots';
        dots.textContent = '...';
        paginationContainer.appendChild(dots);
    }

    // последняя страница
    if (totalPages > 1) createPageButton(totalPages);

    // стрелка вперед
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '  <path d="M6 12L10 8L6 4" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />\n' +
        '</svg>';
    nextBtn.onclick = () => goToPage(currentPage + 1);
    nextBtn.disabled = currentPage === totalPages;
    paginationContainer.appendChild(nextBtn);
}

function createPageButton(page) {
    const btn = document.createElement('button');
    btn.textContent = page;

    if (page === currentPage) btn.classList.add('active');

    btn.addEventListener('click', () => goToPage(page));
    paginationContainer.appendChild(btn);
}

function goToPage(page) {
    currentPage = Math.max(1, Math.min(page, totalPages));

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    newsList.forEach((item, index) => {
        item.style.display = index >= start && index < end ? 'flex' : 'none';
    });

    renderPagination();

    // кнопка "загрузить ещё" должна показываться только на 1-й странице
    if (currentPage === 1) {
        loadMoreBtn.style.display = 'flex';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

renderPagination();
