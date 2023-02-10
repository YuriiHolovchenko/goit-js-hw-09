// Оголошення змінних
const refs = {
    startBt: document.querySelector('button[data-start]'),
    stopBt: document.querySelector('button[data-stop]'),
    BGcolor: document.querySelector('body')
}
let timeId = null;
refs.stopBt.disabled = true;

// Слухач подій на кнопку "START"
refs.startBt.addEventListener('click', () => {
    refs.stopBt.disabled = false;
    timeId = setInterval(coloredBackground, 1000);
    console.log('Choose a background color and press "Stop" button');
    refs.startBt.disabled = true;
});
// Слухач подій на кнопку "STOP"
refs.stopBt.addEventListener('click', () => {
    refs.startBt.disabled = false;
    clearInterval(timeId);
    console.log('Good choice!');
    refs.stopBt.disabled = true;
});

// Блок функцій 
function coloredBackground() {
    refs.BGcolor.style.backgroundColor = getRandomHexColor();
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}