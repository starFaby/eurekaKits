export interface DetalleVenta {
    iddetalleventa?: number;
    id_factura: number;
    id_producto: number;
    cantidad: string;
    precio: number;
    total: number;
    estado: number;
    created_at?: Date;
}
