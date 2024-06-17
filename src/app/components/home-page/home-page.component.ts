import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/Models/City.model';
import { Hotel } from 'src/app/Models/Hotel.model';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

	error: any;
	listHotels : Hotel[] = [];
	listCitys : City[] = [];

	constructor(private apiService : ApiServiceService) { }

	ngOnInit(): void 
	{
		this.getAllCitys()
		this.getAllHotels()
	}

	getAllHotels()
	{
		this.apiService.getAllHotels().subscribe({
			next : (data) => this.listHotels = data,
			error : (err) => this.error = err.message,
		});
	}

	getAllCitys()
	{
		this.apiService.getAllCitys().subscribe({
			next : (data) => this.listCitys = data,
			error : (err) => this.error = err.message,
		});
	}
}
