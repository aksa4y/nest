import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { User, LoginResponse, RegisterResponse, ProfileUpdateRequest } from '../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000/auth';
  private profileUrl = 'http://localhost:3000/profile';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.access_token);
        this.loadProfile().subscribe();
        this.router.navigate(['/tasks']);
      }),
    );
  }

  register(name: string, email: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, { name, email, password }).pipe(
      tap(() => {
        this.router.navigate(['/login']);
      }),
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  loadProfile(): Observable<User> {
    return this.http.get<User>(this.profileUrl).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
      }),
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateProfile(profileData: ProfileUpdateRequest): Observable<User> {
    return this.http.put<User>(this.profileUrl, profileData).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
      }),
    );
  }
}
