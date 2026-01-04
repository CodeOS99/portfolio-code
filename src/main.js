document.addEventListener('DOMContentLoaded', async () => {
  const isPolished = localStorage.getItem('site-polished');

  const terminalView = document.getElementById("terminal-view");
  const terminalText = document.getElementById("terminal-text");
  const polishedSite = document.getElementById("polished-site");

  if (!isPolished) {
    terminalView.classList.remove("hidden");

    const lines = [
      '>>        Capturing viewer attention...',
      '>>        Pretending to load the breath-taking website...',
      '>>        Ready to impress.'
    ];

    for (const line of lines) {
      if (terminalText.innerHTML !== "") terminalText.innerHTML += "<br>";
      await typeTerminal(terminalText, line);
      await delay(200);
    }

    // short pause, then transition
    await delay(600);

    terminalView.classList.add("fade-out");

    setTimeout(() => {
      terminalView.classList.add("hidden");
      polishedSite.classList.remove("hidden");
      localStorage.setItem('site-polished', 'true');
    }, 500);

  } else {
    polishedSite.classList.remove("hidden");
  }
});

function typeTerminal(container, text) {
  return new Promise(resolve => {
    let i = 0;

    function type() {
      if (i >= text.length) {
        resolve();
        return;
      }

      // html tag
      if (text[i] === '<') {
        // end
        const closingTagStart = text.indexOf('</', i);
        const closingTagEnd = text.indexOf('>', closingTagStart);
        if (closingTagEnd !== -1) {
          container.innerHTML += text.substring(i, closingTagEnd + 1);
          i = closingTagEnd + 1;
          type(); 
          return;
        }
      }

      // normal
      container.innerHTML += text[i];
      i++;
      setTimeout(type, 30);
    }

    type();
  });
}

function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}
