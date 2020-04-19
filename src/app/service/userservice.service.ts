import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private queryParam = new Subject<any>();
  private API_URL = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  registration(user: any): Observable<any> {
    console.log(user);
    return this.http.post<any>(this.API_URL + environment.registerURL, user, this.httpOptions);
  }

  login(user: any): Observable<any> {
    console.log(user);
    return this.http.post<any>(this.API_URL + environment.loginURL, user, this.httpOptions);
  }

  setQueryParam(message: any) {
    this.queryParam.next({ id: message });
  }

  getQueryParam(): Observable<any> {
    return this.queryParam.asObservable();
  }
  
}
