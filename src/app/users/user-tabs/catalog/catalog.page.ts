import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { CatalogService } from '../../../services/catalog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  constructor(private authService: AuthenticationService, private catalogService: CatalogService) {
    console.log("CONSTRUCTOR");
    this.userID = this.authService.getUserID();
  }

  private catalogOwners :Observable<object>;
  private hasCatalog :boolean = false;
  private selectedUser:string;
  private catalogItems: Observable<object>;
  private userID: string;

  ngOnInit() {
    console.log("ON INIT");
  }
  
  ionViewDidEnter(){
    console.log("DID ENTER");
    this.catalogOwners = this.catalogService.getCatalogOwners();
    this.catalogOwners.subscribe((data) => {
      Object.keys(data).map(key => {
        console.log(data);
        if(data[key]['strTeacherID'] == this.userID){
          this.hasCatalog = true;
          this.catalogItems = this.catalogService.getCatalog(this.userID);
        }
      });
    });
  }

  logout(){
    this.authService.logout();
  }

  changeCatalog(){ 
    console.log("Event fired");
    console.log(this.selectedUser);
    if(this.selectedUser){
      this.catalogItems = this.catalogService.getCatalog(this.selectedUser);
    }
  }
}

export interface CatalogItem{
  intSchoolID:number,
  intItemID: number,
  intCost: number,
  strDescription:string,
  strImageLocation:string,
  strTeacherID: string
}