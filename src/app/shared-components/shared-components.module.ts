import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MainHeaderComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports:[MainHeaderComponent]
})
export class SharedComponentsModule { }
