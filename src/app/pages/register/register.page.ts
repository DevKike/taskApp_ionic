import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  public email!: FormControl;
  public password!: FormControl;
  public form!: FormGroup;

  constructor() {
    this.initForm();
  }

  doRegister() {
    if (this.form.valid) {
      const email = this.form.value.email;
      const password = this.form.value.password;
      console.log('Registro exitoso:', { email, password });
    } else {
      console.log('Formulario inválido');
    }
  }

  private initForm() {
    this.email = new FormControl('', [Validators.email, Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.form = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
}
