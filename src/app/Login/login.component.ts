// login.component.ts
import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div style="padding: 2rem;">
      <h1>LeaveApp - Azure AD Login</h1>
      <button (click)="login()">Login with Azure AD</button>
    </div>
  `
})
export class LoginComponent {
  constructor(private msalService: MsalService) {}

  login() {
    this.msalService.loginRedirect({scopes: ['api://9536cbf5-1a05-481d-a2f5-28e259c1f9a8/access_as_user']});
  }
}
