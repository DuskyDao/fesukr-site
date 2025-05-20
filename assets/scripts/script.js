// блок анимации при прокрутке
function initObserver(elements) {
    if (!elements.length) return;
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '50px' }
    );
    elements.forEach((element) => {
        observer.observe(element);
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.classList.add('visible');
            observer.unobserve(element);
        }
    });
}

// Табы
function initTabs() {
    const buttons = document.querySelectorAll('.tabs__button');
    const panels = document.querySelectorAll('.tabs__panel');
    if (!buttons.length || !panels.length) return;

    function activateTab(button) {
        buttons.forEach((btn) => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        panels.forEach((panel) => {
            panel.classList.remove('active');
            panel.setAttribute('hidden', 'true');
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        const panelId = button.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        if (panel) {
            panel.classList.add('active');
            panel.removeAttribute('hidden');
        }
    }

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => activateTab(button));
        // Клавиатурная навигация
        button.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextButton = buttons[index + 1] || buttons[0];
                nextButton.focus();
                activateTab(nextButton);
            }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevButton = buttons[index - 1] || buttons[buttons.length - 1];
                prevButton.focus();
                activateTab(prevButton);
            }
            if (e.key === 'Enter' || e.key === 'Space') {
                e.preventDefault();
                activateTab(button);
            }
        });
    });
}

// Анимация <details> для страницы вакансий
function initDetails() {
    const details = document.querySelectorAll('details');
    if (!details.length) return;

    details.forEach((targetDetail) => {
        const content = targetDetail.querySelector('.question__desc');
        if (!content) return;

        targetDetail.addEventListener('toggle', () => {
            // Если <details> закрыт, анимируем закрытие
            if (!targetDetail.open) {
                content.classList.remove('open');
                content.style.height = `${content.scrollHeight}px`;
                requestAnimationFrame(() => {
                    content.style.height = '0';
                });
                return;
            }

            // Закрываем другие <details> перед открытием текущего
            details.forEach((detail) => {
                if (detail !== targetDetail && detail.open) {
                    const otherContent = detail.querySelector('.question__desc');
                    if (otherContent) {
                        otherContent.classList.remove('open');
                        otherContent.style.height = `${otherContent.scrollHeight}px`;
                        requestAnimationFrame(() => {
                            otherContent.style.height = '0';
                        });
                    }
                    detail.removeAttribute('open');
                }
            });

            // Открываем текущий <details>
            content.classList.add('open');
            content.style.height = `${content.scrollHeight}px`;
            setTimeout(() => {
                content.style.height = 'auto'; // Адаптация к изменениям контента
            }, 500); // Синхронизировано с transition: 0.5s
        });
    });
}


// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    initObserver(document.querySelectorAll('.animate-y, .animate-y-d, .animate-x, .animate-x-d, .animate-scale, .animate-scale-d'));
    initTabs();
    initDetails();
});


// hamburger +nav menu
document.querySelector('.hamburger').addEventListener('click', function () {
    this.classList.toggle('active');
    document.querySelector('.mobile__nav').classList.toggle('active');
});
// close nav (optional)
// document.querySelectorAll('.mobile__nav a').forEach(link => {
//     link.addEventListener('click', () => {
//         document.querySelector('.hamburger').classList.remove('active');
//         document.querySelector('.mobile__nav').classList.remove('active');
//     });
// });

// brand
// document.querySelectorAll('.brand').forEach(card => {
//     card.addEventListener('click', (e) => {
//         // Предотвращаем переключение состояния при клике на кнопку
//         if (e.target.tagName !== 'BUTTON') {
//             // Убираем класс active у всех карточек
//             document.querySelectorAll('.brand').forEach(otherCard => {
//                 if (otherCard !== card) {
//                     otherCard.classList.remove('active');
//                 }
//             });
//             // Переключаем класс active для текущей карточки
//             card.classList.toggle('active');
//         }
//     });
// });

// brand upd
document.querySelectorAll('.brand').forEach(card => {
    let timeoutId = null;

    // Функция для запуска таймера
    const startTimeout = () => {
        // Очищаем предыдущий таймер, если он существует
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // Устанавливаем новый таймер на 5 секунд
        timeoutId = setTimeout(() => {
            card.classList.remove('active');
        }, 5000);
    };

    // Обработчик клика
    card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') {
            // Убираем active у всех других карточек
            document.querySelectorAll('.brand').forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                    // Очищаем таймер для неактивных карточек
                    const otherTimeoutId = otherCard.dataset.timeoutId;
                    if (otherTimeoutId) {
                        clearTimeout(otherTimeoutId);
                        otherCard.dataset.timeoutId = '';
                    }
                }
            });
            // Переключаем active для текущей карточки
            card.classList.toggle('active');
            // Запускаем таймер, если карточка активна
            if (card.classList.contains('active')) {
                startTimeout();
            } else {
                // Очищаем таймер, если карточка больше не активна
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                }
            }
        }
    });

    // Обработчик наведения (для десктопов)
    card.addEventListener('mouseenter', () => {
        // Убираем active у всех других карточек
        document.querySelectorAll('.brand').forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('active');
                const otherTimeoutId = otherCard.dataset.timeoutId;
                if (otherTimeoutId) {
                    clearTimeout(otherTimeoutId);
                    otherCard.dataset.timeoutId = '';
                }
            }
        });
        // Активируем текущую карточку
        card.classList.add('active');
        startTimeout();
    });

    // Обработчик ухода курсора
    card.addEventListener('mouseleave', () => {
        // Запускаем таймер, если карточка активна
        if (card.classList.contains('active')) {
            startTimeout();
        }
    });
});