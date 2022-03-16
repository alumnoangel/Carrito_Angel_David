import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from 'src/app/service/firestore.service';
import { Producto } from '../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  private path = 'Productos/';

  productos: Producto[] = [];

  constructor(public menuControler: MenuController,
    public firestoreService: FirestoreService) { 

    this.cargarProductos();
    
  }

  ngOnInit() {}

  openMenu() {
    //console.log('open menu');
    this.menuControler.toggle('principal');
  }
  

  cargarProductos(){
    this.firestoreService.getCollection<Producto>(this.path).subscribe(res =>{
      //console.log(res);
      this.productos = res;
    });
  }

}


