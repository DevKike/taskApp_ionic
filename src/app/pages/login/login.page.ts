import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { IUserLogin } from 'src/app/interfaces/IUser';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { LoadingService } from 'src/app/modules/shared/services/loading/loading.service';
import { ToastService } from 'src/app/modules/shared/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public email!: FormControl;
  public password!: FormControl;
  public form!: FormGroup;

  constructor(
    private readonly _navCtrl: NavController,
    private readonly _authSrv: AuthService,
    private readonly _toastSrv: ToastService,
    private readonly _loadingSrv: LoadingService
  ) {
    this.initForm();
  }

  protected async doLogin() {
    if (this.form.value) {
      const { email, password }: IUserLogin = this.form.value;
      await this._loadingSrv.showLoading();

      try {
        await this._authSrv.login(email, password);
        this._toastSrv.presentToast('Login with success!', 3000);
        this._navCtrl.navigateForward('/principal');
      } catch (error: any) {
        if (error.code === 'auth/invalid-credential') {
          this._toastSrv.presentErrorToast('Invalid credentials', 3000);
        } else {
          this._toastSrv.presentErrorToast('An error ocurred', 3000);
        }
      }
      await this._loadingSrv.hideLoading();
    } else {
      this._toastSrv.presentErrorToast('Form not validated', 3000);
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
