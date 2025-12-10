/* === Данные — три категории, у каждой свои фильтры и продукты === */
const data = {
    "electro": {
        title: "Электромагнитные и электромеханические замки",
        filters: [
            {key: "mount", label: "Тип крепления", options: ["Врезной", "Накладной"]},
            {key: "voltage", label: "Условия эксплуатации", options: ["В помещении", "На улице"]},
            {key: "color", label: "Влагозащищённость", options: ["Да", "Нет"]},
            {key: "protection", label: "Холодостойкость", options: ["Да", "Нет"]},
            {key: "protection", label: "Напряжение", options: ["12 / 24", "12", "24"]},
            {key: "protection", label: "Сила удержания (кгс)", options: ["250", "350", "400"]},
            {key: "protection", label: "Датчик двери (геркон)", options: ["Да", "Нет"]},
            {key: "protection", label: "Датчик состояния замка (холл)", options: ["Да", "Нет"]},
            {key: "protection", label: "Цвет", options: ["Оцинк.", "Белый", "Коричневый", "Серый", "Чёрный"]},
            {key: "protection", label: "Световая индикация", options: ["Да", "Нет"]},
            {key: "protection", label: "Бэксет", options: ["29,5", "65", "Нет"]},
            {key: "protection", label: "Особенность", options: ["Антипаника", "Двери купе", "Для ворот"]},
        ],
        products: [
            {
                id: 1,
                name: "AL-150Premium-12V (белый)",
                mount: "Врезной",
                voltage: "12V",
                color: "Белый",
                protection: "IP20"
            },
            {
                id: 2,
                name: "AL-150Premium-12V (коричневый)",
                mount: "Накладной",
                voltage: "12V",
                color: "Коричневый",
                protection: "IP54"
            },
            {
                id: 3,
                name: "AL-150Premium-24V (серый)",
                mount: "Врезной",
                voltage: "24V",
                color: "Серый",
                protection: "IP20"
            },
            {
                id: 4,
                name: "AL-200Pro-12V (белый)",
                mount: "Накладной",
                voltage: "12V",
                color: "Белый",
                protection: "IP54"
            },
            {
                id: 5,
                name: "AL-200Pro-24V (серый)",
                mount: "Врезной",
                voltage: "24V",
                color: "Серый",
                protection: "IP20"
            },
            {
                id: 6,
                name: "AL-300Safe-12V (коричневый)",
                mount: "Врезной",
                voltage: "12V",
                color: "Коричневый",
                protection: "IP54"
            },
            {
                id: 7,
                name: "AL-300Safe-24V (белый)",
                mount: "Накладной",
                voltage: "24V",
                color: "Белый",
                protection: "IP20"
            }
        ]
    },
    "explosive": {
        title: "Взрывозащищенные замки",
        filters: [
            {key: "mount", label: "Тип крепления", options: ["Врезной", "Накладной"]},
            {key: "temp", label: "Температурный режим", options: ["-40…+60", "-20…+50"]},
            {key: "cert", label: "Сертификация", options: ["ATEX", "None"]}
        ],
        products: [
            {id: 11, name: "EX-400 (врезной) - ATEX", mount: "Врезной", temp: "-40…+60", cert: "ATEX"},
            {id: 12, name: "EX-410 (накладной) - ATEX", mount: "Накладной", temp: "-20…+50", cert: "ATEX"},
            {id: 13, name: "EX-420 (врезной) - без серт.", mount: "Врезной", temp: "-20…+50", cert: "None"}
        ]
    },
    "readers": {
        title: "Взрывозащищенные и холодостойкие считыватели",
        filters: [
            {key: "interface", label: "Интерфейс", options: ["Wiegand", "RS485", "TCP/IP"]},
            {key: "mount", label: "Тип крепления", options: ["Накладной", "Встраиваемый"]},
            {key: "color", label: "Цвет", options: ["Чёрный", "Серый"]}
        ],
        products: [
            {
                id: 21,
                name: "RD-10 (Wiegand, накладной, чёрный)",
                interface: "Wiegand",
                mount: "Накладной",
                color: "Чёрный"
            },
            {
                id: 22,
                name: "RD-11 (RS485, встраиваемый, серый)",
                interface: "RS485",
                mount: "Встраиваемый",
                color: "Серый"
            },
            {id: 23, name: "RD-12 (TCP/IP, накладной, серый)", interface: "TCP/IP", mount: "Накладной", color: "Серый"}
        ]
    }
};

/* === UI state === */
let currentCategoryKey = null;
let selectedFilters = {}; // {filterKey: value} — сбрасывается при смене категории

