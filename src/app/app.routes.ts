import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { userRoutes } from './users/users.routes';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { resolvePageTitle, resolveUserName } from './resolvers/resolveUserName';

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No user selected'
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    data: {
      message: 'Hello'
    },
    resolve: {
      userName: resolveUserName
    },
    title: resolvePageTitle
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
