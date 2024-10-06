import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITask } from 'src/app/interfaces/ITask';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TasksPage {
  public title!: FormControl;
  public description!: FormControl;
  public done!: FormControl;

  public taskForm!: FormGroup;

  constructor(
    private readonly _firestoreSrv: FirestoreService,
    private readonly _authSrv: AuthService
  ) {
    this.initForm();
  }

  private initForm() {
    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.description = new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]);
    this.done = new FormControl(false, []);
    this.taskForm = new FormGroup({
      title: this.title,
      description: this.description,
      done: this.done,
    });
  }

  protected async addTask() {
    try {
      const task: ITask = this.taskForm.value;
      const copyTask = { ...this.taskForm.value };
      const isAuth = await this._authSrv.isAuth();

      if (isAuth) {
        const userId = await this._authSrv.getAuthUserId();

        const newTask = { userId, ...copyTask };
        this._firestoreSrv.create('tasks', newTask);
      }
    } catch (error) {
      throw error;
    }
  }
}
