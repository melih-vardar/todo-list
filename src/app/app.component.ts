import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface TodoItem {
  id:number;
  task:string;
  completed:boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  todoList: TodoItem [] = [];
  newTask:string = '';

  addTask(): void{
    if(this.newTask.trim() !== ''){

      const newTodoItem : TodoItem = {
        id: Date.now(),
        task: this.newTask,
        completed: false
    }
    this.todoList.push(newTodoItem);
    this.newTask = '';
  }
}
}
