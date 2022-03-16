export interface Producto{
    id:string;
    nombre: string;
    precioNormal: number;
    precioReducido: number;
    fecha: Date;
    foto: string;
}

export interface Pedido {
    id: string;
    productos: ProductoPedido[];
    precioTotal: number;
    fecha: any;
 }
 
 export interface ProductoPedido {
     producto: Producto;
     cantidad: number;
 }