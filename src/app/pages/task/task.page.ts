import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITask } from 'src/app/interfaces/ITask';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';
import { LoadingService } from 'src/app/modules/shared/services/loading/loading.service';
import { ToastService } from 'src/app/modules/shared/services/toast/toast.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage {
  public title!: FormControl;
  public description!: FormControl;

  public taskForm!: FormGroup;

  constructor(
    private readonly _firestoreSrv: FirestoreService,
    private readonly _authSrv: AuthService,
    private readonly _loadingSrv: LoadingService,
    private readonly _toastSrv: ToastService
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
    this.taskForm = new FormGroup({
      title: this.title,
      description: this.description,
    });
  }

  protected async addTask() {
    try {
      this._loadingSrv.showLoading('Creating task...');
      const task: ITask = this.taskForm.value;
      const copyTask = { ...this.taskForm.value };
      const isAuth = await this._authSrv.isAuth();

      if (isAuth) {
        const userId = await this._authSrv.getAuthUserId();

        const newTask = {
          userId,
          ...copyTask,
          creationDate: new Date(),
        };
        await this._firestoreSrv.create('task', newTask);
        this._loadingSrv.hideLoading();
        this._toastSrv.presentToast('Task added successfully!');
        this.taskForm.reset();

      }
    } catch (error) {
      this._loadingSrv.hideLoading();
      this._toastSrv.presentErrorToast('Error adding task');
      throw error;
    }
  }
}
