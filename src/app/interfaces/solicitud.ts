export interface Solicitud {
    id?:number;
    //tipo?:string;
    familia?:number;//tendria que tener
    fecha?:string;
    hora?:string;
    arbol?:number;
    organizacion?:number;
    acepta_org:boolean;
    acepta_familia:boolean;
    cantidad?:string;
    recolector?:number;
}
