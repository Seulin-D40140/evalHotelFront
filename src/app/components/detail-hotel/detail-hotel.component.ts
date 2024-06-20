import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/Models/City.model';
import { Hotel } from 'src/app/Models/Hotel.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-detail-hotel',
	templateUrl: './detail-hotel.component.html',
	styleUrls: ['./detail-hotel.component.css']
})
export class DetailHotelComponent implements OnInit {

	listCity : City[] | undefined;
	hotel : Hotel | undefined;
	URLStr : string = '';
	catById : City | null = null ;
	error: any;
	imageNam : number = 0;
	trainingForm!: FormGroup;
	isUpdateForm : boolean | undefined;
	selectedPicture: File | null = null;

	constructor(private route : ActivatedRoute , private apiService : ApiServiceService,
				public authService : AuthService , private router : Router , 
				private formBuilder : FormBuilder
	) { }

	ngOnInit(): void 
	{
		const HotelId = this.route.snapshot.paramMap.get('id');
			if(HotelId) this.apiService.getHotel(+HotelId).subscribe(Hotel => this.hotel = Hotel);
		this.URLStr = environment.host;
		this.initForm()
		this.getAllCitys()
		this.URLStr = environment.host;
	}

	initForm()
	{
		
		const urlSegments = this.router.url.split('/');
		const trainingId = +urlSegments[urlSegments.length - 1];
		this.isUpdateForm = !isNaN(trainingId);
		this.trainingForm = this.formBuilder.group(
		{
			id : [trainingId ? trainingId : ''],
			name : ['', [Validators.required]],
			description : ['', [Validators.required]],
			address : ['', [Validators.required]],
			price : ['', [Validators.required]],
			city : ['', Validators.required],
			imageNam: [null],
			place : [1]
		});
		if(this.isUpdateForm)
		{
			this.apiService.getHotel(trainingId).subscribe((data) => 
			{
				this.catById = data.city;
				if(this.trainingForm)
					{
					this.getCityById(data.city.id);
					this.imageNam = data.id;
					this.trainingForm.patchValue(
					{
						name : data.name,
						description : data.description,
						price : data.price,
						city : data.city.name,
						address : data.address,
						place : data.nbPlace
					})
				}
			});
		}
	}

	getCityById(id : number)
	{
		this.apiService.getCityById(id).subscribe({
			next : (data) => {this.catById = data},
			error : (err) => this.error = err.message,
			complete : () => this.error = null
		})
	}

	onSubmit(form : FormGroup){
		this.apiService.getCityById(form.value.city).subscribe({
			next : (data) => this.catById = data,
			error : (err) => this.error = err.message,
			complete : () => {
				if(this.catById != null && form.valid)
				{
					let hotel = new Hotel(form.value.id , form.value.name , form.value.description , form.value.address , form.value.price , form.value.place , "default.png" , this.catById)
					
					this.apiService.addNewHotel(hotel).subscribe({
						next:(data) => { this.changePicture(data.id); },
						error : (err) => this.error = err.message,
						complete : () => this.router.navigate(['/home'])
					});
				}
			}
		})
	}

	changePicture(hotelId: number) 
	{
		if (this.selectedPicture) 
		{
			console.log(this.selectedPicture)
			const data = new FormData();
			data.append("file" , this.selectedPicture)
			this.apiService.changePicture(hotelId , data).subscribe(
				(response) => console.log(response),
				(error) => console.log("bad request upload imgs changePicture" , error)
			)
		}
	}

	get name()
	{
		return this.trainingForm.get('name');
	}

	/**
	 * getter de la description
	 * pour vérifier le champ du formulaire
	 */
	get description()
	{
		return this.trainingForm.get('description');
	}

	/**
	 * getter du prix
	 * pour vérifier le champ du formulaire
	 */
	get price()
	{
		return this.trainingForm.get('price');
	}

	getAllCitys()
	{
	this.apiService.getAllCitys().subscribe(
		{
		next : (data) => 
		{
				this.listCity = data
			if (data.length > 0) 
			{
				//inject la 1er category dans le form , pour eviter le blanc lors de l'update/add training
				this.trainingForm.get('city')?.setValue(this.catById?.id);
			}
		},
		error : (err) => this.error = err.message,
		complete : () => this.error = null
		})
	}

	onPictureSelect(event: any) 
	{
		this.selectedPicture = event.target.files[0];
	}
}
