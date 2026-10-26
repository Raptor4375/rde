
/* ================= Transition « le souvenir brûle » : version fluide (canvas) ================= */
/* Avant : un masque CSS animé sur tout l'écran + des SVG filtrés = repeint complet à chaque image (lag sur téléphone).
   Maintenant : les deux images sont préparées une seule fois, puis un canvas dessine le trou qui brûle. */
function rbImg(svg){return new Promise(res=>{try{let s=svgStill(svg);if(!/xmlns=/.test(s))s=s.replace('<svg','<svg xmlns="http://www.w3.org/2000/svg"');
  const vb=(s.match(/viewBox="([^"]+)"/)||[])[1];let w=200,h=260;if(vb){const p=vb.split(/[ ,]+/).map(Number);w=p[2]||w;h=p[3]||h}
  s=s.replace(/<svg([^>]*?)\swidth="[^"]*"/,'<svg$1').replace(/<svg([^>]*?)\sheight="[^"]*"/,'<svg$1').replace('<svg',`<svg width="${w*3}" height="${h*3}"`);
  const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s)}catch(e){res(null)}})}
function rbLayers(W,H,dpr,king,young){const mk=()=>{const c=document.createElement('canvas');c.width=W*dpr;c.height=H*dpr;const x=c.getContext('2d');x.scale(dpr,dpr);return[c,x]};
  const fw=Math.min(W*.78,360);const place=im=>{if(!im)return null;const h=fw*im.height/im.width;return[(W-fw)/2,H*.94-h,fw,h]};
  /* présent : ciel de braises + le Roi */
  const[nc,nx]=mk();let g=nx.createRadialGradient(W/2,H*.35,0,W/2,H*.35,Math.max(W,H)*.8);g.addColorStop(0,'#ff7a2a');g.addColorStop(.3,'#7a2a0a');g.addColorStop(.62,'#1a0604');g.addColorStop(1,'#050202');nx.fillStyle=g;nx.fillRect(0,0,W,H);
  const pk=place(king);if(pk){nx.save();nx.shadowColor='#ff6a1a';nx.shadowBlur=30;nx.drawImage(king,...pk);nx.restore()}
  /* passé : vieux papier + le jeune Éryndel en sépia + la légende */
  const[pc,px]=mk();g=px.createRadialGradient(W/2,H*.4,0,W/2,H*.4,Math.max(W,H)*.75);g.addColorStop(0,'#f4e8c8');g.addColorStop(.6,'#c8b48a');g.addColorStop(1,'#6a5634');px.fillStyle=g;px.fillRect(0,0,W,H);
  const py=place(young);if(py){const[t,tx]=mk();tx.drawImage(young,...py);try{const d=tx.getImageData(0,0,t.width,t.height),a=d.data;for(let i=0;i<a.length;i+=4){if(!a[i+3])continue;const l=a[i]*.3+a[i+1]*.59+a[i+2]*.11;a[i]=Math.min(255,l*1.07+18);a[i+1]=Math.min(255,l*.93+8);a[i+2]=Math.min(255,l*.72)}tx.putImageData(d,0,0)}catch(e){}
    px.save();px.setTransform(1,0,0,1,0,0);px.drawImage(t,0,0);px.restore()}
  px.font='italic 30px Georgia,serif';px.textAlign='center';px.fillStyle='#fff6dc';px.fillText('Il y a mille ans…',W/2,H*.12+31);px.fillStyle='#3a2a14';px.fillText('Il y a mille ans…',W/2,H*.12+30);
  return{nc,pc}}
