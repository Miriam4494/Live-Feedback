
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports:[FormsModule]
})
export class HomeComponent implements OnInit {
  email = '';
  password = '';
  isLoggedIn = false;
  errorMessage = '';

  constructor(private router: Router,private userService:UserService) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  login(): void {
    this.userService.loginAndCheckAdmin(this.email, this.password).subscribe(isAdmin => {
      if (isAdmin) {
        this.isLoggedIn = true;
        this.errorMessage = '';
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        this.isLoggedIn = false;
        this.errorMessage = 'Incorrect password or insufficient permissions.';
      }
    }, error => {
      console.error('Login error:', error);
      this.errorMessage = 'An error occurred during login. Please try again.';
    });
  }
  logout(): void {
    this.isLoggedIn = false;
    this.email = '';
    this.password = '';
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');

  }

  goToUsers(): void {
    this.router.navigate(['/users']);
  }

  goToStats(): void {
    this.router.navigate(['/statistics']);
  }
}
