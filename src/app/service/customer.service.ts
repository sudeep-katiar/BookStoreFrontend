import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private Customer_URL = environment.customerUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  customerDetails(customer: any): Observable<any> {
    console.log(customer);
    return this.http.post<any>(this.Customer_URL + environment.details, customer, this.httpOptions);
  }
}
