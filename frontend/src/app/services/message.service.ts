import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Message {
  id?: number;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiUrl = '/api/messages';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }

  createMessage(content: string): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, {
      content: content
    });
  }
}
