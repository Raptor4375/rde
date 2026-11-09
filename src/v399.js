
/* ================= APPLI ANDROID (Play Store) =================
   L'appli Android s'ouvre avec ?src=android (ou depuis android-app://). On le retient sur l'appareil.
   Dans l'appli, Google interdit de renvoyer vers un paiement extérieur : le Pack Mécène (itch.io) y est caché.
   Le champ « Code cadeau » reste. */
(function(){try{
let and=false;try{and=/[?&]src=android\b/.test(location.search)||String(document.referrer||'').startsWith('android-app://');if(and)localStorage.setItem('rde-android','1');else and=localStorage.getItem('rde-android')==='1'}catch(e){}
window.RDE_AND=and;
if(!and)return;
document.documentElement.classList.add('rdeand');
const st=document.createElement('style');st.textContent=`.rdeand .supbtn,.rdeand a[href*="itch.io"],.rdeand [data-a="support"]{display:none!important}`;document.head.appendChild(st);
try{supportModal=function(){}}catch(e){}
}catch(e){console.warn('android',e)}})();
