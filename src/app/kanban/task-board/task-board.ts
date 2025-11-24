import { Component, inject, signal } from '@angular/core';
import { Column, Task } from '../../store/state-model';
import { Store } from '@ngrx/store';
import { selectTasksByStatus } from '../../store/selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { TaskCard } from '../task-card/task-card';
import { TaskBoardActions } from '../../store/actions';
import { FormsModule } from '@angular/forms';
import { 
  CdkDragDrop, 
  DragDropModule, 
  moveItemInArray, 
  transferArrayItem 
} from '@angular/cdk/drag-drop';
import { TaskStatus } from '../../store/state-model';

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
  
  // LOGGING FOR DEBUGGING
  console.log('--- DROP EVENT ---');
  console.log(`Source Column ID: ${event.previousContainer.id}`);
  console.log(`Target Column ID: ${event.container.id}`);
  console.log(`Target Status (via HTML parameter): ${newStatus}`); // Should match Target Column ID
  
  if (event.previousContainer === event.container) {
    console.log('Action: Reordering within the same column');
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
