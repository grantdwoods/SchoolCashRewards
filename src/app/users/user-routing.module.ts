import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { path: 'user-tabs', loadChildren: './user-tabs/user-tabs.module#UserTabsPageModule' },
  { path: 'award-modal', loadChildren: './user-tabs/student/student-info/award-modal/award-modal.module#AwardModalPageModule' },  { path: 'settings', loadChildren: './user-tabs/settings/settings.module#SettingsPageModule' },


];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
