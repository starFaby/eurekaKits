export interface Factura {
    idfactura?: string;
    id_persona: string;
    numfactura: string;
    subtotal: string;
    dto: string;
    iva: string;
    total: string;
    estado: string;
    created_at?: Date;
}
