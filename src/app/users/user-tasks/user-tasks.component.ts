import { Component, computed, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnChanges {
  protected readonly userId = input.required<string>();

  private userService = inject(UsersService);

  protected userName = computed(() => {
    return this.userService.users.find(user => user.id === this.userId())?.name;
  })

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes); // changes to input properties
    console.log(this.userId());
  }
}