/* --- Инициализация сайдбара --- */
const categoriesListEl = document.getElementById('categories');
for (const key of Object.keys(data)) {
    const li = document.createElement('li');
    li.dataset.key = key;
    li.innerHTML = `<span style="flex:1">${data[key].title}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 12L10 8L6 4" stroke="#757F84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
    li.addEventListener('click', () => selectCategory(key, li));
    categoriesListEl.appendChild(li);
}

/* --- Выбор категории --- */
function selectCategory(key, liEl) {
    // убрать класс active у всех
    document.querySelectorAll('.side-list li').forEach(n => n.classList.remove('active'));
    liEl.classList.add('active');

    currentCategoryKey = key;
    // при переключении сбрасываем фильтры как ты просил
    selectedFilters = {};

    // показать тело мастера
    document.getElementById('master-clean').style.display = 'none';
    document.getElementById('master-body').style.display = 'flex';

    renderFilters();
    renderResults();
}

/* --- Рендер фильтров (аккордеоны) --- */
function renderFilters() {
    const container = document.getElementById('filters');
    container.innerHTML = "";

    const cat = data[currentCategoryKey];

    cat.filters.forEach((f, idx) => {
        const wrap = document.createElement('div');
        wrap.className = 'filter';
        wrap.dataset.key = f.key;

        const head = document.createElement('div');
        head.className = 'filter-head';
        head.innerHTML = `
            <div class="filter-title">${f.label}</div>
            <svg class="chev" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 6L8 10L4 6" stroke="#757F84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `;
        wrap.appendChild(head);

        const selected = document.createElement('div');
        selected.className = 'filter-selected';
        selected.style.display = 'none';
        wrap.appendChild(selected);

        const body = document.createElement('div');
        body.className = 'filter-body';

        f.options.forEach(opt => {
            const optWrap = document.createElement('label');
            optWrap.className = 'opt';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `filter-${f.key}`;
            input.value = opt;

            if (selectedFilters[f.key] === opt) {
                input.checked = true;
                selected.textContent = opt;
                selected.style.display = 'block';
                wrap.classList.add('selected');
            }

            input.addEventListener('change', () => {
                selectedFilters[f.key] = opt;

                selected.textContent = opt;
                selected.style.display = 'block';

                wrap.classList.add('selected');     // ← выбран фильтр
                wrap.classList.remove('select');    // ← закрываем состояние select

                body.classList.remove('open');
                head.querySelector('.chev').classList.remove('open');

                renderResults();
            });

            optWrap.appendChild(input);
            optWrap.appendChild(document.createTextNode(opt));
            body.appendChild(optWrap);
        });

        wrap.appendChild(body);

        head.addEventListener('click', () => {
            const isOpen = body.classList.contains('open');

            document.querySelectorAll('.filter-body.open').forEach(b => {
                b.classList.remove('open');
                b.parentElement.querySelector('.chev').classList.remove('open');
                b.parentElement.classList.remove('select');
            });

            if (!isOpen) {
                body.classList.add('open');
                head.querySelector('.chev').classList.add('open');
                wrap.classList.add('select');       // ← открыт — значит SELECT
            } else {
                wrap.classList.remove('select');    // ← закрыт
            }
        });

        container.appendChild(wrap);
    });
}

/* --- Рендер результатов (фильтрация) --- */
function renderResults() {
    const container = document.getElementById('results');
    container.innerHTML = "";
    const cat = data[currentCategoryKey];

    // apply filtering: intersection of all selectedFilters
    let list = cat.products.slice();
    for (const [k, v] of Object.entries(selectedFilters)) {
        list = list.filter(p => p[k] === v);
    }

    if (list.length === 0) {
        container.innerHTML += `<div class="empty">Нет товаров, соответствующих выбранным фильтрам.</div>`;
        return;
    }

    // show products
    list.forEach(p => {
        const el = document.createElement('div');
        el.className = 'product';
        const title = document.createElement('h4');
        title.textContent = p.name;
        const meta = document.createElement('div');
        meta.className = 'muted';
        // assemble meta from product keys except id,name
        const metaParts = [];
        Object.keys(p).forEach(k => {
            if (k === 'id' || k === 'name') return;
            metaParts.push(`${k}: ${p[k]}`);
        });
        meta.textContent = metaParts.join(' • ');
        el.appendChild(title);
        el.appendChild(meta);
        container.appendChild(el);
    });
}

/* --- старт: ничего не выбрано --- */
// ------------------------------
// АККОРДИОНЫ С 3 СОСТОЯНИЯМИ
// ------------------------------

function initFilters() {
    document.querySelectorAll(".filter").forEach(filter => {
        const head = filter.querySelector(".filter-head");
        const body = filter.querySelector(".filter-body");
        const chev = filter.querySelector(".chev");

        // Создаём элемент для выбранного значения (состояние 3)
        let selected = filter.querySelector(".filter-selected");
        if (!selected) {
            selected = document.createElement("div");
            selected.className = "filter-selected";
            selected.style.cssText = "margin:4px 0 0 2px; font-size:15px; font-weight:500; color:#000; display:none;";
            head.insertAdjacentElement("afterend", selected);
        }

        // Открыть/закрыть
        head.addEventListener("click", () => {
            const isOpen = body.classList.contains("open");

            document.querySelectorAll(".filter-body.open").forEach(b => {
                b.classList.remove("open");
                b.parentElement.querySelector(".chev").classList.remove("open");
            });

            if (!isOpen) {
                body.classList.add("open");
                chev.classList.add("open");
            }
        });

        // Выбор значения
        body.querySelectorAll("input[type=radio]").forEach(radio => {
            radio.addEventListener("change", () => {
                const val = radio.nextElementSibling.textContent.trim();

                // Показ выбранного значения
                selected.textContent = val;
                selected.style.display = "block";

                // закрываем аккордион
                body.classList.remove("open");
                chev.classList.remove("open");
            });
        });
    });
}
