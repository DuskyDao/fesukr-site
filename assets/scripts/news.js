document.addEventListener('DOMContentLoaded', () => {
    const newsBoxes = document.querySelectorAll('.news__box');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Останавливаем наблюдение после появления
                }
            });
        },
        {
            threshold: 0.1, // Срабатывает, когда 10% блока видно
        }
    );

    newsBoxes.forEach((box) => observer.observe(box));
});