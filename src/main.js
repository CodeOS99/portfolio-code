document.addEventListener('DOMContentLoaded', async () => {
  const intros = []
  let i = 1;
  let prev = null;
  while(true) {
    let el = document.getElementById(`intro${i}`);
    if(el !== null) {
        if(prev !== null) prev.classList.remove("typewriter")
        el.classList.remove("hidden")
        await typewriter(el, 70);
        await delay(1000);
        prev = el
    } else {
      break;
    }
    i++;
  }
});

function typewriter(element, baseSpeed = 70) {
  return new Promise(resolve => {
    const text = element.textContent.trim();
    element.textContent = '';
    let i = 0;

    function type() {
      if (i >= text.length) {
        resolve();
        return;
      }

      element.textContent += text[i];
      i++;

      const char = text[i - 1];
      const delay =
        char === '.' || char === ',' ? 350 :
        char === '!' || char === '?' ? 500 :
        baseSpeed + Math.random() * (Math.random() * 50-25);

      setTimeout(type, delay);
    }

    type();
  });
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}
