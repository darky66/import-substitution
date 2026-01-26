document.addEventListener('DOMContentLoaded', function () {
        const savedData = localStorage.getItem(storageKey);
        const output = document.getElementById('output');
        let html = '';

        if (savedData) {
            try {
                const favoritesDictionary = JSON.parse(savedData);
                const keys = Object.keys(favoritesDictionary);

                if (keys.length === 0) {
                    html = '<div class="alert alert-warning">Избранное пусто. Добавьте приложения на главной странице!</div>';
                } else {
                    keys.forEach(item => {
                        html += `<div class="output"><h3>${item}</h3></div>`;
                    });
                    html += `<button class="btn-clear abort" onclick="return clearDictionaryWithConfirm()">Очистить избранное</button>`;
                }

                console.log('Загруженное избранное:', favoritesDictionary);
            } catch (e) {
                console.error('Ошибка при разборе избранного:', e);
                html = '<div class="alert alert-warning">Ошибка при загрузке избранного</div>';
            }
        } else {
            html = '<div class="alert alert-warning">Избранное пусто. Добавьте приложения на главной странице!</div>';
        }

        output.innerHTML = html;
    });

    function clearDictionaryWithConfirm() {
        if (confirm('Вы уверены, что хотите очистить избранное? Это действие невозможно отменить.')) {
            clearDictionary();
            return true;
        }
        return false;
    }

    function clearDictionary() {
        const savedData = localStorage.getItem(storageKey);
        if (savedData) {
            try {
                const favoritesDictionary = JSON.parse(savedData);
                Object.keys(favoritesDictionary).forEach(key => {
                    delete favoritesDictionary[key];
                });
                localStorage.removeItem(storageKey);
                console.log('Избранное успешно очищено');
                location.reload();
            } catch (e) {
                console.error('Ошибка при очистке избранного:', e);
            }
        }
    }