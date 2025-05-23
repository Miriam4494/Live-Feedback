
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
// import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://localhost:7230/api/User';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
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

    return this.http.post<any>(`https://localhost:7230/api/Auth/login`, body).pipe(
      map(response => {
        console.log(response);
        
        if (response?.user?.roleId == 2) {
          localStorage.setItem('token', response.token);
          return true;
        }
        return false;
      })
    );
  }
}