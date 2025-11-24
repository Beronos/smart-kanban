import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../store/state-model';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  task = input.required<Task>();
}

