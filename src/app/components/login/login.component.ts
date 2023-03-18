import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  };

  hide = true;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }



  onSubmit(): void {
    this.login();
  }

  login() {
    this.authService.login(this.credentials.email, this.credentials.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/curses']);
        // this.isLoggedIn = true;
      },
      (error) => {
        this.snackBar.open('Correo o contraseña incorrecta', 'Volver a intentar', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000
        });
      }
    );
  }



}
