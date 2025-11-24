import { createReducer, on } from '@ngrx/store';
import { initialKanbanState } from './state';
import { TaskBoardActions } from './actions';


export const kanbanReducer = createReducer(
  initialKanbanState,

  on(TaskBoardActions.addTask, (state, { id, title }) => ({
    ...state,
    tasks: [
      ...state.tasks,
      {
        id,
        title,
        status: 'todo',
        priority: undefined,
        loadingPriority: true,
        errorPriority: undefined,
      }
    ]
  })),

  on(TaskBoardActions.updateTask, (state, { taskId, title }) => ({
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, title } : task
    ),
  })),

  on(TaskBoardActions.updateTaskStatus, (state, { taskId, status }) => ({
    ...state,
    tasks: state.tasks.map(t =>
      t.id === taskId ? { ...t, status } : t
    )
  })),

 on(TaskBoardActions.deleteTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== taskId)
  })),

 on(TaskBoardActions.fetchPriority, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            loadingPriority: true,
            errorPriority: undefined,
          }
        : task
    )
  })),

  on(TaskBoardActions.fetchPrioritySuccess, (state, { taskId, priority }) => ({
    ...state,
    tasks: state.tasks.map(t =>
      t.id === taskId
        ? {
            ...t,
            priority,
            loadingPriority: false,
            errorPriority: undefined,
          }
        : t
    )
  })),

  on(TaskBoardActions.fetchPriorityFailure, (state, { taskId, error }) => ({
    ...state,
    tasks: state.tasks.map(t =>
      t.id === taskId
        ? {
            ...t,
            loadingPriority: false,
            errorPriority: error,
          }
        : t
    )
  })),
);
