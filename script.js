let current = null;
let clicks = 0;

function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const el=document.getElementById(id);
  if(el){el.classList.add('active'); current=id; window.scrollTo(0,0);}
}
function next(id){ show(id); }

function evidence(){ show('evidence'); }

function finale(){
  // Small dramatic pause before the truth screen.
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const temp=document.createElement('section');
  temp.className='screen active';
  temp.innerHTML='<div class="terminal center"><div class="warning">ANALYSIS COMPLETE</div><h2>...</h2><p style="color:#89a0aa">VALUE CANNOT BE CALCULATED.</p></div>';
  document.getElementById('app').appendChild(temp);
  setTimeout(()=>{
    temp.remove();
    show('truth');
  },1900);
}

// Secret trigger: deliberately subtle.
document.getElementById('secretTrigger').addEventListener('click',()=>show('puzzi'));

function dontPress(){
  clicks++;
  const msg=document.getElementById('dontmsg');
  const lines=[
    'Ti avevo detto di non premerlo.',
    'Marco.',
    'Questa è una pessima idea.',
    'ULTIMO AVVERTIMENTO.',
    '...ok.'
  ];
  msg.textContent=lines[Math.min(clicks-1,lines.length-1)];
  if(clicks>=5){
    setTimeout(()=>show('truth'),900);
  }
}
