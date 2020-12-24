export class NuevoUsuario {
    nombre:string;
    //nombreusuario:string;
    email:string;
    password:string;
    //authorities: string[];
    roles:string[];
    idFamilia:number;
    idOrganizacion:number;
    idAdmin:number;


    constructor(email:string,password:string, nombre:string, authorities){//,nombreusuario:string,
        this.nombre=nombre;
        //this.nombreusuario=nombreusuario;
        this.email=email;
        this.password=password;
        this.roles=authorities;
    }
     setIdFamilia(id:number){
         this.idFamilia=id;
     }
     setIdOrganizacion(id:number){
         this.idOrganizacion=id;
    }
    
}
