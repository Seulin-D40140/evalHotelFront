import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HTTP_INTERCEPTORS , HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailHotelComponent } from './components/detail-hotel/detail-hotel.component';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptorInterceptor } from 'src/jwt-interceptor.interceptor';
import { UnauthorizeAccesComponent } from './components/unauthorize-acces/unauthorize-acces.component';
import { AddCityFormComponent } from './components/add-city-form/add-city-form.component';
import { AddHotelFormComponent } from './components/add-hotel-form/add-hotel-form.component';
import { GerantPartComponent } from './components/gerant-part/gerant-part.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    DetailHotelComponent,
    LoginComponent,
    UnauthorizeAccesComponent,
    AddCityFormComponent,
    AddHotelFormComponent,
    GerantPartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : JwtInterceptorInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
