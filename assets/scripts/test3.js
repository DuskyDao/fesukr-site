document.addEventListener('DOMContentLoaded', () => {
    // IntersectionObserver для анимаций
    const elements = document.querySelectorAll('.animate, .tabs');
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

    // Логика для табов
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