let quizScore=0;
let answerLocked=false;
let clicks=0,gameScore=0,gameTimer=null;

function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const e=document.getElementById(id);
  if(e){e.classList.add('active');window.scrollTo(0,0);}
}
function updateQuizScore(){document.querySelectorAll('.quiz-score').forEach(e=>e.textContent=quizScore);}
function answerQuestion(correct,nextId){
  if(answerLocked)return;
  answerLocked=true;
  if(correct)quizScore++;
  updateQuizScore();
  const q=document.querySelector('.screen.active .quiz');
  if(q){
    const old=q.querySelector('.answer-feedback');if(old)old.remove();
    const box=document.createElement('div');box.className='answer-feedback '+(correct?'correct':'wrong');
    box.textContent=correct?'✓ CORRETTO. +1':'✗ ERRATO. +0';q.appendChild(box);
  }
  setTimeout(()=>{
    answerLocked=false;
    if(nextId==='evidence')show('evidence');
    else if(nextId==='finale')finishQuiz();
    else show(nextId);
  },900);
}
function finishQuiz(){
  const old=document.getElementById('quiz-result');if(old)old.remove();
  const t=document.createElement('section');t.className='screen active';t.id='quiz-result';
  t.innerHTML='<div class="terminal center"><div class="warning">ANALYSIS COMPLETE</div><h2>FINAL SCORE: '+quizScore+'/7</h2><p class="muted">VALUE CANNOT BE CALCULATED.</p></div>';
  document.getElementById('app').appendChild(t);
  setTimeout(()=>{t.remove();startGame();},1800);
}
function startGame(){
  show('game');gameScore=0;
  const gs=document.getElementById('game-score');if(gs)gs.textContent='0 / 5';
  const msg=document.getElementById('gameMsg');if(msg)msg.textContent='chill.';
  const arena=document.getElementById('arena');if(!arena)return;
  arena.innerHTML='';clearTimeout(gameTimer);spawnNode();
  gameTimer=setTimeout(()=>{
    if(gameScore<5){if(msg)msg.textContent='Marco.exe si è distratto.';setTimeout(()=>show('truth'),1200);}
  },15000);
}
function spawnNode(){
  const a=document.getElementById('arena');if(!a)return;
  const n=document.createElement('button');n.className='node';n.type='button';
  n.textContent=['M','A','R','C','O'][gameScore];
  n.style.left=Math.max(2,Math.random()*88)+'%';n.style.top=Math.max(4,Math.random()*82)+'%';
  n.onclick=()=>{
    if(n.disabled)return;n.disabled=true;gameScore++;
    const gs=document.getElementById('game-score');if(gs)gs.textContent=gameScore+' / 5';
    const msg=document.getElementById('gameMsg');if(msg)msg.textContent=['peffò.','chill.','sborro.','DATI RECUPERATI.','PROTOCOLLO SBLOCCATO.'][gameScore-1];
    n.remove();
    if(gameScore<5)spawnNode();else{clearTimeout(gameTimer);setTimeout(()=>show('truth'),900);}
  };
  a.appendChild(n);
}
function evidence(){show('evidence');}
function dontPress(){
  clicks++;const m=document.getElementById('dontmsg');
  const l=['Ti avevo detto di non premerlo.','Marco.','Questa è una pessima idea.','ULTIMO AVVERTIMENTO.','...ok.'];
  if(m)m.textContent=l[Math.min(clicks-1,l.length-1)];
  if(clicks>=5)setTimeout(()=>show('truth'),900);
}

