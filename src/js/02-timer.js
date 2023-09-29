import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputTimes: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};

let intervalId = null;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      window.alert('Please choose a date in the future');
      return;
    }

    refs.startBtn.disabled = false;
    refs.startBtn.addEventListener('click', startTimer);

    function startTimer() {
      if (selectedDates[0] - new Date() < 0) {
        refs.startBtn.disabled = true;
        return;
      }

      intervalId = setInterval(changeTimerData, 1000);

      function changeTimerData() {
        const currentDate = selectedDates[0] - new Date();
        const convertedDate = pad(convertMs(currentDate));

        if (currentDate < 0) {
          clearInterval(intervalId);
          return;
        }

        changeRefsTextContent(convertedDate);
      }

      refs.startBtn.disabled = true;
    }
  },
};
flatpickr(refs.inputTimes, options);

function changeRefsTextContent({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = days;
  refs.timerHours.textContent = hours;
  refs.timerMinutes.textContent = minutes;
  refs.timerSeconds.textContent = seconds;
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

function pad({ days, hours, minutes, seconds }) {
  return {
    days: days.toString().padStart(2, '0'),
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  };
}
