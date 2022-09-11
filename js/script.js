// import playList from 'http://127.0.0.1:5500/momentum/js/PlayList.js';
// console.log(playList);

const playList = [
    {      
      title: 'Aqua Caelestis',
      src: './assets/sounds/Aqua Caelestis.mp3',
      duration: '00:39'
    },
    {      
        title: 'Ennio Morricone',
        src: './assets/sounds/Ennio Morricone.mp3',
        duration: '01:37'
      },  
    {      
      title: 'River Flows In You',
      src: './assets/sounds/River Flows In You.mp3',
      duration: '01:37'
    },
    {      
      title: 'Summer Wind',
      src: './assets/sounds/Summer Wind.mp3',
      duration: '01:50'
    }
  ]
  
  const greetingTranslation = {
    morning: {
        'en':'Good morning',
        'ru':'Доброе утро'
    },
    afternoon: {
        'en':'Good afternoon',
        'ru':'Добрый день'
    },
    evening: {
        'en':'Good evening',
        'ru':'Добрый вечер'
    },
    night :{
        'en':'Good night',
        'ru':'Доброй ночи'
    },
    wind :{
        'en':'Wind speed: ',
        'ru':'Скорость ветра: '
    },
    speed :{
        'en':' m/s',
        'ru':' м/с'
    },
    humidity :{
        'en':'Humidity: ',
        'ru':'Влажность: '
    },
    locale :{
        'en':'en-US',
        'ru':'ru-RU'
    },
    name:{
        'en':'[Enter name]',
        'ru':'[Введите имя]'
    },
    city:{
        'en':'[Enter city]',
        'ru':'[Введите город]'
    },
    time:{
        'en':'Time',
        'ru':'Время'
    },
    date:{
        'en':'Date',
        'ru':'Дата'
    },
    greeting:{
        'en':'Greeting',
        'ru':'Приветствие'
    },
    quote:{
        'en':'Quote',
        'ru':'Цитата'
    },
    weather:{
        'en':'Weather',
        'ru':'Погода'
    },
    audio:{
        'en':'Audio',
        'ru':'Аудио Плеер'
    },
    photo:{
        'en':'PhotoSource',
        'ru':'Фон'
    },
    language:{
        'en':'Language',
        'ru':'Язык'
    },
    todo:{
        'en':'TODO List',
        'ru':'Список дел'
    }
} 

const state = {
    language: 'en',
    photoSource: 'GitHub',
    blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio','todo']
}
// console.log(state)

const TIME = document.querySelector('.time');
const DATE = document.querySelector('.date');
const GREETING = document.querySelector('.greetings');
const NAME = document.querySelector('.name');
const BODY = document.getElementsByTagName('body');
const SLIDE_NEXT = document.querySelector('.slide-next');
const SLIDE_PREV = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const CITY = document.querySelector('.city');
const QUOTE = document.querySelector('.quote-text');
const AUTOR = document.querySelector('.author');
const CHANGE_QUOTE = document.querySelector('.change-quote');

const AUDIO = document.querySelector('.audioplayer');
const PLAY_BTN = document.querySelector('.play');
const PLAY_PREV = document.querySelector('.play-prev');
const PLAY_NEXT = document.querySelector('.play-next');
const PLAY_LIST_CONTAINER = document.querySelector('.play-list');
const VOLUME = document.querySelector('.volume');
const DURATION = document.querySelector('.songs-duration');
const PLAY_NAME = document.querySelector('.play-name');
const PROGRESS_VOLUME = document.querySelector('.progress-volume');
const PROGRESS_TIME = document.querySelector('.progress-time');
const CURRENT_TIME = document.querySelector('.songs-time');

const BUTTON_EN = document.querySelector('.en');
const BUTTON_RU = document.querySelector('.ru');

const SETTINGS_BTN = document.querySelector('.settings-icon');
const SETTINGS = document.querySelector('.settings-menu');
const SETTINGS_OPTION = document.querySelectorAll(".set-options");
const SETTINGS_CHECKBOX = document.querySelectorAll("input[type=checkbox]");;
const SETTINGS_SELECT = document.querySelector(".set-select");

const TODO_BTN = document.querySelector('.todo-icon');
const TODO = document.querySelector('.TODO');
const ADD_TODO_ITEM = document.querySelector('.todo-add');

// let language = 'en'
let isPlay = false;
let playNum =0;
var randomNum = 0;


window.onload = function() {
    showTime();
    getRandomNum(1,20);
    getQuotes();
    soundsList();
    checkLanguage();
    // getLinkToImage();
  };


