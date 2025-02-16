import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Octokit} from 'octokit';

@Injectable({
  providedIn: 'root'
})
export class SHAService {

  private octokit = new Octokit({});
  private apiUrl = 'http://localhost:3012'

  constructor(private http: HttpClient) { }

  getSHAs(): any {
    return this.http.get(`${this.apiUrl}/sha`);
  }

  async getClasses(): Promise<any> {
    try {
      let data = ((await this.octokit.request(`GET ${this.apiUrl}/classes`, {}))).data;
      console.log(data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  }
}
