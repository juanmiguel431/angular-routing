import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  public userId = input.required<string>();
  public enteredTitle = signal('');
  public enteredSummary = signal('');
  public enteredDate = signal('');

  private _submitted = false;
  public get submitted() {
    return this._submitted;
  }

  private tasksService = inject(TasksService);
  private router = inject(Router);

  onSubmit() {
    this.tasksService.add(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId(),
    );

    this._submitted = true;
    this.router.navigate(['/users', this.userId(), 'tasks']);
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component, currentRoute, currentState, nextState) => {
  if (component.submitted) {
    return true;
  }

  if (component.enteredTitle() || component.enteredDate() || component.enteredSummary()) {
    return window.confirm('Are you sure you want to leave?');
  }

  return true;
};
