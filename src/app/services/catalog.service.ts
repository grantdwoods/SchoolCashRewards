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

  postNewCatalogItem(userID:string, cost:number, description:string): Observable<object>{
    let formData = new FormData();
    formData.append("userID", userID);
    formData.append("cost", cost.toString());
    formData.append("description", description);
     
    return this.http.post(`catalogs.php`,formData);
  }

  postNewCatalogRemove(itemID:number, userID:string){
    let formData = new FormData();
    formData.append("itemID",itemID.toString());
    formData.append("userID", userID);
    return this.http.post(`catalogremoves.php`,formData);
  }

  deleteFromCatalog(itemID:number, userID:string){
    return this.http.delete(`catalogs.php?itemID=${itemID}&userID=${userID}`);
  }

  putCatalogItem(json:string){
    return this.http.put(`catalogs.php`, json);
  }
}
