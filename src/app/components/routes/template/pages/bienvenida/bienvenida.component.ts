import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements OnInit {
  roles:string[];
  constructor(private tokenService:TokenService, private router:Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      
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

}
