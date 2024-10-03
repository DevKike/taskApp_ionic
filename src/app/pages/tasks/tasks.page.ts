import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ITask } from 'src/app/interfaces/ITask';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage  {

  [x: string]: any;
  public title!: FormControl;
  public description!: FormControl;
  public done!: FormControl;

  public taskForm!: FormGroup;

  public tasks: ITask[] = [];


  constructor(private alertController: AlertController) {
    this.initForm();
  }

  public addTask() {
    console.log(this.taskForm.value);
    this.tasks.push({ ...this.taskForm.value, done: false });
    console.log(this.tasks);
    this.taskForm.reset();
    const newTaskCard = document.getElementById('new-task-card');
    newTaskCard?.classList.add('animate');

    setTimeout(() => {
      newTaskCard?.classList.remove('animate');
    }, 500);
  }

  updateTaskStatus(task: { done: any }, event: { detail: { checked: any } }) {
    task.done = event.detail.checked;
  }

  deleteTask(index: number) {
    this.presentAlert(index);
  }

  async presentAlert(index: number) {
    const alert = await this.alertController.create({
      header: 'Delete Task',
      message: 'Are you sure you want to delete this task?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.tasks.splice(index, 1);
          },
        },
      ],
    });

    await alert.present();
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


}
