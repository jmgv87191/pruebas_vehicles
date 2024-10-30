
export interface VehiclesReq {

    id:            number;
    no_inventario: number;

}


export interface LoginReq{
    email: string;
    password: string;
}

export interface LoginRes {
    status:  boolean;
    message: string;
    data:    Data;
    token:   string;
}

export interface Data {
    id:                number;
    name:              string;
    email:             string;
    username:          string;
    email_verified_at: null;
    created_at:        Date;
    updated_at:        Date;
}

export interface Detallerevision {
    subcategoriaId: number;
    subcategoria:   string;
    estado:         number ;
    observacion:    string;
}