import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { IUser } from 'src/app/interfaces/IUser';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';
import { LoadingService } from 'src/app/modules/shared/services/loading/loading.service';
import { StorageService } from 'src/app/modules/shared/services/storage/storage.service';
import { ToastService } from 'src/app/modules/shared/services/toast/toast.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage {
  protected email!: FormControl;
  protected password!: FormControl;
  protected name!: FormControl;
  protected lastName!: FormControl;
  protected age!: FormControl;
  protected phoneNumber!: FormControl;
  protected form!: FormGroup;
  private fileToUpload: any;

  constructor(
    private readonly _authSrv: AuthService,
    private readonly _firestoreSrv: FirestoreService,
    private readonly _storageSrv: StorageService,
    private readonly _toastSrv: ToastService,
    private readonly _navCtrl: NavController,
    private readonly _loadingSrv: LoadingService
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

  protected async doUpdate() {
    try {
      await this._loadingSrv.showLoading('Updating...');

      const userId = await this._authSrv.getAuthUserId();

      if (userId) {
        const users = await this._firestoreSrv.getDocumentsByCollection('user');
        const userDoc = users.find((user) => user.uid === userId);

        if (userDoc) {
          const newUser: IUser = this.form.value
          await this._firestoreSrv.update('user', userDoc.id, newUser);
        }
      } else

      await this._loadingSrv.hideLoading();
      await this._toastSrv.presentToast('¡Successful update!');
      this.form.reset();
    } catch (error) {
      await this._loadingSrv.hideLoading();
      await this._toastSrv.dismissToast();
      await this._toastSrv.presentErrorToast('Error updating');
    }
  }

  protected async uploadImage(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  private async getImageUrl(filePath: string) {
    return await this._storageSrv.getUrl(filePath);
  }
}
