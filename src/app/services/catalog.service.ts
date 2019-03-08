import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  getCatalogOwners(): Observable<object>{
    return this.http.get('catalogs.php?getOwners=true');
  }

  getCatalog(userID: string): Observable<object>{
    return this.http.get(`catalogs.php?userID=${userID}`);
  }
}
