import { Component, OnInit, Renderer, ViewChild, ElementRef, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from '../../../services/registration.service';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication.service';
import { userInfo } from 'os';

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
  private showSchoolForm: boolean;
  
  constructor(private renderer: Renderer, private registrationService: RegistrationService, 
    private formBuilder:FormBuilder, private authService: AuthenticationService, private alertController: AlertController) {}

  ngOnInit() {
    this.showSchoolForm = this.newSchool;

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

  switchToUserForm(): void{
    setTimeout(() => this.showSchoolForm = false, 1000);
    setTimeout(() => this.renderer.setElementStyle(this.userForm.nativeElement, 'opacity', '1'), 1000);
  }

  async onUserSubmit(): Promise<void>{
    try{
      var data = await this.registrationService.registerAccountWithAuth(this.userInfo, this.newSchool).toPromise();

      setTimeout(()=>this.renderer.setElementStyle(this.userForm.nativeElement, 'opacity', '0'), 1000);
      setTimeout(()=>this.renderer.setElementStyle(this.initProgress.nativeElement, 'opacity', '1'), 1000);

      await this.getJwtFromServer();
      if(this.newSchool){
        await this.registrationService.registerSchoolWithApp(this.schoolInfo).toPromise();
      }
      await this.registrationService.registerAccountWithApp(this.userInfo).toPromise();

      this.authService.setAuthenticationState(true);
    }
    catch(error){
      if(error['status'] == 409){
        this.userInfo.controls.userID.setValue("");
        this.authService.presentToast(error['error']['err-message']);
      }
      if(error['status'] == 400){
        this.userInfo.controls.schoolID.setValue("");
        this.authService.presentToast(error['error']['err-message']);
      }
      else{
        console.log(error)
      }
    }
  }

  async onSchoolSubmit(): Promise<void>{
    let data = await this.generateSchoolCode();
    this.presentAlert(data);
  }

  onAlertConfirm(schoolID:number): void{
    this.userInfo.get("schoolID").setValue(schoolID);
    this.userInfo.controls.schoolID.disable();
    this.switchToUserForm();
  }
  
  async generateSchoolCode(): Promise<number>{
    let schoolExists = true;
    let count = 0;
    let schoolCode = 0;

    while(schoolExists && count < 10)
    {
      schoolCode = Math.floor(100000 + Math.random() * 900000);
      let data = await this.registrationService.checkForExistingSchool(schoolCode).toPromise();
      schoolExists = data['schoolExists'];
      count ++;
    }
    return schoolCode;
  }

  async getJwtFromServer(): Promise<void>{
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

  async presentAlert(schoolID:number): Promise<void> {
    const alert = await this.alertController.create({
      header:"School Code: " + schoolID ,
      subHeader: 'This is your School Code!',
      message: "Save it somewhere!<br/> <br/> Other staff members will need this code to register an account with your school.",
      buttons: [{text:'OK', handler: () => this.onAlertConfirm(schoolID)}]
    });

    await alert.present();
  }
  
}
