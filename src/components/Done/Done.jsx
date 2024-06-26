import React from "react";
import { useContext } from "react";
import Context from "../../scripts/context";
import { toast, Toaster } from "react-hot-toast";

const Done = () => {
  const { state, dispatch } = useContext(Context);
  const data = state.done;
  const title = data.length;

  const unDone = (id, text) => {
    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("Data loaded");
        }, 2000);
      }),
      {
        loading: "Loading...",
        success: "Loaded successfully!",
        error: "Error loading data!",
      }
    );
    dispatch({
      type: "UNDONE",
      payload: { id: id, text: text },
    });
  };

  return (
    <div className="">
      <h2 className="text-white text-[16px] leading-[19px] mb-[17px]">
        Done - {title}
      </h2>
      <ul className="flex flex-col gap-4">
        {data.map((item) => (
          <li
            key={item.id}
            className="bg-primary rounded-[10px] flex py-[20px] px-[20px] justify-between items-center"
          >
            <p
              onClick={() => unDone(item.id, item.text)}
              className="text-lightGreen line-through text-[16px]"
            >
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Done;
