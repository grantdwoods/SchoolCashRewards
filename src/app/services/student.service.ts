import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  getStudentInfo(userID: string)
  {
    return this.httpClient.get('students.php?userID=' + userID);
  }

  postStudentInfo(userID: string, firstName: string, lastName: string)
  {
    var form = new FormData;
    form.append('userID', userID);
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    this.httpClient.post('students.php', form);
    console.log('Class registered');
  }
  
}
