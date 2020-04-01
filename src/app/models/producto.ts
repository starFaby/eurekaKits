export interface Producto {
    idproducto?: any;
    idcategoria: string;
    nombre: string;
    image: File;
    precio: string;
    stock: string;
    estado: string;
    created_at?: Date;
}
