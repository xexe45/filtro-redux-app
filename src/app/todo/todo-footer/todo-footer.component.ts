import { AppState } from './../../app.reducers';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions';
import * as fromTodo from '../todo.actions';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {
  pendientes: number;
  filtrosValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtrosValidos;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe( state => {
      this.contarPendientes(state.todos);
      this.filtroActual = state.filtro;
    });
  }

  cambiarFiltro(filtro: fromFiltro.filtrosValidos) {
    const accion = new fromFiltro.SetFiltroAction(filtro);
    this.store.dispatch(accion);
  }

  contarPendientes( todos: Todo[] ) {
    this.pendientes = todos.filter( todo => !todo.completado ).length;
  }

  borrarTodo() {
    const accion = new fromTodo.BorrarAllTodoAction();
    this.store.dispatch(accion);
  }

}
