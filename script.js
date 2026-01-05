// Данные портфолио (добавляйте свои проекты в этот массив)
const portfolioData = [
    {
        title: "Жуковый календарь",
        description: "Календарь с жуком на каждый месяц",
        type: "Печать",
        year: "2025",
        imageUrl: "https://github.com/wambanuka/portfolio/blob/main/img/image%208.png?raw=true"
    },
    // ДОБАВЛЯЙТЕ НОВЫЕ ПРОЕКТЫ ЗДЕСЬ
    // {
    //     title: "Название проекта",
    //     description: "Описание проекта",
    //     type: "Тип",
    //     year: "Год",
    //     imageUrl: "ссылка_на_PNG"
    // },
];

// Функция для создания SVG с круговым текстом
function createCircularText(text, diameter = 620) {
    const radius = diameter / 2;
    const svgNS = "http://www.w3.org/2000/svg";
    
    // Создаем SVG элемент с ДОСТАТОЧНЫМ viewBox
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", `0 0 ${diameter} ${diameter}`);
    svg.setAttribute("width", diameter);
    svg.setAttribute("height", diameter);
    svg.setAttribute("overflow", "visible"); // Ключевое исправление!
    
    // Создаем круг для текста (полный круг в центре viewBox)
    const circlePath = document.createElementNS(svgNS, "path");
    const pathId = `text-path-${Date.now()}`;
    circlePath.setAttribute("id", pathId);
    
    // Правильный путь круга, полностью внутри viewBox
    circlePath.setAttribute("d", `M ${radius}, ${radius}
                                 m -${radius}, 0
                                 a ${radius},${radius} 0 1,1 ${diameter},0
                                 a ${radius},${radius} 0 1,1 -${diameter},0`);
    circlePath.setAttribute("fill", "none");
    
    // Создаем текст
    const textElement = document.createElementNS(svgNS, "text");
    textElement.setAttribute("fill", "#333");
    textElement.setAttribute("font-size", "17");
    textElement.setAttribute("font-family", "Inter, sans-serif");
    textElement.setAttribute("font-weight", "400");
    textElement.setAttribute("letter-spacing", "0.5");
    
    // Создаем textPath
    const textPath = document.createElementNS(svgNS, "textPath");
    textPath.setAttribute("href", `#${pathId}`);
    textPath.setAttribute("startOffset", "0%");
    textPath.setAttribute("method", "align");
    
    // Рассчитываем длину текста для правильного повторения
    const circleLength = 2 * Math.PI * radius;
    const textLength = text.length * 7; // Приблизительная ширина символа
    const repeats = Math.ceil(circleLength / textLength);
    
    // Создаем текст с разделителями
    const repeatedText = (text + " • ").repeat(Math.max(1, repeats));
    textPath.textContent = repeatedText;
    
    // Собираем SVG
    svg.appendChild(circlePath);
    textElement.appendChild(textPath);
    svg.appendChild(textElement);
    
    return svg;
}

// Функция для создания карточки проекта
function createProjectCard(project) {
    const card = document.createElement('a');
    card.className = 'project-card';
    card.href = '#'; // Можно заменить на ссылку на детальную страницу проекта
    
    // Контейнер для изображения и кругового текста
    const imageContainer = document.createElement('div');
    imageContainer.className = 'project-image-container';


    
    // Изображение проекта
    const image = document.createElement('img');
    image.className = 'project-image';
    image.src = project.imageUrl;
    image.alt = project.title;
    image.loading = 'lazy';
    
    // Контейнер для кругового текста
    const circularTextContainer = document.createElement('div');
    circularTextContainer.className = 'circular-text';
    
    // Создаем SVG с круговым текстом
    const circularTextSVG = createCircularText(project.description + " • ", 400);
    circularTextContainer.appendChild(circularTextSVG);
    
    // Контейнер для кругового текста - теперь ОТДЕЛЬНЫЙ элемент
    const circularTextWrapper = document.createElement('div');
    circularTextWrapper.className = 'circular-text-wrapper';
    circularTextWrapper.appendChild(circularTextSVG);

    card.appendChild(circularTextWrapper); 

    // Блок с информацией
    const infoDiv = document.createElement('div');
    infoDiv.className = 'project-info';
    
    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = project.title;
    
    const metaDiv = document.createElement('div');
    metaDiv.className = 'project-meta';
    
    const typeSpan = document.createElement('span');
    typeSpan.className = 'project-type';
    typeSpan.textContent = project.type;
    
    const yearSpan = document.createElement('span');
    yearSpan.className = 'project-year';
    yearSpan.textContent = project.year;
    
    // Собираем карточку
    metaDiv.appendChild(typeSpan);
    metaDiv.appendChild(yearSpan);
    
    infoDiv.appendChild(title);
    infoDiv.appendChild(metaDiv);
    
    imageContainer.appendChild(image);
    imageContainer.appendChild(circularTextContainer);
    
    card.appendChild(imageContainer);
    card.appendChild(infoDiv);
    
    return card;
}

// Функция для отрисовки сетки портфолио
function renderPortfolioGrid() {
    const gridContainer = document.getElementById('portfolio-grid');
    
    if (!gridContainer) {
        console.error('Контейнер для сетки портфолио не найден!');
        return;
    }
    
    // Очищаем контейнер
    gridContainer.innerHTML = '';
    
    // Добавляем карточки проектов
    portfolioData.forEach(project => {
        const card = createProjectCard(project);
        gridContainer.appendChild(card);
    });
}

// Функция для обновления года в футере
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Функция для плавной прокрутки к якорям
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Учитываем высоту фиксированного хедера
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Рендерим сетку портфолио
    renderPortfolioGrid();
    
    // Обновляем год в футере
    updateCurrentYear();
    
    // Инициализируем плавную прокрутку
    initSmoothScroll();
    
    console.log('Сайт портфолио загружен!');
});