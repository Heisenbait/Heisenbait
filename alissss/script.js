// ====== CANCIONES: pon aquí tus archivos cuando los tengas ======
// Ejemplo: {name:'cancion1', src:'musica/cancion1.mp3'}
const SONGS=[{name:'cancion1',src:''},{name:'cancion2',src:''},{name:'cancion3',src:''},{name:'cancion4',src:''}];
const COINS_PER_SONG=40;
// ====== XOAQUIN ======
const ENEMY_EVERY=1*60*1000; // cada cuánto aparece (ms). Para probar: 10*1000
const ENEMY_STAY=30;         // segundos que se queda lanzando botellas
const MAX_HITS=5;            // botellas que te pueden caer antes de perder
// ================================================================
const cv=document.getElementById('c'),g=cv.getContext('2d');
const T=16,VW=15,VH=10;
const SEED=(Math.random()*1e9)|0; // cambia en cada partida
const hash=(x,y)=>((x*73856093)^(y*19349663))>>>0;
const K=(x,y)=>x*100003+y;
// ruido determinista por semilla
const hr=(x,y,s)=>{let h=(Math.imul(x,374761393)+Math.imul(y,668265263)+Math.imul(s+SEED,1274126177))|0;h=Math.imul(h^(h>>>13),1274126177);h^=h>>>16;return(h>>>0)/4294967296};
const vnoise=(x,y)=>{const x0=Math.floor(x),y0=Math.floor(y),fx=x-x0,fy=y-y0,u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy);
 const a=hr(x0,y0,9),b=hr(x0+1,y0,9),c=hr(x0,y0+1,9),d=hr(x0+1,y0+1,9);
 return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v};

// ====== MUNDO INFINITO ======
// Tiles: 0 pasto, 1 camino, 2 árbol, 3 agua, 4 flores
const path=new Set(),clear=new Set(),coins=new Set();
const DX=[1,0,-1,0],DY=[0,1,0,-1];
let hx=0,hy=0,hd=(Math.random()*4)|0,run=0,coinGap=3;
function carve(x,y){for(let j=-2;j<=2;j++)for(let i=-2;i<=2;i++){
 const k=K(x+i,y+j);if(Math.max(Math.abs(i),Math.abs(j))<=1)path.add(k);else clear.add(k)}}
// el camino avanza al azar: tramos rectos, giros a izq/der, pequeños zigzags
function stepPath(){
 if(run<=0){const r=Math.random();if(r<.4)hd=(hd+1)&3;else if(r<.8)hd=(hd+3)&3;run=4+(Math.random()*10|0)}
 hx+=DX[hd];hy+=DY[hd];run--;carve(hx,hy);
 if(Math.random()<.25){const d2=(hd+(Math.random()<.5?1:3))&3;hx+=DX[d2];hy+=DY[d2];carve(hx,hy)}
 if(--coinGap<=0){coinGap=8+(Math.random()*5|0);const o=(Math.random()*3|0)-1,p=(hd+1)&3;
  coins.add(K(hx+DX[p]*o,hy+DY[p]*o))}}
function ensureAhead(){let n=0;
 while(Math.max(Math.abs(hx-player.x),Math.abs(hy-player.y))<40&&n++<300)stepPath()}
function tileAt(x,y){const k=K(x,y);
 if(path.has(k))return 1;
 if(clear.has(k))return hr(x,y,1)<.08?4:0;
 if(vnoise(x/7,y/7)>.7)return 3;
 const r=hr(x,y,2);
 if(r<.3)return 2;
 if(r<.38)return 4;
 return 0}
const solid=(x,y)=>{const t=tileAt(x,y);return t===2||t===3};

carve(0,0);
const player={x:0,y:0,px:0,py:0,dir:'down',moving:false,tx:0,ty:0,step:0};
ensureAhead();

