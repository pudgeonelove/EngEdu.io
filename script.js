document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initDetailedRoadmap();
    initMicrophone();
    initPracticeCards();
});

function initTabs() {
    const topTabs = document.querySelectorAll('.tab-btn');
    const bottomTabs = document.querySelectorAll('.bottom-btn');
    const contents = document.querySelectorAll('.tab-content');

    function switchTab(targetId) {
        contents.forEach(c => c.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');

        [...topTabs, ...bottomTabs].forEach(btn => {
            btn.classList.remove('active');
            if(btn.dataset.target === targetId) {
                btn.classList.add('active');
            }
        });
    }

    topTabs.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.target)));
    bottomTabs.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.target)));
}

const curriculum = [
    {
        title: "Алфавит",
        desc: "Буквы и их правильное произношение.",
        steps: [
            { title: "Знакомство с алфавитом", desc: "В английском языке 26 букв. Они делятся на гласные и согласные.", examples: ["A a [ei]", "B b [bi:]", "C c [si:]"] },
            { title: "Особенности звучания", desc: "Правильное произношение звуков формирует вашу уверенную речь с первых минут.", examples: ["Z [zed] (UK) / [zi:] (US)", "J [dʒei]"] }
        ]
    },
    {
        title: "Гласные звуки",
        desc: "Короткие и долгие гласные, транскрипция.",
        steps: [
            { title: "Короткие гласные", desc: "Звуки произносятся быстро и четко без растягивания.", examples: ["cat [kæt]", "sit [sɪt]", "pen [pen]"] },
            { title: "Долгие гласные", desc: "Требуют небольшого удержания звука при выдохе.", examples: ["father [ˈfɑːðə]", "tree [triː]", "food [fuːd]"] }
        ]
    },
    {
        title: "Согласные звуки",
        desc: "Особые звуки: [θ], [ð], [ŋ].",
        steps: [
            { title: "Межзубные звуки", desc: "Язык слегка помещается между зубами для правильного звучания.", examples: ["think [θɪŋk]", "this [ðɪs]"] },
            { title: "Носовые согласные", desc: "Звук [ŋ] произносится с задействованием носовой полости.", examples: ["sing [sɪŋ]", "morning [ˈmɔːrnɪŋ]"] }
        ]
    },
    {
        title: "Правила чтения",
        desc: "Открытый и закрытый слог.",
        steps: [
            { title: "Открытый слог", desc: "Слог заканчивается на гласную, буква читается как в алфавите.", examples: ["make [meɪk]", "note [nəʊt]"] },
            { title: "Закрытый слог", desc: "Слог заканчивается на согласную, гласная дает краткий звук.", examples: ["cat [kæt]", "hot [hɒt]"] }
        ]
    },
    {
        title: "Приветствия",
        desc: "Hello, Hi, How are you? и ответы на них.",
        steps: [
            { title: "Стандартные приветствия", desc: "Используются в повседневном общении.", examples: ["Hello! - Здравствуйте!", "Hi! - Привет!", "Good morning! - Доброе утро!"] },
            { title: "Вежливые вопросы", desc: "Как узнать о делах собеседника.", examples: ["How are you? - Как дела?", "I'm fine, thank you. - Я в порядке, спасибо."] }
        ]
    },
    {
        title: "Личные местоимения",
        desc: "I, you, he, she, it, we, they.",
        steps: [
            { title: "Единственное число", desc: "Обозначают одно лицо или предмет.", examples: ["I - я", "You - ты / вы", "He / She / It - он / она / оно"] },
            { title: "Множественное число", desc: "Обозначают группу лиц или предметов.", examples: ["We - мы", "They - они"] }
        ]
    },
    {
        title: "Глагол 'To Be' (Утверждение)",
        desc: "Фундамент: I am, He is, They are.",
        steps: [
            { title: "Формы глагола to be", desc: "Меняется в зависимости от подлежащего.", examples: ["I am (I'm)", "He / She / It is (He's)", "We / You / They are (They're)"] }
        ]
    },
    {
        title: "Глагол 'To Be' (Отрицание)",
        desc: "Формирование частицы NOT.",
        steps: [
            { title: "Добавление NOT", desc: "Отрицательная конструкция строится просто.", examples: ["I am not (I'm not)", "He is not (He isn't)", "They are not (They aren't)"] }
        ]
    },
    {
        title: "Глагол 'To Be' (Вопрос)",
        desc: "Порядок слов в вопросительных предложениях.",
        steps: [
            { title: "Инверсия", desc: "Глагол выносится на первое место.", examples: ["Are you ready? - Ты готов?", "Is he a student? - Он студент?"] }
        ]
    },
    {
        title: "Артикли A / An",
        desc: "Неопределенный артикль и существительные.",
        steps: [
            { title: "Правило выбора", desc: "Используется с исчисляемыми существительными в единственном числе.", examples: ["a cat - кот (с согласной)", "an apple - яблоко (с гласной)"] }
        ]
    },
    {
        title: "Множественное число",
        desc: "Окончания -s, -es и исключения.",
        steps: [
            { title: "Стандартное правило", desc: "Добавление окончания -s.", examples: ["book -> books", "car -> cars"] },
            { title: "Исключения", desc: "Слова, меняющие форму полностью.", examples: ["man -> men", "child -> children"] }
        ]
    },
    {
        title: "Указательные местоимения",
        desc: "This/That, These/Those.",
        steps: [
            { title: "Близко и далеко", desc: "Указываем на расположение объектов.", examples: ["This is my book (это близко)", "That is a star (то далеко)"] }
        ]
    },
    {
        title: "Притяжательные местоимения",
        desc: "My, your, his, her, our, their.",
        steps: [
            { title: "Принадлежность", desc: "Показывают, кому принадлежит предмет.", examples: ["My car - моя машина", "Their house - их дом"] }
        ]
    },
    {
        title: "Цвета и числа",
        desc: "Базовый словарный запас (0-100, цвета).",
        steps: [
            { title: "Числа", desc: "Основа счета.", examples: ["One, Two, Three...", "Ten, Twenty, Hundred"] }
        ]
    },
    {
        title: "Present Simple (Введение)",
        desc: "Настоящее простое время: правила и смысл.",
        steps: [
            { title: "Регулярность", desc: "Описывает привычки и повторяющиеся действия.", examples: ["I work every day.", "Water boils at 100 degrees."] }
        ]
    },
    {
        title: "Present Simple (Глаголы)",
        desc: "Окончания -s и -es у глаголов (he/she/it).",
        steps: [
            { title: "Правило 3 лица", desc: "С местоимениями he, she, it добавляем -s.", examples: ["He likes coffee.", "She reads books."] }
        ]
    },
    {
        title: "Предлоги места",
        desc: "In, on, at, under, behind.",
        steps: [
            { title: "Ориентация в пространстве", desc: "Где находится объект.", examples: ["In the room - в комнате", "On the table - на столе"] }
        ]
    },
    {
        title: "Семья и родственники",
        desc: "Mother, father, sibling, cousin.",
        steps: [
            { title: "Близкий круг", desc: "Слова для описания семьи.", examples: ["Mother / Father", "Brother / Sister"] }
        ]
    },
    {
        title: "Present Simple (Do/Does)",
        desc: "Отрицания и вопросы в простом времени.",
        steps: [
            { title: "Вспомогательные глаголы", desc: "Do для I/we/you/they, Does для he/she/it.", examples: ["Do you speak English?", "He does not know."] }
        ]
    },
    {
        title: "Артикль The",
        desc: "Когда использовать определенный артикль.",
        steps: [
            { title: "Конкретный предмет", desc: "Когда собеседник понимает, о чем речь.", examples: ["Open the door.", "The sun is bright."] }
        ]
    },
    {
        title: "Модальный глагол Can",
        desc: "Выражение физической способности.",
        steps: [
            { title: "Способность и умение", desc: "Умение совершить действие.", examples: ["I can swim.", "Can you help me?"] }
        ]
    },
    {
        title: "Уровень 2: Простые прошедшее и будущее время",
        desc: "Past Simple и Future Simple для описания событий.",
        steps: [
            { title: "Past Simple (Правильные глаголы)", desc: "Образование прошедшего времени с помощью окончания -ed.", examples: ["I played tennis yesterday.", "She worked hard."] },
            { title: "Future Simple (Will)", desc: "Выражение планов и решений на будущее.", examples: ["I will help you tomorrow.", "It will rain later."] }
        ]
    },
    {
        title: "Уровень 2: Сравнение предметов и базовые вопросы",
        desc: "Сравнительные степени прилагательных и вопросительные слова.",
        steps: [
            { title: "Сравнительные прилагательные", desc: "Использование суффикса -er и слова more.", examples: ["Fast -> faster", "Beautiful -> more beautiful"] },
            { title: "Вопросительные слова (WH-questions)", desc: "Who, what, where, when, why, how.", examples: ["Where do you live?", "Why are you late?"] }
        ]
    }
];

