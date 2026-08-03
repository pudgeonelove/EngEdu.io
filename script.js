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
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.classList.add('active');
        }

        [...topTabs, ...bottomTabs].forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.target === targetId) {
                btn.classList.add('active');
            }
        });
    }

    topTabs.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.target)));
    bottomTabs.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.target)));
}

let completedLessonsCount = 0;
let userProgress = 0;

const curriculum = [
    {
        title: "Алфавит и Звуки",
        desc: "Полный разбор букв, алфавита и особенностей чтения.",
        steps: [
            { 
                type: "theory", 
                title: "Анатомия английского алфавита", 
                desc: "В английском языке ровно 26 букв. Гласные буквы (A, E, I, O, U и иногда Y) могут звучать совершенно по-разному в зависимости от окружения. Давайте разберем базовые звуки.", 
                examples: ["A a [ei] — как в слове make", "B b [bi:] — звонкий согласный", "C c [si:] — дает [s] перед e, i, y и [k] в остальных случаях"] 
            },
            { 
                type: "quiz", 
                title: "Проверка: Гласные буквы", 
                desc: "Какая из этих букв является классической гласной?", 
                options: ["B", "E", "S", "T"], 
                correct: 1, 
                feedback: "Верно! Буква 'E' — это гласная буква." 
            },
            { 
                type: "theory", 
                title: "Особые звуки и транскрипция", 
                desc: "Чтобы говорить без акцента, важно сразу привыкнуть к символам транскрипции.", 
                examples: ["Z [zed] в британском и [zi:] в американском варианте", "J [dʒei] — мягкий шипящий звук с которого начинаются слова juice, jump"] 
            },
            { 
                type: "quiz", 
                title: "Проверка: Звучание", 
                desc: "Какой звук обозначается значком [di:]?", 
                options: ["Буква A", "Буква D", "Буква B", "Буква Z"], 
                correct: 1, 
                feedback: "Отлично! Буква D читается как [di:]." 
            }
        ]
    },
    {
        title: "Короткие и Долгие Гласные",
        desc: "Различаем краткие звуки и глубокие долгие гласные.",
        steps: [
            { 
                type: "theory", 
                title: "Краткие гласные звуки", 
                desc: "Краткие гласные произносятся мгновенно, резко и энергично, без всякого растягивания.", 
                examples: ["cat [kæt] — кот", "sit [sɪt] — сидеть", "pen [pen] — ручка"] 
            },
            { 
                type: "theory", 
                title: "Долгие гласные звуки", 
                desc: "Долгие гласные требуют удержания воздуха, они тянутся примерно в два раза дольше.", 
                examples: ["father [ˈfɑːðə] — отец", "tree [triː] — дерево", "food [fuːd] — еда"] 
            },
            { 
                type: "quiz", 
                title: "Интерактивный тест", 
                desc: "Какой звук в слове 'tree' [triː]?", 
                options: ["Краткий [ɪ]", "Долгий [i:]", "Дифтонг [eɪ]", "Глухой [p]"], 
                correct: 1, 
                feedback: "Правильно! Две точки в транскрипции всегда означают долготу звука." 
            }
        ]
    },
    {
        title: "Сложные Согласные",
        desc: "Межзубные звуки [θ], [ð] и носовой [ŋ].",
        steps: [
            { 
                type: "theory", 
                title: "Межзубные звуки (Theta & Eth)", 
                desc: "Положите кончик языка между зубами и подуйте. Получится глухой звук [θ] (как в think) или звонкий [ð] (как в this).", 
                examples: ["think [θɪŋk] — думать", "this [ðɪs] — этот"] 
            },
            { 
                type: "theory", 
                title: "Носовой согласный [ŋ]", 
                desc: "Звук [ŋ] рождается глубоко в носу, задняя часть языка прижимается к нёбу. Звучит в окончаниях -ing.", 
                examples: ["sing [sɪŋ] — петь", "morning [ˈmɔːrnɪŋ] — утро"] 
            },
            { 
                type: "quiz", 
                title: "Проверка понимания", 
                desc: "Как правильно произносить звук в начале слова 'think'?", 
                options: ["Как русская С", "Как русская Т", "С языком между зубами", "Как глухая Ф"], 
                correct: 2, 
                feedback: "Верно! Это уникальный межзубный звук." 
            }
        ]
    },
    {
        title: "Правила Чтения (Слоги)",
        desc: "Открытый и закрытый слог: секрет правильного чтения.",
        steps: [
            { 
                type: "theory", 
                title: "Открытый слог", 
                desc: "Слог заканчивается на гласную (часто на немую 'e'). Гласная в нем читается так же, как называется в алфавите.", 
                examples: ["make [meɪk] (a читается как [eɪ])", "note [nəʊt] (o читается как [əʊ])"] 
            },
            { 
                type: "theory", 
                title: "Закрытый слог", 
                desc: "Слог заканчивается на согласную. Гласная в таком слоге дает короткий, отрывистый звук.", 
                examples: ["cat [kæt] (краткое [æ])", "hot [hɒt] (краткое [ɒ])"] 
            },
            { 
                type: "quiz", 
                title: "Закрепление правила", 
                desc: "Каким будет слог в слове 'make'?", 
                options: ["Открытый", "Закрытый", "Смешанный", "Согласный"], 
                correct: 0, 
                feedback: "Верно! Наличие немой 'e' на конце делает слог открытым." 
            }
        ]
    },
    {
        title: "Приветствия и Знакомство",
        desc: "Hello, Hi, How are you? и первые диалоги.",
        steps: [
            { 
                type: "theory", 
                title: "Базовые фразы дня", 
                desc: "Учимся приветствовать собеседника в зависимости от времени суток и ситуации.", 
                examples: ["Hello! — Здравствуйте! (универсально)", "Hi! — Привет! (неформально)", "Good morning! — Доброе утро!"] 
            },
            { 
                type: "quiz", 
                title: "Перевод фразы", 
                desc: "Как переводится на английский 'Доброе утро'?", 
                options: ["Good evening", "Good morning", "Good night", "Hello friend"], 
                correct: 1, 
                feedback: "Отлично! 'Good morning' используется до полудня." 
            },
            { 
                type: "theory", 
                title: "Вежливые вопросы", 
                desc: "Как спросить о делах и ответить на них с улыбкой.", 
                examples: ["How are you? — Как дела?", "I'm fine, thank you. — Я в порядке, спасибо."] 
            }
        ]
    },
    {
        title: "Личные Местоимения",
        desc: "I, you, he, she, it, we, they — фундамент речи.",
        steps: [
            { 
                type: "theory", 
                title: "Единственное число", 
                desc: "Местоимения для указания на одного человека или предмет.", 
                examples: ["I — я", "You — ты / вы", "He / She / It — он / она / оно (неодушевленное)"] 
            },
            { 
                type: "theory", 
                title: "Множественное число", 
                desc: "Местоимения для группы людей или объектов.", 
                examples: ["We — мы", "They — они"] 
            },
            { 
                type: "quiz", 
                title: "Тест на местоимения", 
                desc: "Какое местоимение нужно использовать для замены слова 'cat' (кошка)?", 
                options: ["He", "She", "It", "They"], 
                correct: 2, 
                feedback: "Правильно! Для животных и предметов используется 'It'." 
            }
        ]
    },
    {
        title: "Глагол To Be (Утверждение)",
        desc: "Главный глагол английского: I am, He is, They are.",
        steps: [
            { 
                type: "theory", 
                title: "Формы глагола To Be", 
                desc: "В английском языке глагол 'быть' меняется в зависимости от лица:", 
                examples: ["I am (I'm) — я есть", "He / She / It is (He's) — он/она/оно есть", "We / You / They are (They're) — мы/вы/они есть"] 
            },
            { 
                type: "quiz", 
                title: "Выбор формы", 
                desc: "Какая форма глагола to be нужна для местоимения 'We'?", 
                options: ["am", "is", "are", "be"], 
                correct: 2, 
                feedback: "Верно! Мы говорим 'We are'." 
            },
            { 
                type: "theory", 
                title: "Примеры из жизни", 
                desc: "Строим первые полноценные предложения с глаголом связкой.", 
                examples: ["I am a student. — Я студент.", "They are happy. — Они счастливы."] 
            }
        ]
    },
    {
        title: "Глагол To Be (Отрицание)",
        desc: "Добавляем частицу NOT для отрицательных фраз.",
        steps: [
            { 
                type: "theory", 
                title: "Правило построения отрицания", 
                desc: "Достаточно поставить частицу 'not' сразу после формы глагола to be.", 
                examples: ["I am not (I'm not) busy. — Я не занят.", "He is not (isn't) tired. — Он не устал.", "They are not (aren't) here. — Их здесь нет."] 
            },
            { 
                type: "quiz", 
                title: "Проверка отрицания", 
                desc: "Как сократить фразу 'He is not'?", 
                options: ["He'sn't", "He isn't", "He not is", "He is'nt"], 
                correct: 1, 
                feedback: "Отлично! Правильное сокращение — 'isn't'." 
            }
        ]
    },
    {
        title: "Глагол To Be (Вопрос)",
        desc: "Инверсия: выносим глагол на первое место.",
        steps: [
            { 
                type: "theory", 
                title: "Порядок слов в вопросе", 
                desc: "Чтобы задать вопрос, нужно поменять местами подлежащее и глагол to be (поставить глагол в самое начало).", 
                examples: ["You are ready -> Are you ready? — Ты готов?", "He is a doctor -> Is he a doctor? — Он врач?"] 
            },
            { 
                type: "quiz", 
                title: "Тест на вопрос", 
                desc: "Как правильно спросить 'Они дома?'", 
                options: ["Are they at home?", "They are at home?", "Is they at home?", "At home they are?"], 
                correct: 0, 
                feedback: "Верно! Глагол 'Are' выносится в начало предложения." 
            }
        ]
    },
    {
        title: "Артикли A / An",
        desc: "Неопределенные артикли с исчисляемыми существительными.",
        steps: [
            { 
                type: "theory", 
                title: "Правило выбора a / an", 
                desc: "Артикль 'a' используется перед согласными звуками, а 'an' — перед гласными звуками для благозвучия.", 
                examples: ["a cat — кот (начинается с согласного звука [k])", "an apple — яблоко (начинается с гласного звука [æ])"] 
            },
            { 
                type: "quiz", 
                title: "Тест на артикль", 
                desc: "Какой артикль нужно поставить перед словом 'umbrella' (зонт)?", 
                options: ["a", "an", "the", "ничего не нужно"], 
                correct: 1, 
                feedback: "Правильно! Слово начинается с гласного звука [ʌ], поэтому выбираем 'an'." 
            }
        ]
    },
    {
        title: "Множественное Число",
        desc: "Окончания -s, -es и интересные исключения.",
        steps: [
            { 
                type: "theory", 
                title: "Стандартное правило", 
                desc: "Чтобы образовать множественное число большинства существительных, просто добавляем окончание -s.", 
                examples: ["book -> books (книга -> книги)", "car -> cars (машина -> машины)"] 
            },
            { 
                type: "theory", 
                title: "Важные исключения", 
                desc: "Некоторые слова меняют форму полностью, их нужно запомнить наизусть.", 
                examples: ["man -> men (мужчина -> мужчины)", "child -> children (ребенок -> дети)", "mouse -> mice (мышь -> мыши)"] 
            },
            { 
                type: "quiz", 
                title: "Проверка исключений", 
                desc: "Какова форма множественного числа для слова 'child'?", 
                options: ["childs", "childes", "children", "child"], 
                correct: 2, 
                feedback: "Верно! Это одно из самых известных исключений." 
            }
        ]
    },
    {
        title: "Указательные Местоимения",
        desc: "This / That и These / Those в пространстве.",
        steps: [
            { 
                type: "theory", 
                title: "Близко и далеко (Ед. число)", 
                desc: "Используем this для предметов рядом и that для предметов на расстоянии.", 
                examples: ["This is my book. — Это моя книга (в руках).", "That is a star. — То вон та звезда (в небе)."] 
            },
            { 
                type: "theory", 
                title: "Близко и далеко (Мн. число)", 
                desc: "Для нескольких предметов используем these (эти) и those (те).", 
                examples: ["These are my cats. — Это мои коты.", "Those are mountains. — Те горы высокие."] 
            },
            { 
                type: "quiz", 
                title: "Тест на указатели", 
                desc: "Что выберете для предмета, который далеко и он один?", 
                options: ["This", "That", "These", "Those"], 
                correct: 1, 
                feedback: "Отлично! 'That' указывает на удаленный объект в единственном числе." 
            }
        ]
    },
    {
        title: "Притяжательные Местоимения",
        desc: "My, your, his, her, our, their — кому что принадлежит.",
        steps: [
            { 
                type: "theory", 
                title: "Выражение принадлежности", 
                desc: "Эти слова всегда стоят перед существительным, показывая его владельца.", 
                examples: ["My car — моя машина", "Your house — твой / ваш дом", "His / Her dog — его / её собака"] 
            },
            { 
                type: "quiz", 
                title: "Практический вопрос", 
                desc: "Как сказать по-английски 'наша школа'?", 
                options: ["My school", "Their school", "Our school", "Your school"], 
                correct: 2, 
                feedback: "Правильно! 'Our' переводится как 'наш / наша / наши'." 
            }
        ]
    },
    {
        title: "Цвета и Числа",
        desc: "Расширяем словарный запас: счет до 100 и палитра.",
        steps: [
            { 
                type: "theory", 
                title: "Базовые цвета", 
                desc: "Описываем окружающий мир на английском языке.", 
                examples: ["Red — красный, Blue — синий", "Green — зеленый, Yellow — желтый", "Black — черный, White — белый"] 
            },
            { 
                type: "theory", 
                title: "Числа от 1 до 10", 
                desc: "Основа для любого счета и времени.", 
                examples: ["1 - One, 2 - Two, 3 - Three", "4 - Four, 5 - Five, 6 - Six", "7 - Seven, 8 - Eight, 9 - Nine, 10 - Ten"] 
            },
            { 
                type: "quiz", 
                title: "Тест на цвета", 
                desc: "Как переводится цвет 'Green'?", 
                options: ["Красный", "Зеленый", "Синий", "Желтый"], 
                correct: 1, 
                feedback: "Верно! Green — это зеленый." 
            }
        ]
    },
    {
        title: "Present Simple (Введение)",
        desc: "Настоящее простое время для привычек и законов природы.",
        steps: [
            { 
                type: "theory", 
                title: "Суть Present Simple", 
                desc: "Это время используется для описания регулярных, повторяющихся действий, привычек или общеизвестных фактов.", 
                examples: ["I work every day. — Я работаю каждый день.", "Water boils at 100 degrees. — Вода кипит при 100 градусах."] 
            },
            { 
                type: "quiz", 
                title: "Проверка концепции", 
                desc: "Для чего используется время Present Simple?", 
                options: ["Для действий прямо сейчас", "Для регулярных привычек и фактов", "Для прошлых событий", "Для планов на завтра"], 
                correct: 1, 
                feedback: "Отлично! Именно для регулярности и законов." 
            }
        ]
    },
    {
        title: "Present Simple (Глаголы)",
        desc: "Магия окончания -s и -es для местоимений He, She, It.",
        steps: [
            { 
                type: "theory", 
                title: "Правило третьего лица", 
                desc: "Когда подлежащее выражено местоимениями He, She или It, к глаголу обязательно добавляется окончание -s (или -es).", 
                examples: ["I like coffee. (Мне нравится)", "He likeS coffee. (Ему нравится)", "She readS books. (Она читает книги)"] 
            },
            { 
                type: "quiz", 
                title: "Тест на окончание", 
                desc: "Как правильно сказать 'Она работает'?", 
                options: ["She work", "She works", "She working", "She worked"], 
                correct: 1, 
                feedback: "Верно! С местоимением 'She' добавляем окончание -s." 
            }
        ]
    },
    {
        title: "Предлоги Места",
        desc: "In, on, at — где именно находится предмет.",
        steps: [
            { 
                type: "theory", 
                title: "Разбор основных предлогов", 
                desc: "Инструменты для ориентации в пространстве.", 
                examples: ["In — внутри закрытого пространства (in the room)", "On — на поверхности (on the table)", "At — в конкретной точке / месте (at home)"] 
            },
            { 
                type: "quiz", 
                title: "Тест на предлоги", 
                desc: "Какой предлог выберете для фразы 'на столе'?", 
                options: ["In", "On", "At", "Under"], 
                correct: 1, 
                feedback: "Правильно! Поверхность всегда обозначается предлогом 'on'." 
            }
        ]
    },
    {
        title: "Семья и Родственники",
        desc: "Mother, father, brother, sister и семейные связи.",
        steps: [
            { 
                type: "theory", 
                title: "Близкий круг", 
                desc: "Слова для описания членов семьи.", 
                examples: ["Mother / Father — мама / папа", "Brother / Sister — брат / сестра", "Parents — родители"] 
            },
            { 
                type: "quiz", 
                title: "Перевод слова", 
                desc: "Как переводится 'brother'?", 
                options: ["Сестра", "Брат", "Дядя", "Сын"], 
                correct: 1, 
                feedback: "Отлично! Brother — это брат." 
            }
        ]
    },
    {
        title: "Present Simple (Do / Does)",
        desc: "Строим отрицания и вопросы через вспомогательные глаголы.",
        steps: [
            { 
                type: "theory", 
                title: "Использование Do и Does", 
                desc: "Для вопросов и отрицаний в Present Simple нужны помощники: Do (для I, you, we, they) и Does (для he, she, it). При этом у основного глагола пропадает окончание -s!", 
                examples: ["Do you speak English? — Ты говоришь по-английски?", "He does not (doesn't) know. — Он не знает."] 
            },
            { 
                type: "quiz", 
                title: "Тест на помощника", 
                desc: "Какой вспомогательный глагол нужен для местоимения 'He' в вопросе?", 
                options: ["Do", "Does", "Is", "Are"], 
                correct: 1, 
                feedback: "Верно! Для he, she, it всегда используется 'Does'." 
            }
        ]
    },
    {
        title: "Артикль The",
        desc: "Определенный артикль: когда объект уникален или уже знаком.",
        steps: [
            { 
                type: "theory", 
                title: "Суть определенного артикля", 
                desc: "Арктиль 'the' указывает на конкретный предмет, о котором собеседники уже знают или который существует в единственном экземпляре.", 
                examples: ["Open the door. — Открой дверь (именно эту в комнате).", "The sun is bright. — Солнце яркое (солнце такое одно)."] 
            },
            { 
                type: "quiz", 
                title: "Тест на артикль", 
                desc: "Нужен ли артикль 'the' перед единственным в мире солнцем?", 
                options: ["Да, The sun", "Нет, просто sun", "Нужен an sun", "Нужен a sun"], 
                correct: 0, 
                feedback: "Правильно! Уникальные объекты всегда идут с артиклем 'the'." 
            }
        ]
    },
    {
        title: "Модальный глагол Can",
        desc: "Выражение физической способности и умения что-то делать.",
        steps: [
            { 
                type: "theory", 
                title: "Правила с модальным глаголом Can", 
                desc: "Глагол can не меняется по лицам и не требует частицы 'to' после себя.", 
                examples: ["I can swim. — Я умею плавать.", "Can you help me? — Ты можешь мне помочь?", "He cannot (can't) fly. — Он не умеет летать."] 
            },
            { 
                type: "quiz", 
                title: "Тест на модальный глагол", 
                desc: "Как правильно сказать 'Я умею танцевать'?", 
                options: ["I can to dance", "I can dance", "I cans dance", "I am can dance"], 
                correct: 1, 
                feedback: "Верно! Частица 'to' после 'can' никогда не ставится." 
            }
        ]
    },
    {
        title: "Уровень 2: Прошлые и Будущие события",
        desc: "Past Simple и Future Simple для расширения временной шкалы.",
        steps: [
            { 
                type: "theory", 
                title: "Past Simple (Прошедшее время)", 
                desc: "Для правильных глаголов прошедшее время образуется добавлением окончания -ed.", 
                examples: ["I played tennis yesterday. — Я играл в теннис вчера.", "She worked hard. — Она упорно работала."] 
            },
            { 
                type: "theory", 
                title: "Future Simple (Будущее время)", 
                desc: "Используем вспомогательное слово 'will' для выражения планов, обещаний и решений на будущее.", 
                examples: ["I will help you tomorrow. — Я помогу тебе завтра.", "It will rain later. — Позже пойдет дождь."] 
            },
            { 
                type: "quiz", 
                title: "Тест по временам", 
                desc: "Какой показатель указывает на прошедшее время для правильных глаголов?", 
                options: ["-ing", "-ed", "will", "does"], 
                correct: 1, 
                feedback: "Отлично! Окончание -ed создает форму Past Simple." 
            }
        ]
    },
    {
        title: "Уровень 2: Сравнение и Вопросы",
        desc: "Сравнительные степени прилагательных и вопросительные слова.",
        steps: [
            { 
                type: "theory", 
                title: "Сравнительные прилагательные", 
                desc: "Для коротких слов добавляем суффикс -er, а для длинных используем слово 'more' (более).", 
                examples: ["Fast -> faster (быстрый -> быстрее)", "Beautiful -> more beautiful (красивый -> более красивый)"] 
            },
            { 
                type: "theory", 
                title: "Вопросительные слова (WH-questions)", 
                desc: "Who (кто), what (что), where (где), when (когда), why (почему), how (как).", 
                examples: ["Where do you live? — Где ты живешь?", "Why are you late? — Почему ты опаздываешь?"] 
            },
            { 
                type: "quiz", 
                title: "Итоговый тест уровня", 
                desc: "Как переводится вопросительное слово 'Where'?", 
                options: ["Когда", "Где / Куда", "Почему", "Кто"], 
                correct: 1, 
                feedback: "Великолепно! Вы завершили вводный блок тем." 
            }
        ]
    }
];