//Функция выводит время(используем рекурсивный setTimeout — вызов функции внутри неё самой с интервалом в 1 секунду),
//обновляет функции даты и приветствия
function showTime(){
    const date = new Date();
    const currentTime = date.toLocaleTimeString(greetingTranslation.locale[`${state.language}`]);
    TIME.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}

//Функция выводит дату в заданном формате
function showDate(){
    const date = new Date();
    const options = {weekday:'long', month:'long', day:'numeric', timeZone:'UTC'}
    const currentDate = date.toLocaleDateString(greetingTranslation.locale[`${state.language}`],options);
    DATE.textContent = currentDate;
}

//Функция выводит приветствие в зависимости от времени суток
function showGreeting(){
    const date = new Date();
    const hours = date.getHours();
    const timeOfDay = getTimeOfDay(hours);

    GREETING.textContent = greetingTranslation[timeOfDay][state.language];
    return timeOfDay;
}

function getTimeOfDay(hours){
    const day = ['night','morning','afternoon', 'evening']
    return day[Math.floor(hours/6)];
} 

//---------------------2.работа с locale storage--------------
window.addEventListener('load', getLocalStorage)
window.addEventListener('beforeunload', setLocalStorage)

//сохраняет данные перед перезагрузкой или закрытием страницы (событие beforeunload)
function setLocalStorage() {
    localStorage.setItem('name', NAME.value);
    localStorage.setItem('city', CITY.value);
    localStorage.setItem('language', state.language);
    localStorage.setItem('photoSource', state.photoSource);
    let checkset = [...SETTINGS_CHECKBOX].map(el => localStorage.setItem(el.id, el.checked))

    localStorage.setItem('todo', document.querySelector('.todo-items').innerHTML);

  }
//восстановливает и отображает данные перед перезагрузкой или закрытием страницы (событие load)
function getLocalStorage() {
    // console.log(localStorage);
    if(localStorage.getItem('name')) {
        NAME.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
        CITY.value = localStorage.getItem('city');
        getWeather();
    }
    if(localStorage.getItem('language')) {
        state.language = localStorage.getItem('language');
        (state.language === 'ru')? russianLanguage():englishLanguage();
    }
    if(localStorage.getItem('photoSource')) {
        state.photoSource = localStorage.getItem('photoSource');
        checkPhotoSource();
        let optionset = [...SETTINGS_OPTION].map(el => (el.value === state.photoSource)? el.selected =true: el.selected =false);  
    }
    let getSettingsStorage = state.blocks.map(el =>{
        // console.log(document.getElementById(el),localStorage.getItem(el))
        (localStorage.getItem(el) === 'false')? document.getElementById(el).checked = false : document.getElementById(el).checked = true ;
        checkSettings()
    } )
    
    if (localStorage.getItem('todo')) {
        document.querySelector('.todo-items').innerHTML = localStorage.getItem('todo');
    }

}

// ---------------------------3.slider----------------------------
//бэкграунд с репозитория
function setGitHubBg(randomNum){
    let timeOfDay = showGreeting();
    //padStart заполняет строку другой строкой до необходимой длины
    let bgNum  = (''+randomNum).padStart(2, "0");
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/sinevit/momentum-backgrounds/main/${timeOfDay}/${bgNum}.jpg`
    img.onload = () => {      
        BODY[0].style.backgroundImage = `url(${img.src})`;
    }; 
}

//бэкграунд с помощью Unsplash API
async function setUnsplashAPIBg(){
    let timeOfDay = showGreeting();
    const url = `https://api.unsplash.com/photos/random?query=${timeOfDay}&client_id=f9Kv_jDm6fe5fx4evnNyP5RKAEpcpz2lKUVI6TL-Ttk`;
    const res = await fetch(url);
    const data = await res.json();

    const img = new Image();
    img.src = data.urls.regular
    img.onload = () => {      
        BODY[0].style.backgroundImage = `url(${img.src})`
    };     
}

//бэкграундс помощью Flickr API
async function setFlickrAPIBg(randomNum){
    let timeOfDay = showGreeting();
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c41257755e509ade693cbfa2ff355c17&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = data.photos.photo[`${randomNum}`]['url_l'];
    img.onload = () => {      
        BODY[0].style.backgroundImage = `url(${img.src})`
    }; 
}
       

//возвращает рандомное число в указанном промежутке
function getRandomNum(min, max){
    randomNum = Math.round(Math.random() * (max - min) + min);
    checkPhotoSource(randomNum);
}

