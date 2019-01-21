import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/Storage'
import { HttpClient, HttpHeaders } from '@angular/common/http';

const JWT = 'jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService 
{
  BASEURL = "http://localhost/SchoolCashRewards_php/";
  authenticationState = new BehaviorSubject(false);
  
  constructor(private plt: Platform, private storage: Storage, private http: HttpClient) { 
    this.plt.ready().then(()=> {
      this.checkToken();
    })
  }

  login(username: string, password:string){

    var form = new FormData();
    form.append('userID', username);
    form.append('passWord', password);

    this.http.post(this.BASEURL + 'sp_auth/log_in.php',form,{}).subscribe(
      data =>{
        console.log(data['jwt']);
        this.storage.set(JWT, data['jwt']).then(res =>{
           this.authenticationState.next(true);
           });
        },
        error => {
          console.log(error['error']['err-message']);
        }
      );
  }

  logout(){
    return this.storage.remove(JWT).then(()=> {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated(): boolean{
    return this.authenticationState.value;
  }

  checkToken(){
     return this.storage.get(JWT).then(res => {
       if(res){
         this.authenticationState.next(true);
       }
     });
  }
  getToken(){
    return this.storage.get(JWT);
  }
}
