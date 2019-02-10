import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-existing-school',
  templateUrl: './existing-school.component.html',
  styleUrls: ['./existing-school.component.scss']
})
export class ExistingSchoolComponent implements OnInit {

  @ViewChild('form', {read: ElementRef}) form;
  @ViewChild('confirm', {read: ElementRef}) confirmView;

  // private schoolID:number;
  // private password: string;
  // private role: string = "t";
  // private userID: string;
  // private confirmPass: string;
  private passwordsMatch: boolean = false;
  formData = {};

  constructor(private renderer: Renderer) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    setTimeout(()=>this.renderer.setElementStyle(this.form.nativeElement, 'opacity', '1'), 1000);
  }

  compareInput(){
    if(this.formData['password'] == this.formData['confirmPass']){
      console.log('match');
      this.renderer.setElementStyle(this.confirmView.nativeElement, 'color', 'black');
      this.passwordsMatch = true;
    }
    else{
      console.log('no match');
      this.renderer.setElementStyle(this.confirmView.nativeElement, 'color', 'red');
      this.passwordsMatch = false;
    }
  }

  onSubmit() {
    console.log(this.formData);
  }
}
