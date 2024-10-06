import { Component } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage {
  items = [
    { title: 'Create a task', ref: '/task' },
    { title: 'View tasks', ref: '/tasks' },
    { title: 'Configuration', ref: '/configuration' }
  ];
}
