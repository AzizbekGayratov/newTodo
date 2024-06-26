import React from "react";
import { Form, Todo, Done } from "./components/components.js";
import Context from "./scripts/context.js";
import reducer from "./scripts/reducer.js";
import { useReducer, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const initialState = JSON.parse(localStorage.getItem("todos_state")) || {
  todos: [],
  done: [],
};

const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("todos_state", JSON.stringify(state));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [state]);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {loading ? (
        <HashLoader
          color="#36d7b7"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="rounded-[20px] bg-boxBg pt-[50px] pb-[55px] pl-[65px] pr-[85px] flex flex-col gap-[60px]">
          <Form />
          <Todo />
          <Done />
        </div>
      )}
    </Context.Provider>
  );
};

export default App;
