import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	isUserLoggedIn = false;

	constructor(public authService : AuthService) { }

	ngOnInit(): void 
	{
		let storeData = localStorage.getItem('isLoggedIn');
		if(storeData != null && storeData == "true")
		{
			this.isUserLoggedIn = true;
		}else 
		{
			this.isUserLoggedIn = false;
		}
	}
}
