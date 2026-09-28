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
