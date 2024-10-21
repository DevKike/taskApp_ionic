import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './modules/shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  protected showMenu: boolean = false;

  constructor(
    private readonly _router: Router,
    private readonly _menu: MenuController,
    private readonly _authService: AuthService
  ) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkIdAndSetMenu(event.url);
      }
    });
  }

  private async checkIdAndSetMenu(url: string) {
    const userId = await this._authService.getAuthUserId();
    if (userId !== '0') {
      this.showMenu =
        url === '/principal' ||
        url === '/task' ||
        url === '/tasks' ||
        url === `/register/${userId}`;
      this._menu.close();
    }
  }
}
