import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/Models/City.model';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
    selector: 'app-add-city-form',
    templateUrl: './add-city-form.component.html',
    styleUrls: ['./add-city-form.component.css']
})
export class AddCityFormComponent implements OnInit {
//variables
trainingForm!: FormGroup;
isUpdateForm : boolean | undefined;

error: any;

//injection de form builder, du service api et du router
constructor(private formBuilder : FormBuilder, private apiService : ApiServiceService, 
            private router : Router) { 
}

ngOnInit(): void 
{
    this.initForm();
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
        postalCode : ['', [Validators.required]]
    });
    
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
get postaCode()
{
    return this.trainingForm.get('postalCode');
}

/**
 * Fonction pour soumettre soit le formulaire d'ajout
 * ou le formulaire de modification
 * @param form le formulaire
 */
onSubmit(form : FormGroup){
    
            let city = new City(form.value.id , form.value.name , form.value.postalCode)
            
            this.apiService.addNewCity(city).subscribe({
                next:(data) => console.log(data),
                error : (err) => this.error = err.message,
                complete : () => this.router.navigate(['/home'])
            });
}
}
