const storageKey = 'favoritesDictionary';

function loadFavorites() {
    try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            const parsed = JSON.parse(saved);
            return parsed && typeof parsed === 'object' ? parsed : {};
        }
    } catch (e) {
        console.error('Ошибка загрузки избранного:', e);
    }
    return {};
}

function saveFavorites(dict) {
    if (dict && typeof dict === 'object') {
        localStorage.setItem(storageKey, JSON.stringify(dict));
    }
}

let favoritesDictionary = loadFavorites();
console.log('Загружено из localStorage:', favoritesDictionary);

if (!favoritesDictionary || typeof favoritesDictionary !== 'object') {
    favoritesDictionary = {};
    console.log('Инициализирован пустой словарь');
} else {
    console.log('Словарь успешно загружен');
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Восстановление кнопок. Ключи:', Object.keys(favoritesDictionary));

    Object.keys(favoritesDictionary).forEach(item => {
        const btn = document.querySelector(`[data-item-name="${item}"]`);
        console.log(`Поиск кнопки для "${item}":`, btn);
        if (btn) {
            btn.setAttribute('aria-pressed', 'true');
            btn.classList.add('active');
            console.log(`Кнопка "${item}" восстановлена`);
        }
    });
    console.log('Восстановлены избранные:', favoritesDictionary);
});

function toggleFavorite(btn) {
    const itemName = btn.getAttribute('data-item-name');
    const isPressed = btn.getAttribute('aria-pressed') === 'true';

    console.log('Toggle:', itemName, 'было:', isPressed);

    if (isPressed) {
        delete favoritesDictionary[itemName];
        btn.setAttribute('aria-pressed', 'false');
        btn.classList.remove('active');
        console.log('Удалено из избранного:', itemName);
    } else {
        favoritesDictionary[itemName] = 1;
        btn.setAttribute('aria-pressed', 'true');
        btn.classList.add('active');
        console.log('Добавлено в избранное:', itemName);
    }

    console.log('Текущие избранные:', favoritesDictionary);
    saveFavorites(favoritesDictionary);

    setTimeout(() => {
        const saved = localStorage.getItem(storageKey);
        console.log('Проверка сохранения в localStorage:', saved);
    }, 100);
}

function clearFavorites() {
    Object.keys(favoritesDictionary).forEach(key => {
        delete favoritesDictionary[key];
    });
    localStorage.removeItem(storageKey);
    document.querySelectorAll('.favorite-btn[aria-pressed="true"]').forEach(btn => {
        btn.setAttribute('aria-pressed', 'false');
        btn.classList.remove('active');
    });
    console.log('Избранное очищено');
    return true;
}

document.addEventListener('click', function (e) {
    if (e.target.closest('.favorite-btn')) {
        toggleFavorite(e.target.closest('.favorite-btn'));
    }
});


const themeKey = 'site-theme';
const toggleBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(themeKey, theme);
}

function initTheme() {
    const savedTheme = localStorage.getItem(themeKey);
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }
}

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}

initTheme();


const openBtn = document.getElementById('openFilters');
const closeBtn = document.getElementById('closeFilters');
const sheet = document.getElementById('filtersSheet');

function openSheet() {
    sheet.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSheet() {
    sheet.classList.remove('active');
    document.body.style.overflow = '';
}

if (openBtn) openBtn.addEventListener('click', openSheet);
if (closeBtn) closeBtn.addEventListener('click', closeSheet);

sheet.addEventListener('click', (e) => {
    if (e.target === sheet) {
        closeSheet();
    }
});


const sheetContent = document.querySelector('.filters-sheet-content');

let startY = 0;
let currentY = 0;
let isDragging = false;

const CLOSE_THRESHOLD = 120; 

sheetContent.addEventListener('touchstart', (e) => {
    if (!sheet.classList.contains('active')) return;

    startY = e.touches[0].clientY;
    isDragging = true;

    sheetContent.style.transition = 'none';
});

sheetContent.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    if (deltaY > 0) {
        sheetContent.style.transform = `translateY(${deltaY}px)`;
    }
});

sheetContent.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;

    sheetContent.style.transition = 'transform 0.25s cubic-bezier(.4,0,.2,1)';

    const deltaY = currentY - startY;

    if (deltaY > CLOSE_THRESHOLD) {
        closeSheet();
    } else {

        sheetContent.style.transform = 'translateY(0)';
    }

    startY = 0;
    currentY = 0;
});


const applyBtn = document.getElementById('applyFilters');
const resetBtn = document.getElementById('resetFilters');


