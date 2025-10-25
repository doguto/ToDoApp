// Data structures
export interface Task {
  id: string;
  title: string;
  startDate: string;
  dueDate: string;
  notes: string;
  projectId?: string;
  completed: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
}