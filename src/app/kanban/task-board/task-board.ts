import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TaskBoardActions } from '../../store/actions';
import { selectTasksByStatus } from '../../store/selectors';
import { Column, Task, TaskStatus } from '../../store/state-model';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-task-board',
  imports: [TaskCard, FormsModule, DragDropModule],
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

  getTasksSignal(status: string) {
    switch (status) {
      case 'todo': return this.todoTasks;
      case 'in-progress': return this.inProgressTasks;
      case 'done': return this.doneTasks;
      default: return this.todoTasks;
    }
  }

  columns = signal<Column[]>([
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ]);

drop(event: CdkDragDrop<Task[]>, targetStatus: string): void {
  const newStatus = targetStatus as TaskStatus;
  const movedTask: Task = event.item.data.task; 

  
  if (event.previousContainer === event.container) {
    const tasksArray = event.container.data;
    moveItemInArray(
        tasksArray, 
        event.previousIndex, 
        event.currentIndex
    );
  } else {
    
    this.store.dispatch(
        TaskBoardActions.updateTaskStatus({ 
            taskId: movedTask.id, 
            status: newStatus
        }));
  }
}
}
