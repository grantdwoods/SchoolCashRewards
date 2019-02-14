import { Component, OnInit, Renderer, ViewChild, ElementRef, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from '../../../services/registration.service';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @ViewChild('schoolForm', {read: ElementRef}) schoolForm;
  @ViewChild('userForm', {read: ElementRef}) userForm;
  @ViewChild('progress', {read: ElementRef}) initProgress;
  @Input() newSchool:boolean;
  

  private schoolInfo: FormGroup;
  private userInfo: FormGroup;
  
  constructor(private renderer: Renderer, private registrationService: RegistrationService, 
    private formBuilder:FormBuilder,  private toastContoller: ToastController, private authService: AuthenticationService) {}

  ngOnInit() {
    console.log(this.newSchool);
    this.userInfo = this.formBuilder.group({
      schoolID: ['', Validators.compose([Validators.required, Validators.pattern("[0-9]*")])],
      userID: ['', Validators.required],
      password: ['', Validators.required],
      confirmPass:['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    },{
        validator: this.MustMatch('password', 'confirmPass')
      }
    );

    this.schoolInfo = this.formBuilder.group({
      schoolName: ['',Validators.required], 
      schoolCashName:['', Validators.required]
    });

  }

  ngAfterViewInit(){
    if(this.newSchool){
      setTimeout(()=>this.renderer.setElementStyle(this.schoolForm.nativeElement, 'opacity', '1'), 1000);
    }
    else{
      setTimeout(()=>this.renderer.setElementStyle(this.userForm.nativeElement, 'opacity', '1'), 1000);
    }
  }

  randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  async onUserSubmit() {
    try{
      var data = await this.registrationService.registerAccountWithAuth(this.userInfo, 0).toPromise();

      setTimeout(()=>this.renderer.setElementStyle(this.userForm.nativeElement, 'opacity', '0'), 1000);
      setTimeout(()=>this.renderer.setElementStyle(this.initProgress.nativeElement, 'opacity', '1'), 1000);

      await this.getJwtFromServer();
      await this.registrationService.registerAccountWithApp(this.userInfo).toPromise();

      this.authService.setAuthenticationState(true);
    }
    catch(error){
      if(error['status'] == 409){
        this.userInfo.controls.userID.setValue("");
        this.presentToast(error['error']['err-message']);
      }
      if(error['status'] == 400){
        this.userInfo.controls.schoolID.setValue("");
        this.presentToast(error['error']['err-message']);
      }
      else{
        console.log(error)
      }
    }
  }

  async getJwtFromServer(){
    var username =  this.userInfo.controls.userID.value;
    var password = this.userInfo.controls.password.value;
    await this.authService.login(username, password, false);
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
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
