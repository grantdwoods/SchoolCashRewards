import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  constructor(private http:HttpClient, private authService:AuthenticationService) {}

  registerAccountWithAuth(formGroup: FormGroup, newSchool:boolean){
      let registerNewSchool = newSchool ? 1:0;
      let role = newSchool ? 'a': 't';

      var formData = new FormData();
      formData.append('userID', formGroup.value['userID']);
      formData.append('password', formGroup.value['password']);
      formData.append('role', role);
      formData.append('schoolID', formGroup.controls['schoolID'].value);
      formData.append('newSchool', registerNewSchool.toString());

      return this.http.post(this.authService.BASEURL + 'registerUser.php',formData,{});
  }

    registerAccountWithApp(formGroup: FormGroup)
    {
        //debugger;
        var formData = new FormData();
        formData.append('firstName', formGroup.value['firstName']);
        formData.append('lastName', formGroup.value['lastName']);
        return this.http.post('teachers.php', formData, {});
    }

  //schoolID is pulled out of JWT in schools.php
    registerSchoolWithApp(formGroup: FormGroup)
    {
        let formData = new FormData();
        formData.append('schoolName', formGroup.value['schoolName']);
        formData.append('cashName', formGroup.value['schoolCashName']);

        return this.http.post('schools.php', formData, {});
    }
  
  checkForExistingSchool(schoolCode:number){
    return this.http.get(this.authService.BASEURL + 'registerUser.php?schoolID=' + schoolCode);
  }
   
}