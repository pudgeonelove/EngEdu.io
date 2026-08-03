document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initDetailedRoadmap();
    initMicrophone();
});

// 1. Управление вкладками
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

// 2. Генерация детальной программы (Roadmap)
function initDetailedRoadmap() {
    const container = document.getElementById('roadmap-container');
    
    // Очень подробная программа с абсолютного нуля
    const curriculum = [
        { title: "Алфавит", desc: "Буквы и их правильное произношение." },
        { title: "Гласные звуки", desc: "Короткие и долгие гласные, транскрипция." },
        { title: "Согласные звуки", desc: "Особые звуки: [θ], [ð], [ŋ]." },
        { title: "Правила чтения", desc: "Открытый и закрытый слог." },
        { title: "Приветствия", desc: "Hello, Hi, How are you? и ответы на них." },
        { title: "Личные местоимения", desc: "I, you, he, she, it, we, they." },
        { title: "Глагол 'To Be' (Утверждение)", desc: "Фундамент: I am, He is, They are." },
        { title: "Глагол 'To Be' (Отрицание)", desc: "Формирование частицы NOT." },
        { title: "Глагол 'To Be' (Вопрос)", desc: "Порядок слов в вопросительных предложениях." },
        { title: "Артикли A / An", desc: "Неопределенный артикль и существительные." },
        { title: "Множественное число", desc: "Окончания -s, -es и исключения." },
        { title: "Указательные местоимения", desc: "This/That, These/Those." },
        { title: "Притяжательные местоимения", desc: "My, your, his, her, our, their." },
        { title: "Цвета и числа", desc: "Базовый словарный запас (0-100, цвета)." },
        { title: "Present Simple (Введение)", desc: "Настоящее простое время: правила и смысл." },
        { title: "Present Simple (Глаголы)", desc: "Окончания -s и -es у глаголов (he/she/it)." },
        { title: "Предлоги места", desc: "In, on, at, under, behind." },
        { title: "Семья и родственники", desc: "Mother, father, sibling, cousin." },
        { title: "Present Simple (Do/Does)", desc: "Отрицания и вопросы в простом времени." },
        { title: "Артикль The", desc: "Когда использовать определенный артикль." },
        { title: "Модальный глагол Can", desc: "Выражение физической способности." }
    ];

    // Пользователь начинает с полного нуля (ни одного пройденного)
    const currentProgress = 0; 

    curriculum.forEach((lesson, index) => {
        const div = document.createElement('div');
        div.className = 'roadmap-module';
        
        if (index < currentProgress) {
            div.classList.add('completed');
        } else if (index === currentProgress) {
            div.classList.add('current');
            div.id = 'current-lesson';
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
        
        container.appendChild(div);
    });
}

// 3. Google Авторизация (Callback)
// Эта функция вызывается автоматически скриптом Google после успешного входа
window.handleGoogleLogin = function(response) {
    // В реальности здесь токен отправляется на сервер для проверки
    // Для нашего интерфейса мы просто меняем UI, имитируя успешный вход
    
    // Парсим JWT токен, чтобы получить имя и аватарку пользователя
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    
    const authSection = document.getElementById('auth-section');
    authSection.innerHTML = `
        <div style="display:flex; align-items:center; gap: 15px;">
            <img src="${payload.picture}" alt="avatar" style="width: 40px; height: 40px; border-radius: 50%;">
            <div>
                <h3 style="color:var(--success); font-size:1rem; margin-bottom:2px;">Синхронизировано</h3>
                <p style="font-size:0.8rem; color:var(--text-secondary);">${payload.email}</p>
            </div>
        </div>
    `;

    // Обновляем вкладку Профиль
    document.getElementById('user-name').innerText = payload.name;
    document.getElementById('profile-avatar').innerHTML = `<img src="${payload.picture}" alt="avatar">`;
}

// 4. Микрофон и ИИ-распознавание
function initMicrophone() {
    const micBtn = document.getElementById('mic-btn');
    const feedbackBox = document.getElementById('voice-feedback');
    const targetPhrase = document.getElementById('phrase-to-read').innerText;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        feedbackBox.innerHTML = "<span style='color: #f85149'>Браузер не поддерживает Speech API. Используйте Chrome.</span>";
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
        feedbackBox.innerHTML = '<i style="color: #fff">Слушаю вас... Говорите.</i>';
    };

    recognition.onspeechend = () => recognition.stop();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;
        
        const cleanTranscript = transcript.toLowerCase().replace(/[.,!?]/g, '').trim();
        const cleanTarget = targetPhrase.toLowerCase().replace(/[.,!?]/g, '').trim();
        
        if (cleanTranscript === cleanTarget || confidence > 0.85) {
            feedbackBox.innerHTML = `<span style="color: var(--success)"><i class="fa-solid fa-check-circle"></i> Идеально!</span><br><small style="color: var(--text-secondary)">Распознано: ${transcript}</small>`;
        } else {
            feedbackBox.innerHTML = `<span style="color: #f85149"><i class="fa-solid fa-circle-xmark"></i> Есть неточности.</span><br><small style="color: var(--text-secondary)">Услышано: ${transcript}</small>`;
        }
    };

    recognition.onerror = (event) => {
        if (event.error === 'not-allowed') {
            feedbackBox.innerHTML = '<span style="color: #f85149">Доступ запрещен. Разрешите микрофон в браузере.</span>';
        } else {
            feedbackBox.innerHTML = 'Нажмите на микрофон для записи.';
        }
    };

    recognition.onend = () => {
        isRecording = false;
        micBtn.classList.remove('recording');
    };
}
