let quizScore = 0;
let answerLocked = false;
let clicks=0, gameScore=0, gameTimer=null;

function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));const e=document.getElementById(id);if(e){e.classList.add('active');window.scrollTo(0,0)}}
function updateQuizScore(){document.querySelectorAll('.quiz-score').forEach(el=>el.textContent=quizScore)}
function answerQuestion(isCorrect, action){
  if(answerLocked) return;
  answerLocked=true;
  if(isCorrect) quizScore++;
  updateQuizScore();
  const old=document.querySelector('.answer-feedback'); if(old) old.remove();
  const box=document.createElement('div'); box.className='answer-feedback '+(isCorrect?'correct':'wrong');
  box.textContent=isCorrect?'✓ CORRETTO. +1':'✗ ERRATO. +0';
  const current=document.querySelector('.screen.active .quiz'); if(current) current.appendChild(box);
  setTimeout(()=>{
    box.remove();
    answerLocked=false;
    if(action === 'evidence') evidence();
    else if(action === 'finale') finale();
    else show(action);
  },1000);
}

function next(id){show(id)}
function evidence(){show('evidence')}
function finale(){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));const t=document.createElement('section');t.className='screen active';t.innerHTML='<div class="terminal center"><div class="warning">ANALYSIS COMPLETE</div><h2>FINAL SCORE: '+quizScore+'/7</h2><p class="muted">VALUE CANNOT BE CALCULATED.</p></div>';document.getElementById('app').appendChild(t);setTimeout(()=>{t.remove();startGame()},1800)}
function startGame(){show('game');gameScore=0;const gs=document.getElementById('game-score');if(gs)gs.textContent='0 / 5';document.getElementById('gameMsg').textContent='chill.';const a=document.getElementById('arena');a.innerHTML='';clearTimeout(gameTimer);spawnNode();gameTimer=setTimeout(()=>{if(gameScore<5){document.getElementById('gameMsg').textContent='Marco.exe si è distratto.';setTimeout(()=>show('truth'),1200)}},15000)}
function spawnNode(){const a=document.getElementById('arena'),n=document.createElement('button');n.className='node';n.type='button';n.textContent=['M','A','R','C','O'][gameScore];n.style.left=Math.max(2,Math.random()*88)+'%';n.style.top=Math.max(4,Math.random()*82)+'%';n.onclick=()=>{gameScore++;const gs=document.getElementById('game-score');if(gs)gs.textContent=gameScore+' / 5';document.getElementById('gameMsg').textContent=['peffò.','chill.','sborro.','DATI RECUPERATI.','PROTOCOLLO SBLOCCATO.'][Math.min(gameScore-1,4)];n.remove();if(gameScore<5)spawnNode();else{clearTimeout(gameTimer);setTimeout(()=>show('truth'),900)}};a.appendChild(n)}
document.getElementById('secretTrigger').addEventListener('click',()=>show('puzzi'));
function dontPress(){clicks++;const m=document.getElementById('dontmsg'),l=['Ti avevo detto di non premerlo.','Marco.','Questa è una pessima idea.','ULTIMO AVVERTIMENTO.','...ok.'];m.textContent=l[Math.min(clicks-1,l.length-1)];if(clicks>=5)setTimeout(()=>show('truth'),900)}


