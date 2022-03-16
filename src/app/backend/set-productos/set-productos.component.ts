import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Producto } from 'src/app/models';
import { FirestorageService } from 'src/app/service/firestorage.service';
import { FirestoreService } from 'src/app/service/firestore.service';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})
export class SetProductosComponent implements OnInit {

  productos: Producto[] = []

  newProducto : Producto = {
    id:this.firestoreService.getId(),
    nombre: '',
    precioNormal: null,
    precioReducido: null,
    fecha: new Date,
    foto: ''
  };
  private path = 'Productos/';

  newImage = '';

  constructor(public menuControler: MenuController,
    public firestoreService: FirestoreService,
    public firestorageService: FirestorageService) { }

  ngOnInit() {
    this.getProductos();
  }

  openMenu() {
    //console.log('open menu');
    this.menuControler.toggle('principal');
  }
  guardarProducto(){
    this.firestoreService.createDoc(this.newProducto, this.path, this.newProducto.id);
    this.newProducto.id = this.firestoreService.getId();
    this.newProducto.nombre = '';
    this.newProducto.precioNormal = null;
    this.newProducto.precioReducido = null;
    this.newProducto.foto = '';
    this.newImage = '';
  }

  getProductos(){
    //Creo un observador que está viendo la base de datos todo el tiempo en tiempo real
    //Añado el <Producto> para indicarle que la respuesta es un array
    this.firestoreService.getCollection<Producto>(this.path).subscribe(respuesta => {
      this.productos = respuesta;
      //console.log(respuesta)
    });
  }

  borrarProducto(producto: Producto){
    this.firestoreService.deleteDoc(this.path, producto.id)
  }

  async subirImagenNueva(event: any){
    //Si hay un archivo cargado y estoy en la posicion 0
    // if (event.target.files && event.target.files[0]){
    //   //Uso la funcion FileReader que me permite leer archivos
    //   const reader = new FileReader();
    //   reader.onload=((image) => {
    //     //Capturo la imagen en newImage y le indico que es un string
    //     this.newImage = image.target.result as string;
    //   });
    //   reader.readAsDataURL(event.target.files[0]);
    // }
    const path = 'Producto';
    const nombre = 'prueba';
    const file = event.target.files[0];
    const res = await this.firestorageService.uploadImage(file, path, nombre);
    console.log('recibi respuesta de la promesa', res);

    console.log('fin de la funcion -> subirImagenNueva');
  }

  
}