if (applyBtn) {
    applyBtn.addEventListener('click', () => {

        closeSheet(); 
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        const inputs = document.querySelectorAll(
            '.filters-sheet input[type="radio"], .filters-sheet input[type="checkbox"]'
        );

        inputs.forEach(input => {
            input.checked = false;
        });
    });
}


const mobileThemeBtn = document.getElementById('mobileThemeToggle');

if (mobileThemeBtn) {
    mobileThemeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}


const accountSheet = document.getElementById('accountSheet');
const mobileLoginBtn = document.getElementById('mobileLoginBtn');
const closeAccountBtn = document.getElementById('closeAccountSheet');

function openAccountSheet() {
    if (accountSheet) {
        accountSheet.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAccountSheetFunc() {
    if (accountSheet) {
        accountSheet.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAccountSheet();
    });
}

if (closeAccountBtn) closeAccountBtn.addEventListener('click', closeAccountSheetFunc);

if (accountSheet) {
    accountSheet.addEventListener('click', e => {
        if (e.target === accountSheet) closeAccountSheetFunc();
    });
}


const mobileSheet = document.getElementById('mobileSheet');
const sheetTitle = document.getElementById('sheetTitle');
const sheetBody = document.getElementById('sheetBody');
const closeMobileSheet = document.getElementById('closeMobileSheet');
const filtersContent = `
<div class="filter-group">
    <div class="filter-block">
        <span class="filter-title">Назначение</span>
        <label><input type="radio" name="purpose"> Рабочие приложения</label>
        <label><input type="radio" name="purpose"> Развлечение</label>
        <label><input type="radio" name="purpose"> Медиа</label>
        <label><input type="radio" name="purpose"> Утилиты</label>
        <label><input type="radio" name="purpose"> Образование</label>
    </div>
    <div class="filter-block">
        <span class="filter-title">Цена</span>
        <label><input type="radio" name="price"> Бесплатные</label>
        <label><input type="radio" name="price"> Платные</label>
    </div>
    <div class="filter-block">
        <span class="filter-title">Устройство</span>
        <label><input type="radio" name="device"> Windows</label>
        <label><input type="radio" name="device"> macOS</label>
    </div>
    <div class="filter-block">
        <span class="filter-title">Доступ</span>
        <label><input type="radio" name="access"> Desktop</label>
        <label><input type="radio" name="access"> Web</label>
        <label><input type="radio" name="access"> Mobile</label>
    </div>
</div>
`;

const accountContent = `
<a href="{% url 'login' %}" class="sheet-btn">Войти</a>
<a href="{% url 'register' %}" class="sheet-btn">Регистрация</a>
`;
function openSheet(type) {
    if (type === 'filters') {
        sheetTitle.textContent = 'Фильтры';
        sheetBody.innerHTML = filtersContent;
    } else if (type === 'account') {
        sheetTitle.textContent = 'Вход';
        sheetBody.innerHTML = accountContent;
    }
    mobileSheet.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSheet() {
    mobileSheet.classList.remove('active');
    document.body.style.overflow = '';
}

closeMobileSheet.addEventListener('click', closeSheet);
mobileSheet.addEventListener('click', e => {
    if (e.target === mobileSheet) closeSheet();
});


sheetContent.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
    isDragging = true;
    sheetContent.style.transition = 'none';
});
sheetContent.addEventListener('touchmove', e => {
    if (!isDragging) return;
    currentY = e.touches[0].clientY;
    let deltaY = currentY - startY;
    if (deltaY > 0) sheetContent.style.transform = `translateY(${deltaY}px)`;
});
sheetContent.addEventListener('touchend', () => {
    isDragging = false;
    sheetContent.style.transition = 'transform 0.25s cubic-bezier(.4,0,.2,1)';
    let deltaY = currentY - startY;
    if (deltaY > CLOSE_THRESHOLD) closeSheet();
    else sheetContent.style.transform = 'translateY(0)';
});
document.querySelectorAll('.output').forEach((el, index) => {
    setTimeout(() => el.classList.add('show'), index * 100);
});
const labels = document.querySelectorAll('.filter-block label');

labels.forEach(label => {
    const input = label.querySelector('input');
    input.addEventListener('change', () => {
        labels.forEach(l => l.classList.remove('active'));
        if (input.checked) {
            label.classList.add('active');
        }
    });
});
document.querySelectorAll('.filter-block label').forEach(label => {
    const input = label.querySelector('input');
    input.addEventListener('change', () => {
        const group = label.parentElement;
        group.querySelectorAll('label').forEach(l => l.classList.remove('active'));
        if (input.checked) label.classList.add('active');
    });
});

