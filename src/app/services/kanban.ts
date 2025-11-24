import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { TaskPriority } from '../store/state-model';

@Injectable({
  providedIn: 'root',
})
export class Kanban {
  getPriority(): Observable<TaskPriority> {
    const priorities: TaskPriority[] = ['High', 'Medium', 'Low'];
    const randomIndex = Math.floor(Math.random() * priorities.length);
    const priority = priorities[randomIndex];

    const randomDelay = 500 + Math.floor(Math.random() * 700);

    const shouldFail = Math.random() < 0.25;

    if (shouldFail) {
      return throwError(() => new Error('AI service failed')).pipe(
        delay(randomDelay)
      );
    }

    return of(priority).pipe(delay(randomDelay));
  }
}
