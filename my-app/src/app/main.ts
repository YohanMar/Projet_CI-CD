import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from 'app/app.module';
import { environment } from 'environments/environment';
import { provideHttpClient } from '@angular/common/http'; // Importez provideHttpClient

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  provideHttpClient: provideHttpClient().withFetch(), // Activation de fetch pour HttpClient
})
  .catch(err => console.error(err));