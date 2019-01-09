import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { e } from '@angular/core/src/render3';

const JWT = 'jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService 
{
  authenticationState = new BehaviorSubject(false);
  
  constructor(private plt: Platform, private storage: Storage) { 
    this.plt.ready().then(()=> {
      this.checkToken();
    })
  }

  login(){
    return this.storage.set(JWT, 'sampletoken').then(res => {
      this.authenticationState.next(true);
    });
  }

  //alternative promise syntax, if we dont need information returned. 
  logout(){
    return this.storage.remove(JWT).then(()=> {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated(): boolean{
    return this.authenticationState.value;
  }

  //ask the backend if the token is good
  checkToken(){
    return this.storage.get(JWT).then(res => {
      if(res){
        this.authenticationState.next(true);
      }
    });
  }
}
