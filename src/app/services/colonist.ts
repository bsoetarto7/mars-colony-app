import { Injectable } from '@angular/core';
import { Colonist, NewColonist } from '../models/colonist';
import { Http, Headers } from '@angular/http';
import { LocalStorageTest } from '../test/localstoragetest';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ColonistService  {
  colonistUrl = 'https://red-wdp-api.herokuapp.com/api/mars/colonists';

  storedColonist:Colonist;

  registeredSuccess = false;

  constructor(private http: Http, private localStorageTest:LocalStorageTest){}

  registerColonist(colonist:NewColonist): Promise<Colonist>{
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify({ colonist });
    return this.http.post(this.colonistUrl, body, { headers: headers })
                    .toPromise()
                    .then(response => {
                      if(this.localStorageTest.available()){
                        window.localStorage.setItem('colonist_id', JSON.stringify(response.json().colonist.id));
                      }else{
                        this.storedColonist =response.json().colonist;
                      }
                      this.registeredSuccess = true;
                      return response.json().colonist;
                    })
                    .catch(this.handleError);
  }

  private handleError(error:any): Promise<any>{
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  isRegistered(){
    return this.registeredSuccess;
  }
  
  getRegisteredColonist(){
    return this.storedColonist;
  }

}