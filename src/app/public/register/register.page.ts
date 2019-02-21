import { Component, OnInit, ViewChild, Renderer, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { ChildrenOutletContexts } from '@angular/router';
import { Observable, interval, timer } from 'rxjs';
import { registerContentQuery } from '@angular/core/src/render3';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  @ViewChild('choice', {read: ElementRef}) choice;

  hideRegisterSchool:boolean = false;
  newSchool: boolean = false;
  buttonClicked: boolean = false;
  constructor(private rednderer: Renderer) { }

  ngOnInit() {
    console.log("On register");
  }

  showNewSchoolForm(){
    this.newSchool = true;
    this.buttonClicked = true;
    this.hideRegister();
  }
  showExistingSchoolForm(){
    this.newSchool = false;
    this.buttonClicked = true;
    this.hideRegister();
  }

  hideRegister(){
    this.rednderer.setElementStyle(this.choice.nativeElement, 'opacity', '0');
    setTimeout(()=>this.hideRegisterSchool = true, 1000);
  }
}
//FOR ACESSING AN ARRAY OF ELEMENTREFS
  //@ViewChildren('RegisterSchool', {read: ElementRef}) registerSchoolChildren: QueryList<ElementRef>;
    // var children = this.registerSchoolChildren.toArray();
    // console.log(children);
    // for (let index = 0; index < children.length; index++) {
    //   this.rednderer.setElementStyle(children[index].nativeElement, 'opacity', '0');
    // }