let total=0,unlocked=0,dialog=null,frame=0;
let enemy=null,bottles=[],hits=0,hitFlash=0,over=false,overAt=0,enemyTimer=0,lastT=performance.now();
const keys={};
const kmap={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right',W:'up',S:'down',A:'left',D:'right',z:'a',Z:'a',Enter:'a',' ':'a'};
addEventListener('keydown',e=>{const k=kmap[e.key];if(!k)return;e.preventDefault();if(k==='a'&&!keys.a)pressA();keys[k]=true});
addEventListener('keyup',e=>{const k=kmap[e.key];if(k)keys[k]=false});
document.querySelectorAll('.pad button').forEach(b=>{const k=b.dataset.k;
 b.addEventListener('contextmenu',e=>e.preventDefault());
 b.addEventListener('pointerdown',e=>{e.preventDefault();if(k==='a')pressA();keys[k]=true});
 ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>keys[k]=false))});
function say(text){dialog={text,shown:0}}
function pressA(){if(over){if(frame-overAt>60)location.reload();return}if(!dialog)return;if(dialog.shown<dialog.text.length)dialog.shown=dialog.text.length;else dialog=null}
function renderSongs(){const n=Math.max(SONGS.length,unlocked);let h='';
 for(let i=0;i<n;i++){const nm=SONGS[i]?SONGS[i].name:'cancion'+(i+1);h+=`<span class="${i<unlocked?'on':''}">${i<unlocked?'♪ '+nm:'🔒 '+nm}</span>`}
 document.getElementById('songs').innerHTML='<b>Reproduce las anciones:</b><br>'+h}
renderSongs();
function collect(){const k=K(player.x,player.y);
 if(coins.has(k)){coins.delete(k);total++;
  if(total%COINS_PER_SONG===0){unlocked++;const i=unlocked-1;const nm=SONGS[i]?SONGS[i].name:'cancion'+unlocked;
   say('Una canción que me recuerda a ti.\n'+nm);renderSongs();
   if(SONGS[i]&&SONGS[i].src){try{new Audio(SONGS[i].src).play()}catch(e){}}}}
 ensureAhead()}
function update(){frame++;
 if(over)return;
 if(dialog){if(dialog.shown<dialog.text.length&&frame%2===0)dialog.shown++;return}
 updateEnemy();
 if(over){overAt=frame;return}
 if(player.moving){const s=2;
  player.px+=Math.sign(player.tx-player.px)*s;player.py+=Math.sign(player.ty-player.py)*s;
  if(player.px===player.tx&&player.py===player.ty){player.moving=false;player.x=player.tx/T;player.y=player.ty/T;collect()}
  return}
 let d=keys.up?'up':keys.down?'down':keys.left?'left':keys.right?'right':null;
 if(!d)return;player.dir=d;
 const dx=d==='left'?-1:d==='right'?1:0,dy=d==='up'?-1:d==='down'?1:0;
 if(!solid(player.x+dx,player.y+dy)){player.moving=true;player.tx=(player.x+dx)*T;player.ty=(player.y+dy)*T;player.step++}}
function tile(t,x,y,sx,sy){const h=hash(x,y);
 g.fillStyle=t===1?'#d8c48a':'#78c850';g.fillRect(sx,sy,T,T);
 if(t===0||t===4){g.fillStyle='#5fb03c';if(h%3===0)g.fillRect(sx+3,sy+4,2,3),g.fillRect(sx+10,sy+11,2,3)}
 if(t===4){g.fillStyle=h%2?'#f8f8f8':'#f06080';g.fillRect(sx+4,sy+5,3,3);g.fillRect(sx+10,sy+10,3,3);g.fillStyle='#f8d030';g.fillRect(sx+5,sy+6,1,1);g.fillRect(sx+11,sy+11,1,1)}
 if(t===1&&h%4===0){g.fillStyle='#c0aa6c';g.fillRect(sx+4,sy+8,3,2)}
 if(t===2){g.fillStyle='#5a3a1c';g.fillRect(sx+6,sy+10,4,6);g.fillStyle='#206830';g.fillRect(sx+1,sy+1,14,11);g.fillStyle='#2f8c44';g.fillRect(sx+3,sy+2,6,4);g.fillStyle='#154a22';g.fillRect(sx+1,sy+10,14,2)}
 if(t===3){g.fillStyle='#3890f8';g.fillRect(sx,sy,T,T);g.fillStyle='#78b8f8';const o=(frame>>4)%2*3;g.fillRect(sx+2+o,sy+5,5,1);g.fillRect(sx+8-o,sy+11,5,1)}}