SLIDE_NEXT.addEventListener('click', getSlideNext)
function getSlideNext(){
    (randomNum<20) ? randomNum++: randomNum = 1; 
    checkPhotoSource(randomNum);
}

SLIDE_PREV.addEventListener('click', getSlidePrev)
function getSlidePrev(){
    (randomNum>1) ? randomNum--: randomNum = 20;
    checkPhotoSource(randomNum);
}

function checkPhotoSource(){
    // console.log(state.photoSource)
    if(state.photoSource ==='GitHub'){
        // console.log(1)
        setGitHubBg(randomNum);
    }
    if(state.photoSource ==='UnsplashAPI'){
        // console.log(2)
        setUnsplashAPIBg()
    }
    if(state.photoSource ==='FlickrAPI'){
        // console.log(3)
        setFlickrAPIBg(randomNum);
    }
}

// --------------------------------4.Погода -----------------------------------
async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY.value}&lang=${state.language}&appid=159323f768b900716f3c716233429e2b&units=metric`;

    weatherError.innerHTML=''
    try {
        const res = await fetch(url);
        const data = await res.json(); 
        weatherError.innerHTML='';
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = greetingTranslation.wind[`${state.language}`] + Math.round(data.wind['speed']) + greetingTranslation.speed[`${state.language}`];
        humidity.textContent = greetingTranslation.humidity[`${state.language}`] + `${data.main.humidity}%`;
      } catch(e) {
        weatherError.innerHTML=`Error! city not found for '${CITY.value}'!`;
        document.querySelector('.description-container').display ='none'
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
      }
  }
  
  function setCity(event) {
    if (event.code === 'Enter') {
      getWeather();
      CITY.blur();
    }
  }

  CITY.addEventListener('keypress', setCity);


// ---------------------------------5. Цитата дня ---------------
  async function getQuotes() {  
    let quotes = '';
    (state.language === 'ru')? 
    quotes = './js/data.json': quotes = `./js/data1.json`
    // let quotes = `http://127.0.0.1:5500/momentum/js/data.json`;
    const res = await fetch(quotes);
    const data = await res.json(); 
    const rand =Math.round(Math.random()*10);
    QUOTE.innerHTML = data[rand].text
    AUTOR.innerHTML = data[rand].author
  }

  CHANGE_QUOTE.addEventListener('click', getQuotes)
  

//   ---------------6.audio--------------------------

PLAY_BTN.addEventListener('click', toggleBtn);
PLAY_NEXT.addEventListener('click', playNext);
PLAY_PREV.addEventListener('click', playPrev);
AUDIO.addEventListener('ended', playNext);

function toggleBtn() {
    PLAY_BTN.classList.toggle('pause');
    playAudio(isPlay); 
  }

function checkPlayList(title){
    PLAY_LIST_CONTAINER.childNodes.forEach(el => (el.innerHTML === title) ? el.classList.add('item-active'): el.classList.remove('item-active'))
}

function playAudio() {
    if(!isPlay){
        AUDIO.src = playList[playNum].src;
        // AUDIO.currentTime = 0;
        AUDIO.play();
        DURATION.innerHTML = playList[playNum].duration;
        PLAY_NAME.innerHTML = playList[playNum].title;
        checkPlayList(playList[playNum].title);
        getProgressTime()
    }else{
        // isPlay = !isPlay;
        AUDIO.pause();  
    }
    isPlay = !isPlay;
}

function playNext(){
    (playNum<3) ? playNum++: playNum = 0; 
    if(isPlay === false){
        toggleBtn(); 
    }else{
        isPlay = !isPlay;
        playAudio(); 
    }
}
function playPrev(){
    (playNum>0) ? playNum--: playNum = 3; 
    if(isPlay === false){
        toggleBtn(); 
    }else{
        isPlay = !isPlay;
        playAudio(); 
    }
}

// добавление списка треков
function soundsList(){
    playList.forEach(el => {
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent = el.title;
        PLAY_LIST_CONTAINER.appendChild(li);
      })
}

//   ---------------7.audio add--------------------------

VOLUME.addEventListener('click', changeValume);
// вкл/выкл звук
function changeValume(){
    AUDIO.muted = !AUDIO.muted;
    VOLUME.classList.toggle('mute');
    (AUDIO.muted) ? PROGRESS_VOLUME.value = '0': PROGRESS_VOLUME.value = '50';
}

