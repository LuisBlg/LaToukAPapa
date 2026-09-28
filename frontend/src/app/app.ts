import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  blaze = '';
  mdp = '';

  connected = false;
  connectedBlaze = '';

  errorMessage = '';
  loading = false;

  constructor(private http: HttpClient) {}

  login(): void {

    this.errorMessage = '';

    if (!this.blaze || !this.mdp) {
      this.errorMessage = 'Remplis les deux champs mon cochon';
      return;
    }

    this.loading = true;

    this.http.post<string>(
      '/api/login',
      {
        blaze: this.blaze,
        mdp: this.mdp
      },
      {
        responseType: 'text' as 'json'
      }
    ).subscribe({
      next: (blaze) => {
        this.connected = true;
        this.connectedBlaze = blaze;
        this.loading = false;
      },
      error: () => {
        this.errorMessage =
          'ton blaze ou ton mot de passe est incorrect mon cochon';

        this.loading = false;
      }
    });
  }

  logout(): void {
    this.connected = false;
    this.connectedBlaze = '';
    this.blaze = '';
    this.mdp = '';
    this.errorMessage = '';
  }
}
