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
}
