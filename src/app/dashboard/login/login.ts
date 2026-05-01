import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  auth = inject(AuthService);
  router = inject(Router);
  user = {
    email: '',
    password: '',
  };
  
  login() {
    this.auth.login(this.user).subscribe({
      next: () => {
        this.router.navigate([`../${environment.path}`]);
      },
      error: () => {
        
      }
    })
  }
}
