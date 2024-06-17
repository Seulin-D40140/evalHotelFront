import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Hotel } from '../Models/Hotel.model';
import { City } from '../Models/City.model';

@Injectable({
	providedIn: 'root'
})
export class ApiServiceService 
{
	constructor(private http : HttpClient) { }

	public getAllHotels() { return this.http.get<Hotel[]> (environment.host + "/hotels") }

	public getAllCitys() { return this.http.get<City[]> (environment.host + "/citys") }

}
