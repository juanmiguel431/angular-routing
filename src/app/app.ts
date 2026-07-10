import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UsersComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

}
