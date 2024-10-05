import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() ref: string = "/";

  constructor(private readonly navCtrl: NavController) {}
  
  navigate (){
    if(this.ref){
      this.navCtrl.navigateForward([this.ref])
    }
  }

}
