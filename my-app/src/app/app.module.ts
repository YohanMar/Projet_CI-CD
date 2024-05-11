import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxStoreModule } from 'ngx-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminConfigComponent } from './admin-config/admin-config.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminConfigComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Ajoutez cette ligne
    AppRoutingModule,
    NgxStoreModule.forRoot() // Ajoutez cette ligne
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
