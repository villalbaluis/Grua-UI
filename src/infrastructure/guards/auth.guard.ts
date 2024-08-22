import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router:Router,
    //private localStorageSrv: LocalStorageService
    ){
  }

  stateLogin = JSON.parse(localStorage.getItem("datalopgin")!)
  


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.stateLogin);
    // SI LA RESPUESTA ES TRUE ENTONCES REDIRECCIONA AL INICIO CON 
    // this.router.navigate(["/incio"])  Y RETORNA TRUE
    // SI LA ESPUESTA ES FALSE RETOERNA FALSE
    return true;
      
  }
}
