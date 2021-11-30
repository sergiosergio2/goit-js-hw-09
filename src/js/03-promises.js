import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('[name="delay"]'),
  inputStep: document.querySelector('[name="step"]'),
  inputAmount: document.querySelector('[name="amount"]'),
  btnSubmit: document.querySelector('[type="submit"]'),
}
refs.btnSubmit.addEventListener('click', createStart);


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
 
  return new Promise((resolve, reject) => {
    setTimeout(() => {
            if (shouldResolve)  {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
function createStart (e) {
  e.preventDefault();
  let delay = +refs.inputDelay.value;
  let delayStep = +refs.inputStep.value;
  const amount = refs.inputAmount.value;
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += delayStep;
  }
}

