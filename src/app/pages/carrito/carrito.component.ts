import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Pedido } from 'src/app/models';
import { CarritoService } from 'src/app/service/carrito.service';
import { FirestoreService } from 'src/app/service/firestore.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {

  //pedido:Array<Pedido>=[];
  pedido: Pedido;
  total: number;
  cantidad: number;
  

  constructor(public menuControler: MenuController,
    public firestoreService: FirestoreService,
    public carritoService: CarritoService) { 

      this.leerCarrito();
      console.log(this.pedido);
    
  }

  ngOnInit() {}

  openMenu() {
    //console.log('open menu');
    this.menuControler.toggle('principal');
  }

  leerCarrito(){
    this.pedido = this.carritoService.getCarrito();
    this.getTotal();
    this.getCantidad();
    
  }

  getTotal(){
    this.total = 0;
    this.pedido.productos.forEach(producto => {
      this.total = (producto.producto.precioReducido) * producto.cantidad + this.total;
    });
    console.log(this.total);
  }

  getCantidad(){
    this.cantidad = 0;
    this.pedido.productos.forEach(producto => {
      this.cantidad = producto.cantidad + this.cantidad;
    });
  }

  realizarPedido(){
    window.alert('Pedido realizado con éxitos!');
  }
  
}
