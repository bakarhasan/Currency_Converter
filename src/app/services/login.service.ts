import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { TblStudents } from 'src/app/services/tbl-user-login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/cffa0bea26c6f5da344ce187/latest/';

  constructor(private http: HttpClient) { }

   // Fetch exchange rates for any base currency
   getRates(baseCurrency: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${baseCurrency}`);
  }

}
