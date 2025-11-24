import { Component, inject, signal } from '@angular/core';
import { Task } from '../../store/state-model';
import { Store } from '@ngrx/store';
import { selectTasksByStatus } from '../../store/selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-task-board',
  imports: [TaskCard],
  templateUrl: './task-board.html',
  styleUrl: './task-board.scss',
})
export class TaskBoard { 
  private store = inject(Store)

  todoTasks = toSignal(
    this.store.select(selectTasksByStatus('todo')),
    { initialValue: [] }
  );

  inProgressTasks = toSignal(
    this.store.select(selectTasksByStatus('in-progress')),
    { initialValue: [] }
  );

  doneTasks = toSignal(
    this.store.select(selectTasksByStatus('done')),
    { initialValue: [] }
  );
}
