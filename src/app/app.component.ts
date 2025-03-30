import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgClass, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  todoList: TodoItem[] = [];
  newTask: string = '';
  editingTaskId: number | null = null;
  editingTaskValue: string = '';

  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: this.newTask,
        completed: false,
      }

      this.todoList.push(newTodoItem);
      this.newTask = '';

    }
  }

  toggleCompleted(index: number): void {
    console.log(index);
    this.todoList[index].completed = !this.todoList[index].completed;
    console.log(this.todoList);
  }

  deleteTask(id: number): void {
    this.todoList = this.todoList.filter(item => item.id !== id);
    console.log(this.todoList);

  }

  editTask(todoItem: TodoItem): void {
    this.editingTaskId = todoItem.id;
    this.editingTaskValue = todoItem.task;
  }

  saveTask(id: number): void {
    if (this.editingTaskValue.trim() !== '') {
      const task = this.todoList.find(item => item.id === id);
      if (task) {
        task.task = this.editingTaskValue;
      }
    }
    this.editingTaskId = null;
    this.editingTaskValue = '';
  }
}
