import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SHAService {
  private apiUrl = 'http://localhost:3012'

  constructor(private http: HttpClient) { }

  getSHAs(): any {
    return this.http.get(`${this.apiUrl}/sha`);
  }

  getClasses(): any {
    return this.http.get(`${this.apiUrl}/classes`);
  }
}