function initDetailedRoadmap() {
    const container = document.getElementById('roadmap-container');
    container.innerHTML = '';
    
    const currentProgress = 0; 

    curriculum.forEach((lesson, index) => {
        const div = document.createElement('div');
        div.className = 'roadmap-module';
        
        if (index < currentProgress) {
            div.classList.add('completed');
        } else if (index === currentProgress) {
            div.classList.add('current');
        } else {
            div.classList.add('locked');
        }

        const statusIcon = index < currentProgress ? '<i class="fa-solid fa-check" style="color: var(--success)"></i>' : (index === currentProgress ? '<i class="fa-solid fa-lock-open"></i>' : '<i class="fa-solid fa-lock"></i>');

        div.innerHTML = `
            <div class="module-header">
                <span class="module-number">Урок ${index + 1}</span>
                <span>${statusIcon}</span>
            </div>
            <div class="module-title">${lesson.title}</div>
            <div class="module-desc">${lesson.desc}</div>
        `;
        
        div.addEventListener('click', () => openLessonModal(lesson, index + 1));
        container.appendChild(div);
    });
}

function openLessonModal(lesson, lessonNum) {
    const modal = document.getElementById('lesson-modal');
    const body = document.getElementById('lesson-body');
    
    let currentStep = 0;

    function renderStep() {
        const step = lesson.steps[currentStep];
        body.innerHTML = `
            <span class="module-number">Урок ${lessonNum} • Шаг ${currentStep + 1} из ${lesson.steps.length}</span>
            <h3 class="lesson-step-title" style="margin-top: 8px;">${step.title}</h3>
            <p class="lesson-step-desc">${step.desc}</p>
            <div class="lesson-examples">
                <h4>Примеры из практики:</h4>
                <ul>
                    ${step.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            </div>
            <div class="lesson-nav-btns">
                ${currentStep > 0 ? '<button class="lesson-btn secondary" id="prev-step">Назад</button>' : ''}
                <button class="lesson-btn primary" id="next-step">${currentStep < lesson.steps.length - 1 ? 'Далее' : 'Завершить урок'}</button>
            </div>
        `;

        if (currentStep > 0) {
            document.getElementById('prev-step').addEventListener('click', () => {
                currentStep--;
                renderStep();
            });
        }

        document.getElementById('next-step').addEventListener('click', () => {
            if (currentStep < lesson.steps.length - 1) {
                currentStep++;
                renderStep();
            } else {
                modal.classList.remove('open');
                updateProgressOnComplete();
            }
        });
    }

    renderStep();
    modal.classList.add('open');

    document.getElementById('close-modal').onclick = () => {
        modal.classList.remove('open');
    };
}

