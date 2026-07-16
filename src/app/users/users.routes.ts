import { Routes } from '@angular/router';
import { TasksComponent } from '../tasks/tasks.component';
import { canLeaveEditPage, NewTaskComponent } from '../tasks/new-task/new-task.component';
import { resolveUserTasks } from '../resolvers/resolveUserTasks';

export const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TasksComponent, // Eager Loading
    // loadComponent: () => import('../tasks/tasks.component').then(m => m.TasksComponent), // Lazy Loading
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage],
  },
];
