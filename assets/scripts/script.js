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

    brands.forEach(brand => {
        brand.addEventListener('click', (e) => {
            // Предотвращаем всплытие события клика на родительские элементы
            e.stopPropagation();

            // Если кликнули на кнопку, разрешаем стандартное поведение (например, переход по ссылке)
            if (e.target.classList.contains('btn')) {
                return;
            }

            // Проверяем, активен ли уже бренд
            const isActive = brand.classList.contains('brand-active');

            // Удаляем класс active у всех брендов
            brands.forEach(b => b.classList.remove('brand-active'));

            // Если бренд не был активен, добавляем класс active
            if (!isActive) {
                brand.classList.add('brand-active');
            }
        });
    });

    // Закрываем оверлей при клике вне брендов
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.brand')) {
            brands.forEach(b => b.classList.remove('brand-active'));
        }
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

    // // Опционально: закрытие меню при клике на ссылку
    // document.querySelectorAll('.mobile__nav a').forEach(link => {
    //     link.addEventListener('click', () => {
    //         hamburger.classList.remove('active');
    //         mobileNav.classList.remove('active');
    //     });
    // });
}

// Инициализация слайдера
function initSlider() {
    const slider = document.getElementById('slider');
    const dots = document.querySelectorAll('.dot');
    if (!slider || !dots.length) return;

    let currentSlide = 0;

    function goToSlide(index) {
        currentSlide = index;
        slider.style.transform = `translateX(-${currentSlide * 33.33}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % 3;
        goToSlide(currentSlide);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.getAttribute('data-slide')));
        });
    });

    // Автоматическое переключение каждые 5 секунд
    // setInterval(nextSlide, 10000);
}

// Основная инициализация
document.addEventListener('DOMContentLoaded', () => {
    initObserver(document.querySelectorAll('.animate-y, .animate-y-d, .animate-x, .animate-x-d, .animate-scale, .animate-scale-d'));
    initTabs();
    initDetails();
    initBrands();
    initHamburger();
    initSlider();
});