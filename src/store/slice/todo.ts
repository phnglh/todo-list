import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type Filter = 'all' | 'completed' | 'active';

interface TodoState {
  todos: Todo[];
  filter: Filter;
}

const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.todos.push({
        id: crypto.randomUUID(),
        title: action.payload,
        completed: false,
      });
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    editTodo(state, action: PayloadAction<{ id: string; title: string }>) {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) todo.title = action.payload.title;
    },
    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },
    loadFromLocalStorage(state) {
      const saved = localStorage.getItem('todos');
      if (saved) {
        state.todos = JSON.parse(saved);
      }
    }
  },
});

export const {
  addTodo,
  removeTodo,
  toggleTodo,
  editTodo,
  setFilter,
  loadFromLocalStorage,
} = todoSlice.actions;

export default todoSlice.reducer;
