import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  protected readonly userId = signal<string | null>(null);
  private userService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  protected userName = computed(() => {
    if (this.userId() === null) return undefined;
    return this.userService.users.find((user) => user.id === this.userId())?.name;
  });

  ngOnInit(): void {
    const subscriber = this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const userId = params.get('userId');
        console.log(userId);
        this.userId.set(userId);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscriber.unsubscribe();
    });

    // this.activatedRoute.params.subscribe({
    //   next: (params) => {
    //     console.log(params);
    //     const userId = params['userId'];
    //   },
    // });
  }
}
