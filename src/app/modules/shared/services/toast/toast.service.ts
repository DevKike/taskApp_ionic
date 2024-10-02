import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private loadingToast: HTMLIonToastElement | null = null;

  constructor(private toastCtrl: ToastController) { }

  async presentToast(message: string, duration: number = 3000) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position: 'top',
      cssClass: 'custom-toast',
    });
    toast.present();
  }

  async presentLoadingToast(message: string) {
    this.loadingToast = await this.toastCtrl.create({
      message,
      position: 'top',
      translucent: true,
      duration: 0,
      cssClass: 'loading-toast'
    });
    await this.loadingToast.present();
  }

  async dismissToast() {
    if (this.loadingToast) {
      await this.loadingToast.dismiss();
      this.loadingToast = null;
    }
  }
}
