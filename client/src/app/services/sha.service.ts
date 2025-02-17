import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SHAService {

  private readonly getClassesUrl = 'http://localhost:3012/classes';

  private httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      observe: 'body',
      responseType: 'json',
      /*
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
      */
      headers:{'Access-Control-Allow-Origin':'*'}
    };
  }

  public getClasses(): Observable<any> {
    console.log('calling: /classes');

    return this.http.get<string[]>(this.getClassesUrl, this.httpOptions);
  }
}
