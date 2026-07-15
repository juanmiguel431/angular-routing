import { Component, input, signal, } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  protected readonly userId = signal<string | null>(null);
  protected message = input<string>();
  protected userName = input<string | undefined>();
}
