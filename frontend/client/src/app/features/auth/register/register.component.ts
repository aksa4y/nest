import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  name = signal('');
  email = signal('');
  password = signal('');
  isLoading = signal(false);
  error = signal('');
  success = signal(false);

  private auth = inject(AuthService);

  register() {
    if (!this.name() || !this.email() || !this.password()) {
      this.error.set('Заполните все поля');
      return;
    }

    if (this.password().length < 8) {
      this.error.set('Пароль должен содержать минимум 8 символов');
      return;
    }

    this.error.set('');
    this.isLoading.set(true);

    this.auth.register(this.name(), this.email(), this.password()).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.success.set(true);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(err?.error?.message || 'Ошибка регистрации. Попробуйте ещё раз.');
      },
    });
  }
}
