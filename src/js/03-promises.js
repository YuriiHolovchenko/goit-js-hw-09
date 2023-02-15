import { Notify } from 'notiflix/build/notiflix-notify-aio';

const messageOptions = {
    position: "right-top",
    clickToClose: true,
  timeout: 5000,
    useIcon:false,
}
const refs = {
  firstDelay: document.querySelector('input[name=delay]'),
  delayStep: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
} 
const creatPromisesButton = document.querySelector('button');

creatPromisesButton.addEventListener('click', (e) => {
  let delay = Number(refs.firstDelay.value);
  const step = Number(refs.delayStep.value);
  const amount = Number(refs.amount.value);

for (let index = 1; index <= amount; index++) {
    createPromise(index, delay)
        .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, messageOptions);
        })
        .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, messageOptions);
        });
    delay += step;
} 
  e.preventDefault();
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
      setTimeout(() => { 
      if (shouldResolve) {
       resolve({ position, delay });
      } else {
       reject({ position, delay });
      }
      }, delay);
     }
  )
};