function initDetailedRoadmap() {
    const container = document.getElementById('roadmap-container');
    if (!container) return;
    container.innerHTML = '';

    curriculum.forEach((lesson, index) => {
        const div = document.createElement('div');
        div.className = 'roadmap-module';
        
        if (index < userProgress) {
            div.classList.add('completed');
        } else if (index === userProgress) {
            div.classList.add('current');
        } else {
            div.classList.add('locked');
        }

        const statusIcon = index < userProgress ? '<i class="fa-solid fa-check" style="color: var(--success)"></i>' : (index === userProgress ? '<i class="fa-solid fa-lock-open"></i>' : '<i class="fa-solid fa-lock"></i>');

        div.innerHTML = `
            <div class="module-header">
                <span class="module-number">Урок ${index + 1}</span>
                <span>${statusIcon}</span>
            </div>
            <div class="module-title">${lesson.title}</div>
            <div class="module-desc">${lesson.desc}</div>
        `;
        
        div.addEventListener('click', () => openLessonModal(lesson, index + 1, index));
        container.appendChild(div);
    });
}

function openLessonModal(lesson, lessonNum, lessonIndex) {
    const modal = document.getElementById('lesson-modal');
    const body = document.getElementById('lesson-body');
    const closeModalBtn = document.getElementById('close-modal');
    
    if (!modal || !body) return;

    let currentStep = 0;

    function renderStep() {
        const step = lesson.steps[currentStep];
        
        if (step.type === "theory") {
            body.innerHTML = `
                <div style="animation: contentIn 0.3s ease;">
                    <span class="module-number">Урок ${lessonNum} • Шаг ${currentStep + 1} из ${lesson.steps.length}</span>
                    <h3 class="lesson-step-title" style="margin-top: 8px;">${step.title}</h3>
                    <p class="lesson-step-desc">${step.desc}</p>
                    <div class="lesson-examples">
                        <h4>Разбор и примеры:</h4>
                        <ul>
                            ${step.examples.map(ex => `<li style="margin-bottom: 6px;">${ex}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="lesson-nav-btns">
                        ${currentStep > 0 ? '<button class="lesson-btn secondary" id="prev-step">Назад</button>' : ''}
                        <button class="lesson-btn primary" id="next-step">${currentStep < lesson.steps.length - 1 ? 'Далее' : 'Завершить урок'}</button>
                    </div>
                </div>
            `;
        } else if (step.type === "quiz") {
            body.innerHTML = `
                <div style="animation: contentIn 0.3s ease;">
                    <span class="module-number" style="color: var(--warning);">Интерактивная проверка • Шаг ${currentStep + 1} из ${lesson.steps.length}</span>
                    <h3 class="lesson-step-title" style="margin-top: 8px;">${step.title}</h3>
                    <p class="lesson-step-desc" style="font-weight: 600; color: #fff;">${step.desc}</p>
                    
                    <div class="quiz-options" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 25px;">
                        ${step.options.map((opt, oIdx) => `
                            <button class="quiz-option-btn" data-index="${oIdx}" style="background: var(--bg-card); border: 1px solid var(--border-color); color: #fff; padding: 14px 18px; border-radius: 12px; text-align: left; cursor: pointer; font-size: 1rem; transition: all 0.2s;">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                    
                    <div id="quiz-feedback" style="margin-bottom: 20px; font-weight: 600; min-height: 24px;"></div>
                    
                    <div class="lesson-nav-btns">
                        ${currentStep > 0 ? '<button class="lesson-btn secondary" id="prev-step">Назад</button>' : ''}
                        <button class="lesson-btn primary" id="next-step" style="opacity: 0.5; pointer-events: none;">Далее</button>
                    </div>
                </div>
            `;

            const optionBtns = body.querySelectorAll('.quiz-option-btn');
            const nextBtn = body.querySelector('#next-step');
            const feedbackBox = body.querySelector('#quiz-feedback');

            optionBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const selectedIdx = parseInt(btn.dataset.index);
                    
                    optionBtns.forEach(b => {
                        b.style.pointerEvents = 'none';
                        const bIdx = parseInt(b.dataset.index);
                        if (bIdx === step.correct) {
                            b.style.background = 'rgba(16, 185, 129, 0.2)';
                            b.style.borderColor = 'var(--success)';
                            b.style.color = '#34d399';
                        } else if (bIdx === selectedIdx) {
                            b.style.background = 'rgba(239, 68, 68, 0.2)';
                            b.style.borderColor = '#ef4444';
                            b.style.color = '#f87171';
                        }
                    });

                    if (selectedIdx === step.correct) {
                        feedbackBox.innerHTML = `<span style="color: var(--success);"><i class="fa-solid fa-circle-check"></i> ${step.feedback}</span>`;
                    } else {
                        feedbackBox.innerHTML = `<span style="color: #ef4444;"><i class="fa-solid fa-circle-xmark"></i> Неверно. Правильный вариант подсвечен зеленым.</span>`;
                    }

                    nextBtn.style.opacity = '1';
                    nextBtn.style.pointerEvents = 'auto';
                });
            });
        }

        if (currentStep > 0) {
            const prevBtn = document.getElementById('prev-step');
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    currentStep--;
                    renderStep();
                });
            }
        }

        const nextBtnAction = document.getElementById('next-step');
        if (nextBtnAction) {
            nextBtnAction.addEventListener('click', () => {
                if (currentStep < lesson.steps.length - 1) {
                    currentStep++;
                    renderStep();
                } else {
                    modal.classList.remove('open');
                    updateProgressOnComplete(lessonIndex);
                }
            });
        }
    }

    renderStep();
    modal.classList.add('open');

    if (closeModalBtn) {
        closeModalBtn.onclick = () => {
            modal.classList.remove('open');
        };
    }
}

