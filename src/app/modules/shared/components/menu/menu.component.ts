import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import { LoadingService } from '../../services/loading/loading.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() headerTitle!: string;
  @Input() showMenu: boolean = true;
  protected items!: Array<{ title: string; ref: string }>;

  constructor(
    private readonly _navCtrl: NavController,
    private readonly _authSrv: AuthService,
    private readonly _loadingSrv: LoadingService,
    private readonly _toastSrv: ToastService
  ) {
    this.loadItems();
  }

  protected async loadItems() {
    await this.getItems();
  }

  protected async getItems() {
    const userId = await this.getUserId();

    this.items = [
      { title: 'Principal', ref: '/principal' },
      { title: 'Create a task', ref: '/task' },
      { title: 'View tasks', ref: '/tasks' },
      { title: 'Configuration', ref: `/register/${userId}` },
    ];
    return this.items;
  }

  protected doNavigate(url: string) {
    this._navCtrl.navigateForward(url);
  }

  protected async doLogout() {
    try {
      await this._loadingSrv.showLoading('Loading...');
      await this._loadingSrv.hideLoading();

      await this._authSrv.logout();
      const res = await this._authSrv.isAuth();
      await this._navCtrl.navigateForward('/home');

      await this._toastSrv.presentToast('Logout with success');
      await this._toastSrv.dismissToast();
    } catch (error) {
      await this._toastSrv.presentErrorToast('An error ocurred');
    }
  }

  private async getUserId() {
    try {
      return await this._authSrv.getAuthUserId();
    } catch (error) {
      throw error;
    }
  }
}
