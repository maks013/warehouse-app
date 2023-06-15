import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {WarehouseHomeComponent} from "../warehouse-home/warehouse-home.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string = '';
  password: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {
  }

  logIn() {
    const loginData = {
      login: this.login,
      password: this.password
    };

    this.http.post<any>('http://localhost:3000/api/user/auth', loginData)
      .subscribe(
        response => {
          console.log('Login succesfully');
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
