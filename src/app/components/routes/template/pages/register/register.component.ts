import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../../services/core/settings/settings.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { RegisterService } from 'src/app/services/register/register.service';
import { Familia } from 'src/app/interfaces/familia';
import { TipoOrganizacionService } from 'src/app/services/tipo-organizacion/tipo-organizacion.service';
import { TipoOrganizacion } from 'src/app/interfaces/tipo-organizacion';
import { Organizacion } from 'src/app/interfaces/organizacion';
import { Representante } from 'src/app/interfaces/representante';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario/nuevo-usuario';
import { LoginUsuario } from 'src/app/models/login-usuario/login-usuario';
import { ActualizaUsuario } from 'src/app/models/actualizaUsuario/actualiza-usuario';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    isLogged = false;
    isRegisted = false;
    isRegistedFail = false;
    isLoginFail = false;
    nuevoUsuario: NuevoUsuario;
    actualizaUsuario: ActualizaUsuario;
    email: string;
    nombreUsuario: string;
    password: string;
    errorMessage: string;

    roles: string[] = [];

    public tiposOrganizacion: Array<TipoOrganizacion>;
    public tipoInicial: string;

    valForm: FormGroup;
    passwordForm: FormGroup;

    valFormFamilia: FormGroup;
    valFormOrganizacion: FormGroup;

    // familiaForm:FormGroup;
    // organizacionForm:FormGroup;
    isFamilia: boolean;

    constructor(public settings: SettingsService, fb: FormBuilder, private registerService: RegisterService, private tipoOrgService: TipoOrganizacionService, private authService: AuthService, private tokenService: TokenService, private router: Router) {

        let password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
        let certainPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

        this.passwordForm = fb.group({
            'password': password,
            'confirmPassword': certainPassword
        });

        // this.valForm = fb.group({
        //     'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
        //     'accountagreed': [null, Validators.required],
        //     'passwordGroup': this.passwordForm
        // });
        this.valFormFamilia = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'accountagreed': [null, Validators.required],
            'passwordGroup': this.passwordForm,
            'apellidoFamilia': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])),//only caracteres
            'telefonoFamilia': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')]))//only numbers
        });
        this.valFormOrganizacion = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'accountagreed': [null, Validators.required],
            'passwordGroup': this.passwordForm,
            'nombreOrganizacion': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])),
            'nombreRepresentante': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])),
            'dni': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
            'telefonoOrganizacion': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
            'tipoOrganizacion': new FormControl('', Validators.required)
        });

    }
    public onItemChange(value) {
        if (value == 'isFamilia') {
            this.isFamilia = true;
            this.valForm = this.valFormFamilia;
        }
        else if (value == 'isOrganizacion') {
            this.isFamilia = false;
            this.valForm = this.valFormOrganizacion;

        }
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        for (let c in this.passwordForm.controls) {
            this.passwordForm.controls[c].markAsTouched();
        }

        if (this.valForm.valid) {
            console.log('Valido!');
            this.email = value.email;
            this.password = value.passwordGroup.password;
            if (this.isFamilia) {
                this.nombreUsuario = value.apellidoFamilia;
                this.onRegister('fam', value);
                // let nuevaFamilia: Familia = {
                //     mail: value.email,
                //     nombre: value.apellidoFamilia,
                //     nro_contacto: value.telefonoFamilia
                // };

                // let respuesta = this.registerService.registrarFamilia(nuevaFamilia);
                // console.log(respuesta);
                // this.router.navigate(['/mis-arboles']);

            }
            else if (!this.isFamilia) {
                this.nombreUsuario = value.nombreOrganizacion;
                this.onRegister('org', value);
                // let nuevaOrganizacion: Organizacion = {
                //     mail: value.email,
                //     nombre: value.nombreOrganizacion,
                //     nro_contacto: value.telefonoOrganizacion,
                //     representante: value.dni,
                //     tipo: value.tipoOrganizacion

                // };
                // let nuevoRepresentante: Representante = {
                //     nomyape: value.nombreRepresentante,
                //     dni: value.dni,
                //     direccion: value.email,
                //     nro_contacto: value.telefonoOrganizacion,
                //     //idorganizacion:nuevaOrganizacion//
                // };
                // let nuevoUsuario:UserI={
                //     usuario:value.email,
                //     clave:value.passwordGroup.password,
                //     tipo:2
                // };
                // console.log(nuevaOrganizacion);
                // console.log(nuevoRepresentante);

                // let respuesta = this.registerService.registrarOrganizacion(nuevaOrganizacion, nuevoRepresentante);
                // console.log(respuesta);
                // this.router.navigate(['/homeorganizacion']);

                //this.registerService.registrarOrganizacion(value);
            }
            //falta validar si el mail existe el mail en la base de datos
            // if(isFamilia)
            // RegisterService.familia
            // else register organizacion
        }
    }

    ngOnInit() {
        this.isFamilia = true;
        this.valForm = this.valFormFamilia;

        this.tipoOrgService.findAllTipoOrganizacion()
            .subscribe((response: Array<TipoOrganizacion>) => {
                this.tiposOrganizacion = response;
                this.tipoInicial = this.tiposOrganizacion[0].nom;
            });

        if (this.tokenService.getToken()) {
            this.isLogged = true;
            this.roles = this.tokenService.getAuthorities();
            this.roles.forEach(rol => {
                if (rol === 'ROLE_FAM')
                    this.router.navigate(['/mis-arboles']);
                else if (rol === 'ROLE_ORG')
                    this.router.navigate(['/homeorganizacion']);
                else if (rol === 'ROLE_ADMIN')
                    this.router.navigate(['/organizaciones']);
            });
        }
    }

    onRegister(authority: string, value: any) {
        this.nuevoUsuario = new NuevoUsuario(this.email, this.password, this.nombreUsuario, [authority]);
        console.log(this.nuevoUsuario);
        this.authService.nuevoUsuario(this.nuevoUsuario).subscribe(
            data => {
                this.onLogin(value);
            },
            err => {
                if (err.status == 201) { //se crea el usuario OK
                    this.onLogin(value);

                } else {
                    this.isRegisted = false;
                    this.isRegistedFail = true;
                    this.errorMessage = err.error.message;
                    console.log(err);
                }

            }

        );
    }

    private conectarUsuario(value: any) {
        this.isRegisted = true;
        this.isRegistedFail = false;
        if (this.isFamilia) {
            let nuevaFamilia: Familia = {
                mail: value.email,
                nombre: value.apellidoFamilia,
                nro_contacto: value.telefonoFamilia
            };
            this.registerService.registrarFamilia(nuevaFamilia).subscribe((familia: Familia) => {
                this.actualizaUsuario = new ActualizaUsuario(this.nuevoUsuario.email, this.nuevoUsuario.password, this.nuevoUsuario.nombre, this.nuevoUsuario.roles);
                this.actualizaUsuario.setIdFamilia(familia.id);
                this.actualizaUsuario.setRoles(this.roles);

                // this.nuevoUsuario.setIdFamilia(familia.id);
                // this.nuevoUsuario.setRoles(this.roles);

                this.authService.actualizaUsuario(this.actualizaUsuario).subscribe(respuesta => {
                    console.log("respuesta server");
                    console.log(respuesta);
                    this.tokenService.setFamilia(this.actualizaUsuario.idFamilia);
                    this.redirecciona();


                }), err => {
                    if (err.status == 201) { //se actualiza el usuario OK
                        console.log(err);
                        this.tokenService.setFamilia(this.actualizaUsuario.idFamilia);
                        this.redirecciona();//NO FUNCA ACA
                    } else {
                        this.isRegisted = false;
                        this.isRegistedFail = true;
                        this.errorMessage = err.error.message;
                        console.log(err);
                        console.log("etra por error error");
                    }

                }

            }), err => console.log("Error al crear familia", err);
            // this.router.navigate(['/mis-arboles']);

        }
        else if (!this.isFamilia) {
            let nuevaOrganizacion: Organizacion = {
                mail: value.email,
                nombre: value.nombreOrganizacion,
                nro_contacto: value.telefonoOrganizacion,
                representante: value.dni,
                tipo: value.tipoOrganizacion

            };
            let nuevoRepresentante: Representante = {
                nomyape: value.nombreRepresentante,
                dni: value.dni,
                direccion: value.email,
                nro_contacto: value.telefonoOrganizacion,
                //idorganizacion:nuevaOrganizacion//
            };
            console.log(nuevaOrganizacion);
            console.log(nuevoRepresentante);

            this.registerService.registrarRepresentate(nuevoRepresentante).subscribe((representante: Representante) => {
                console.log(representante);
                this.registerService.registrarOrganizacion(nuevaOrganizacion).subscribe((organizacion: Organizacion) => {
                    console.log(organizacion);

                    this.actualizaUsuario = new ActualizaUsuario(this.nuevoUsuario.email, this.nuevoUsuario.password, this.nuevoUsuario.nombre, this.nuevoUsuario.roles);
                    this.actualizaUsuario.setIdOrganizacion(organizacion.id);
                    this.actualizaUsuario.setRoles(this.roles);

                    // this.nuevoUsuario.setIdOrganizacion(organizacion.id);
                    // this.nuevoUsuario.setRoles(this.roles);

                    this.authService.actualizaUsuario(this.actualizaUsuario).subscribe(respuesta => {
                        console.log("respuesta server");
                        console.log(respuesta);
                        this.tokenService.setOrganizacion(this.actualizaUsuario.idOrganizacion);

                        this.redirecciona();

                    }), err => {
                        if (err.status == 201) { //se actualiza el usuario OK
                            console.log(err);
                            this.tokenService.setOrganizacion(this.actualizaUsuario.idOrganizacion);

                            this.redirecciona();
                        } else {
                            this.isRegisted = false;
                            this.isRegistedFail = true;
                            this.errorMessage = err.error.message;
                            console.log(err);
                        }

                    }

                }), err => console.log("Error al crear organizacion", err);

            }), err => console.log("Error al crear representante", err);

            // this.router.navigate(['/homeorganizacion']);

        }

    }

    private onLogin(value: any) {

        //SE LOGUEA
        let loginUsuario = new LoginUsuario(this.nuevoUsuario.email, this.nuevoUsuario.password);
        this.authService.login(loginUsuario).subscribe(
            data => {
                this.isLogged = true;
                this.isLoginFail = false;

                this.tokenService.setToken(data.token);
                this.tokenService.setUserName(data.email);
                this.tokenService.setAuthorities(data.authorities);
                this.roles = this.tokenService.getAuthorities();

                this.conectarUsuario(value);

            },
            err => {

                this.isLogged = false;
                this.isLoginFail = true;
                this.errorMessage = err.error.message;
                console.log(err);
            }

        );
    }

    private redirecciona() {
        this.roles.forEach(rol => {
            if (rol === 'ROLE_FAM')
                this.router.navigate(['/mis-arboles']);
            else if (rol === 'ROLE_ORG')
                this.router.navigate(['/homeorganizacion']);
            else if (rol === 'ROLE_ADMIN')
                this.router.navigate(['/organizaciones']);
        });

        this.valForm.reset();
    }

}
