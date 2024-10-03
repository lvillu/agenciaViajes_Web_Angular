import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'https://localhost:7067/login';
  private refreshUrl = 'https://localhost:7067/refresh';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(user: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { user, password });
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(this.refreshUrl, {}, { withCredentials: true });
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  setAuthenticated(status: boolean) {
    this.isAuthenticatedSubject.next(status);
  }
}
