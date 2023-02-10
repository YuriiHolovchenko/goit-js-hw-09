import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Оформлення стилів таймера
const timerCss = document.querySelector('div.timer');
timerCss.style.display = "flex";
timerCss.style.margin = "10px";
const fieldCss = timerCss.querySelectorAll('.field');
fieldCss.forEach((elem) => {
    elem.style.display = 'flex';
    elem.style.width = '70px'
    elem.style.flexDirection = 'column';
    elem.style.alignItems = 'center';
    const valueCss = elem.querySelector('.value')
        valueCss.style.fontSize = '35px';
})

//  Оголошення змінних
const dataTime = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const options = {
    enableTime: true,
    clickOpens: true,
    time_24hr: true,
    mode: "single",
    defaultDate: new Date(),
    minuteIncrement: 1,
    disable: [],
    onClose(selectedDates) {
        // console.log(selectedDates[0]);
        start(selectedDates[0].getTime());
    },
};
const ref = {
    days: document.querySelector('.timer [data-days]'),
    hours: document.querySelector('.timer [data-hours]'),
    minutes: document.querySelector('.timer [data-minutes]'),
    seconds: document.querySelector('.timer [data-seconds]'),
};
const messageOptions = {
    position: "center-center",
    clickToClose: true,
    timeout: 5000,
}

startBtn.disabled = true;
flatpickr(dataTime, options);

// Блок функцій 
function start(getDate) {
    const delayDate = getDate - Date.now();    
    if (delayDate <= 0) {
        Notify.failure('Обраний час вже в минулому. Виберіть інший час', messageOptions);
        return;
    };
// Блокування календаря flatpickr та розблокування кнопки "start"
    startBtn.disabled = false;
    stopFlatpicker();
    Notify.success('Натисніть "Start" щоб запустити таймер.', messageOptions);

// Запуск таймера
    startBtn.addEventListener('click', () => {
        startBtn.disabled = true;
        let intervalId = setInterval(() => {
           const delay = getDate - Date.now()
            
            if (delay <= 999) {
                clearInterval(intervalId);
                Notify.success('Час настав! Таймер зупинено!', messageOptions);
            }
            const {days, hours, minutes, seconds} = convertMs(delay);
            ref.days.textContent = addLeadingZero(days);
            ref.hours.textContent = addLeadingZero(hours);
            ref.minutes.textContent = addLeadingZero(minutes);
            ref.seconds.textContent = addLeadingZero(seconds);
            // console.log(convertMs(delay));      
        }, 1000);
        
});

};
function stopFlatpicker() {
    options.clickOpens = false;
    const noOpens = options
    flatpickr(dataTime, noOpens);
}
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}