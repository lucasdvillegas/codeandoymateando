// navbar.component.ts

// navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn: any) => {
      this.loggedIn = loggedIn.toString() === 'true';
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
