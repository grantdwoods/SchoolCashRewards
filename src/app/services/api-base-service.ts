import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService implements HttpInterceptor{

  JWT :string;
  baseUrl: string = "http://localhost/SchoolCashRewards_php/sp_app/";
  constructor(private authService :AuthenticationService) { }

  onInit(){
  }

  intercept(req: HttpRequest<any>, next: HttpHandler)
  {

    var newRequest;
    // newRequest = req.clone({
    //   headers: req.headers.set("jwt", "TESTING")
    // });
    
    newRequest = req.clone();
    console.log(newRequest);
    return next.handle(newRequest);
  }
}
