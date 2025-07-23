import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';
import { msalInstance } from './app/msal.config';

msalInstance.initialize().then(() => {
  bootstrapApplication(AppComponent, appConfig)
    .catch(err => console.error(err));
}).catch(err => console.error(err));