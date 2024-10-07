import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';
import { LoadingService } from 'src/app/modules/shared/services/loading/loading.service';
import { ToastService } from 'src/app/modules/shared/services/toast/toast.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  filteredTasks: any[] = [];

  constructor(
    private readonly _firestoreSrv: FirestoreService,
    private readonly _authSrv: AuthService,
    private readonly _loadingSrv: LoadingService,
    private readonly _toastSrv: ToastService
  ) {}

  async ngOnInit() {
    this.loadTasks();
  }

  protected async loadTasks() {
    try {
      const currentUserId = await this._authSrv.getAuthUserId();
      const tasks = await this._firestoreSrv.getCollections('tasks');
      console.log('Todas las tareas recuperadas:', tasks);
      this.filteredTasks = tasks
        .filter((task) => task.userId === currentUserId)
        .map((task) => ({
          ...task,
          creationDate: task.creationDate || new Date(),
        }));
      console.log(
        'Tareas filtradas para el usuario actual:',
        this.filteredTasks
      );
    } catch (error) {
      throw error;
    }
  }

  protected async deleteTasks(taskId: string) {
    try {
      this._loadingSrv.showLoading('Deleting Task...');
      await this._firestoreSrv.delete('tasks', taskId);
      this.filteredTasks = this.filteredTasks.filter(
        (task) => task.id !== taskId
      );
      this._loadingSrv.hideLoading();
      this._toastSrv.presentToast('Task deleted successfully');
    } catch (error) {
      this._loadingSrv.hideLoading();
      this._toastSrv.presentErrorToast('Error deleting task');
    }
  }
}
