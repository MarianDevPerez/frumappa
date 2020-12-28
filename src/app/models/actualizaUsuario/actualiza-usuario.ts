export class ActualizaUsuario {
    nombre: string;
    //nombreusuario:string;
    email: string;
    clave: string;
    //authorities: string[];
    roles: string[];
    idFamilia: number;
    idOrganizacion: number;
    idAdmin: number;
    constructor(email: string, password: string, nombre: string, authorities) {//,nombreusuario:string,
        this.nombre = nombre;
        //this.nombreusuario=nombreusuario;
        this.email = email;
        this.clave = password;
        this.roles = authorities;
    }
    setIdFamilia(id: number) {
        this.idFamilia = id;
    }
    setIdOrganizacion(id: number) {
        this.idOrganizacion = id;
    }
    setIdAdmin(id: number) {
        this.idAdmin = id;
    }
    setRoles(roles: string[]) {
        this.roles = roles;
    }
}
