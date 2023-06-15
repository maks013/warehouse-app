import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string = '';
  password: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  logIn() {
    const loginData = {
      login: this.login,
      password: this.password
    };

    this.http.post<any>('http://localhost:3000/api/user/auth', loginData)
      .subscribe(
        response => {
          console.log('Login successfully');
          const token = response.token;
          this.authService.setToken(token);
          this.router.navigate(['/home']);
        },
        error => {
          console.error(error);
          this.message = 'Login failed';
        }
      );
  }

  signUp(){
    this.router.navigate(['/register']);
  }
}
