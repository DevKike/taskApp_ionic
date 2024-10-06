import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() menuTitle!: string;
  @Input() headerTitle!: string;
  @Input() items!: { title: string; ref: string }[];

  constructor(private readonly _navCtrl: NavController) {}

  protected doNavigate(url: string) {
    this._navCtrl.navigateForward(url);
  }
}
