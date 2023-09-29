const btn = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};
let id = 0;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

btn.start.addEventListener('click', startHandle);
btn.stop.addEventListener('click', stopHandle);
btn.stop.disabled = true;

function startHandle() {
  btn.start.disabled = true;
  btn.stop.disabled = false;

  id = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopHandle() {
  clearInterval(id);

  btn.start.disabled = false;
  btn.stop.disabled = true;
}
