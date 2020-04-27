import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpserviceService } from './httpservice.service';
import { environment } from 'src/environments/environment';
import { Book } from '../model/books.model';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  private bookURl = environment.bookUrl;
  private searchBookData = new Subject<any>();
  private _autoRefresh$ = new Subject();
  private httpOtions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  get autoRefresh$() {
    return this._autoRefresh$;
  }

  constructor(private http: HttpClient, private httpservice: HttpserviceService) { }

  getBookList(token: string): Observable<any> {
    return this.http.post<any>( this.bookURl + environment.getAllBooks,{},
      { headers: new HttpHeaders().set("token", localStorage.token) }
    );
  }

  addToBag(id:any, token:string): Observable<any> {
    console.log(id);
    return this.http.post<any>(`${this.bookURl}${environment.addToBag}?id=${id}` ,{},{ headers: new HttpHeaders().set("token", localStorage.token) });
  }

  getAllCartBooks(token:string): Observable<any> {
    return this.http.post<any>(this.bookURl + environment.getCartBooks,{},{headers: new HttpHeaders().set("token", localStorage.token)});
  }

  setSearchBookData(message: any) {
    console.log("set service", message);
    return this.searchBookData.next({ books: message });
  }
  getSearchBookData(): Observable<any> {
    console.log("get service");
    return this.searchBookData.asObservable();
  }

}
