export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: string;
}