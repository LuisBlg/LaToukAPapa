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
      name: "L'embuscade", // Nom de la touk
      image: "assets/linsay.jpg", // Mets ici le chemin vers l'image de la personne
      tasteScore: 6.5,            // Note de goût
      conceptScore: 4,          // Note de concept
      comment: "Première touk de la saison, pas la plus facile. Malgré un concept on ne peut plus simple, notre toukeur a su tirer parti du goût mordant du pinard pour faire un breuvage à la fois agressif, mais peu fort en degrés. Mention honorable au sirop de violette, qui a trouvé sa place dans un cocktail aussi bien déstructuré qu’équilibré"
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
