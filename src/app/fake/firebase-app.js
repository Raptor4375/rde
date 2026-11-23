const APPS={};
export function initializeApp(c,n){const a={c,n:n||'main'};APPS[a.n]=a;return a}
export function getApp(n){const a=APPS[n||'main'];if(!a)throw new Error('no app');return a}
