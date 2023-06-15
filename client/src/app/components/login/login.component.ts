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
          // Pomyślne logowanie
          console.log('Zalogowano pomyślnie');
          this.router.navigate(['/home']);
        },
        error => {
          // Błąd logowania
          console.error(error);
        }
      );
  }

  signUp(){
    this.router.navigate(['/register']);
  }

}
