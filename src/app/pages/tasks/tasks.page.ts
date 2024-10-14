import { Component } from '@angular/core';
import { ITask } from 'src/app/interfaces/ITask';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';
import { LoadingService } from 'src/app/modules/shared/services/loading/loading.service';
import { ToastService } from 'src/app/modules/shared/services/toast/toast.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage {
  protected tasks!: ITask[];

  constructor(
    private readonly _firestoreSrv: FirestoreService,
    private readonly _authSrv: AuthService,
    private readonly _loadingSrv: LoadingService,
    private readonly _toastSrv: ToastService
  ) {}

  ionViewWillEnter() {
    this.loadTasks();
  }

  protected async loadTasks() {
    try {
      await this._loadingSrv.showLoading('Loading...');
      
      const userId = await this._authSrv.getAuthUserId();
      const tasks = await this._firestoreSrv.getDocumentsByCollection('task');
      const userTasks = tasks.filter((task) => task.userId === userId);
      this.tasks = userTasks;
      await this._loadingSrv.hideLoading();

    } catch (error) {
      await this._loadingSrv.hideLoading();

    }
  }

  protected async deleteTasks(taskId: string) {
    try {
      this._loadingSrv.showLoading('Deleting Task...');
      await this._firestoreSrv.delete('task', taskId);
      this._loadingSrv.hideLoading();
      this._toastSrv.presentToast('Task deleted successfully');
      await this.loadTasks();
    } catch (error) {
      this._loadingSrv.hideLoading();
      this._toastSrv.presentErrorToast('Error deleting task');
    }
  }
}
