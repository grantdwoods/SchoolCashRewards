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

  getClassByStudentID(studentID: string)
  {
    return this.http.get("classes.php?studentID=" + studentID);
  }

  getClassForTeacher()
  {
    return this.http.get("teaches.php");
  }

  getTeacherInfo(teacherID: string)
  {
    return this.http.get("teachers.php?userID=" + teacherID);
  }

  postNewClass(className: string)
  {
    var form = new FormData;
    form.append('className', className);
    return this.http.post('classes.php', form);
    console.log('Posted class ' + className);
  }

  postNewTeaches(classID: number)
  {
    var form = new FormData;
    form.append('classID', classID.toString());
    return this.http.post('teaches.php?', form);
  }

  postNewTakes(classID: number, userID: string)
  {
    var form = new FormData;
    form.append('classID', classID.toString());
    form.append('userID', userID);
    return this.http.post("takes.php", form);

    console.log("Posted new takes with classID=" + classID + " and userID=" + userID);
  }

  putClassAwards(classID: number, awardAmount: number)
  {
    let body = `{"classID":"${classID}", "coupons":"${awardAmount}"}`;
    return this.http.put('classes.php', body, {});
  }

  putClassName(classID: number, className: string)
  {
    let body = `{"classID":"${classID}", "className":"${className}"}`;
    return this.http.put('classes.php', body);
  }

  removeStudentFromClass(studentID: string)
  {
    return this.http.delete('takes.php?userID=' + studentID);
  }

}
