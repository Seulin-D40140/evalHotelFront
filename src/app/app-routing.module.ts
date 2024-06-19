import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DetailHotelComponent } from './components/detail-hotel/detail-hotel.component';
import { LoginComponent } from './components/login/login.component';
import { UnauthorizeAccesComponent } from './components/unauthorize-acces/unauthorize-acces.component';

const routes: Routes = 
[
	{path : 'home', component : HomePageComponent},
	{path : 'details/:id', component : DetailHotelComponent },
	{path : 'login' , component : LoginComponent},
	{path : '403', component : UnauthorizeAccesComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
