export interface Promocion {
    idpromociones?: string;
    idproducto: string;
    descuento: string;
    fechainicio: Date;
    fechafin: Date;
    descripcion: string;
    estado: string;
    created_at?: Date;
}
