import React, { useEffect, useState } from "react";

const Answers = (props) => {
  let [data, setData] = useState(props.options);
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
        style={
          !props.gameFinished
            ? {
                backgroundColor: i.selected ? "#4D5B9E" : "transparent",
                color: i.selected ? "white" : "inherit",
              }
            : {
                backgroundColor: i.correctPick
                  ? "green"
                  : i.selected
                  ? "red"
                  : "transparent",
                color: i.selected || i.correctPick ? "white" : "inherit",
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
