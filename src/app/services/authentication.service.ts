import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/Storage'
import { HttpClient} from '@angular/common/http';
import { isNullOrUndefined } from 'util';

const JWT = 'jwt';
const ROLE = 'role';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService 
{
  BASEURL = "http://localhost/SchoolCashRewards_php/sp_auth/";
  authenticationState = new BehaviorSubject(false);
  storageState = new BehaviorSubject(false);

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
      this.storageState.next(true);

      if(setAuthSate){
        this.setAuthenticationState(true);
      }
    }
    catch(error){
      console.log(error);
      if(error['status'] == 401){
        this.presentToast(error['error']['err-message']);
      }
    }
  }

  async logout(){
    await this.storage.remove(JWT);
    await this.storage.remove(ROLE);

    this.storageState.next(false);    
    this.authenticationState.next(false);
  }

  isAuthenticated(): boolean{
    return this.authenticationState.value;
  }

  storageValuesAreSet(): boolean{
    return this.storageState.value;
  }

  async checkToken(){
    //could/ should check against back-end for valid token (not expired)
    this.jwt = await this.storage.get(JWT);
    this.role = await this.storage.get(ROLE);
    if(!isNullOrUndefined(this.jwt) && !isNullOrUndefined(this.role)){
      this.storageState.next(true);
      this.authenticationState.next(true);
    }
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
