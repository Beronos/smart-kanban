# SmartKanban

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.10.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


Generate ngrx CRUD actions for a task

answer:

export const addTask = createAction(
  '[Task] Add Task',
  props<{ id: string; title: string }>()
);

export const updateTask = createAction(
  '[Task] Update Task',
  props<{ taskId: string; title: string }>()
);

export const updateTaskStatus = createAction(
  '[Kanban] Update Task Status',
  props<{ taskId: string; status: TaskStatus }>()
);

export const deleteTask = createAction(
  '[Kanban] Delete Task',
  props<{ taskId: string }>()
);


Generate selectors for tasks, that will get alltasks, tasks filtered by status, and task by Id

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskStatus } from '../models/task-status.model';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

export interface TaskBoardState {
  tasks: Task[];
}

// 1) Feature selector
export const selectTaskBoardState =
  createFeatureSelector<TaskBoardState>('taskBoard');

// 2) All tasks
export const selectAllTasks = createSelector(
  selectTaskBoardState,
  (state) => state.tasks
);

// 3) Tasks filtered by status (factory selector)
export const selectTasksByStatus = (status: TaskStatus) =>
  createSelector(selectAllTasks, (tasks) =>
    tasks.filter((task) => task.status === status)
  );

// 4) Task by id (factory selector)
export const selectTaskById = (taskId: string) =>
  createSelector(selectAllTasks, (tasks) =>
    tasks.find((task) => task.id === taskId) ?? null
  );


introducde an AIPriorityService which returns a random priority of high, medium and low. Add a delay, and failure (low probability)


import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export type Priority = 'High' | 'Medium' | 'Low';

@Injectable({
  providedIn: 'root',
})
export class KanbanPriorityService {
  getPriority(): Observable<Priority> {
    const priorities: Priority[] = ['High', 'Medium', 'Low'];
    const randomIndex = Math.floor(Math.random() * priorities.length);
    const priority = priorities[randomIndex];

    // Simulate latency ~500–1200ms
    const randomDelay = 500 + Math.floor(Math.random() * 700);

    // Optional: simulate ~20% failure rate
    const shouldFail = Math.random() < 0.2;

    if (shouldFail) {
      return throwError(() => new Error('AI service failed')).pipe(
        delay(randomDelay)
      );
    }

    return of(priority).pipe(delay(randomDelay));
  }
}
