import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  getCatalogOwners(){
    return this.http.get('catalogs.php?getOwners=true');
  }
}
