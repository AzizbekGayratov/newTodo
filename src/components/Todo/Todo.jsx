import React from "react";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import Context from "../../scripts/context";

const Todo = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isEditId, setIsEditId] = useState(null);

  const [newText, setNewText] = useState("");
  const [checkText, setCheckText] = useState(newText);

  const { state, dispatch } = useContext(Context);
  const data = state.todos;
  const title = data.length;

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        dispatch({ type: "REMOVE", payload: id });
      }
    });
  };

  const editItem = (id) => {
    setIsEditId(id);
    setIsEdit(!isEdit);
  };
  const saveEdit = (id, text) => {
    setIsEdit(!isEdit);
    if (text !== checkText) {
      Swal.fire({
        title: "Are you sure?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save changes!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Saved!",
            icon: "success",
          });
          dispatch({ type: "EDIT", payload: { id, text } });
        }
      });
    }
  };

  return (
    <div className="">
      <h2 className="text-white text-[16px] leading-[19px] mb-[17px]">
        Tasks to do - {title}
      </h2>
      <ul className="flex flex-col gap-4">
        {data.map((todo) =>
          isEdit && todo.id === isEditId ? (
            <li
              key={todo.id}
              className="bg-primary rounded-[10px] flex py-[16px] px-[20px] justify-between items-center"
            >
              <input
                onChange={(e) => setNewText(e.target.value)}
                className="bg-transparent border-none text-white outline-none placeholder:text-inputColor w-full"
                type="text"
                placeholder="Editing ..."
                defaultValue={todo.text}
                required
              />
              <button
                onClick={() => {
                  setCheckText(newText);
                  saveEdit(todo.id, newText);
                  setIsEdit(!isEdit);
                }}
                className="bg-violetColor rounded-[8px] text-focusedColor text-[16px] text-semibold py-[4px] px-[10px] hover:bg-focusedColor transition-all duration-300  ml-[10px] hover:text-violetColor"
              >
                Edit
              </button>
            </li>
          ) : (
            <li
              key={todo.id}
              className="bg-primary rounded-[10px] flex py-[20px] px-[20px] justify-between items-center"
            >
              <p
                onClick={() => editItem(todo.id)}
                className="text-violetColor text-[16px]"
              >
                {todo.text}
              </p>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    dispatch({
                      type: "DONE",
                      payload: { id: todo.id, text: todo.text },
                    })
                  }
                  className="w-[30px] h-[30px] bg-no-repeat bg-center bg-[url('/src/assets/check.svg')] mr-[10px]"
                ></button>
                <button
                  onClick={() => deleteItem(todo.id)}
                  className="w-[30px] h-[30px] bg-no-repeat bg-center bg-[url('/src/assets/delete.svg')]"
                ></button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Todo;
