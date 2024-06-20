import { Injectable } from '@angular/core';
import { User } from '../Models/User.model';
import { JwtTokenService } from './jwt-token.service';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userConnected : User = new User("","",[]);
  username : string = "";
  token : any;

  //initialisation du tableau users
  constructor(private apiService : ApiServiceService, private jwtService : JwtTokenService) { 
      this.token = this.getToken();
  }

  /**
   * Fonction permettant de vérifier si l'utilisateur est connecté
   * @return vrai si l'e-mail et le mot de passe sont les mêmes que ceux du tableau users 
   */
  login(username : string, password : string)  {
    return this.apiService.getLoginByUsernamePassword(username, password);
  }

  disconnected() {
    this.jwtService.clearToken();
    localStorage.removeItem('access-token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
  }
  

  /**
   * Fonction qui stocke les données cryptées dans le local storage
   * @param user 
   */
  saveUser(user : User){
    localStorage.setItem('user', btoa(JSON.stringify(user)));
  }

  /**
   * Fonction pour récupérer les données de l'utilisateur depuis le local storage
   * @returns les données décryptées ou un utilisateur vide
   */
  getUser() : User{
    let userData = localStorage.getItem('user');
    if(userData)
      return JSON.parse(atob(userData));
    else return new User("", "", []);
  }

  setUsername(username : string){
    localStorage.setItem('username', btoa(JSON.stringify(username)));
  }

  /**
   * Fonction pour vérifier que le rôle de l'utilisateur
   * @returns vrai si l'utilisateur a le rôle Admin
   */
  isAdmin() : boolean{
    let role = this.getRoles();
    if(role && role?.length > 0){
      if(role.includes("ADMIN")) return true;
    }
    return false;
  }

  isGerant() : boolean{
    let role = this.getRoles();
    if(role && role?.length > 0){
      if(role.includes("GERANT")) return true;
    }
    return false;
  }

  /**
   * Fonction pour vérifier que le rôle de l'utilisateur
   * @returns vrai si l'utilisateur a le rôle User
   */
  isUser(): boolean{
    let role = this.getRoles();
    if(role && role?.length > 0){
      if(role.includes("USER")) return true;
    }
    return false;
  }

  isConnected() {
    return this.getToken() != null; 
  }

  getToken(){
    return localStorage.getItem('access-token');
  }

  /**
   * Fonction permettant de récupérer le username
   * depuis le local storage en le décryptant
   * @returns username de l'utilisateur connecté
   */
  getUsername(){
    let username = localStorage.getItem('username');
    if(username) return this.username = JSON.parse(atob(username));
  }

  /**
   * Fonction permettant de récupérer les roles
   * stockés dans le local storage
   * @returns role de l'utilisateur connecté
   */
  getRoles(){
    let roles = localStorage.getItem('roles');
    if(roles) return JSON.parse(atob(roles));
  }
  
}