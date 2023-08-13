import React, { useEffect, useState } from "react";

const Answers = (props) => {
  let [data, setData] = useState([]);
  useEffect(() => {
    let x = props.options.sort(() => Math.random() - 0.5);
    setData(x);
  }, []);
  function setSelectLocal(id) {
    let newArr = data.map((item) =>
      item.id !== id
        ? { ...item, selected: false }
        : { ...item, selected: true }
    );
    setData(newArr);
  }

  return data.map((i) => {
    return (
      <span
        className="hover:shadow-xl hover:translate-y-[-7px]  transition-all md:min-w-[150px] shadow-md rounded-md bg-white text-blue-800"
        style={
          !props.gameFinished
            ? {
                backgroundColor: i.selected ? "transparent" : "",
                border: i.selected
                  ? "3px solid white"
                  : "3px solid transparent",
                color: i.selected ? "white" : "",
              }
            : {
                backgroundColor: i.correctPick
                  ? "green"
                  : i.selected
                  ? "red"
                  : "white",
                color: i.selected || i.correctPick ? "white" : "",
                border:
                  i.selected || i.correctPick
                    ? "3px solid white"
                    : "3px solid transparent",
              }
        }
        onClick={() => {
          props.clickHandle(props.questionId, i.id);
          setSelectLocal(i.id);
        }}
        key={i.id}
      >
        {i.opt}
      </span>
    );
  });
};

export default Answers;
