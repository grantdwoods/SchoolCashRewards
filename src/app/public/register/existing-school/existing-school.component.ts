import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from '../../../services/registration.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-existing-school',
  templateUrl: './existing-school.component.html',
  styleUrls: ['./existing-school.component.scss']
})
export class ExistingSchoolComponent implements OnInit {

  @ViewChild('regForm', {read: ElementRef}) regForm;

  private passwordsMatch: boolean = false;
  private formGroup: FormGroup;

  constructor(private renderer: Renderer, private registrationService: RegistrationService, 
    private formBuilder:FormBuilder,  private toastContoller: ToastController) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      schoolID: ['', Validators.compose([Validators.required, Validators.pattern("[0-9]*")])],
      userID: ['', Validators.required],
      password: ['', Validators.required],
      confirmPass:['', Validators.required]
    },{
        validator: this.MustMatch('password', 'confirmPass')
      }
    );
  }

  ngAfterViewInit(){
    setTimeout(()=>this.renderer.setElementStyle(this.regForm.nativeElement, 'opacity', '1'), 1000);
  }

  onSubmit() {
    this.registrationService.registerAccount(this.formGroup).subscribe(
      data =>{
        //goto next component, initialize app DB.
        console.log("we did it.");
      }, 
      error =>{
        this.presentToast(error['error']['err-message']);
        this.formGroup.controls.userID.setValue("");
      });
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
