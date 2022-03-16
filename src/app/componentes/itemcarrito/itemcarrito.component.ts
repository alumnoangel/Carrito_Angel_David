import { Component, Input, OnInit } from '@angular/core';
import { ProductoPedido } from 'src/app/models';
import { CarritoService } from '../../service/carrito.service';
import { CarritoComponent } from 'src/app/pages/carrito/carrito.component';

@Component({
  selector: 'app-itemcarrito',
  templateUrl: './itemcarrito.component.html',
  styleUrls: ['./itemcarrito.component.scss'],
})
export class ItemcarritoComponent implements OnInit {


  @Input() productoPedido: ProductoPedido;
  @Input() botones = true;

  constructor(
    public carritoService: CarritoService,
    public carritoComponent: CarritoComponent
    ) { }

  ngOnInit() {}

  addCarrito() {
    console.log('addCarrito()');
    this.carritoService.addProducto(this.productoPedido.producto);
    this.carritoComponent.getCantidad()
    this.carritoComponent.getTotal();
  }

  borrarCarrito(){
    this.carritoService.eliminarProducto(this.productoPedido.producto);
    this.carritoComponent.getCantidad()
    this.carritoComponent.getTotal();
  }

}
