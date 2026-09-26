import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, Message } from './services/message.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  messages: Message[] = [];
  newMessage = '';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getMessages().subscribe({
      next: (messages) => {
        this.messages = messages;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des messages', error);
      }
    });
  }

  addMessage(): void {
    if (!this.newMessage.trim()) {
      return;
    }

    this.messageService.createMessage(this.newMessage).subscribe({
      next: (message) => {
        this.messages.push(message);
        this.newMessage = '';
      },
      error: (error) => {
        console.error('Erreur lors de la création du message', error);
      }
    });
  }
}
