/*
 * entry-animation.js
 * Au clic : la bouteille se secoue, puis s'envole en zigzags (petits et grands) sur toute
 * l'image. Sur son passage, elle "efface" l'illustration et découvre la partie 2 du site.
 *
 * Branchement dans app.ts (mets ce fichier à côté, dans src/app/) :
 *
 *   import { ChangeDetectorRef, inject } from '@angular/core';
 *   import { playEntryAnimation } from './entry-animation.js';
 *   ...
 *   entered = false;
 *   private cdr = inject(ChangeDetectorRef);
 *
 *   enter(ev: Event) {
 *     const root = (ev.target as Element).closest('.entry-screen');
 *     playEntryAnimation(root, () => { this.entered = true; this.cdr.detectChanges(); });
 *   }
 *
 * Si TypeScript râle sur l'import : ajoute  "allowJs": true  dans tsconfig.json > compilerOptions.
 */
export function playEntryAnimation(root, onDone) {
  const bottle = root && root.querySelector('#bottle');
  const wipe = root && root.querySelector('#wipe');
  if (!bottle || !wipe || root.classList.contains('go')) return;
  root.classList.add('go'); // fige les animations d'ambiance + fait disparaître le titre

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { onDone(); return; }

  const X = 800, Y = 520; // position de départ de la bouteille (repère 1600x900)

  // Trajet : zigzags larges, avec un petit zigzag au milieu. Modifie ces points pour changer le parcours.
  const pts = [[X, Y], [650, 430], [-160, 100], [1760, 200], [1150, 270], [-160, 400],
               [1760, 600], [1000, 520], [600, 650], [-160, 800], [1760, 1000]];

  // Courbe lisse (Catmull-Rom -> Bézier) passant par tous les points
  const d = pts.reduce((s, c, i) => {
    if (!i) return `M${c}`;
    const a = pts[i - 2] || pts[i - 1], b = pts[i - 1], e = pts[i + 1] || c;
    return s + `C${b[0] + (c[0] - a[0]) / 6},${b[1] + (c[1] - a[1]) / 6} ` +
               `${c[0] - (e[0] - b[0]) / 6},${c[1] - (e[1] - b[1]) / 6} ${c}`;
  }, '');
  wipe.setAttribute('d', d);

  const L = wipe.getTotalLength();
  const WAIT = 750;  // ms de secousse avant le départ
  const RUN = 4300;  // ms de vol
  wipe.style.strokeDasharray = L;
  wipe.style.strokeDashoffset = L;

  const put = (x, y, r, s = 1) =>
    bottle.setAttribute('transform', `translate(${x} ${y}) rotate(${r}) scale(${s})`);
  const ease = t => (t < .5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

  let t0;
  const frame = now => {
    if (t0 === undefined) t0 = now;
    const e = now - t0;

    if (e < WAIT) {
      // la bouteille se secoue et se gonfle un peu (anticipation)
      const k = e / WAIT, s = Math.sin(k * Math.PI);
      put(X, Y - 26 * s, 16 * Math.sin(k * Math.PI * 5) * (1 - k * .4), 1 + .16 * s);
    } else {
      const u = Math.min(1, (e - WAIT) / RUN), l = ease(u) * L;
      const p = wipe.getPointAtLength(l), q = wipe.getPointAtLength(Math.min(L, l + 6));
      const w = Math.min(1, u * 10); // fondu d'orientation au décollage
      const a = (Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI + 90 + 14 * Math.sin(l / 70)) * w;
      put(p.x, p.y, a, 1 + .1 * Math.sin(l / 90));
      wipe.style.strokeDashoffset = L * (1 - ease(u)); // le pinceau découvre la partie 2
      if (u === 1) { onDone(); return; }
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
