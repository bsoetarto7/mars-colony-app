import { Injectable } from '@angular/core';
import { Colonist } from '../models/colonist';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ColonistService  {
  colonistUrl = 'https://red-wdp-api.herokuapp.com/api/mars/colonists';

  constructor(private http: Http){}

  newColonist(newColonist:Colonist):Promise<Colonist>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let body = JSON.stringify({ newColonist });
    return this.http.post(this.colonistUrl, body, { headers: headers })
                    .toPromise()
                    .then(response => response.json().colonist)
                    .catch(this.handleError);
  }

  private handleError(error:any): Promise<any>{
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}