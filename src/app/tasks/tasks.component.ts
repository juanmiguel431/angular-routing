import { Component, computed, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  public userId = input.required<string>();
  private tasksService = inject(TasksService);
  protected sort = input<'asc' | 'desc'>('asc');

  protected sorter = computed(() => {
    if (this.sort() === 'asc') {
      return { order: 'desc', label: 'descending' };
    }

    return { order: 'asc', label: 'ascending', };
  });

  protected userTasks = computed(() => {
    let order: (a: Task, b: Task) => number;
    if (this.sort() === 'asc') {
      order = (a, b) => a.id > b.id ? 1 : -1
    } else {
      order = (a, b) => b.id > a.id ? 1 : -1
    }

    return this.tasksService.allTasks().filter(task => task.userId === this.userId()).sort(order);
  });
}
