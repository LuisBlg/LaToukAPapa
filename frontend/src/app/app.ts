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
  // teamScore = la note de l'équipe (sur 10)
  touks = [
    {
      rank: 1,
      role:"rdm",
      name: "October Touk",
      // J'ai ajouté un "/" devant "assets/" pour régler le problème de chemin
      image: "nathan.jpg",
      tasteScore: 7.1,
      conceptScore: 5.4,
      teamScore: 7.88,
      comment: "La touk est efficace et bien dosée. Bon, il faut l’avouer, le concept n’a malheureusement rien de révolutionnaire. En revanche, c’est une touk particulièrement efficace pour préparer un retour en minibus mouvementé. Ah oui aussi, (je dénonce) certaines personnes ont trouvé que le toukeur avait manqué d’humilité."
    },
    {
      rank: 2,
      role:"rdm",
      name: "L'Embuscade", 
      // J'ai ajouté un "/" devant "assets/" pour régler le problème de chemin
      image: "linsay.jpg", 
      tasteScore: 5.901,            
      conceptScore: 4.17,          
      teamScore: 6.11,
      comment: "Première touk de la saison, pas la plus facile. Malgré un concept on ne peut plus simple, notre toukeur a su tirer parti du goût mordant du pinard pour faire un breuvage à la fois agressif, mais peu fort en degrés. Mention honorable au sirop de violette, qui a trouvé sa place dans un cocktail aussi bien déstructuré qu'équilibré."
    },
    {
      rank: 3,
      role:"chef",
      name: "LATOUKAPAPA", 
      // J'ai ajouté un "/" devant "assets/" pour régler le problème de chemin
      image: "louis.jpg", 
      tasteScore: 6.7,            
      conceptScore: 3.45,          
      teamScore: 0,
      comment: "Bon visiblement ma Touk àn'a pas été très appréciée. C'est pas grave je retiens qui m'a mis les pires notes."
    }
  ];

  getGlobalScore(taste: number, concept: number, team: number): number {
    return Math.round((taste + concept + team) / 3);
  }

  getGlobalScoreChef(taste: number, concept: number): number {
    return Math.round((taste + concept) / 2);
  }
  estChef(role: string):boolean{
    return role == "chef";
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
