document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initMap();
    initMicrophone();
    initGoogleMock();
});

// 1. Переключение вкладок
function initTabs() {
    const topTabs = document.querySelectorAll('.tab-btn');
    const bottomTabs = document.querySelectorAll('.bottom-btn');
    const contents = document.querySelectorAll('.tab-content');

    function switchTab(targetId) {
        contents.forEach(c => c.classList.remove('active'));
        const targetContent = document.getElementById(targetId);
        targetContent.classList.add('active');

        [...topTabs, ...bottomTabs].forEach(btn => {
            btn.classList.remove('active');
            if(btn.dataset.target === targetId) {
                btn.classList.add('active');
            }
        });

        if(targetId === 'tab-adventure') {
            setTimeout(scrollToCurrentLevel, 100); 
        }
    }

    topTabs.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.target)));
    bottomTabs.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.target)));
}

// 2. Генерация карты
function initMap() {
    const mapContainer = document.getElementById('map-container');
    const levelsCount = 15;
    const currentLevelIndex = 6; 
    
    const themes = ["База", "Глаголы", "Еда", "Семья", "Путешествия", "Бизнес"];

    for(let i = 1; i <= levelsCount; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'level-wrapper';

        const node = document.createElement('div');
        node.className = 'level-node';
        
        if (i < currentLevelIndex) node.classList.add('completed');
        else if (i === currentLevelIndex) {
            node.classList.add('current');
            node.id = 'current-level';
        } else {
            node.classList.add('locked');
        }

        const themeIndex = Math.floor((i-1) / 3) % themes.length;
        
        if(i < currentLevelIndex) {
            node.innerHTML = `<i class="fa-solid fa-check"></i>`;
        } else {
            node.innerHTML = `
                <span>${i}</span>
                <span class="level-theme">${themes[themeIndex]}</span>
            `;
        }

        if (i === 3) addDecoration(wrapper, '🐕', '-40px', '20px');
        if (i === 8) addDecoration(wrapper, '🐈', '50px', '-20px');

        wrapper.appendChild(node);
        mapContainer.appendChild(wrapper);
    }

    setTimeout(scrollToCurrentLevel, 300);
}

function addDecoration(parent, emoji, top, rightOrLeft) {
    const decor = document.createElement('div');
    decor.className = 'decoration';
    decor.innerText = emoji;
    decor.style.top = top;
    if(Math.random() > 0.5) decor.style.right = rightOrLeft;
    else decor.style.left = rightOrLeft;
    parent.appendChild(decor);
}

function scrollToCurrentLevel() {
    const currentLevel = document.getElementById('current-level');
    if (currentLevel) {
        currentLevel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// 3. Микрофон (с правильным запросом разрешений)
function initMicrophone() {
    const micBtn = document.getElementById('mic-btn');
    const feedbackBox = document.getElementById('voice-feedback');
    const targetPhrase = document.getElementById('phrase-to-read').innerText;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        feedbackBox.innerHTML = "<span style='color: #ef4444'>Ваш браузер не поддерживает распознавание речи.</span>";
        micBtn.style.opacity = '0.5';
        micBtn.style.pointerEvents = 'none';
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
            feedbackBox.innerHTML = '<i>Запрашиваю разрешение...</i>';
            try {
                recognition.start(); // В этот момент запрашивается микрофон
            } catch(e) {
                console.error("Ошибка запуска:", e);
            }
        }
    });

    recognition.onstart = () => {
        isRecording = true;
        micBtn.classList.add('recording');
        feedbackBox.innerHTML = '<i>Слушаю вас... (микрофон активен)</i>';
    };

    recognition.onspeechend = () => {
        recognition.stop(); // Автоматически выключаем микрофон
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;
        
        const cleanTranscript = transcript.toLowerCase().replace(/[.,!?]/g, '').trim();
        const cleanTarget = targetPhrase.toLowerCase().replace(/[.,!?]/g, '').trim();
        
        if (cleanTranscript === cleanTarget || confidence > 0.8) {
            feedbackBox.innerHTML = `<span style="color: var(--success)"><i class="fa-solid fa-check"></i> Отличное произношение!</span><br><small>Вы сказали: "${transcript}"</small>`;
        } else {
            feedbackBox.innerHTML = `<span style="color: #ef4444"><i class="fa-solid fa-xmark"></i> Попробуйте еще раз.</span><br><small>Услышано: "${transcript}"</small>`;
        }
    };

    recognition.onerror = (event) => {
        isRecording = false;
        micBtn.classList.remove('recording');
        
        if (event.error === 'not-allowed') {
            feedbackBox.innerHTML = '<span style="color: #ef4444"><i class="fa-solid fa-ban"></i> Доступ к микрофону запрещен. Разрешите его в настройках.</span>';
        } else if (event.error === 'no-speech') {
            feedbackBox.innerHTML = 'Речь не распознана. Нажмите кнопку и попробуйте снова.';
        } else {
            feedbackBox.innerHTML = `Ошибка: ${event.error}. Попробуйте снова.`;
        }
    };

    recognition.onend = () => {
        isRecording = false;
        micBtn.classList.remove('recording');
        
        if(feedbackBox.innerHTML.includes('Слушаю вас') || feedbackBox.innerHTML.includes('Запрашиваю')) {
            feedbackBox.innerHTML = 'Нажмите на микрофон, чтобы начать.';
        }
    };
}

// 4. Мок авторизации Google
function initGoogleMock() {
    const loginBtn = document.getElementById('google-login-btn');
    const authBanner = document.getElementById('auth-banner');
    const userName = document.getElementById('user-name');

    loginBtn.addEventListener('click', () => {
        loginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Загрузка...';
        
        setTimeout(() => {
            authBanner.innerHTML = '<p style="color: var(--success)"><i class="fa-solid fa-check"></i> Прогресс синхронизирован</p>';
            userName.innerText = 'Student_Dev';
        }, 1500);
    });
}
