import { Component, inject, signal } from '@angular/core';
import { Task } from '../../store/state-model';
import { Store } from '@ngrx/store';
import { selectTasksByStatus } from '../../store/selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { TaskCard } from '../task-card/task-card';
import { TaskBoardActions } from '../../store/actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-board',
  imports: [TaskCard, FormsModule],
  templateUrl: './task-board.html',
  styleUrl: './task-board.scss',
})
export class TaskBoard { 
  private store = inject(Store)
  newTaskTitle = '';

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

  onAddTask(): void {
    const title = this.newTaskTitle.trim();
    if (!title) {
      return;
    }
    const id = crypto.randomUUID(); 


    this.store.dispatch(TaskBoardActions.addTask({ id, title }));
    this.store.dispatch(TaskBoardActions.fetchPriority({ taskId: id }));


    this.newTaskTitle = '';
  }
}
