# Sources de RDE

- `build264.py` assemble `royaumes_v263pub.html` + les modules `v*.js` / `v*.css` → `royaumes.html` (version Claude) et `prod.html`.
- `app/buildapp.py` transforme `prod.html` en `index.html` (appli RDE sur Firebase) + `manifest.webmanifest` + `sw.js`.
- Pour une mise à jour : ajouter un module `vXXX.js`/`.css`, l'inscrire dans `build264.py`, lancer `python3 build264.py` puis `python3 app/buildapp.py`.
