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
  editingId: number | null = null;
  showCompleted: boolean = true;

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

  deleteTask(id:number): void{ 
    this.todoList = this.todoList.filter(item => item.id !== id);
    console.log(this.todoList);
  }

  toggleCompleted(index:number): void{ 
    this.todoList[index].completed = !this.todoList[index].completed;
    console.log(this.todoList);
  }

  startEditing(id: number): void {
    console.log("startEditing", id);
    this.editingId = id;
    setTimeout(() => {
      const element = document.querySelector(`[contentEditable="true"]`);
      if (element) {
        (element as HTMLElement).focus();
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }, 5);
  }

  finishEditing(event: any, id: number): void {
    const newText = event.target.innerText.trim();
    if (newText && this.editingId === id) {
      const index = this.todoList.findIndex(item => item.id === id);
      if (index !== -1) {
        this.todoList[index].task = newText;
      }
    }
    this.editingId = null;
  }

  cancelEditing(id: number): void {
    if (this.editingId === id) {
      const index = this.todoList.findIndex(item => item.id === id);
      if (index !== -1) {
        const element = event?.target as HTMLElement;
        if (element) {
          element.innerText = this.todoList[index].task;
        }
      }
      this.editingId = null;
    }
  }

  toggleShowCompleted(): void {
    this.showCompleted = !this.showCompleted;
  }
}
