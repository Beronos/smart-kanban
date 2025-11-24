import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskBoardActions } from '../../store/actions';
import { Task, TaskStatus } from '../../store/state-model';

@Component({
  selector: 'app-task-card',
  imports: [CdkDrag],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  private readonly store = inject(Store);
  task = input.required<Task>();

  onTitleChange(newTitle: string) {
    const trimmed = newTitle.trim();
    if (!trimmed || trimmed === this.task().title) return;

    this.store.dispatch(
      TaskBoardActions.updateTask({
        taskId: this.task().id,
        title: trimmed,
      })
    );
  }

  onDelete() {
    this.store.dispatch(
      TaskBoardActions.deleteTask({
        taskId: this.task().id,
      })
    );
  }

  moveTo(status: TaskStatus) {
    if (status === this.task().status) return;

    this.store.dispatch(
      TaskBoardActions.updateTaskStatus({
        taskId: this.task().id,
        status,
      })
    );
  }

handleBlur(event: Event) {
  const el = event.target as HTMLElement;
  const newTitle = el.innerText.trim();

  if (!newTitle || newTitle === this.task().title) return;

  this.store.dispatch(
    TaskBoardActions.updateTask({
      taskId: this.task().id,
      title: newTitle,
    })
  );
}

handleEnter(event: Event) {
  event.preventDefault();
  (event.target as HTMLElement).blur();
}
}

