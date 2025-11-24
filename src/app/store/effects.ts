import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TaskBoardActions } from './actions';
import { Kanban } from '../services/kanban';

@Injectable()
export class KanbanEffects {
  private actions$ = inject(Actions);
  private priorityService = inject(Kanban);

  loadPriority = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskBoardActions.fetchPriority),
      mergeMap(({ taskId }) =>
        this.priorityService.getPriority().pipe(
          map(priority => TaskBoardActions.fetchPrioritySuccess({ taskId, priority })),
          catchError(err =>
            of(
              TaskBoardActions.fetchPriorityFailure({
                taskId,
                error: err?.message || 'Failed to load priority',
              })
            )
          )
        )
      )
    )
  );
}
