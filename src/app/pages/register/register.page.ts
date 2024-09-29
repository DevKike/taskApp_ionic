import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/modules/shared/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  public email!: FormControl;
  public password!: FormControl;
  public form!: FormGroup;

  constructor(
    private readonly authSrv: AuthService,
    private readonly navCtrl: NavController
  ) {
    this.initForm();
  }

  public async doRegister() {
    try {
      console.log(this.form.value);
      const response = await this.authSrv.register(
        this.form.value.email,
        this.form.value.password
      );
      console.log(response);
     /*  this.navCtrl.navigateForward('/home'); */
    } catch (error) {
      console.error(error);
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
