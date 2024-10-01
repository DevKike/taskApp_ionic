import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() placeholder = '';
  @Input() type = '';
  @Input() label = '';
  @Input() control: FormControl = new FormControl('');

  constructor() {}

  public keyUp(event: any) {
    this.control.setValue(event.target.value);
  }
}
