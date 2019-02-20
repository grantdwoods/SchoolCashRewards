//Note: This module is included in user-routing.module.ts
//If this page needs to be removed or relocated, then the reference in user-routing.module.ts needs to be changed as well.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AwardModalPage } from './award-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AwardModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AwardModalPage]
})
export class AwardModalPageModule {}
