import { createReducer } from '@ngrx/store';
import { initialKanbanState } from './state';


export const kanbanReducer = createReducer(
  initialKanbanState
);
