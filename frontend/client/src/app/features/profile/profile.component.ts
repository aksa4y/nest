import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { User, ProfileUpdateRequest } from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isLoading = false;
  isSaving = false;
  message = '';
  error = '';

  formData: ProfileUpdateRequest = {
    name: '',
    email: '',
    avatar: '',
    phone: '',
    bio: '',
    location: '',
    website: '',
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.authService.loadProfile().subscribe({
      next: (user) => {
        this.user = user;
        this.formData = {
          name: user.name || '',
          email: user.email || '',
          avatar: user.avatar || '',
          phone: user.phone || '',
          bio: user.bio || '',
          location: user.location || '',
          website: user.website || '',
        };
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Не удалось загрузить профиль';
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    this.isSaving = true;
    this.message = '';
    this.error = '';

    this.authService.updateProfile(this.formData).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.message = 'Профиль успешно обновлен';
        this.isSaving = false;
        setTimeout(() => (this.message = ''), 3000);
      },
      error: () => {
        this.error = 'Не удалось обновить профиль';
        this.isSaving = false;
        setTimeout(() => (this.error = ''), 3000);
      },
    });
  }
}
