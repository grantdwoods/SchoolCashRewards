import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { CatalogService } from '../../../services/catalog.service';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  private catalogOwners$ :Observable<object>;
  private hasCatalog :boolean = false;
  private editButtonText;
  private selectedUser:string;
  private catalogItems$: Observable<object>;
  private userID: string;
  private role: string;
  private editCatalog: boolean;

  constructor(private authService: AuthenticationService, private catalogService: CatalogService, private alertController: AlertController) {
    console.log("CATALOG-CONSTRUCTOR");
    this.userID = this.authService.getUserID();
    this.editButtonText= "Edit Catalog";
    this.editCatalog = false;
    this.role = this.authService.getRole();
  }

  ngOnInit() {
    console.log("CATALOG-ON INIT");
    this.initializeOwners();
  }

  initializeOwners(){
    this.catalogOwners$ = this.catalogService.getCatalogOwners();
    
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

  startCatalog(){
    this.catalogService.postNewCatalogItem(this.userID, 10, `My first Item`).subscribe(()=>this.initializeOwners());
  }

  isOnStandard(){
    if(!isNullOrUndefined(this.selectedUser))
    return this.selectedUser.startsWith("STD");
  }

  toggleEdit(){
    if(this.editCatalog == false){
      this.editCatalog = true;
      this.editButtonText = "Done Editing";
    }
    else{
      this.editCatalog = false;
      this.editButtonText = "Edit Catalog";
    }
  }

  logout(){
    this.authService.logout();
  }

  changeCatalog(){ 
    if(this.editCatalog){
      this.toggleEdit();
    }
    console.log(this.selectedUser);
    if(this.selectedUser){
      this.catalogItems$ = this.catalogService.getCatalog(this.selectedUser);
    }
  }
  
  changeCatalogWithID(userID:string){
    this.catalogItems$ = this.catalogService.getCatalog(userID);
    this.selectedUser = userID;
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header:"Add Item",
      inputs:[
        {name:"description", type:"text", id:"itemDescription", placeholder:"Item Description"},
        {name:"cost", type:"number", id:"itemCost", placeholder:"Item Cost"}
      ],
      buttons: [
        {text:'OK', handler: (alertData) => this.onAlertConfirm(alertData.description, alertData.cost)},
        {text:'Cancel'}
      ]
    });

    await alert.present();
  }

  onAlertConfirm(description:string, cost:number){
    this.catalogService.postNewCatalogItem(this.selectedUser, cost, description)
      .subscribe(() => this.changeCatalog());
  }

  removeCatalogItem(itemID:number){
    console.log(itemID);
    if(this.selectedUser == this.userID || this.role == 'a' && this.isOnStandard()){
      this.catalogService.deleteFromCatalog();
    }
  }
}