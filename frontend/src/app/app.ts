import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { playEntryAnimation } from './entry-animation.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  entered = false;

  private cdr = inject(ChangeDetectorRef);

  // --- C'EST ICI QUE TU RAJOUTERAS TES TOUKS AU FUR ET À MESURE ---
  // Il te suffit de copier-coller un bloc {...} pour en ajouter un nouveau !
  touks = [
    {
      rank: 1,
      name: "La Touk des Plages", // Nom de la touk
      image: "assets/linsay.jpg", // Mets ici le chemin vers l'image de la personne
      tasteScore: 9.5,            // Note de goût
      conceptScore: 8.0,          // Note de concept
      comment: "Une touk rafraîchissante, parfaite après un match de volley sur la plage ! Le concept est top."
    }
  ];

  // Fonction pour calculer la moyenne automatiquement
  getGlobalScore(taste: number, concept: number): number {
    return (taste + concept) / 2;
  }

  enter(ev: Event): void {
    const root = (ev.target as Element).closest('.entry-screen');

    if (!root) {
      return;
    }

    playEntryAnimation(root, () => {
      this.entered = true;
      this.cdr.detectChanges();
    });
  }
}
