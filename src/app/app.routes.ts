import { Routes } from '@angular/router';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { AppComponent } from './app';
import { LoginComponent } from './Login/login.component';
export const routes: Routes = [
      { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }
];
