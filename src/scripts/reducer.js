const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        todos: [
          {
            id: Date.now(),
            text: action.payload,
            isDone: false,
          },
          ...state.todos,
        ],
      };
    case "REMOVE":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "EDIT":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          }
          return todo;
        }),
      };
    case "DONE":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
        done: [
          {
            id: Date.now(),
            text: action.payload.text,
            isDone: true,
          },
          ...state.done,
        ],
      };
    case "UNDONE":
      return {
        ...state,
        done: state.done.filter((todo) => todo.id !== action.payload.id),
        todos: [
          {
            id: Date.now(),
            text: action.payload.text,
            isDone: false,
          },
          ...state.todos,
        ],
      };
    default:
      return state;
  }
};
export default reducer;
