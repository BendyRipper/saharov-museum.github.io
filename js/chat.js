const FAQ = [
    {
        keys: ['работ', 'час', 'время', 'открыт', 'график'],
        answer: 'Май — сентябрь: ежедневно 8:00–20:00 (касса до 19:30).\nОктябрь — апрель: ежедневно 8:00–17:00 (касса до 16:30).'
    },
    {
        keys: ['билет', 'стоимост', 'цена', 'руб', 'сколько'],
        answer: 'Входной билет на Центральную площадку — уточняйте в кассе.\nВыставки «Космический десант» и «Экспериментальные автомобили» — 100 руб. дополнительно (детский — 50 руб.).\nПаровозное депо и «Блокада Ленинграда»: взрослый — 100 руб., детский — 50 руб.'
    },
    {
        keys: ['экскурс', 'гид', 'обзорн'],
        answer: 'Обзорная экскурсия проводится для групп от 15 человек по предварительной заявке: 8 (8482) 58-09-59 или +7 960 846-10-09.\nВзрослый — 500 руб., детский — 250 руб.\nЕщё есть автопоезд с аудиогидом — от 8 человек.'
    },
    {
        keys: ['адрес', 'добраться', 'добрать', 'как проехать', ' автобус', 'транспорт', 'остановк'],
        answer: 'Южное шоссе, 137, Тольятти (ориентир — административный корпус АВТОВАЗа).\nАвтобусы 126, 136, 190 (красный), 190 (синий), 214, 305, 326 — до остановки «Поликлиника ВАЗа».'
    },
    {
        keys: ['фотограф', 'съемка', 'съёмка', 'фото'],
        answer: 'Фотографировать экспонаты можно свободно. Если планируете профессиональную или коммерческую съёмку — согласуйте заранее по телефону 8 (8482) 58-09-59.'
    },
    {
        keys: ['лодк', 'подводн', 'б-307', 'сом'],
        answer: 'Подводная лодка Б-307 «Сом» — главная достопримечательность музея. Находится на Центральной площадке, работает сезонно: май — сентябрь.\nБилеты — в кассе Центральной проходной, лучше записаться заранее.'
    },
    {
        keys: ['зим', 'октябр', 'ноябр', 'декабр', 'январ', 'феврал', 'март', 'апрел'],
        answer: 'Зимой работают круглые выставки: «История техники», Паровозное депо и «Блокада Ленинграда» (8:00–17:00).\n«Космический десант» и «Экспериментальные автомобили» — сезонные, с мая по октябрь.'
    },
    {
        keys: ['звон', 'телефон', 'связ', 'контакт'],
        answer: 'Телефоны музея: 8 (8482) 58-09-59 и +7 960 846-10-09 (звонки и сообщения в MAX).'
    },
    {
        keys: ['собак', 'животн', 'питом'],
        answer: 'Про visiting с животными лучше уточнить по телефону 8 (8482) 58-09-59 — правила могут зависеть от площадки.'
    },
    {
        keys: ['парковк', 'машин', 'авто'],
        answer: 'Про парковку уточните по телефонам музея: 8 (8482) 58-09-59 или +7 960 846-10-09.'
    }
];

const FALLBACK = 'Не нашёл точного ответа на этот вопрос 😔\nПозвоните нам: 8 (8482) 58-09-59 или +7 960 846-10-09 (звонки и сообщения в MAX) — сотрудники музея ответят точно.';

const GREETING = 'Здравствуйте! Я помощник музея. Выберите вопрос из списка или напишите свой:';

const QUICK = ['Режим работы', 'Цены на билеты', 'Экскурсии', 'Как добраться', 'Подводная лодка Б-307'];

const messages = document.getElementById('chatMessages');
const quick = document.getElementById('chatQuick');
const form = document.getElementById('chatForm');
const input = document.getElementById('chatText');

function addMessage(text, who) {
    const div = document.createElement('div');
    div.className = 'chat-msg ' + who;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function showQuick(list) {
    quick.innerHTML = '';
    list.forEach(q => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chat-quick-btn';
        btn.textContent = q;
        btn.addEventListener('click', () => {
            addMessage(q, 'user');
            answer(q);
            showQuick(QUICK);
        });
        quick.appendChild(btn);
    });
}

function findAnswer(question) {
    const q = ' ' + question.toLowerCase() + ' ';
    let best = null, bestScore = 0;
    for (const item of FAQ) {
        let score = 0;
        for (const key of item.keys) {
            if (q.includes(key)) score++;
        }
        if (score > bestScore) { bestScore = score; best = item; }
    }
    return best ? best.answer : FALLBACK;
}

function answer(question) {
    const text = findAnswer(question);
    setTimeout(() => addMessage(text, 'bot'), 400);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    addMessage(question, 'user');
    input.value = '';
    answer(question);
    showQuick(QUICK);
});

const toggle = document.getElementById('chatToggle');
const widget = document.getElementById('chatWidget');

toggle.addEventListener('click', () => {
    widget.hidden = false;
    toggle.style.display = 'none';
    if (!messages.dataset.greeted) {
        addMessage(GREETING, 'bot');
        showQuick(QUICK);
        messages.dataset.greeted = '1';
    }
    input.focus();
});

document.getElementById('chatClose').addEventListener('click', () => {
    widget.hidden = true;
    toggle.style.display = '';
});

const modal = document.querySelector('.modal');
if (modal) {
    let chatWasOpen = false; 

    new MutationObserver(() => {
        const photoOpen = getComputedStyle(modal).display !== 'none';

        if (photoOpen) {

            chatWasOpen = !widget.hidden;
            widget.hidden = true;
            toggle.style.display = 'none';
        } else {
            
            toggle.style.display = '';
            if (chatWasOpen) widget.hidden = false;
        }
    }).observe(modal, { attributes: true, attributeFilter: ['style', 'class'] });
}



