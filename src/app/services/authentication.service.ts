import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/Storage'
import { HttpClient} from '@angular/common/http';

const JWT = 'jwt';
const ROLE = 'role';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService 
{
  BASEURL = "http://localhost/SchoolCashRewards_php/sp_auth/";
  authenticationState = new BehaviorSubject(false);
  jwt = null;
  role : string;
  constructor(private plt: Platform, private storage: Storage, 
    private http: HttpClient, private toastContoller: ToastController){ 
      
      this.plt.ready().then(()=> {
        this.checkToken();
    })
  }

  setAuthenticationState(authState:boolean){
    this.authenticationState.next(authState);
  }

  async login(username: string, password:string, setAuthSate: boolean){

    var form = new FormData();
    form.append('userID', username);
    form.append('passWord', password);
    
    try{
      var data = await this.http.post(this.BASEURL + 'log_in.php',form,{}).toPromise();
      
      this.role = data['role'];
      this.jwt = data['jwt'];

      await this.storage.set(JWT, data['jwt']);
      await this.storage.set(ROLE, data['role']);

      if(setAuthSate){
        this.setAuthenticationState(true);
      }
    }
    catch(error){
      this.presentToast(error['error']['err-message']);
    }
  }

  logout(){
    return this.storage.remove(JWT).then(
      ()=>{
        this.storage.remove(ROLE).then(
          () =>{
            this.authenticationState.next(false);
          });
    });
  }

  isAuthenticated(): boolean{
    return this.authenticationState.value;
  }

  checkToken(){
     return this.storage.get(JWT).then(res =>{
       if(res){
         this.jwt = res;
         this.storage.get(ROLE).then(
          res =>{
            if(res){
              this.role = res;
              this.authenticationState.next(true);
            }  
          });
       }
     });
  }

  getToken(){
    return this.jwt;
  }

  getRole(){
    return this.role;
  }

  async presentToast(message:string){
    const toast = await this.toastContoller.create({
      message: message,
      showCloseButton: false,
      position: 'middle',
      duration: 2000,
      color: 'primary'});
      toast.present();
  }
}