function drawPlayer(sx,sy){const f=player.moving&&(player.step%2)?1:0,y=sy-4,d=player.dir;
 const h='#6b3a1e',h2='#4a2610',sk='#f8c8a0',p='#f58cb4',p2='#d9638f';
 g.fillStyle='rgba(0,0,0,.25)';g.fillRect(sx+3,sy+13,10,3);
 // zapatos y vestido rosa
 g.fillStyle='#a03060';g.fillRect(sx+5+f,y+16,3,2);g.fillRect(sx+9-f,y+16,3,2);
 g.fillStyle=p;g.fillRect(sx+4,y+10,8,3);g.fillRect(sx+3,y+13,10,3);
 g.fillStyle=p2;g.fillRect(sx+3,y+15,10,1);g.fillRect(sx+7,y+10,2,1);
 // cabello largo
 g.fillStyle=h;
 if(d==='up'){g.fillRect(sx+3,y+1,10,13);g.fillStyle=h2;g.fillRect(sx+7,y+4,2,9)}
 else if(d==='down'){g.fillRect(sx+3,y+1,10,4);g.fillRect(sx+3,y+4,2,9);g.fillRect(sx+11,y+4,2,9)}
 else{g.fillRect(sx+3,y+1,10,4);g.fillRect(d==='left'?sx+8:sx+3,y+4,5,9)}
 // cara
 if(d!=='up'){g.fillStyle=sk;g.fillRect(sx+5,y+4,6,6);g.fillStyle='#202020';
  if(d==='down'){g.fillRect(sx+6,y+6,1,2);g.fillRect(sx+9,y+6,1,2);g.fillStyle='#f06080';g.fillRect(sx+7,y+8,2,1)}
  else g.fillRect(d==='left'?sx+5:sx+10,y+6,1,2);
  g.fillStyle=h;g.fillRect(sx+4,y+3,8,2)}
 // lazo rosa
 g.fillStyle=p;g.fillRect(d==='left'?sx+3:d==='up'?sx+7:sx+10,y+1,3,2)}
function box(x,y,w,h){g.fillStyle='#f8f8f8';g.fillRect(x,y,w,h);g.fillStyle='#303050';g.fillRect(x,y,w,1);g.fillRect(x,y+h-1,w,1);g.fillRect(x,y,1,h);g.fillRect(x+w-1,y,1,h);g.fillStyle='#e04040';g.fillRect(x+1,y+1,w-2,1);g.fillRect(x+1,y+h-2,w-2,1)}
function draw(){
 // la cámara siempre sigue al jugador (mundo sin bordes)
 const ox=Math.round(player.px+T/2-VW*T/2),oy=Math.round(player.py+T/2-VH*T/2);
 for(let y=Math.floor(oy/T);y<=Math.floor((oy+VH*T)/T);y++)for(let x=Math.floor(ox/T);x<=Math.floor((ox+VW*T)/T);x++){
  const sx=x*T-ox,sy=y*T-oy;tile(tileAt(x,y),x,y,sx,sy);
  if(coins.has(K(x,y))){const b=Math.sin(frame/8+x)*1.5;g.fillStyle='#a07800';g.fillRect(sx+5,sy+4+b,6,8);g.fillRect(sx+4,sy+5+b,8,6);
   g.fillStyle='#f8d030';g.fillRect(sx+5,sy+5+b,6,6);g.fillRect(sx+6,sy+4+b,4,8);g.fillStyle='#fff8a0';g.fillRect(sx+6,sy+6+b,1,3)}}
 const showP=!(hitFlash>0&&(hitFlash>>2)%2);
 if(enemy&&enemy.py<player.py){drawEnemy(enemy,Math.round(enemy.px)-ox,Math.round(enemy.py)-oy)}
 if(showP)drawPlayer(Math.round(player.px)-ox,Math.round(player.py)-oy);
 if(enemy&&enemy.py>=player.py){drawEnemy(enemy,Math.round(enemy.px)-ox,Math.round(enemy.py)-oy)}
 bottles.forEach(b=>drawBottle(Math.round(b.x-ox),Math.round(b.y-oy)));
 // HUD
 box(2,2,78,31);g.fillStyle='#202020';g.font='8px monospace';g.textBaseline='top';
 g.fillText('MONEDAS '+total,7,6);const nx=COINS_PER_SONG-(total%COINS_PER_SONG);g.fillText('SIG. ♪ en '+nx,7,15);
 g.fillStyle=hits>=MAX_HITS-1?'#e04040':'#202020';g.fillText('BOTELLAS '+hits+'/'+MAX_HITS,7,24);g.fillStyle='#202020';
 if(dialog){box(4,108,232,48);g.fillStyle='#202020';g.font='10px monospace';
  const t=dialog.text.slice(0,dialog.shown).split('\n');t.forEach((l,i)=>g.fillText(l,12,116+i*14));
  if(dialog.shown>=dialog.text.length&&frame%40<24){g.fillStyle='#e04040';g.fillRect(222,145,6,5)}}}
