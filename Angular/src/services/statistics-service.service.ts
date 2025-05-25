import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrl = 'https://live-feedback-lgcr.onrender.com/api/';

  constructor(private http: HttpClient) {}

  getStatistics() {
    return forkJoin({
      questionCount: this.http.get<any[]>(`${this.apiUrl}Question`),
      imageCount: this.http.get<any[]>(`${this.apiUrl}MyImage`),
      feedbackCount: this.http.get<any[]>(`${this.apiUrl}Feedback`),
      userCount: this.http.get<any[]>(`${this.apiUrl}User`, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      })
      
    });
  }
}
