import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/Models/City.model';
import { Hotel } from 'src/app/Models/Hotel.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-hotel-form',
  templateUrl: './add-hotel-form.component.html',
  styleUrls: ['./add-hotel-form.component.css']
})
export class AddHotelFormComponent implements OnInit {

  //variables
	listCity : City[] | undefined;
	training : Hotel | undefined;
	trainingForm!: FormGroup;
	isUpdateForm : boolean | undefined;
	selectedCategory : number | null = null ;
	catById : City | null = null ;
	selectedPicture: File | null = null;
	selectedCategoryId: number | null = null;
	
	URLStr : string = '';
	imageNam : string = '';
	error: any;

	//injection de form builder, du service api et du router
	constructor(private formBuilder : FormBuilder, private apiService : ApiServiceService, 
				private router : Router) { 
	}

	ngOnInit(): void 
	{
		this.initForm();
		this.getAllCitys();
		this.URLStr = environment.host;
	}

	/**
	 * Fonction pour initialiser le formulaire
	 * si c'est un formulaire de mise à jour de formation,
	 * les données sont insérer aux champs du formaulaires
	 */
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
				if(this.trainingForm)
					{
					this.getCityById(data.city.id);
					this.imageNam = data.imgName;
					this.trainingForm.patchValue(
					{
						name : data.name,
						description : data.description,
						price : data.price,
						city : data.city,
            address : data.address,
						place : data.nbPlace
					})
				}
			});
		}
	}

	/**
	 * getter du nom de la formation
	 * pour vérifier le champ du formulaire
	 */
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

	/**
	 * Fonction pour soumettre soit le formulaire d'ajout
	 * ou le formulaire de modification
	 * @param form le formulaire
	 */
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
				this.trainingForm.get('category')?.setValue(data[0].id);
			}
		},
		error : (err) => this.error = err.message,
		complete : () => this.error = null
	})
	}

	getCityById(id : number)
	{
		this.apiService.getCityById(id).subscribe({
			next : (data) => this.catById = data,
			error : (err) => this.error = err.message,
			complete : () => this.error = null
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

	onPictureSelect(event: any) 
	{
		this.selectedPicture = event.target.files[0];
	}

}
