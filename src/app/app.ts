import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { AuthenticationResult } from '@azure/msal-browser';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  isLoggedIn = false;
  userName = '';
  userEmail = '';

  constructor(
    private msalService: MsalService,
    private http: HttpClient,
    private router: Router
  ) {
    console.log('Component created');

    this.msalService.instance.handleRedirectPromise().then((result) => {
      console.log('Redirect handled, user info ready');
      if (result && result.account) {
        console.log('Access Token:', result.accessToken);
        this.msalService.instance.setActiveAccount(result.account);
      }

      const account = this.msalService.instance.getActiveAccount();
      if (account) {
        this.isLoggedIn = true;
        this.userName = account.name || account.username;
        this.getUserProfile();
        this.router.navigate(['/dashboard']);
      }

      console.log('Constructor completed');
    }).catch((error) => {
      console.error('Redirect error:', error);
    });
  }

  getUserProfile() {
  this.http.get<any>('https://azurepracwebapp-abgegahdakaebff7.canadacentral-01.azurewebsites.net/api/Employees/me')
    .subscribe({
      next: (res) => console.log('Backend API Response:', res),
      error: (err) => console.error('Backend API Error:', err)
    });
}

}
