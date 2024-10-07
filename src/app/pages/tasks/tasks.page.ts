import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  filteredTasks: any[] = [];

  constructor(
    private readonly _firestoreSrv: FirestoreService,
    private readonly _authSrv: AuthService  
  ) {}

  async ngOnInit() {
    this.loadTasks();
  }

  protected async loadTasks() {
    try {
      const currentUserId = await this._authSrv.getAuthUserId();
      const tasks = await this._firestoreSrv.getCollections('tasks');
      console.log('Todas las tareas recuperadas:', tasks); 
      this.filteredTasks = tasks.filter(task => task.userId === currentUserId).map(task => ({
        ...task,
        creationDate: task.creationDate || new Date()
      }))
      console.log('Tareas filtradas para el usuario actual:', this.filteredTasks);
    } catch (error) {
      throw error;
    }
  }

  protected async deleteTasks(taskId: string) {
    try {
      await this._firestoreSrv.delete('task', taskId);
      console.log('Eliminando tarea con ID:', taskId); 
      this.filteredTasks = this.filteredTasks.filter(task => taskId !== taskId)
      console.log('Tareas filtradas actualizadas:', this.filteredTasks);
      await this.loadTasks();
    } catch {}
  }
}
