import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { CatalogService } from '../../../services/catalog.service';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  constructor(private authService: AuthenticationService, private catalogService: CatalogService) {
    console.log("CATALOG-CONSTRUCTOR");
    this.userID = this.authService.getUserID();
  }

  private catalogOwners$ :Observable<object>;
  private hasCatalog :boolean = false;
  private selectedUser:string;
  private catalogItems$: Observable<object>;
  private userID: string;
  private role: string;
  private editStandard: boolean;

  ngOnInit() {
    console.log("CATALOG-ON INIT");

    this.catalogOwners$ = this.catalogService.getCatalogOwners();
    this.role = this.authService.getRole();

    this.catalogOwners$.subscribe((data) => {
      console.log(data);
      var stdKey;
      Object.keys(data).map(index => {
        let id = data[index]['strTeacherID'];
        if(id == this.userID){
          this.hasCatalog = true;
        }
        if(id.startsWith("STD")){
          stdKey = index;
        }
      });

      if(this.hasCatalog){
        this.changeCatalogWithID(this.userID);
      }
      else{
        this.changeCatalogWithID(data[stdKey]['strTeacherID']);
      }
    });
  }

  isOnStandard(){
    if(!isNullOrUndefined(this.selectedUser))
    return this.selectedUser.startsWith("STD");
  }

  toggleEditStandard(){
    this.editStandard = true;
  }
  ionViewDidEnter(){
    console.log("CATALOG-DID ENTER");
  }

  logout(){
    this.authService.logout();
  }

  changeCatalog(){ 
    console.log("CATALOG-Change event fired");
    console.log(this.selectedUser);
    if(this.selectedUser){
      this.catalogItems$ = this.catalogService.getCatalog(this.selectedUser);
    }
  }
  changeCatalogWithID(userID:string){
    this.catalogItems$ = this.catalogService.getCatalog(userID);
    this.selectedUser = userID;
  }
}