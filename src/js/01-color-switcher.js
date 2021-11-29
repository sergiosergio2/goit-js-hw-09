const refs = {
startBtn: document.querySelector('button[data-start]'),
stopBtn: document.querySelector('button[data-stop]'),
body: document.querySelector('body'),
}

refs.startBtn.addEventListener('click', start);
refs.stopBtn.addEventListener('click', stop);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function start() {
      bodyColor();
      timerId = setInterval(bodyColor, 1000);
      disabled(refs.startBtn, refs.stopBtn);
  }
  function stop() {
      disabled(refs.stopBtn, refs.startBtn );
      clearInterval(timerId);
  }

  function bodyColor() {
      refs.body.setAttribute('style', `background-color: ${getRandomHexColor()};`);


  }
  function disabled (activ, pass) {
      activ.setAttribute('disabled', '');
      pass.removeAttribute('disabled');
  }