import { Component, computed, input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
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
  protected sort = input<'asc' | 'desc'>('asc');
  protected userTasks = input<Task[]>([]);

  protected sorter = computed(() => {
    if (this.sort() === 'asc') {
      return { order: 'desc', label: 'descending' };
    }

    return { order: 'asc', label: 'ascending', };
  });
}
