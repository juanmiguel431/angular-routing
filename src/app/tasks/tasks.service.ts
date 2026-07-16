import { afterNextRender, Injectable, signal } from '@angular/core';
import { type NewTaskData, Task } from './task/task.model';
import { dummyTasks } from '../../dummy_tasks';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private _tasks = signal<Task[]>(dummyTasks);
  public items = this._tasks.asReadonly();

  constructor() {
    afterNextRender(() => {
      const tasks = localStorage.getItem('tasks');

      if (tasks) {
        this._tasks.set(JSON.parse(tasks));
      }
    });
  }

  add(taskData: NewTaskData, userId: string) {
    this._tasks.update((prevTasks) => [
      {
        id: new Date().getTime().toString(),
        userId: userId,
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.date,
      },
      ...prevTasks,
    ]);
    this.save();
  }

  remove(id: string) {
    this._tasks.update((prevTasks) => prevTasks.filter((task) => task.id !== id));
    this.save();
  }

  private save() {
    localStorage.setItem('tasks', JSON.stringify(this._tasks()));
  }
}
