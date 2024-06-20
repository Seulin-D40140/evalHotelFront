import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { JwtTokenService } from 'src/app/services/jwt-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup
  user: User;
  error: string | undefined;
  connected: boolean = false;


  /**
   * Injection du form builder, du service auth et du router
   * initialisation du formulaire utilisateur
   * @param formBuilder 
   * @param authService service d'authentification
   * @param router 
   */
  constructor(private formBuilder: FormBuilder, public authService: AuthService, private router: Router, private jwtService : JwtTokenService) {
    this.user = authService.getUser();
    this.connected = authService.isConnected();
    this.userForm = this.formBuilder.group({
      username: [this.user.username, [Validators.required]],
      password: [this.user.password, [Validators.required]]
    });
  }

  ngOnInit(): void {
    // document why this method 'ngOnInit' is empty
  
  }

  /**
   * getter de l'e-mail pour la validation
   */
  get email() {
    return this.userForm.get('email');
  }

  /**
   * getter du mot de passe puser?: Useruser: Useruser: Userour la validation
   */
  get password() {
    return this.userForm.get('password');
  }

  

  /**
   * Fonction permettant de connecter un utilisateur
   * et de récupérer le token permettant l'accès aux
   * parties de l'application nécessitant une authorization
   */
  onLogin(form: FormGroup) {
    if (form.valid) {
      this.authService.login(form.value.username, form.value.password).subscribe({
        next : (response) => {
          let token = response.headers.get("Authorization");
          if(token){
            token = token.replace('Bearer ', '');
            this.authService.setUsername(form.value.username);
            this.jwtService.setToken(token);
            localStorage.setItem('access-token', JSON.stringify(token));
            localStorage.setItem('roles', btoa(JSON.stringify(this.jwtService.getUserRole())));
            this.router.navigateByUrl("/");
          }
        },
        error : () => this.error = "Username ou password erroné",
        complete : () => this.router.navigateByUrl("home")
      });
    } else {
      this.error = 'Veuillez remplir les champs';
    }
  }

  disconnect() {
    this.authService.disconnected();
    this.connected = false;
    this.router.navigateByUrl("home");
  }
}