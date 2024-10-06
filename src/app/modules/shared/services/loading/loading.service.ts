import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading: any;
  constructor(private loadingCrl: LoadingController) {}

  public async showLoading(message: string = 'Loading...') {
    this.loading = await this.loadingCrl.create({
      message,
      spinner: 'crescent',
      cssClass: 'custom-loading',
    });

    await this.loading.present();
  }

  public async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