function updateProgressOnComplete(lessonIndex) {
    completedLessonsCount++;
    if (lessonIndex >= userProgress) {
        userProgress = lessonIndex + 1;
    }
    
    const lessonsEl = document.getElementById('stat-lessons');
    const progressEl = document.getElementById('stat-progress');
    
    if (lessonsEl) lessonsEl.innerText = completedLessonsCount;
    if (progressEl) {
        const percent = Math.round((userProgress / curriculum.length) * 100);
        progressEl.innerText = percent + '%';
    }
    
    initDetailedRoadmap();
}

function initPracticeCards() {
    const cards = document.querySelectorAll('.study-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.practice;
            alert(`Интерактивный тренажер режима '${type.toUpperCase()}' активирован! Скоро здесь появится полноценный игровой процесс.`);
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
        if (authSection) {
            authSection.innerHTML = `
                <div style="display:flex; align-items:center; gap: 15px; animation: contentIn 0.3s ease;">
                    <img src="${payload.picture}" alt="avatar" style="width: 45px; height: 45px; border-radius: 50%; border: 2px solid var(--success);">
                    <div>
                        <h3 style="color:var(--success); font-size:1.05rem; margin-bottom:2px;">Синхронизировано</h3>
                        <p style="font-size:0.8rem; color:var(--text-secondary);">${payload.email}</p>
                    </div>
                </div>
            `;
        }

        const userNameEl = document.getElementById('user-name');
        const profileAvatarEl = document.getElementById('profile-avatar');

        if (userNameEl) userNameEl.innerText = payload.name;
        if (profileAvatarEl) profileAvatarEl.innerHTML = `<img src="${payload.picture}" alt="avatar">`;
    } catch(e) {
        console.error("Ошибка авторизации:", e);
    }
}

function initMicrophone() {
    const micBtn = document.getElementById('mic-btn');
    const feedbackBox = document.getElementById('voice-feedback');
    const phraseElement = document.getElementById('phrase-to-read');
    
    if (!micBtn || !feedbackBox || !phraseElement) return;
    
    const targetPhrase = phraseElement.innerText;
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
            <div style="font-size: 1.3rem; font-weight: 800; color: ${color}; margin-bottom: 6px; animation: contentIn 0.3s ease;">
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
