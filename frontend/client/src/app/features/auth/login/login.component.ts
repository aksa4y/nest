import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  isLoading = signal(false);
  error = signal('');

  private auth = inject(AuthService);

  login() {
    if (!this.email() || !this.password()) {
      this.error.set('Заполните все поля');
      return;
    }

    this.error.set('');
    this.isLoading.set(true);

    this.auth.login(this.email(), this.password()).subscribe({
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(err?.error?.message || 'Ошибка входа. Проверьте данные.');
      },
    });
  }
}
