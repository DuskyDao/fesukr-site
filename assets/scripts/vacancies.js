// Получаем все элементы <details> на странице
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