// ====== XOAQUIN: lógica ======
function nearSpot(){const c=[];
 for(let r=4;r<=6;r++)for(let i=0;i<16;i++){const a=i/16*Math.PI*2,x=player.x+Math.round(Math.cos(a)*r),y=player.y+Math.round(Math.sin(a)*r);if(!solid(x,y))c.push([x,y])}
 return c[(Math.random()*c.length)|0]||[player.x+4,player.y]}
function spawnEnemy(){const c=nearSpot();
 enemy={x:c[0],y:c[1],px:c[0]*T,py:c[1]*T,tx:c[0]*T,ty:c[1]*T,moving:false,dir:'down',step:0,life:ENEMY_STAY*60,cool:90};
 say('¡Xoaquin apareció!\n¡Esquiva sus botellas!')}
function updateEnemy(){
 if(enemy){const e=enemy,dx=player.px-e.px,dy=player.py-e.py;
  e.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down');
  if(e.moving){e.px+=Math.sign(e.tx-e.px)*2;e.py+=Math.sign(e.ty-e.py)*2;
   if(e.px===e.tx&&e.py===e.ty){e.moving=false;e.x=e.tx/T;e.y=e.ty/T}}
  else{const ddx=Math.round(dx/T),ddy=Math.round(dy/T),dist=Math.abs(ddx)+Math.abs(ddy);
   if(dist>18){const c=nearSpot();e.x=c[0];e.y=c[1];e.px=e.tx=c[0]*T;e.py=e.ty=c[1]*T}
   else if(dist>5){
    const o=Math.abs(ddx)>=Math.abs(ddy)?[[Math.sign(ddx),0],[0,Math.sign(ddy)]]:[[0,Math.sign(ddy)],[Math.sign(ddx),0]];
    for(const [mx,my] of o){if(!mx&&!my)continue;const nx=e.x+mx,ny=e.y+my;
     if(!solid(nx,ny)&&!(nx===player.x&&ny===player.y)){e.moving=true;e.tx=nx*T;e.ty=ny*T;e.step++;break}}}}
  if(--e.cool<=0){const d=Math.hypot(dx,dy);
   if(d>0&&d<T*11){const s=1.6;bottles.push({x:e.px+8,y:e.py+6,vx:dx/d*s,vy:dy/d*s,life:160})}
   e.cool=70+(Math.random()*50|0)}
  if(--e.life<=0){enemy=null;say('Xoaquin se fue...\n¡Pero volverá!')}}
 for(let i=bottles.length-1;i>=0;i--){const b=bottles[i];b.x+=b.vx;b.y+=b.vy;
  if(Math.abs(b.x-(player.px+8))<6&&Math.abs(b.y-(player.py+8))<7){bottles.splice(i,1);hits++;hitFlash=30;if(hits>=MAX_HITS)over=true;continue}
  if(--b.life<=0)bottles.splice(i,1)}
 if(hitFlash>0)hitFlash--}
