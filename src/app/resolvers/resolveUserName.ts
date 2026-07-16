import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UsersService } from '../users/users.service';

export const resolveUserName: ResolveFn<string | undefined> = (activatedRoute, routerState) => {
  const userService = inject(UsersService);
  const userId = activatedRoute.paramMap.get('userId');
  return userService.users.find((user) => user.id === userId)?.name;
};

export const resolvePageTitle: ResolveFn<string> = async (activatedRoute, routerState) => {
  const userName = await resolveUserName(activatedRoute, routerState);

  if (!userName) {
    return '';
  }

  return `${userName}'s Tasks`;
};
