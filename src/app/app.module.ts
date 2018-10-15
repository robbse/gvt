import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Ea1Component } from './ea1/ea1.component';
import { RoutingModule } from './routing.module';

@NgModule({
  declarations: [
    AppComponent,
    Ea1Component
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