function drawEnemy(e,sx,sy){const f=e.moving&&(e.step%2)?1:0,y=sy-4,d=e.dir;
 const h='#6b3a1e',sk='#f8c8a0',g1='#1f4d2b',g2='#14361e';
 g.fillStyle='rgba(0,0,0,.25)';g.fillRect(sx+3,sy+13,10,3);
 // zapatos y pantalón verde oscuro
 g.fillStyle='#0c2214';g.fillRect(sx+5+f,y+16,3,2);g.fillRect(sx+9-f,y+16,3,2);
 g.fillStyle=g2;g.fillRect(sx+5,y+14,3,2);g.fillRect(sx+8,y+14,3,2);
 // camiseta verde oscuro y brazos
 g.fillStyle=g1;g.fillRect(sx+4,y+10,8,4);g.fillStyle=g2;g.fillRect(sx+3,y+10,1,4);g.fillRect(sx+12,y+10,1,4);
 // cabeza y pelo corto
 g.fillStyle=sk;g.fillRect(sx+5,y+4,6,6);
 g.fillStyle=h;
 if(d==='up'){g.fillRect(sx+4,y+1,8,9)}
 else{g.fillRect(sx+4,y+1,8,3);g.fillRect(sx+4,y+3,1,3);g.fillRect(sx+11,y+3,1,3);
  if(d==='left')g.fillRect(sx+10,y+3,2,5);if(d==='right')g.fillRect(sx+4,y+3,2,5);
  g.fillStyle='#202020';
  if(d==='down'){g.fillRect(sx+6,y+6,1,2);g.fillRect(sx+9,y+6,1,2);g.fillStyle='#b05040';g.fillRect(sx+7,y+8,2,1)}
  else g.fillRect(d==='left'?sx+5:sx+10,y+6,1,2)}
 // nombre
 g.font='6px monospace';g.textBaseline='top';g.fillStyle='#000';g.fillText('Xoaquin',sx-5,sy-14);g.fillStyle='#fff';g.fillText('Xoaquin',sx-6,sy-15)}
function drawBottle(x,y){const s=(frame>>2)%2;
 if(s){g.fillStyle='#2e9a55';g.fillRect(x-3,y-1,5,3);g.fillStyle='#bfe8c8';g.fillRect(x+2,y,3,1);g.fillStyle='#a06a30';g.fillRect(x+5,y,1,1)}
 else{g.fillStyle='#2e9a55';g.fillRect(x-1,y-2,3,5);g.fillStyle='#bfe8c8';g.fillRect(x,y-4,1,3);g.fillStyle='#a06a30';g.fillRect(x,y-5,1,1)}}
function drawOver(){box(20,46,200,66);g.fillStyle='#e04040';g.font='12px monospace';g.textBaseline='top';
 g.fillText('¡PERDISTE!',80,54);g.fillStyle='#202020';g.font='9px monospace';
 g.fillText('Xoaquin te dio '+MAX_HITS+' botellazos',34,72);g.fillText('Monedas: '+total,34,84);
 if(frame-overAt>60)g.fillText('Pulsa A para reiniciar',34,97)}
function loop(){const n=performance.now(),dt=Math.min(n-lastT,100);lastT=n;
 if(!over&&!dialog){enemyTimer+=dt;if(enemyTimer>=ENEMY_EVERY){enemyTimer=0;if(!enemy)spawnEnemy()}}
 update();draw();if(over)drawOver();requestAnimationFrame(loop)}
loop();

// ====== CONTADOR DESDE EL 19 DE MAYO DE 2018 ======
const START=new Date(2018,4,19,0,0,0);
const pl=(n,u,p)=>n+' '+(n===1?u:p);
function tickSince(){const n=new Date();
 let y=n.getFullYear()-START.getFullYear(),mo=n.getMonth()-START.getMonth(),d=n.getDate()-START.getDate(),
     h=n.getHours()-START.getHours(),mi=n.getMinutes()-START.getMinutes(),s=n.getSeconds()-START.getSeconds();
 if(s<0){s+=60;mi--}
 if(mi<0){mi+=60;h--}
 if(h<0){h+=24;d--}
 if(d<0){d+=new Date(n.getFullYear(),n.getMonth(),0).getDate();mo--}
 if(mo<0){mo+=12;y--}
 document.getElementById('since').textContent=[pl(y,'año','años'),pl(mo,'mes','meses'),pl(d,'día','días'),pl(h,'hora','horas'),pl(mi,'minuto','minutos'),pl(s,'segundo','segundos')].join(', ')}
tickSince();setInterval(tickSince,1000);