/* rayon du trou (même courbe que l'ancienne animation) */
function rbR(p){const k=[[0,0],[.26,0],[.30,.03],[.62,.60],[.76,1.5],[1,1.5]];for(let i=1;i<k.length;i++)if(p<=k[i][0]){const[a,ra]=k[i-1],[b,rb]=k[i];const u=(p-a)/(b-a||1),e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;return ra+(rb-ra)*e}return 1.5}
roiCinematic=function(done){let o=document.getElementById('sgcine');if(o)o.remove();o=document.createElement('div');o.id='sgcine';o.className='roiburn rbcv';o.setAttribute('role','dialog');o.setAttribute('aria-label','Cinématique');
  const R=rng(31);const emb=[...Array(24)].map(()=>{const a=R()*6.283,d=18+R()*40;return`<i style="--dx:${(Math.cos(a)*d).toFixed(0)}vmin;--dy:${(Math.sin(a)*d-20).toFixed(0)}vmin;--dl:${(1.3+R()*1.6).toFixed(2)}s;--sz:${(2+R()*4).toFixed(1)}px"></i>`}).join('');
  o.innerHTML=`<canvas class="rb-cv"></canvas>
   <div class="rb-emb">${emb}</div><div class="rb-ash">${[...Array(16)].map((_,i)=>`<i style="--x:${(i*37)%100}%;--d:${(2+(i%5)*.5).toFixed(1)}s;--l:${(-(i%7)*.5).toFixed(1)}s"></i>`).join('')}</div><div class="rb-shock"></div>
   <div class="rb-title"><small>LE PASSÉ PART EN CENDRES</small><b>ÉRYNDEL</b><span>le Roi de Cendre</span><em>« Le Premier Porteur contre le dernier ! »</em></div>
   <button class="btn p cn-go">⚔️ Affronter le Roi de Cendre</button><button class="cn-skip">Passer ⏭</button>`;
  document.body.appendChild(o);let dead=false,raf=0;
  const fin=()=>{dead=true;cancelAnimationFrame(raf);o.remove();sagaMode(false);done&&done()};o.querySelector('.cn-go').onclick=e=>{e.stopPropagation();fin()};o.querySelector('.cn-skip').onclick=e=>{e.stopPropagation();fin()};
  const cv=o.querySelector('.rb-cv'),W=innerWidth,H=innerHeight,dpr=Math.min(1.5,devicePixelRatio||1);cv.width=W*dpr;cv.height=H*dpr;const x=cv.getContext('2d');
  x.fillStyle='#e8d8b0';x.fillRect(0,0,cv.width,cv.height);
  Promise.all([rbImg(eryBody('roi')||''),rbImg(eryBody('eryndel')||'')]).then(([king,young])=>{if(dead)return;
    const{nc,pc}=rbLayers(W,H,dpr,king,young);const cx=W/2*dpr,cy=H*.22*dpr,D=Math.hypot(Math.max(cx,cv.width-cx),Math.max(cy,cv.height-cy));
    nc.className='rb-nowc';if(cv.parentNode===o)o.insertBefore(nc,cv);else o.prepend(nc);o.classList.add('go');try{const g=sfxBus(.35,6000);if(g){const t=AU.ctx.currentTime;try{SND.zap(g,t+1.2)}catch(e){}[2.9,3.3].forEach(d=>{try{SND.boom(g,t+d,1.3)}catch(e){}})}}catch(e){}
    const T0=performance.now(),DUR=4600;
    const frame=now=>{if(dead)return;const p=Math.min(1,(now-T0)/DUR),r=rbR(p)*D;
      /* le Roi, qui se pose doucement (léger zoom arrière) */
      x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,cv.width,cv.height);
      if(r<D*1.05){x.save();x.beginPath();x.rect(0,0,cv.width,cv.height);if(r>0)x.arc(cx,cy,r,0,6.2832,true);x.clip();
        x.drawImage(pc,0,0);
        /* rayures de vieux film */
        x.globalAlpha=.35;x.fillStyle='rgba(60,40,20,.8)';const s=Math.floor(now/90);for(let i=0;i<2;i++){const sx=((s*7919+i*3571)%997)/997*cv.width;x.fillRect(sx,0,1.5*dpr,cv.height)}x.globalAlpha=1;x.restore();
        /* le bord qui brûle */
        if(r>0){const w=Math.max(10*dpr,r*.09);const g=x.createRadialGradient(cx,cy,Math.max(0,r-2*dpr),cx,cy,r+w);
          g.addColorStop(0,'rgba(255,242,192,0)');g.addColorStop(.04,'#fff2c0');g.addColorStop(.14,'#ffb21a');g.addColorStop(.3,'#ff4a10');g.addColorStop(.55,'#3a1408');g.addColorStop(.8,'rgba(40,20,8,.55)');g.addColorStop(1,'rgba(40,20,8,0)');
          x.fillStyle=g;x.beginPath();x.arc(cx,cy,r+w,0,6.2832);x.arc(cx,cy,Math.max(0,r-2*dpr),0,6.2832,true);x.fill()}}
      if(p<1&&r<D*1.05)raf=requestAnimationFrame(frame);else{x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,cv.width,cv.height);cv.style.display='none'}};
    raf=requestAnimationFrame(frame)})};
