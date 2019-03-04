import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClassPage } from './class.page';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { ShowClassComponent } from './show-class/show-class.component';

const routes: Routes = [
  {
    path: '',
    component: ClassPage
  },
  {
    path: './add-class',
    loadChildren: './add-class/add-class.module#AddClassPageModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  declarations: [ClassPage, ShowClassComponent]
})
export class ClassPageModule {}