const alexQuestions=[
 {q:'Qual è la classe di Alex?',a:['🧙 Mago','🛠️ Crafter','⚔️ Tank','🌀 Caos puro'],c:1},
 {q:'Alex ha ottenuto una nuova abilità passiva. Quale?',a:['🎲 "Improvisazione": riesce sempre a trovare un modo per complicare una situazione semplice','🧶 "Crafting Lv. 99": può trasformare qualsiasi idea in un progetto all’uncinetto','💀 "Overthinking": +50% danni quando pensa troppo a una cosa','🧩 "Multiclass": sblocca casualmente una nuova ossessione ogni 3–5 business days'],c:3},
 {q:'Quale di questi oggetti appartiene all’equipaggiamento di Alex?',a:['🗡️ Una spada +10','🃏 Un mazzo di Magic','🧶 Un uncinetto e una quantità sospetta di filato','🔮 Una Poké Ball'],c:2},
 {q:'Quale fazione ha reclutato Alex come volontariə?',a:['🟥 Croce Rossa','🟦 Team Rocket','🟩 Gilda dei Maghi','🟨 Confraternita dei Piccioni'],c:0},
 {q:'Alex riceve una quest secondaria chiamata: "Faccio solo una cosa veloce". Cosa succede?',a:['La completa in 5 minuti','La dimentica','La trasforma in un progetto molto più grande del necessario','Chiede aiuto a Marco'],c:2},
 {q:'Quale attività garantisce il maggior rischio di perdita della cognizione del tempo?',a:['🧶 Entra in un negozio di filati','🎨 Inizia un progetto creativo','🎁 Deve preparare un regalo','☠️ Tutte le precedenti'],c:3},
 {q:'BOSS FINALE — Alex ha ricevuto una quest: "crea un piccolo regalo per Marco". Qual è il risultato più probabile?',a:['Un biglietto','Una scatola di cioccolatini','Un piccolo sito','Un intero sistema operativo clandestino dedicato a Marco'],c:3}
];
let ai=0,ascore=0,alexLocked=false;
function startAlexTest(){ai=0;ascore=0;show('alex-test');renderAlex();}
function renderAlex(){
  alexLocked=false;const q=alexQuestions[ai];
  document.getElementById('alex-score').textContent=ascore;document.getElementById('alex-counter').textContent=String(ai+1).padStart(2,'0')+' / 07';document.getElementById('alex-question').textContent=q.q;
  const f=document.getElementById('alex-feedback');f.textContent='';f.className='';
  const box=document.getElementById('alex-answers');box.innerHTML='';
  q.a.forEach((txt,i)=>{const b=document.createElement('button');b.type='button';b.textContent=txt;b.onclick=()=>answerAlex(i);box.appendChild(b);});
}
function answerAlex(i){
  if(alexLocked)return;alexLocked=true;const q=alexQuestions[ai];const correct=i===q.c;if(correct)ascore++;
  document.querySelectorAll('#alex-answers button').forEach(b=>b.disabled=true);
  const f=document.getElementById('alex-feedback');f.textContent=correct?'✓ CORRETTO. +1':'✗ ERRATO. +0';if(correct && ai===1){f.innerHTML+=' <small style="display:block;margin-top:8px">PASSIVE ABILITY IDENTIFIED: MULTICLASS · Rarity: LEGENDARY</small>';}f.className=correct?'correct':'wrong';document.getElementById('alex-score').textContent=ascore;
  setTimeout(()=>{ai++;if(ai<7)renderAlex();else finishAlex();},900);
}
function finishAlex(){
  document.getElementById('alex-question').textContent='KNOWLEDGE TEST COMPLETE.';document.getElementById('alex-answers').innerHTML='';
  const f=document.getElementById('alex-feedback');f.className='';f.innerHTML='<strong>FINAL SCORE: '+ascore+'/7</strong><br><br>You know Alex.<br>...probably.';
  setTimeout(startGlitch,1800);
}
function startGlitch(){
  show('post-glitch');const out=document.getElementById('glitch-text');let i=0;
  const lines=['PROJECT M.A.R.C.O. COMPLETED.','','POST-PROCESSING...','','ERROR 404: MARCO NOT FOUND','','SEARCHING...','','MARCO FOUND.','','ERROR: SUBJECT IS BEING MARCO.'];
  out.textContent='';function next(){if(i>=lines.length)return;out.textContent+=(i?'\n':'')+lines[i++];setTimeout(next,420);}next();
}
document.getElementById('secretTrigger').addEventListener('click',()=>show('puzzi'));
document.getElementById('start-alex-test').addEventListener('click',startAlexTest);
document.getElementById('glitch-close').addEventListener('click',()=>{
  const b=document.getElementById('glitch-close');
  const out=document.getElementById('glitch-text');
  b.disabled=true;
  b.textContent='CONNESSIONE TERMINATA.';
  if(out){
    out.textContent += '\\n\\n> PROJECT M.A.R.C.O.\\n> STATUS: OFFLINE\\n> GRAZIE PER AVER PARTECIPATO.';
  }
});


