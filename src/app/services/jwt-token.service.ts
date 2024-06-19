import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  jwtToken!: string;
  decodedToken!: { [key: string]: string; };
  token : any;

  constructor() { }

  setToken(token : string){
    if(token) this.jwtToken = token;
    this.token = this.getToken();
  }

  getToken(){
    return localStorage.getItem('access-token');
  }
  
  /**
   * Fonction permettant de décoder le token
   */
  decodeToken(){
    if(this.jwtToken) this.decodedToken = jwtDecode(this.jwtToken);
    else this.decodedToken = {};
  }

  getDecodeToken(){
    return jwtDecode(this.jwtToken);
  }
  
  /**
   * Fonction permettant de récupérer le username
   * de l'utilisateur connecté
   * @returns le username ou null
   */
  getUsername(){
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['sub'] : null;
  }

  getUserRole(){
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['roles'] : null;
  }

  getExpirytime(){
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : null;
  }

  isTokenExpired(){
    const expiryTime = this.getExpirytime();
    if(expiryTime){
      return ((1000 * parseInt(expiryTime)) - (new Date()).getTime()) < 5000;
    } else return false;

  }

  /**
   * Fonction permettant nettoyer les attributs
   * du service
   */
  clearToken(){
    this.jwtToken = "";
    this.decodedToken = {};
  }
}