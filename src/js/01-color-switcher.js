ref = {
startBtn: document.querySelector('button[data-start]'),
stopBtn: document.querySelector('button[data-stop]'),
body: document.querySelector('body'),
}

ref.startBtn.addEventListener('click', start);
ref.stopBtn.addEventListener('click', stop);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function start() {
      bodyColor();
      timerId = setInterval(bodyColor, 1000);
      isabled(ref.startBtn, ref.stopBtn);
  }
  function stop() {
      isabled(ref.stopBtn, ref.startBtn );
      clearInterval(timerId);
  }

  function bodyColor() {
      ref.body.setAttribute('style', `background-color: ${getRandomHexColor()};`);


  }
  function disabled (activ, pass) {
      activ.setAttribute('disabled', '');
      pass.removeAttribute('disabled');
  }