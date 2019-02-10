import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-existing-school',
  templateUrl: './existing-school.component.html',
  styleUrls: ['./existing-school.component.scss']
})
export class ExistingSchoolComponent implements OnInit {

  @ViewChild('form', {read: ElementRef}) form;
  @ViewChild('confirm', {read: ElementRef}) confirmView;

  private schoolID:number;
  private password: string;
  private role: string = "t";
  private userID: string;
  private confirmPass: string;


  constructor(private renderer: Renderer) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    setTimeout(()=>this.renderer.setElementStyle(this.form.nativeElement, 'opacity', '1'), 1000);
  }

  compareInput(){
    if(this.password == this.confirmPass){
      //this.renderer.setElementStyle(this.confirmView.nativeElement, 'background-color', 'white');
    }
    else{
      //this.renderer.setElementStyle(this.confirmView.nativeElement, 'background-color', 'white');
    }
  }
}
