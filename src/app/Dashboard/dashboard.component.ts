import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalService } from '@azure/msal-angular';
import {  HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
<div style="padding: 2rem; max-width: 800px; margin: 0 auto; text-align: center;">
  <h2>Welcome to Dashboard</h2>
  <p>Hello, {{ userName }}</p>
  <p>Email: {{ userEmail }}</p>

  <button (click)="toggleTable()" style="margin: 1rem;">
    {{ showTable ? 'Hide Table' : 'Show Table' }}
  </button>

  <div *ngIf="showTable && tableData.length > 0" style="overflow-x: auto; margin-top: 1.5rem;">
    <table border="1" style="margin: 0 auto; border-collapse: collapse; width: 100%;">
      <thead style="background-color: #f0f0f0;">
        <tr>
          <th *ngFor="let key of columnKeys" style="padding: 10px; border: 1px solid #ccc;">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of tableData">
          <td *ngFor="let key of columnKeys" style="padding: 10px; border: 1px solid #ccc;">{{ row[key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <button (click)="logout()" style="margin-top: 2rem; padding: 0.5rem 1rem;">Logout</button>
</div>
  `
})
export class DashboardComponent {
  private msalService = inject(MsalService);
    private http = inject(HttpClient);

  userName = '';
  showTable = false;
  userEmail = '';
    tableData: any[] = [];
  columnKeys: string[] = [];

  constructor() {
    const account = this.msalService.instance.getActiveAccount();
    if (account) {
      this.userName = account.name || account.username;
      this.userEmail = account.username || '';
    }
  }
    logout() {
    this.msalService.logoutRedirect();
  }
  toggleTable() {
  if (!this.showTable) {
    this.loadTable(); // fetch data only when showing
  }
  this.showTable = !this.showTable;
}
   loadTable() {
    this.http.get<any[]>('https://azurepracwebapp-abgegahdakaebff7.canadacentral-01.azurewebsites.net/api/Employees') // Use your endpoint
      .subscribe(data => {
        this.tableData = data;
        this.columnKeys = data.length ? Object.keys(data[0]) : [];
      });
  }
}
