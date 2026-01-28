const storageKey = 'favoritesDictionary';

function loadFavorites() {
    try {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : {};
    } catch (e) {
        console.error('Ошибка загрузки избранного:', e);
        return {};
    }
}

let favoritesDictionary = loadFavorites();

document.addEventListener('DOMContentLoaded', () => {
    Object.keys(favoritesDictionary).forEach(item => {
        const btn = document.querySelector(`[data-item-name="${item}"]`);
        if (btn) {
            btn.setAttribute('aria-pressed', 'true');
            btn.classList.add('active');
        }
    });

    // Анимация результатов
    document.querySelectorAll('.output').forEach((el, index) => {
        setTimeout(() => el.classList.add('show'), index * 100);
    });

    // Фильтры (чекбоксы)
    document.querySelectorAll('.filter-block label').forEach(label => {
        const input = label.querySelector('input');
        if (input) {
            input.addEventListener('change', () => {
                const group = label.parentElement;
                group.querySelectorAll('label').forEach(l => l.classList.remove('active'));
                if (input.checked) label.classList.add('active');
            });
        }
    });
});

function toggleFavorite(btn) {
    const container = document.querySelector('[data-auth]');
    const isAuth = container?.dataset.auth === 'true';

    if (!isAuth) {
        showToast('Чтобы добавить в избранное, войдите в аккаунт', 'warning');
        return;
    }

    const itemName = btn.getAttribute('data-item-name');
    const isPressed = btn.getAttribute('aria-pressed') === 'true';

    if (isPressed) {
        delete favoritesDictionary[itemName];
        btn.setAttribute('aria-pressed', 'false');
        btn.classList.remove('active');
        showToast('Удалено из избранного', 'success');
    } else {
        favoritesDictionary[itemName] = 1;
        btn.setAttribute('aria-pressed', 'true');
        btn.classList.add('active');
        showToast('Добавлено в избранное', 'success');
    }

    localStorage.setItem(storageKey, JSON.stringify(favoritesDictionary));
}


document.addEventListener('click', e => {
    const btn = e.target.closest('.favorite-btn');
    if (btn) toggleFavorite(btn);
});

function showToast(message, type = '') {
    const toast = document.getElementById('auth-toast');
    if (!toast) return;

    toast.className = 'auth-toast';
    if (type) toast.classList.add(type);

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}



document.addEventListener('click', e => {
    const favBtn = e.target.closest('.favorite-btn');
    if (!favBtn) return;

    const container = document.querySelector('[data-auth]');
    const isAuth = container?.dataset.auth === 'true';

    if (!isAuth) {
        e.preventDefault();
        showToast('Чтобы добавить в избранное, войдите в аккаунт', 'warning');
        return;
    }
});

document.addEventListener('click', e => {
    const favLink = e.target.closest('a[href*="favourites"]');
    if (!favLink) return;

    const container = document.querySelector('[data-auth]');
    const isAuth = container?.dataset.auth === 'true';

    if (!isAuth) {
        e.preventDefault();
        showToast('Чтобы добавить в избранное, войдите в аккаунт', 'warning');
    }
});

document.addEventListener('click', e => {
    const logoutBtn = e.target.closest('#logoutBtn');
    if (!logoutBtn) return;

    e.preventDefault();

    showToast('Вы вышли из аккаунта', 'success');

    setTimeout(() => {
        window.location.href = logoutBtn.href;
    }, 1200);
});

