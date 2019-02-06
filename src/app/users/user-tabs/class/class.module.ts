import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClassPage } from './class.page';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: ClassPage
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
  declarations: [ClassPage]
})
export class ClassPageModule {}
