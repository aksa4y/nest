import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';
import { Task, CreateTaskDto } from '../../../shared/models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks = signal<Task[]>([]);
  newTaskTitle = signal('');
  isLoading = signal(false);

  private taskService = inject(TaskService);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data) => this.tasks.set(data));
  }

  addTask() {
    const title = this.newTaskTitle().trim();
    if (!title) return;

    this.isLoading.set(true);
    const dto: CreateTaskDto = { title };
    this.taskService.createTask(dto).subscribe({
      next: () => {
        this.newTaskTitle.set('');
        this.isLoading.set(false);
        this.loadTasks();
      },
      error: () => this.isLoading.set(false),
    });
  }

  removeTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  getStatusLabel(status?: string): string {
    const labels: Record<string, string> = {
      open: 'Открыта',
      in_progress: 'В процессе',
      done: 'Завершена',
    };
    return status ? labels[status] || status : 'Открыта';
  }

  getStatusClass(status?: string): string {
    const classes: Record<string, string> = {
      open: 'status-open',
      in_progress: 'status-progress',
      done: 'status-done',
    };
    return status ? classes[status] || 'status-open' : 'status-open';
  }
}
