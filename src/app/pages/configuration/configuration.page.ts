import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ITask } from 'src/app/interfaces/ITask';
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

  protected async updateUser(collection: string, docId: string, data: ITask) {
    await this._firestoreSrv.update(collection, docId, data);
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
      await this.loadingSrv.showLoading('Updating...');


      //await this._firestoreSrv.update('user',  , user);

      await this.loadingSrv.hideLoading();
      await this.toastSrv.presentToast('¡Successful update!');
      this.form.reset();
    } catch (error) {
      await this.loadingSrv.hideLoading();
      await this.toastSrv.dismissToast();
      await this.toastSrv.presentErrorToast('Error updating');
    }
  }

  protected async uploadImage(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  private async getImageUrl(filePath: string) {
    return await this._storageSrv.getUrl(filePath);
  }
}
