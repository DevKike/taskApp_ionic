import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/IUser';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';
import { StorageService } from 'src/app/modules/shared/services/storage/storage.service';
import { ToastService } from 'src/app/modules/shared/services/toast/toast.service';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/modules/shared/services/loading/loading.service';

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
  private fileToUpload: any;

  constructor(
    private readonly _authSrv: AuthService,
    private readonly _firestoreSrv: FirestoreService,
    private readonly _storageSrv: StorageService,
    private readonly toastSrv: ToastService,
    private readonly navCtrl: NavController,
    private readonly loadingSrv: LoadingService
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
      this.loadingSrv.showLoading('Registering...');

      const { email, password }: IUser = this.form.value;
      const copyUser = { ...this.form.value };

      const res = await this._authSrv.register(email, password);

      const uid = res.user?.uid || '';
      const user = { uid, ...copyUser };

      delete user.email;
      delete user.password;

      if (this.fileToUpload) {
        const filePath = `users/${this.fileToUpload.name}`;
        await this._storageSrv.upload(filePath, this.fileToUpload);
        const image = await this.getImageUrl(filePath);

        const userWithUrlImage = { image, ...user };
        await this._firestoreSrv.create('user', userWithUrlImage);
      }

      await this._firestoreSrv.create('user', user);

      this.loadingSrv.hideLoading();
      this.toastSrv.presentToast('¡Successful registration!');
      this.form.reset();
      this.navCtrl.navigateForward('/login');
    } catch (error) {
      this.loadingSrv.hideLoading();
      this.toastSrv.dismissToast();
      this.toastSrv.presentErrorToast('Error registering');

      console.error(error);
    }
  }

  protected async uploadImage(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  private async getImageUrl(filePath: string) {
    return await this._storageSrv.getUrl(filePath);
  }
}
