import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/Models/City.model';
import { Hotel } from 'src/app/Models/Hotel.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

	error: any;
	listHotels : Hotel[] = [];
	listCitys : City[] = [];
	cityForm! : FormGroup;
	URLStr : string = '';
	keyword :string = '';

	constructor(private apiService : ApiServiceService , private router : Router) {}

	ngOnInit(): void 
	{
		this.getAllCitys()
		this.getAllHotels()
		this.URLStr = environment.host;
		this.cityForm = new FormGroup({
			city: new FormControl()})
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
			next : (data) => {this.listCitys = data
				this.cityForm.get('city')?.setValue(data[0].id);
			},
			error : (err) => this.error = err.message,
		});
	}

	getAllHotelsByCategory(city : City)
	{
		this.apiService.getHotelsByCategory(city.id).subscribe({
			next : (data) => this.listHotels = data,
			error : (err) => this.error = err.message,
			complete : () => this.error = null
			})
	}

	onSubmit(){
		console.log(this.cityForm.get('city')?.value)
		this.apiService.getHotelsByCategory(this.cityForm.get('city')?.value).subscribe({
			next : (data) => this.listHotels = data,
			error : (err) => this.error = err.message,
		})
	}

	searchByKey()
	{
		if(this.keyword != '')
		{
			this.apiService.searchByKeyword(this.keyword).subscribe({
			next : (data) => this.listHotels = data,
			error : (err) => this.error = err.message,
			complete : () => this.keyword = ''
			})
		}
		else
		{
			this.getAllHotels()
		}
	}

	onHotelDetail(hotel : Hotel)
	{
		this.router.navigate(['/details', hotel.id]);
	}
}
