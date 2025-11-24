import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskBoard } from './kanban/task-board/task-board';

@Component({
  selector: 'app-root',
  imports: [TaskBoard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('smart-kanban');
}