/* ===== POST-CREDITS: MARCO.EXE KNOWS ALEX ===== */
(function(){
  const alexQuestions = [
    {
      q: "Quale strumento musicale ha suonato Alex per diversi anni?",
      a: ["Pianoforte", "Chitarra classica", "Batteria", "Basso"],
      c: 1
    },
    {
      q: "Quale di queste cose è più probabile che Alex trasformi in un progetto enorme?",
      a: ["Un'idea casuale", "Un lavoretto all'uncinetto", "Un regalo", "Tutte le precedenti"],
      c: 3
    },
    {
      q: "Quale di queste cose fa parte del curriculum di Alex?",
      a: ["Corso HACCP", "Certificazione di inglese", "Esperienza nella logistica", "Tutte le precedenti"],
      c: 3
    },
    {
      q: "Quale di queste attività ha fatto Alex come volontariato?",
      a: ["Croce Rossa", "Protezione Civile", "WWF", "Nessuna delle precedenti"],
      c: 0
    },
    {
      q: "Quale di queste cose è più probabile che Alex faccia quando ha un'idea per un regalo?",
      a: ["La realizza in cinque minuti", "La lascia perdere", "La trasforma in un progetto molto più grande del necessario", "Compra la prima cosa che trova"],
      c: 2
    },
    {
      q: "Quale di queste cose potrebbe far perdere completamente la cognizione del tempo ad Alex?",
      a: ["Fare un progetto creativo", "Entrare in un negozio di filati", "Avere un'idea per un regalo", "Tutte le precedenti"],
      c: 3
    },
    {
      q: "Quale di queste cose Alex NON potrebbe mai fare senza complicarla?",
      a: ["Preparare un regalo", "Organizzare una sorpresa", "Fare un semplice sito", "A quanto pare, nessuna delle tre"],
      c: 3
    }
  ];

  let ai = 0, ascore = 0, locked = false;

  function qs(id){ return document.getElementById(id); }

  function showScreen(id){
    document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
    const el = qs(id);
    if(el) el.classList.remove("hidden");
  }

  function renderAlexQuestion(){
    locked = false;
    const q = alexQuestions[ai];
    qs("alex-score").textContent = ascore;
    qs("alex-question").textContent = (ai+1) + "/7 — " + q.q;
    qs("alex-feedback").textContent = "";
    qs("alex-feedback").className = "";
    const box = qs("alex-answers");
    box.innerHTML = "";
    q.a.forEach((answer, i) => {
      const b = document.createElement("button");
      b.className = "choice-btn";
      b.textContent = answer;
      b.addEventListener("click", () => {
        if(locked) return;
        locked = true;
        box.querySelectorAll("button").forEach(x => x.disabled = true);
        const correct = i === q.c;
        if(correct) {
          ascore++;
          qs("alex-feedback").textContent = "✓ CORRETTO. +1";
          qs("alex-feedback").className = "correct";
        } else {
          qs("alex-feedback").textContent = "✗ ERRATO. +0";
          qs("alex-feedback").className = "wrong";
        }
        qs("alex-score").textContent = ascore;
        setTimeout(() => {
          ai++;
          if(ai < alexQuestions.length) renderAlexQuestion();
          else finishAlexTest();
        }, 900);
      });
      box.appendChild(b);
    });
  }

  function finishAlexTest(){
    qs("alex-question").textContent = "KNOWLEDGE TEST COMPLETE.";
    qs("alex-answers").innerHTML = "";
    qs("alex-feedback").className = "";
    qs("alex-feedback").innerHTML =
      "<div>FINAL SCORE: " + ascore + "/7</div>" +
      "<div style='margin-top:14px'>You know Alex.<br>...probably.</div>";
    setTimeout(startGlitch, 1800);
  }

  function startGlitch(){
    showScreen("post-glitch-screen");
    const lines = [
      "PROJECT M.A.R.C.O. COMPLETED.",
      "",
      "POST-PROCESSING...",
      "",
      "ERROR 404: MARCO NOT FOUND",
      "",
      "SEARCHING...",
      "",
      "MARCO FOUND.",
      "",
      "ERROR: SUBJECT IS BEING MARCO."
    ];
    let i = 0;
    const out = qs("glitch-text");
    out.textContent = "";
    function next(){
      if(i >= lines.length) return;
      out.textContent += (i ? "\n" : "") + lines[i++];
      setTimeout(next, lines[i-1] === "" ? 250 : 450);
    }
    next();
  }

  function tryHook(){
    // Find the existing letter screen and any button that advances from it.
    const letter = document.querySelector("#letter-screen, #letter, .letter-screen");
    if(!letter) return false;
    const buttons = letter.querySelectorAll("button");
    buttons.forEach(btn => {
      if(!btn.dataset.alexHooked){
        btn.dataset.alexHooked = "1";
        btn.addEventListener("click", function(){
          setTimeout(() => {
            const visible = [...document.querySelectorAll(".screen")].find(s => !s.classList.contains("hidden") && s !== qs("alex-test-screen"));
            // Only show the post-credit test if the current visible screen still looks like the letter.
            if(letter.classList.contains("hidden") === false){
              showScreen("alex-test-screen");
              renderAlexQuestion();
            }
          }, 50);
        }, {once:false});
      }
    });
    return true;
  }

  // Fallback: expose a function so existing transition code can call it.
  window.startAlexPostCredits = function(){ showScreen("alex-test-screen"); renderAlexQuestion(); };

  document.addEventListener("DOMContentLoaded", () => {
    tryHook();
    const close = qs("close-project-btn");
    if(close) close.addEventListener("click", () => {
      qs("glitch-text").textContent += "\n\nNOPE.";
      close.textContent = "CHIUDI PROGETTO (FORSE)";
      setTimeout(() => {
        close.disabled = true;
        close.textContent = "PROJECT STILL RUNNING.";
      }, 500);
    });
  });
})();
