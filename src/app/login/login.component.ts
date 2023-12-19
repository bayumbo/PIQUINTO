import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
    private router: Router) {
      sessionStorage.clear();

  }
  result: any;

  loginform = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(8)])),
    password: this.builder.control('', Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(15),Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]))
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.GetUserbyCode(this.loginform.value.id).subscribe(item => {
        this.result = item;
        console.log(this.result)
        if (this.result.password === this.loginform.value.password) {
          if (this.result.isactive) {
            sessionStorage.setItem('username',this.result.id);
            sessionStorage.setItem('role',this.result.role);
            this.router.navigate(['']);
          } else {
            this.toastr.error('Porfavor Contactar Con El Administrador', 'Usuario Inactivo');
          }
        } else {
          this.toastr.error('Credenciales Incorrectas.');
        }
      });
    } else {
      this.toastr.warning('Ingrese Datos Validos.')
    }
  }
}
