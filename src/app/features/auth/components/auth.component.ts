import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  user = 'lauro';
  password = '123';
  errorMessage = '';


  constructor(private authService: AuthService, private router: Router) {

  }

  login() {
    this.authService.login(this.user, this.password).subscribe({
      next: () => {
        this.authService.setAuthenticated(true);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = "credenciales incorrectas";
      }
    })
  }
}
