import { BorrarTodoAction } from './../todo.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from '../../app.reducers';
import { ToggleTodoAction, EditarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styles: []
})
export class TodosItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef; // Como selección en jquery
  chkField: FormControl;
  txtInput: FormControl;
  editando: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    console.log(this.todo);
    this.chkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.chkField.valueChanges
      .subscribe( () => {
          const accion = new ToggleTodoAction(this.todo.id);
          this.store.dispatch(accion);
      });
  }

  editar() {
    this.editando = true;
    setTimeout( () => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;

    if (this.txtInput.invalid) {
      return;
    }

    if (this.txtInput.value === this.todo.texto) {
      return;
    }

    const accion = new EditarTodoAction(this.todo.id, this.txtInput.value);
    this.store.dispatch(accion);
  }

  borrarTodo() {
    const action = new BorrarTodoAction(this.todo.id);
    this.store.dispatch(action);
  }

}

