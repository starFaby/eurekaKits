export interface DetalleVenta {
    iddetalleventa?: string;
    idfactura: string;
    idproducto: string;
    cantidad: string;
    precio: string;
    total: string;
    estado: string;
    created_at?: Date;
}
