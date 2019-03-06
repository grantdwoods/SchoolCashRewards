import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService implements HttpInterceptor{
  baseUrl: string = "http://localhost:999/SchoolCashRewards_php/sp_app/";
  constructor(private authService: AuthenticationService) { }

  onInit(){
  }

  intercept(req: HttpRequest<any>, next: HttpHandler)
  {
      //console.log(req);

    if(!this.authService.storageValuesAreSet()){
      return next.handle(req);
    }
    var newRequest;
    var url = this.baseUrl + req.url;
    newRequest = req.clone({
      headers: req.headers.set("jwt", this.authService.getToken()),
      url: url
    });
    return next.handle(newRequest);
  }//end intercept
}//end class
