import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  protected showMenu: boolean = false;

  constructor(private readonly router: Router, private readonly menu: MenuController) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showMenu =
          event.url === '/principal' ||
          event.url === '/task' ||
          event.url === '/tasks' ||
          event.url === '/configuration';
        this.menu.close();
      }
    });
  }
}
