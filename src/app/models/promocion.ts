export interface Promocion {
    idpromociones?: string;
    idproducto: string;
    dto: string;
    fechainicio: Date;
    fechafin: Date;
    descripcion: string;
    estado: string;
    created_at?: Date;
}
