import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const userData = {
      email: this.email,
      name: this.username,
      password: this.password
    };

    this.http.post('http://localhost:3000/api/user/register', userData)
      .subscribe(
        (response) => {
          console.log('You have succesfully registered', response);
          this.message = 'You have succesfully registered';
        },
        (error) => {
          console.error('Registration failed:', error);
          this.message = 'Registration failed';
        }
      );
  }

  goBackToLogin() {
    this.router.navigate(['/login']);
  }
}
