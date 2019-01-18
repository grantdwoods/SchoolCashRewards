import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  
  constructor(private http: HttpClient) { }

  getStudentsInClass(JWT:string)
  {   
    return this.http.get("http://localhost/SchoolCashRewards_php/sp_app/takes.php?classID=10", 
    {headers:{'jwt': JWT, "Content-Type":"application/json"}});
  }
}
