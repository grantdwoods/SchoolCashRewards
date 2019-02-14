import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  
  constructor(private http: HttpClient) { }

  getStudentsInClass(classID: number)
  {   
    return this.http.get("takes.php?classID=" + classID);
  } 

  getClassesInSchool()
  {
    return this.http.get("classes.php");
  }

  getClassByID(classID: number)
  {
    return this.http.get("classes.php?classID=" + classID);
  }

  getClassForTeacher()
  {
    return this.http.get("teaches.php");
  }

}
