import { NavComponent } from './nav/nav.component';
import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ConfigFactory, ConfigService } from './_services/config.service';
import { API_BASE_URL } from './_services/services.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import {ToastrModule} from "ngx-toastr";
import {SharedModule} from "./_modules/shared.module";
import { TestErrorsComponent } from './test-errors/test-errors.component';
import {ErrorInterceptor} from "./_interceptors/error.interceptor";
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import {environment} from "../environments/environment";
import { MemberCardComponent } from './members/member-card/member-card.component';
import {JwtInterceptor} from "./_interceptors/jwt.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    ConfigService,
    { provide: 'CONFIG.JSON', useValue: environment.configAddress },
    { provide: 'BASE-API-VARIABLE', useValue: 'apiBaseUrl' },
    {
      provide: API_BASE_URL, useFactory: ConfigFactory, deps: [ConfigService, 'CONFIG.JSON', 'BASE-API-VARIABLE']
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
