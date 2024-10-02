import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/IUser';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';
import { StorageService } from 'src/app/modules/shared/services/storage/storage.service';
import { ToastService } from 'src/app/modules/shared/services/toast/toast.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  public email!: FormControl;
  public password!: FormControl;
  public name!: FormControl;
  public lastName!: FormControl;
  public age!: FormControl;
  public phoneNumber!: FormControl;
  public form!: FormGroup;

  constructor(
    private readonly _authSrv: AuthService,
    private readonly _firestoreSrv: FirestoreService,
    private readonly _storageSrv: StorageService,
    private readonly toastSrv: ToastService,
    private readonly navCtrl: NavController
  ) {
    this.initForm();
  }

  private initForm() {
    this.email = new FormControl('', [Validators.email, Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.age = new FormControl('', [Validators.required, Validators.min(0)]);
    this.phoneNumber = new FormControl('', [Validators.required]);

    this.form = new FormGroup({
      email: this.email,
      password: this.password,
      name: this.name,
      last_name: this.lastName,
      age: this.age,
      phone_number: this.phoneNumber,
    });
  }

  protected async doRegister() {
    try {
      this.toastSrv.presentLoadingToast('Registering...');

      const { email, password }: IUser = this.form.value;
      const copyUser = { ...this.form.value };

      const res = await this._authSrv.register(email, password);
      const uid = res.user?.uid || '';

      const user = { uid, ...copyUser };

      delete user.email;
      delete user.password;
      await this._firestoreSrv.create('user', user);

      this.toastSrv.dismissToast();
      this.toastSrv.presentToast('¡Successful registration!');
      this.form.reset();
      this.navCtrl.navigateForward('/login');
    } catch (error) {
      this.toastSrv.dismissToast();
      this.toastSrv.presentToast('Error registering');

      console.error(error);
    }
  }

  protected async uploadImage(event: any) {
    await this.toastSrv.presentLoadingToast('Uploading...');
    const file = event.target.files[0];
    const filePath = `users/${file.name}`;
    await this._storageSrv.upload(filePath, file);
    await this.toastSrv.dismissToast();
    await this.toastSrv.presentToast('Successful upload!');
  }
}
