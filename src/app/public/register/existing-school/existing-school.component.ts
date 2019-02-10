import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-existing-school',
  templateUrl: './existing-school.component.html',
  styleUrls: ['./existing-school.component.scss']
})
export class ExistingSchoolComponent implements OnInit {

  @ViewChild('regForm', {read: ElementRef}) regForm;
  @ViewChild('confirm', {read: ElementRef}) confirmView;

  // private schoolID:number;
  // private password: string;
  // private role: string = "t";
  // private userID: string;
  // private confirmPass: string;
  private passwordsMatch: boolean = false;
  private formGroup: FormGroup;

 

  constructor(private renderer: Renderer, private authService: AuthenticationService, private formBuilder:FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      schoolID: ['', Validators.compose([Validators.required, Validators.pattern("[0-9]*")])],
      userID: ['', Validators.required],
      password: ['', Validators.required],
      confirmPass:['', Validators.required],
      role: []
    },{
        validator: this.MustMatch('password', 'confirmPass')
      }
    );
  }

  ngAfterViewInit(){
    setTimeout(()=>this.renderer.setElementStyle(this.regForm.nativeElement, 'opacity', '1'), 1000);
  }

  onSubmit() {
    
    this.formGroup.controls.role.setValue('t');
    console.log(this.formGroup.value);
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
}
