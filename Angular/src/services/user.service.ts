
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://live-feedback-lgcr.onrender.com/api/User';

  constructor(private http: HttpClient) {}

  // getAllUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.apiUrl);
  // }
  getAllUsers(): Observable<User[]> {
    const token = localStorage.getItem('token'); // קחי את הטוקן מה־localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<User[]>(this.apiUrl, { headers });
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
  loginAndCheckAdmin(email: string, password: string): Observable<boolean> {
    const body = { email, password };

    return this.http.post<any>(`https://live-feedback-lgcr.onrender.com/api/Auth/login`, body).pipe(
      map(response => {
        if (response?.user?.roleId == 2) {
          console.log("אני כאן");
          
          localStorage.setItem('token', response.token);
          return true;
        }
        return false;
      })
    );
  }
}