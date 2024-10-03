import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public email!: FormControl;
  public password!: FormControl;
  public form!: FormGroup;

  constructor(private readonly navCtrl: NavController, private readonly authSrv: AuthService) {
    this.initForm();
  }

  public async doLogin() {
    if (this.form.value) {
      const { email, password } = this.form.value;
      try {
        await this.authSrv.login(email, password);
        console.log('login successfully');
        this.navCtrl.navigateForward('/tasks');
      } catch (error) {
        console.error('login failed', error);
      }
    } else {
      console.warn('form not validated');
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
