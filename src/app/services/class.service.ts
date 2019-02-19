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

  postNewClass(className: string)
  {
    var classID = '13';
    var form = new FormData;
    form.append('classID', classID);
    form.append('className', className);
    this.http.post("classes.php", form);
    console.log("Posted class " + className + " with ID " + classID);

    return classID;
  }

  postNewTakes(classID: string, userID: string)
  {
    var form = new FormData;
    form.append('classID', classID);
    form.append('userID', userID);
    this.http.post("takes.php", form);

    console.log("Posted new takes with classID=" + classID + " and userID=" + userID);
  }

}
