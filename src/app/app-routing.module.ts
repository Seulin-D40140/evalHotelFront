import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DetailHotelComponent } from './components/detail-hotel/detail-hotel.component';
import { LoginComponent } from './components/login/login.component';
import { UnauthorizeAccesComponent } from './components/unauthorize-acces/unauthorize-acces.component';
import { AddCityFormComponent } from './components/add-city-form/add-city-form.component';
import { AddHotelFormComponent } from './components/add-hotel-form/add-hotel-form.component';

const routes: Routes = 
[
	{path : 'home', component : HomePageComponent},
	{path : 'details/:id', component : DetailHotelComponent },
	{path : 'login' , component : LoginComponent},
	{path : '403', component : UnauthorizeAccesComponent},
	{path : 'cityForm', component : AddCityFormComponent},
	{path : 'hotelForm', component : AddHotelFormComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
