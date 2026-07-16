import { ResolveFn } from '@angular/router';
import { Task } from '../tasks/task/task.model';
import { inject } from '@angular/core';
import { TasksService } from '../tasks/tasks.service';

export const resolveUserTasks: ResolveFn<Task[]> = (activatedRoute, routerState) => {
  const sort = activatedRoute.queryParams['sort'];
  const tasksService = inject(TasksService);

  const userId = activatedRoute.paramMap.get('userId');
  const tasks = tasksService.items().filter((task) => task.userId === userId);

  let sortFn: (a: Task, b: Task) => number;
  if (sort === 'asc') {
    sortFn = (a, b) => a.id > b.id ? 1 : -1;
  } else {
    sortFn = (a, b) => b.id > a.id ? 1 : -1;
  }

  tasks.sort(sortFn);

  return tasks;
};
