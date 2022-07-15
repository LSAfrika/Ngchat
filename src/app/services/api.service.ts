import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL='http://localhost:3000/'
  constructor(private http:HttpClient) { }

  initialresponse(){
    return this.http.get(this.URL)
  }
}
