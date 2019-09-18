import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketService } from './services/socket.service';
import { RegestrationComponent } from './components/regestration/regestration.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatesComponent } from './components/flates/flates.component';
import { FlatDetailsComponent } from './components/flates/flat-details/flat-details.component';


@NgModule({
  declarations: [
    AppComponent,
    RegestrationComponent,
    FlatesComponent,
    FlatDetailsComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
   HttpClientModule
  ],
  providers: [SocketService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
