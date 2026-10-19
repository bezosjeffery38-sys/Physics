function solve(){
  const q=document.getElementById('q').value;
  const ans=document.getElementById('ans');
  if(!q.trim())return alert('Paste a question, Kanra!');
  ans.style.display='block';
  ans.textContent='Solving...';
  setTimeout(()=>{
    ans.textContent=`Physics AI by Kanra — Solution

Question: ${q}

STEP 1: List knowns & unknowns
STEP 2: Choose formula: F=ma, v=u+at, s=ut+½at²
STEP 3: Substitute
STEP 4: Answer with units

For: "${q}"
→ Formula: Identify from question
→ Work: Show substitution
→ Final: Box your answer + unit

WASSCE TIP: Always write formula first!`;
  },800);
}
// GAME
const canvas=document.getElementById('c');
function draw(){
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const ang=document.getElementById('ang').value;
  const vel=document.getElementById('vel').value;
  document.getElementById('angV').textContent=ang;
  document.getElementById('velV').textContent=vel;
  ctx.clearRect(0,0,500,300);
  ctx.fillStyle='#111';ctx.fillRect(0,260,500,40);
  ctx.fillStyle='#00ff88';ctx.fillRect(450,220,20,40);
}
function shoot(){
  const ctx=canvas.getContext('2d');
  const ang=+document.getElementById('ang').value;
  const vel=+document.getElementById('vel').value;
  const g=9.8, rad=ang*Math.PI/180, vx=vel*Math.cos(rad), vy=vel*Math.sin(rad);
  let x=20,y=250,t=0,hit=false;
  ctx.clearRect(0,0,500,300); draw();
  ctx.strokeStyle='#00aaff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y);
  for(let i=0;i<500;i++){t+=0.05;x=20+vx*t*5;y=250-(vy*t-0.5*g*t*t)*5;if(y>260)break;ctx.lineTo(x,y);if(x>=450&&x<=470&&y>=220)hit=true;}
  ctx.stroke();ctx.fillStyle=hit?'#00ff88':'#ff4444';ctx.beginPath();ctx.arc(x,y,6,0,Math.PI*2);ctx.fill();
  document.getElementById('msg').textContent=hit?`🎯 HIT! Range = ${(vx*2*vy/g).toFixed(1)}m`:`Miss! Try 45° for max range`;
}
draw();
