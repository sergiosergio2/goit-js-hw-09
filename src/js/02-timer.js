import flatpickr from "flatpickr";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds'), 

}
let selectedTime = null;
let timerId;
refs.btnStart.addEventListener ('click', startTimer);
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedTime = selectedDates[0].getTime();
        const  timeResult = selectedTime - new Date().getTime();
    
        if(timeResult < 0) {
            setDisabled(refs.btnStart);
            Notify.failure ('Plase choose a date in the future');
        } else {
            removeDisabled(refs.btnStart);
        }
  }
}
function setDisabled (element) {
if (element.hasAttribute('disabled')) {
    return;
}
element.removeAttribute('disabled');
}
  flatpickr("#datetime-picker", options); 

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
  if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String(padString || ' ');
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    }
  }
  function startTimer() {
      setDisabled(refs.btnStart);
      if (timerId) {
          clearInterval(timerId);
      }
      addTime(selectedTime);
      timerId = setInterval(addTime, 1000, selectedTime);
      
  }
  const addLeadingZero = (value) => {
    return value.toString().padStart(2,"0");
    }
    function clearTime () {
        clearInterval(timerId);
        refs.days.textContent = '00';
        refs.hours.textContent = '00';
        refs.minutes.textContent = '00';
        refs.seconds.textContent = '00';
    }
    const addTime = (timeMs) => {
        const  timeResult = timeMs-new Date().getTime();
        if(timeResult<0){
            setDisabled(refs.btnStart);
            clearTime();
            Notify.success('ALARM');   
             return;
         } 
       const time =convertMs(timeResult);
       refs.days.textContent=addLeadingZero(time.days);
       refs.hours.textContent=addLeadingZero(time.hours);
    refs.minutes.textContent=addLeadingZero(time.minutes);
    refs.seconds.textContent=addLeadingZero(time.seconds);
     }
     setDisabled (refs.btnStart);


