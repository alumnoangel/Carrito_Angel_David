import { Injectable } from '@angular/core';
import { IonItem } from '@ionic/angular';
import { Pedido, Producto, ProductoPedido } from '../models';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
 private pedido:Pedido;
 path = 'carrito/';
 uid = 'cliente';
  constructor(public firestoreService: FirestoreService) { 
    this.leerCarrito();
  }
leerCarrito(){
  const path = "Productos/" + this.uid +"/" + this.path;
  this.firestoreService.getDoc(path, this.uid);
    
    this.iniciarCarrito();
  
}
iniciarCarrito(){
  this.pedido = {
    id: this.uid,
    
    productos: [],
    precioTotal: null,
    
    fecha: new Date(),
    
  };
}
getCarrito()
{

  return this.pedido;
}
addProducto(productos:Producto){
  const item = this.pedido.productos.find(productoPedido => {
  return (productoPedido.producto.id === productos.id);
});
  if (item !== undefined){
    item.cantidad ++;
  }else{
    const add:ProductoPedido = {
      cantidad:1,
      producto:productos
    };
    this.pedido.productos.push(add);
  }
  console.log('en add pedido ->',this.pedido);
  const path = "Productos/" + this.uid +"/" + this.path;
  this.firestoreService.createDoc(this.pedido,path,this.uid).then(() =>{
    console.log("Añadido con exito")
  });
  }

  eliminarProducto(producto:Producto){
    console.log('removeProducto ->', this.uid);
      if (this.uid.length) {
        let position = 0;
        const item = this.pedido.productos.find( (productoPedido, index) => {
          position = index;
          return (productoPedido.producto.id === producto.id)
        });
        if (item !== undefined) {
          item.cantidad --;
          if (item.cantidad === 0) {
            this.pedido.productos.splice(position, 1);
          }
          console.log('en remove pedido -> ', this.pedido);
          const path = 'Clientes/' + this.uid + '/' + this.path;
          this.firestoreService.createDoc(this.pedido, path, this.uid).then( () => {
              console.log('removido con exito');
          });
      }
    }

  }

  initCarrito() {
    this.pedido = {
        id: this.uid,
        productos: [],
        precioTotal: null,
        fecha: new Date()
    };
}

  
}
