import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient, private authService:AuthenticationService) {
   }

   registerAccountWithAuth(formGroup: FormGroup, newSchool:number){
    var formData = new FormData();
    formData.append('userID', formGroup.value['userID']);
    formData.append('password', formGroup.value['password']);
    formData.append('role', 't');
    formData.append('schoolID', formGroup.value['schoolID']);
    formData.append('newSchool', newSchool.toString());

    return this.http.post(this.authService.BASEURL + 'registerUser.php',formData,{});
   }

   registerAccountWithApp(formGroup: FormGroup){
    var formData = new FormData();
    formData.append('firstName', formGroup.value['firstName']);
    formData.append('lastName', formGroup.value['lastName']);

    return this.http.post('teachers.php', formData,{});
   }
   
}