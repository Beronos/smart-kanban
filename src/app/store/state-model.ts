export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority?: TaskPriority;
  loadingPriority: boolean;
  errorPriority?: string;
}

export interface KanbanState {
  tasks: Task[];
}

export interface Column {
  id: TaskStatus;
  title: string;
}