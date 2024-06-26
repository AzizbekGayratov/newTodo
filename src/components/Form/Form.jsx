import React from "react";
import { useContext, useState, useRef } from "react";
import Context from "../../scripts/context";

const Form = () => {
  const [text, setText] = useState("");
  const { dispatch } = useContext(Context);
  const inputRef = useRef(null);

  const handleSubmit = () => {
    inputRef.current.value = "";
    inputRef.current.focus();
    dispatch({ type: "ADD", payload: text });
  };

  return (
    <div className="flex">
      <input
        ref={inputRef}
        onChange={(e) => setText(e.target.value)}
        className="bg-transparent border-[2px] border-violetColor rounded-[10px] w-96 h-[40px] pt-[12px] pb-[10px] px-[20px] text-white outline-none placeholder:text-inputColor mr-[10px] focus:border-focusedColor"
        type="text"
        placeholder="Add a new task"
        required
      />
      <button
        type="submit"
        onClick={() => handleSubmit()}
        className="bg-violetColor rounded-[10px] w-[40px] h-[40px] p-[8px] bg-no-repeat bg-center bg-[url('/src/assets/add.svg')] hover:bg-focusedColor transition-all duration-300"
      ></button>
    </div>
  );
};

export default Form;
