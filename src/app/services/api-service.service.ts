import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Hotel } from '../Models/Hotel.model';
import { City } from '../Models/City.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiServiceService 
{
	constructor(private http : HttpClient) { }

	public getAllHotels() { return this.http.get<Hotel[]> (environment.host + "/hotels") }

	public getAllCitys() { return this.http.get<City[]> (environment.host + "/citys") }

	public getHotelsByCategory(id : number) { return this.http.get<Hotel[]> (environment.host + "/hotelByCity/" + id) }

	public searchByKeyword( key : string) { return this.http.get<Hotel[]> (environment.host + "/searchByKey/" + key) }

	public getHotel(id : number){ return this.http.get<Hotel> (environment.host + "/hotelById/" + id) }

	public getLoginByUsernamePassword(username : string, password : string)
	{
		const headers = new HttpHeaders({
		'Content-Type' : 'application/x-www-form-urlencoded'
		})
		const body = new HttpParams()
				.set('username', username)
				.set('password', password);
		return this.http.post<any>(environment.auth + "/login", body, {headers, observe : 'response'});
	}

	public getCityById(id: number)
	{
		return this.http.get<City>(environment.host + "/cityid/"+id);
	}

	public addNewHotel( hotel : Hotel)
	{
		return this.http.post<Hotel>(environment.host + "/hotels", hotel);
	}

	public addNewCity(city : City)
	{
		return this.http.post<City>(environment.host + "/city", city);
	}

	public changePicture(hotelId : number , file : FormData){
		return this.http.post<any>(environment.host + "/photo/" + hotelId  , file);
	}
}