//изменить громкось звука
PROGRESS_VOLUME.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(PROGRESS_VOLUME).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  AUDIO.volume = newVolume;
}, false)


//прогресс бар песни
function getProgressTime(){
    setInterval(() => {
        PROGRESS_TIME.value = AUDIO.currentTime /AUDIO.duration * 100;
        CURRENT_TIME.textContent = getTimeCodeFromNum(
          AUDIO.currentTime
        );
      }, 1000);
}

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }


  //прогрессбар  с музыкой
  PROGRESS_TIME.addEventListener('click', e => {
  const timelineWidth = window.getComputedStyle(PROGRESS_TIME).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth)* AUDIO.duration;
  AUDIO.currentTime = timeToSeek;
}, false)


//   ---------------8.Изменение языка--------------------------
BUTTON_EN.addEventListener('click', englishLanguage);
BUTTON_RU.addEventListener('click', russianLanguage);

function englishLanguage(){
    BUTTON_EN.classList.add('active');
    BUTTON_RU.classList.remove('active');
    state.language = 'en';
    getWeather();
    checkLanguage();
    getQuotes();
}
function russianLanguage(){
    BUTTON_EN.classList.remove('active');
    BUTTON_RU.classList.add('active');
    state.language = 'ru';
    getWeather();
    checkLanguage();
    getQuotes();
}


function checkLanguage(){
    NAME.placeholder = greetingTranslation.name[`${state.language}`];
    CITY.placeholder = greetingTranslation.city[`${state.language}`];
    document.querySelector('.language_title').innerHTML = greetingTranslation.language[`${state.language}`];
    let checkLanSett = state.blocks.map(el => document.querySelector(`.${el}_title`).innerHTML = greetingTranslation[el][`${state.language}`])
    // let checkLanSett = state.blocks.map(el => console.log(el))
}
    //   ---------------9.Настройки--------------------------

SETTINGS_BTN.addEventListener('click', openSettings);
SETTINGS.addEventListener('change', checkSettings);
SETTINGS_SELECT.addEventListener('change', checkSelect);

function openSettings(){
    SETTINGS.classList.toggle('active');
}

//скрывает элементы
function checkSettings(){
    let checkset = [...SETTINGS_CHECKBOX].map(el => 
        (el.checked === false)? document.querySelector(`.${el.id}`).classList.add('hidden'):document.querySelector(`.${el.id}`).classList.remove('hidden'));  
}
function checkSelect(){
    let optionset = [...SETTINGS_OPTION].map(el => {
        if(el.selected === true) state.photoSource = el.value;});  
    getRandomNum(1,20); 
}

    //   ---------------9.TODO-------------------------
    TODO_BTN.addEventListener('click', openTODOList)
    document.querySelector('.todo-items').addEventListener('click', itemListChecked);
    document.querySelector('.todo-text').addEventListener('keypress',checkKeyPressed);


    function openTODOList(){
        TODO.classList.toggle('active');
    }

    function itemListChecked(e) {

        if (e.target.className === 'todo-task') {
          e.target.parentElement.classList.toggle('checked');
        }
        if (e.target.className === 'todo-action todo-action_delete') {
            e.target.parentElement.style.display = "none";
        }
        if (e.target.className === 'todo-action todo-action_complete') {
            editTODOItem(e);
        }
      } 

    function editTODOItem(e){
        const elem = e.target.parentElement.childNodes[0];
        let value  = elem.innerHTML;
        if(!elem.classList.contains('edit')) {
            elem.classList.add('edit'); 
            elem.innerHTML = `<input type="test" value="${value}">`; 
          } else { 
            elem.innerHTML = e.target.parentElement.querySelector('input').value;
            elem.classList.remove('edit');
          }
    }  

    function addNewTODOItem(){
        const elemText = document.querySelector('.todo-text').value;
        const li = document.createElement("li");
        li.classList.add('todo-item');

        const text = document.createElement("span");
        text.classList.add('todo-task')
        text.innerHTML = elemText;

        const update = document.createElement("span");
        update.classList.add('todo-action','todo-action_complete')

        const del = document.createElement("span");
        del.classList.add('todo-action','todo-action_delete')


        li.appendChild(text);
        li.appendChild(update);
        li.appendChild(del);
        if (elemText === '') {
            alert("You must write something!");
        } else {
            document.querySelector('.todo-items').appendChild(li);
        }
        document.querySelector('.todo-text').value = ""

    }

    function checkKeyPressed(keyPressed){
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            addNewTODOItem();
        }
    };