let completedLessonsCount = 0;
function updateProgressOnComplete() {
    completedLessonsCount++;
    document.getElementById('stat-lessons').innerText = completedLessonsCount;
    const percent = Math.round((completedLessonsCount / curriculum.length) * 100);
    document.getElementById('stat-progress').innerText = percent + '%';
}

function initPracticeCards() {
    const cards = document.querySelectorAll('.study-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.practice;
            alert(`Запуск интерактивного режима практики: ${type.toUpperCase()}`);
        });
    });
}

window.handleGoogleLogin = function(response) {
    try {
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const payload = JSON.parse(jsonPayload);
        
        const authSection = document.getElementById('auth-section');
        authSection.innerHTML = `
            <div style="display:flex; align-items:center; gap: 15px;">
                <img src="${payload.picture}" alt="avatar" style="width: 45px; height: 45px; border-radius: 50%; border: 2px solid var(--success);">
                <div>
                    <h3 style="color:var(--success); font-size:1.05rem; margin-bottom:2px;">Синхронизировано</h3>
                    <p style="font-size:0.8rem; color:var(--text-secondary);">${payload.email}</p>
                </div>
            </div>
        `;

        document.getElementById('user-name').innerText = payload.name;
        document.getElementById('profile-avatar').innerHTML = `<img src="${payload.picture}" alt="avatar">`;
    } catch(e) {
        console.error("Ошибка авторизации:", e);
    }
}

