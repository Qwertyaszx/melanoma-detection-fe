import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from "./modules/material-ui/material-ui.module";
import { SimplebarAngularModule } from 'simplebar-angular';
import { MaterialFileInputModule } from 'ngx-material-file-input';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutControlComponent } from './layout-control/layout-control.component';
import { HeaderComponent } from './layout-control/header/header.component';
import { MenuComponent } from './layout-control/menu/menu.component';
import { SubMenuComponent } from './layout-control/sub-menu/sub-menu.component';
import { ContentPaneComponent } from './layout-control/content-pane/content-pane.component';
import { LoginComponent } from './components/login/login.component';

import { CustomHttpInterceptorService } from './services/custom-http-interceptor.service';
import { HomeComponent } from './templates/home/home.component'

@NgModule({
  declarations: [
    AppComponent,
    LayoutControlComponent,
    HeaderComponent,
    MenuComponent,
    SubMenuComponent,
    ContentPaneComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    SimplebarAngularModule,
    MaterialFileInputModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
