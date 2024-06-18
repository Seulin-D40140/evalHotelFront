import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DetailHotelComponent } from './components/detail-hotel/detail-hotel.component';

const routes: Routes = 
[
	{path : 'home', component : HomePageComponent},
	{path : 'details/:id', component : DetailHotelComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
