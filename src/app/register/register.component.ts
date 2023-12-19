import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  constructor(private builder: FormBuilder, 
              private service: AuthService,   
              private router: Router,
              private toastr: ToastrService
              ) {

  }



  registerform = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(8)])),
    name: this.builder.control('',Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(15)])),
    password: this.builder.control('', Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(15),Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)])),
    email: this.builder.control('', Validators.compose([Validators.required,Validators.email,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  });

  proceedregister() {
    if (this.registerform.valid) {
      this.service.RegisterUser(this.registerform.value).subscribe(result => {
        this.toastr.success('Comuníquese con el administrador para habilitar el acceso.','Registro con exito')
        this.router.navigate(['login'])
      });
      if(Error()){
        this.toastr.warning('El usuario ya existe')
      }
  
    } else {
      this.toastr.warning('Por favor ingresar datos validos.')
    }
  }

}
