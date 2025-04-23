// Анимация при прокрутке
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.news__box, .animate, .news__aside__box, .quote, .pagination__wrapper, .tabs');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '50px'
        }
    );

    elements.forEach((element) => {
        observer.observe(element);
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.classList.add('visible');
            observer.unobserve(element);
        }
    });
});

// Табы
const tabsButtons = document.querySelectorAll('.tabs__button');
const tabsPanels = document.querySelectorAll('.tabs__panel');

tabsButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Удаляем active с текущей кнопки и панели
        tabsButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        tabsPanels.forEach(panel => {
            panel.classList.remove('active');
            panel.setAttribute('hidden', 'true');
        });

        // Добавляем active для выбранной кнопки и панели
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        const panelId = button.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        panel.classList.add('active');
        panel.removeAttribute('hidden');
    });
});
});

// анимация для табов <details> на странице вакансий
const details = document.querySelectorAll("details");

details.forEach((targetDetail) => {
    targetDetail.addEventListener("click", () => {
        // Закрываем все остальные <details>, кроме текущего
        details.forEach((detail) => {
            if (detail !== targetDetail) {
                detail.removeAttribute("open");
            }
        });
    });
});


document.querySelectorAll('details').forEach(detail => {
    const content = detail.querySelector('.question__desc');
    detail.addEventListener('toggle', () => {
        if (detail.open) {
            content.style.height = content.scrollHeight + 'px';
        } else {
            content.style.height = '0';
        }
    });
});