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
  setTimeout(()=>{box.remove();answerLocked=false;
    if(action.startsWith('evidence')) evidence();
    else if(action.startsWith('next')) show(action.match(/'([^']+)'/)[1]);
    else if(action.startsWith('finale')) finale();
  },1000);
}
function next(id){show(id)}
function evidence(){show('evidence')}
function finale(){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));const t=document.createElement('section');t.className='screen active';t.innerHTML='<div class="terminal center"><div class="warning">ANALYSIS COMPLETE</div><h2>FINAL SCORE: '+quizScore+'/7</h2><p class="muted">VALUE CANNOT BE CALCULATED.</p></div>';document.getElementById('app').appendChild(t);setTimeout(()=>{t.remove();startGame()},1800)}
function startGame(){show('game');gameScore=0;const gs=document.getElementById('game-score');if(gs)gs.textContent='0 / 5';document.getElementById('gameMsg').textContent='chill.';const a=document.getElementById('arena');a.innerHTML='';clearTimeout(gameTimer);spawnNode();gameTimer=setTimeout(()=>{if(gameScore<5){document.getElementById('gameMsg').textContent='Marco.exe si è distratto.';setTimeout(()=>show('truth'),1200)}},15000)}
function spawnNode(){const a=document.getElementById('arena'),n=document.createElement('button');n.className='node';n.type='button';n.textContent=['M','A','R','C','O'][gameScore];n.style.left=Math.max(2,Math.random()*88)+'%';n.style.top=Math.max(4,Math.random()*82)+'%';n.onclick=()=>{gameScore++;const gs=document.getElementById('game-score');if(gs)gs.textContent=gameScore+' / 5';document.getElementById('gameMsg').textContent=['peffò.','chill.','sborro.','DATI RECUPERATI.','PROTOCOLLO SBLOCCATO.'][Math.min(gameScore-1,4)];n.remove();if(gameScore<5)spawnNode();else{clearTimeout(gameTimer);setTimeout(()=>show('truth'),900)}};a.appendChild(n)}
document.getElementById('secretTrigger').addEventListener('click',()=>show('puzzi'));
function dontPress(){clicks++;const m=document.getElementById('dontmsg'),l=['Ti avevo detto di non premerlo.','Marco.','Questa è una pessima idea.','ULTIMO AVVERTIMENTO.','...ok.'];m.textContent=l[Math.min(clicks-1,l.length-1)];if(clicks>=5)setTimeout(()=>show('truth'),900)}
