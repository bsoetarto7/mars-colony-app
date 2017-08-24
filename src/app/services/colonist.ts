import { Injectable } from '@angular/core';
import { Colonist, NewColonist } from '../models/colonist';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ColonistService  {
  colonistUrl = 'https://red-wdp-api.herokuapp.com/api/mars/colonists';

  storedColonist:Colonist;

  registeredSuccess = false;

  constructor(private http: Http, private router:Router){}

  registerColonist(colonist:NewColonist): Promise<Colonist>{
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify({ colonist });
    return this.http.post(this.colonistUrl, body, { headers: headers })
                    .toPromise()
                    .then(response => {
                      this.storedColonist =response.json().colonist;
                      this.registeredSuccess = true;
                      return response.json().colonist
                    })
                    .catch(this.handleError);
  }

  private handleError(error:any): Promise<any>{
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  canActivate(){
    if(this.registeredSuccess){
      this.router.navigate(['encounters']);
      return true;
    }else{
      this.router.navigate(['/']);
    }
    return false;
  }
  getRegisteredColonist(){
    console.log(this.storedColonist);
    return this.storedColonist;
  }

}