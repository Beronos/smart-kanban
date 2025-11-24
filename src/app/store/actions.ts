import { createActionGroup, props } from "@ngrx/store";
import { TaskStatus } from "./state-model";

export const TaskBoardActions = createActionGroup({
  source: 'TaskBoard',
  events: {
    'Add Task': props<{ id: string; title: string }>(),
    'Update Task': props<{ taskId: string; title: string }>(),
    'Update Task Status': props<{ taskId: string; status: TaskStatus }>(),
    'Delete Task': props<{ taskId: string }>(),

    'Fetch Priority': props<{ taskId: string }>(),
    'Fetch Priority Success': props<{ taskId: string; priority: 'High' | 'Medium' | 'Low' }>(),
    'Fetch Priority Error': props<{ taskId: string; error: string }>(),
  },
});