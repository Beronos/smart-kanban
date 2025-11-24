import { createFeatureSelector, createSelector } from '@ngrx/store';
import { KanbanState, TaskStatus } from './state-model';


export const selectKanbanState =
  createFeatureSelector<KanbanState>('kanban');


export const selectAllTasks = createSelector(
  selectKanbanState,
  (state) => state.tasks
);

export const selectTasksByStatus = (status: TaskStatus) =>
  createSelector(selectAllTasks, (tasks) =>
    tasks.filter((task) => task.status === status)
  );

export const selectTaskById = (taskId: string) =>
  createSelector(selectAllTasks, (tasks) =>
    tasks.find((task) => task.id === taskId) ?? null
  );
