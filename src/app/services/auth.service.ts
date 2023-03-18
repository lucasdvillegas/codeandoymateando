import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users`)
      .pipe(
        map(users => {
          const user = users.find((user: any) => user.email === email && user.password === password);
          if (!user) {
            throw new Error('Invalid email or password.');
          } else {
            const payload = { email: user.email, id: user.id };
            return this.createToken(payload);
          }
        }),
        catchError(error => throwError(error.message))
      );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users`)
      .pipe(
        mergeMap(users => {
          const existingUser = users.find((user: any) => user.email === email);
          if (existingUser) {
            throw new Error('Email already exists.');
          } else {
            const id = users.length > 0 ? Math.max(...users.map((user: any) => user.id)) + 1 : 1;
            const newUser = { id, email, password };
            console.log(newUser);
            return this.http.post<any>(`${this.baseUrl}/users`, newUser);
          }
        }),
        map(() => ({ success: true })),
        catchError(error => of({ success: false, message: error.message }))
      );
  }



  private createToken(payload: { email: string, id: number }): string {
    const token = btoa(JSON.stringify(payload));
    localStorage.setItem('currentUser', token);
    return token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return of(token !== null);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
