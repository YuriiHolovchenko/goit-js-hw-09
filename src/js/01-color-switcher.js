
const refs = {
    startBt: document.querySelector('button[data-start]'),
    stopBt: document.querySelector('button[data-stop]'),
    BGcolor: document.querySelector('body')
}
let timeId = null;
refs.stopBt.disabled = true;

refs.startBt.addEventListener('click', () => {
    refs.stopBt.disabled = false;
    timeId = setInterval(coloredBackground, 1000);
    console.log('Працюємо..');;
    refs.startBt.disabled = true;
});

refs.stopBt.addEventListener('click', () => {
    refs.startBt.disabled = false;
    clearInterval(timeId);
    console.log('STOP');
    refs.stopBt.disabled = true;
});

function coloredBackground() {
    refs.BGcolor.style.backgroundColor = getRandomHexColor();
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}