import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ColonistService } from '../services/colonist';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private colonistService: ColonistService, private router:Router) {}

  canActivate() {
    if(this.colonistService.isRegistered()){
      return true;
    }else{
      this.router.navigate(['/']);
    }
    return false;
  }
}