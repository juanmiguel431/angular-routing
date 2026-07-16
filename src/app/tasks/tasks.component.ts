import { Component, computed, inject, input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { RouterLink } from '@angular/router';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  public userId = input.required<string>();
  public sort = input<'asc' | 'desc'>('asc');
  private tasksService = inject(TasksService);

  protected sorter = computed(() => {
    if (this.sort() === 'asc') {
      return { order: 'desc', label: 'descending' };
    }

    return { order: 'asc', label: 'ascending' };
  });

  protected userTasks = computed(() => {
    let sortFn: (a: Task, b: Task) => number;
    if (this.sort() === 'asc') {
      sortFn = (a, b) => (a.id > b.id ? 1 : -1);
    } else {
      sortFn = (a, b) => (b.id > a.id ? 1 : -1);
    }

    return this.tasksService.items().filter(t => t.userId === this.userId()).sort(sortFn);
  });
}
