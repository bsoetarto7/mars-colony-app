import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BlogService {
  blogUrl = 'http://fourth.academy.red/wp-json/wp/v2/posts';

  constructor(private http:Http){}

  getBlog(): Promise<any[]>{
    return this.http.get(this.blogUrl)
             .toPromise()
             .then((response) => response.json())
             .catch(this.handleError);
  }

  private handleError(error:any): Promise<any>{
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}