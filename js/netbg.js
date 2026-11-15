/* Svalin network backgrounds: <svalin-net v="1..10" tone="light|dark"> */
(function(){
if(customElements.get('svalin-net'))return;
const OR='#e9a23b',W=1600,H=900;
const rng=seed=>{let s=(seed*2654435761)>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};};
const f=n=>n.toFixed(1);
function build(v,dark,tile=0){
  const r=rng(v*977+13+tile*7919),mo=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  const L=dark?'rgba(255,255,255,.10)':'var(--line2,rgba(0,0,0,.14))';
  const N=dark?'rgba(255,255,255,.32)':'var(--faint,rgba(0,0,0,.35))';
  const BG=dark?'#0a0b0c':'var(--bg,#fff)';
  let o='';
  const ln=(a,b,c,d,s=L,w=1,da='')=>o+=`<line x1="${f(a)}" y1="${f(b)}" x2="${f(c)}" y2="${f(d)}" stroke="${s}" stroke-width="${w}"${da?` stroke-dasharray="${da}"`:''}/>`;
  const pt=(x,y,rr=2.2,fill=N)=>o+=`<circle cx="${f(x)}" cy="${f(y)}" r="${rr}" fill="${fill}"/>`;
  const ring=(x,y,rr,s=L,da='')=>o+=`<circle cx="${f(x)}" cy="${f(y)}" r="${rr}" fill="none" stroke="${s}"${da?` stroke-dasharray="${da}"`:''}/>`;
  const pa=(d,s=L,w=1,da='')=>o+=`<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}"${da?` stroke-dasharray="${da}"`:''}/>`;
  const xm=(x,y,s=4,c=N)=>pa(`M${f(x-s)} ${f(y-s)}L${f(x+s)} ${f(y+s)}M${f(x+s)} ${f(y-s)}L${f(x-s)} ${f(y+s)}`,c,1.2);
  const dot=(d,dur,beg=0,rr=3.5)=>{if(mo)o+=`<circle r="${rr}" fill="${OR}" opacity="0"><animateMotion dur="${dur}s" begin="${beg}s" repeatCount="indefinite" path="${d}"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.08;.9;1" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/></circle>`;};
  const pulse=(x,y,r0,r1)=>{ring(x,y,r0,OR);if(mo)o+=`<circle cx="${f(x)}" cy="${f(y)}" r="${r0}" fill="none" stroke="${OR}"><animate attributeName="r" values="${r0};${r1}" dur="2.8s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="2.8s" repeatCount="indefinite"/></circle>`;};
  let mask='linear-gradient(90deg,transparent,#000 60%)';
  if(v===1){ // approach vectors converging on an asset
    const T=[1290,700];[22,46,80].forEach((q,i)=>ring(T[0],T[1],q,i?L:OR,i?'3 5':''));
    o+=`<rect x="${T[0]-7}" y="${T[1]-7}" width="14" height="14" fill="${BG}" stroke="${OR}" stroke-width="1.4" transform="rotate(45 ${T[0]} ${T[1]})"/>`;
    for(let i=0;i<10;i++){const sx=600+r()*1000,sy=-20,cx=sx+(r()-.5)*500,cy=300+r()*200,end=.55+r()*.3;
      const ex=sx+(T[0]-sx)*1,ey=T[1];const d=`M${f(sx)} ${sy} Q${f(cx)} ${f(cy)} ${ex} ${ey}`;
      const lead=i===4;const qx=(t)=>(1-t)*(1-t)*sx+2*(1-t)*t*cx+t*t*ex,qy=(t)=>(1-t)*(1-t)*sy+2*(1-t)*t*cy+t*t*ey;
      if(lead){pa(d,OR,1.4,'6 4');dot(d,7);}else{const seg=`M${f(sx)} ${sy} Q${f(qx(end/2)*0+cx*end+sx*(1-end))} ${f(cy*end+sy*(1-end))} ${f(qx(end))} ${f(qy(end))}`;pa(seg,L,1,'3 5');xm(qx(end),qy(end));}
      for(let k=1;k<4;k++){const t=k*.2;if(!lead&&t>end)break;pt(qx(t),qy(t),lead?2.6:2,lead?OR:N);}}
    mask='linear-gradient(90deg,transparent 30%,#000 75%)';
  }
  if(v===2){ // mesh network with highlighted route
    const P=[];for(let i=0;i<44;i++)P.push([200+r()*1400,40+r()*820]);
    const E=new Set();P.forEach((p,i)=>{P.map((q,j)=>[j,(p[0]-q[0])**2+(p[1]-q[1])**2]).sort((a,b)=>a[1]-b[1]).slice(1,4).forEach(([j])=>{const k=i<j?i+'-'+j:j+'-'+i;if(!E.has(k)){E.add(k);ln(p[0],p[1],P[j][0],P[j][1]);}});});
    let cur=P.reduce((a,b)=>a[0]<b[0]?a:b),route=[cur],used=new Set([cur]);
    for(let s=0;s<6;s++){const nx=P.filter(q=>!used.has(q)&&q[0]>cur[0]).sort((a,b)=>((a[0]-cur[0])**2+(a[1]-cur[1])**2)-((b[0]-cur[0])**2+(b[1]-cur[1])**2))[0];if(!nx)break;route.push(nx);used.add(nx);cur=nx;}
    const d='M'+route.map(p=>f(p[0])+' '+f(p[1])).join('L');pa(d,OR,1.5);dot(d,8);
    P.forEach(p=>route.includes(p)?(pt(p[0],p[1],3.4,OR)):r()<.25?ring(p[0],p[1],4.5,N):pt(p[0],p[1]));
    mask='linear-gradient(100deg,transparent 15%,#000 55%)';
  }
  if(v===3){ // swarm flock along a curve
    const B=t=>{const u=1-t;return[u*u*u*-50+3*u*u*t*500+3*u*t*t*1100+t*t*t*1650,u*u*u*820+3*u*u*t*900+3*u*t*t*200+t*t*t*380];};
    const d=`M-50 820 C500 900 1100 200 1650 380`;pa(d,L,1,'2 6');
    for(let i=0;i<46;i++){const t=.25+r()*.5,p=B(t),q=B(t+.01),a=Math.atan2(q[1]-p[1],q[0]-p[0]),nx=-Math.sin(a),ny=Math.cos(a),off=(r()+r()+r()-1.5)*120,x=p[0]+nx*off,y=p[1]+ny*off;
      o+=`<path d="M6 0L-4 -3.5L-2 0L-4 3.5Z" fill="${N}" transform="translate(${f(x)} ${f(y)}) rotate(${f(a*57.3)})"/>`;if(i%5===0)ln(x,y,x-Math.cos(a)*60,y-Math.sin(a)*60,L,1,'1 3');}
    const p=B(.8),q=B(.81),a=Math.atan2(q[1]-p[1],q[0]-p[0]);o+=`<path d="M9 0L-6 -5L-3 0L-6 5Z" fill="${OR}" transform="translate(${f(p[0])} ${f(p[1])}) rotate(${f(a*57.3)})"/>`;pulse(p[0],p[1],14,34);
    dot(d,11,0,3);mask='radial-gradient(ellipse 70% 90% at 70% 60%,#000 30%,transparent 80%)';
  }
  if(v===4){ // constellation chains
    const pts=[];for(let c=0;c<6;c++){let x=r()*W,y=r()*H,prev=null;for(let k=0;k<5;k++){x+=(r()-.3)*220;y+=(r()-.5)*180;if(prev)ln(prev[0],prev[1],x,y,L,1,k%2?'':'4 4');pts.push([x,y]);prev=[x,y];}}
    pts.forEach((p,i)=>i%7===0?ring(p[0],p[1],5,N):pt(p[0],p[1]));
    const a=pts[8];pt(a[0],a[1],3.6,OR);pulse(a[0],a[1],8,30);
    for(let i=0;i<3;i++)ln(a[0],a[1],pts[(i*11+3)%pts.length][0],pts[(i*11+3)%pts.length][1],OR,1,'2 4');
    mask='linear-gradient(180deg,#000 0%,rgba(0,0,0,.6) 50%,#000 100%)';
  }
  if(v===5){ // patrol orbits
    const C=[1320,720];[[420,170,-18],[300,120,12],[180,70,-6]].forEach(([a,b,rot],i)=>{const d=`M${C[0]-a} ${C[1]} a${a} ${b} 0 1 0 ${2*a} 0 a${a} ${b} 0 1 0 ${-2*a} 0`;o+=`<g transform="rotate(${rot} ${C[0]} ${C[1]})">`;pa(d,L,1,i===1?'':'3 6');
      for(let k=0;k<5;k++){const t=r()*6.283;pt(C[0]+a*Math.cos(t),C[1]+b*Math.sin(t),i===1?2.6:2);}if(i===0)dot(d,14,0,3.4);if(i===2)dot(d,8,1,3);o+='</g>';});
    for(let k=0;k<8;k++){const t=-2.4+k*.22;ln(C[0],C[1],C[0]+700*Math.cos(t),C[1]+700*Math.sin(t),L,1,'1 6');}
    o+=`<rect x="${C[0]-6}" y="${C[1]-6}" width="12" height="12" fill="${BG}" stroke="${OR}" stroke-width="1.4"/>`;
    mask='radial-gradient(ellipse 60% 80% at 82% 80%,#000 35%,transparent 85%)';
  }
  if(v===6){ // threat corridors
    for(let i=0;i<6;i++){const y0=120+i*125,ph=r()*6,amp=30+r()*40;let d='';for(let x=-20;x<=W+20;x+=40)d+=(x<0?'M':'L')+x+' '+f(y0+Math.sin(x/260+ph)*amp);
      pa(d,L,1,i%2?'2 6':'');if(i===2){for(let x=0;x<=W;x+=40){const y=y0+Math.sin(x/260+ph)*amp;ln(x,y-5,x,y+5);}}
      if(i===1||i===4){pa(d,OR,1,'1 9');dot(d,12+i,i*.7,3.2);dot(d,12+i,i*.7+5,2.6);}
      for(let k=0;k<3;k++){const x=200+r()*1200;xm(x,y0+Math.sin(x/260+ph)*amp,4);}}
    mask='linear-gradient(90deg,#000,rgba(0,0,0,.25) 50%,#000)';
  }
  if(v===7){ // hub & spokes from a corner
    const Hc=[1450,820];let prev=[Hc];[230,420,620,820].forEach((R,ri)=>{const ring_=[];const n=5+ri*3;for(let k=0;k<n;k++){const t=Math.PI+.15+(k+r()*.6)/(n)*1.35;const p=[Hc[0]+R*Math.cos(t),Hc[1]+R*Math.sin(t)];const q=prev.reduce((a,b)=>((a[0]-p[0])**2+(a[1]-p[1])**2)<((b[0]-p[0])**2+(b[1]-p[1])**2)?a:b);ln(q[0],q[1],p[0],p[1]);ring_.push(p);}ring(Hc[0],Hc[1],R,L,'2 8');ring_.forEach(p=>pt(p[0],p[1],ri?2:2.8));prev=ring_;});
    let d=`M${Hc[0]} ${Hc[1]}`;[[1250,700],[1060,540],[880,470],[690,330]].forEach(p=>{d+=`L${p[0]} ${p[1]}`;pt(p[0],p[1],3,OR);});pa(d,OR,1.3);dot(d,6);
    pt(Hc[0],Hc[1],5,OR);pulse(Hc[0],Hc[1],10,40);
    mask='radial-gradient(ellipse 80% 100% at 95% 95%,#000 30%,transparent 85%)';
  }
  if(v===8){ // topographic contours + route
    for(let i=0;i<11;i++){const y0=80+i*80,ph=i*.45;let d='';for(let x=-20;x<=W+20;x+=32)d+=(x<0?'M':'L')+x+' '+f(y0+Math.sin(x/180+ph)*26+Math.sin(x/70+i)*8);pa(d,L,1,i%3===0?'':'1 4');}
    const R=[[120,760],[380,640],[560,690],[820,520],[1040,560],[1260,380],[1480,300]];let d='M'+R.map(p=>p.join(' ')).join('L');pa(d,N,1,'6 5');
    R.forEach((p,i)=>{if(i<R.length-1)o+=`<rect x="${p[0]-4}" y="${p[1]-4}" width="8" height="8" fill="${BG}" stroke="${i>=4?OR:N}" stroke-width="1.2"/>`;});
    pa('M'+R.slice(4).map(p=>p.join(' ')).join('L'),OR,1.4);const e=R[R.length-1];o+=`<rect x="${e[0]-7}" y="${e[1]-7}" width="14" height="14" fill="${BG}" stroke="${OR}" stroke-width="1.4" transform="rotate(45 ${e[0]} ${e[1]})"/>`;dot(d,10);
    mask='linear-gradient(90deg,transparent 35%,#000 80%)';
  }
  if(v===9){ // hex lattice cluster
    const S=64,C=[1180,420],cells=[];for(let row=-1;row<H/(S*.866)+1;row++)for(let col=-1;col<W/S+1;col++){const x=col*S+(row%2?S/2:0),y=row*S*.866;const dd=Math.hypot(x-C[0],y-C[1]);if(r()<Math.max(0,1-dd/900))cells.push([x,y,dd]);}
    const near=(a,b)=>Math.abs(Math.hypot(a[0]-b[0],a[1]-b[1])-S)<2;
    cells.forEach((a,i)=>cells.slice(i+1).forEach(b=>{if(near(a,b)&&r()<.55){const hot=a[2]<150&&b[2]<150;ln(a[0],a[1],b[0],b[1],hot?OR:L,hot?1.3:1);}}));
    cells.forEach(c=>c[2]<150?pt(c[0],c[1],3.2,OR):pt(c[0],c[1],r()<.1?3:1.8));pulse(C[0],C[1],18,70);
    mask='radial-gradient(ellipse 60% 75% at 74% 47%,#000 25%,transparent 80%)';
  }
  if(v===10){ // long flight paths with pins
    for(let i=0;i<7;i++){const y0=H+40-r()*200,y1=-40+r()*350,x0=-40+r()*500,c1=[400+r()*500,y0-200-r()*300],c2=[900+r()*400,y1+300*r()],x1=W+40;
      const d=`M${f(x0)} ${f(y0)} C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${x1} ${f(y1)}`;const lead=i===3;
      pa(d,lead?OR:L,lead?1.4:1,lead?'':(i%2?'4 6':''));if(lead)dot(d,9);
      const bz=t=>{const u=1-t;return[u*u*u*x0+3*u*u*t*c1[0]+3*u*t*t*c2[0]+t*t*t*x1,u*u*u*y0+3*u*u*t*c1[1]+3*u*t*t*c2[1]+t*t*t*y1];};
      [.3,.55,.78].forEach(t=>{const p=bz(t);ln(p[0],p[1],p[0],p[1]-18,lead?OR:L);pt(p[0],p[1]-18,lead?3:2.2,lead?OR:N);});}
    mask='linear-gradient(0deg,#000 0%,rgba(0,0,0,.35) 60%,transparent 100%)';
  }
  if(v===11){ // orthogonal circuit traces with signal pulses
    const G=40,lanes=[];for(let i=0;i<16;i++){let x=Math.round(r()*W/G)*G,y=Math.round(r()*H/G)*G,d='M'+x+' '+y;const pts=[[x,y]];for(let k=0;k<5;k++){if(k%2){y+=Math.round((r()-.5)*8)*G;}else{x+=Math.round((r()*.8+.2)*7)*G*(r()<.5?-1:1);}d+='L'+x+' '+y;pts.push([x,y]);}lanes.push([d,pts]);}
    lanes.forEach(([d,pts],i)=>{const hot=i%5===0;pa(d,hot?OR:L,hot?1.3:1,hot?'':(i%3?'':'2 5'));pts.forEach((p,k)=>{if(k===0||k===pts.length-1)o+=`<rect x="${p[0]-4}" y="${p[1]-4}" width="8" height="8" fill="${BG}" stroke="${hot?OR:N}" stroke-width="1.2"/>`;else pt(p[0],p[1],1.8,hot?OR:N);});if(hot){dot(d,6+i%4,i*.4,3);}});
    for(let i=0;i<5;i++){const x=200+r()*1200,y=100+r()*700;o+=`<rect x="${f(x-26)}" y="${f(y-16)}" width="52" height="32" fill="${BG}" stroke="${N}" stroke-width="1"/>`;for(let k=0;k<4;k++){ln(x-18+k*12,y-16,x-18+k*12,y-24);ln(x-18+k*12,y+16,x-18+k*12,y+24);}}
    mask='linear-gradient(90deg,#000,rgba(0,0,0,.2) 45%,rgba(0,0,0,.2) 55%,#000)';
  }
  if(v===12){ // restricted airspace zones with hatching, route threading between them
    const Z=[[1120,260,150],[1420,600,120],[860,640,95],[1500,170,70]];
    o+='<defs><pattern id="nh12" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="9" stroke="'+(dark?'rgba(255,255,255,.08)':'rgba(0,0,0,.07)')+'" stroke-width="1.2"/></pattern></defs>';
    Z.forEach(([x,y,R],i)=>{o+=`<circle cx="${x}" cy="${y}" r="${R}" fill="url(#nh12)"/>`;ring(x,y,R,i===0?OR:N,'6 5');ring(x,y,R+16,L,'1 5');
      o+=`<text x="${x}" y="${y-R-24}" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="12" letter-spacing="2" fill="${i===0?OR:N}">R-${String(i+1).padStart(2,'0')}</text>`;});
    const d='M560 860 C700 760 760 520 980 470 S1290 420 1300 400 S1280 760 1600 780';pa(d,OR,1.4,'7 5');dot(d,9);
    [[560,860],[980,470],[1300,400]].forEach(p=>o+=`<rect x="${p[0]-5}" y="${p[1]-5}" width="10" height="10" fill="${BG}" stroke="${OR}" stroke-width="1.3" transform="rotate(45 ${p[0]} ${p[1]})"/>`);
    for(let i=0;i<26;i++){const x=600+r()*1000,y=r()*H;if(Z.some(([a,b,R])=>Math.hypot(x-a,y-b)<R+20))continue;pt(x,y,1.8);}
    for(let k=0;k<4;k++){const x=640+k*240;ln(x,0,x,H,L,1,'1 7');}
    mask='linear-gradient(90deg,transparent 30%,#000 75%)';
  }
  return {o,mask};
}
class SvalinNet extends HTMLElement{
  connectedCallback(){if(this._sh)return;const dark=this.getAttribute('tone')==='dark';const sh=this.attachShadow({mode:'open'});sh.innerHTML=`<style>:host{position:absolute;inset:0;z-index:-1;display:block;pointer-events:none;overflow:hidden;opacity:${dark?1:.9}}svg{display:block;overflow:visible}</style><div></div>`;this._sh=sh.querySelector('div');this._render();
    this._ro=new ResizeObserver(()=>{clearTimeout(this._t);this._t=setTimeout(()=>this._render(),150);});this._ro.observe(this);}
  disconnectedCallback(){if(this._ro)this._ro.disconnect();}
  _render(){const b=this.getBoundingClientRect(),w=Math.round(b.width),h=Math.round(b.height);if(!w||!h)return;
    const key=w+'x'+h;if(key===this._k)return;this._k=key;
    const v=+this.getAttribute('v')||1,dark=this.getAttribute('tone')==='dark';
    const sc=Math.min(1,Math.max(.5,w/1600)),tw=W*sc,th=H*sc,n=Math.max(1,Math.ceil(h/th-.15)),step=n>1?(h-th)/(n-1):0,left=(w-tw)/2;
    let html='';for(let i=0;i<n;i++){const {o,mask}=build(v,dark,i);const top=n>1?i*step:(h-th)/2;
      html+=`<svg viewBox="0 0 ${W} ${H}" width="${tw}" height="${th}" style="position:absolute;left:${left}px;top:${top}px;-webkit-mask-image:${mask};mask-image:${mask};${i%2?'transform:scaleX(-1)':''}" aria-hidden="true">${o}</svg>`;}
    this._sh.innerHTML=html;}
}
customElements.define('svalin-net',SvalinNet);
})();
