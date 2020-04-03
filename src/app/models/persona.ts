export interface Persona {
    idpersona?: string;
    idtelefono: string;
    iddireccion: string;
    cedula: string;
    nombres: string;
    apellidos: string;
    fechanacimiento: Date;
    email: string;
    password: string;
    estado: string;
    created_at?: Date;
}
