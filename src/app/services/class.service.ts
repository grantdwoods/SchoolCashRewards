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
    var form = new FormData;
    form.append('className', className);
    return this.http.post('classes.php', form);
    console.log('Posted class ' + className);
  }

  postNewTeaches(classID: string)
  {
    var form = new FormData;
    form.append('classID', classID);
    return this.http.post('teaches.php?', form);
  }

  postNewTakes(classID: string, userID: string)
  {
    var form = new FormData;
    form.append('classID', classID);
    form.append('userID', userID);
    return this.http.post("takes.php", form);

    console.log("Posted new takes with classID=" + classID + " and userID=" + userID);
  }

  putClassAwards(classID: number, awardAmount: number)
  {
    let body = `{"classID":"${classID}", "coupons":"${awardAmount}"}`;
    return this.http.put('classes.php', body, {});
  }

}
