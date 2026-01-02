document.addEventListener('DOMContentLoaded', async () => {
    let isPolished = localStorage.getItem('site-polished');
    if(!isPolished) {
        const terminalView = document.getElementById("terminal-view");
        const terminalText = document.getElementById("terminal-text");

        terminalView.classList.remove("hidden");

        const lines = [
          ">>        Initializing portfolio_v1.0.0 ...",
          ">>        Main site loaded.",
          ">>        <span class='text-red'>ERROR: CSS stylesheet corrupted</span>",
          ">>        Exiting process with code 127",
          ">> Wait, this is terrible.",
          ">> Could you please refresh the site?",
          ">> I need a moment to fix things up..."
        ]

        localStorage.setItem('site-polished', 'true');
        for(const line of lines) {
          if(terminalText.innerHTML !== "") terminalText.innerHTML +="<br>";

          await typeTerminal(terminalText, line);
          await delay(400);
        }
    } else {
      document.getElementById("polished-site").classList.remove("hidden");  
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
