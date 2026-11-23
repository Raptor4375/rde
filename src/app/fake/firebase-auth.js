const AS=new Map();
export function getAuth(app){const k=app&&app.n||'main';if(!AS.has(k))AS.set(k,{app,currentUser:null});return AS.get(k)}
const uid=(window.FAKE_UID||'fakeuid1');
export function onAuthStateChanged(a,cb){setTimeout(()=>cb({uid}),20);return()=>{}}
export async function signInAnonymously(){return{user:{uid}}}
export class GoogleAuthProvider{setCustomParameters(){}}
export async function signInWithPopup(a){if(window.FAKE_POPUP_FAIL)throw{code:'auth/popup-closed-by-user',message:'closed'};const u={uid:window.FAKE_GUID||'googleAdmin1',email:''};a.currentUser=u;return{user:u}}
export async function setPersistence(){}
export const inMemoryPersistence={};
export async function signOut(a){a.currentUser=null}
