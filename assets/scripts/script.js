// Блок анимации при прокрутке
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
            btn.classList.remove('tab-active');
            btn.setAttribute('aria-selected', 'false');
        });
        panels.forEach((panel) => {
            panel.classList.remove('tab-active');
            panel.setAttribute('hidden', 'true');
        });
        button.classList.add('tab-active');
        button.setAttribute('aria-selected', 'true');
        const panelId = button.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        if (panel) {
            panel.classList.add('tab-active');
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
                content.style.height = 'auto';
            }, 500);
        });
    });
}

// Инициализация брендов
function initBrands() {
    const brands = document.querySelectorAll('.brand');
    if (!brands.length) return;

    const isMobile = () => window.innerWidth <= 560;

    brands.forEach(brand => {
        brand.addEventListener('click', (e) => {
            if (!isMobile()) return;

            const isActive = brand.classList.contains('brand-active');
            brands.forEach(b => b.classList.remove('brand-active'));

            if (!isActive) {
                brand.classList.add('brand-active');
                brand.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });

    // Оптимизация обработки resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (!isMobile()) {
                brands.forEach(brand => brand.classList.remove('brand-active'));
            }
        }, 100);
    });
}

// Гамбургер-меню
function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile__nav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Опционально: закрытие меню при клике на ссылку
    document.querySelectorAll('.mobile__nav a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });
}

// Основная инициализация
document.addEventListener('DOMContentLoaded', () => {
    initObserver(document.querySelectorAll('.animate-y, .animate-y-d, .animate-x, .animate-x-d, .animate-scale, .animate-scale-d'));
    initTabs();
    initDetails();
    initBrands();
    initHamburger();
});