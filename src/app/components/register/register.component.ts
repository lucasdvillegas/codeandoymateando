import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.authService.register(this.email, this.password).subscribe(
      () => {
        console.log(this.email, this.password);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        // this.errorMessage = error.error.message;
      }
    );
  }


}
