import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehouseHomeComponent } from './components/warehouse-home/warehouse-home.component';
import { RegisterComponent } from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  { path: 'home', component: WarehouseHomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  // Inne trasy
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