function initMicrophone() {
    const micBtn = document.getElementById('mic-btn');
    const feedbackBox = document.getElementById('voice-feedback');
    const targetPhrase = document.getElementById('phrase-to-read').innerText;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        feedbackBox.innerHTML = "<span style='color: #ef4444'>Браузер не поддерживает Speech API. Используйте Chrome.</span>";
        micBtn.style.opacity = '0.5';
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    let isRecording = false;

    micBtn.addEventListener('click', () => {
        if (isRecording) {
            recognition.stop();
        } else {
            feedbackBox.innerHTML = '<i style="color: var(--text-secondary)">Запрашиваю доступ к микрофону...</i>';
            try { recognition.start(); } catch(e) {}
        }
    });

    recognition.onstart = () => {
        isRecording = true;
        micBtn.classList.add('recording');
        feedbackBox.innerHTML = '<i style="color: #fff">Слушаю вас... Говорите четко.</i>';
    };

    recognition.onspeechend = () => recognition.stop();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        
        const cleanTranscript = transcript.toLowerCase().replace(/[.,!?]/g, '').trim();
        const cleanTarget = targetPhrase.toLowerCase().replace(/[.,!?]/g, '').trim();
        
        const targetWords = cleanTarget.split(' ');
        const spokenWords = cleanTranscript.split(' ');
        
        let matchCount = 0;
        targetWords.forEach(word => {
            if (spokenWords.includes(word)) matchCount++;
        });
        
        let percentage = Math.round((matchCount / targetWords.length) * 100);
        if (percentage > 100) percentage = 100;
        if (cleanTranscript === cleanTarget) percentage = 100;

        let color = '#ef4444';
        let statusText = 'Требуется тренировка';
        if (percentage >= 80) {
            color = 'var(--success)';
            statusText = 'Отличное произношение!';
        } else if (percentage >= 50) {
            color = 'var(--warning)';
            statusText = 'Хороший результат!';
        }

        feedbackBox.innerHTML = `
            <div style="font-size: 1.3rem; font-weight: 800; color: ${color}; margin-bottom: 6px;">
                Точность: ${percentage}%
            </div>
            <div style="font-size: 0.95rem; color: #fff; margin-bottom: 4px;">${statusText}</div>
            <small style="color: var(--text-secondary)">Распознано: "${transcript}"</small>
        `;
    };

    recognition.onerror = (event) => {
        if (event.error === 'not-allowed') {
            feedbackBox.innerHTML = '<span style="color: #ef4444">Доступ к микрофону запрещен в настройках браузера.</span>';
        } else {
            feedbackBox.innerHTML = 'Не удалось разобрать речь. Нажмите микрофон и повторите.';
        }
    };

    recognition.onend = () => {
        isRecording = false;
        micBtn.classList.remove('recording');
    };
}
