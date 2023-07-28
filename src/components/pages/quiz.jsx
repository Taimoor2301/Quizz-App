import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

export default function Quiz(props) {
  let [data, setData] = useState([]);
  let [gameFinished, setGameFinished] = useState(false);

  useEffect(function () {
    fetch("https://the-trivia-api.com/v2/questions")
      .then((res) => res.json())
      .then((data) => {
        data.map((i) => {
          setData((prev) => {
            return [
              ...prev,
              {
                id: i.id,
                question: i.question.text,

                options: [
                  {
                    opt: i.correctAnswer,
                    isCorrect: true,
                    id: nanoid(),
                    selected: false,
                  },
                  {
                    opt: i.incorrectAnswers[0],
                    isCorrect: false,
                    id: nanoid(),
                    selected: false,
                  },
                  {
                    opt: i.incorrectAnswers[1],
                    isCorrect: false,
                    id: nanoid(),
                    selected: false,
                  },
                  {
                    opt: i.incorrectAnswers[2],
                    isCorrect: false,
                    id: nanoid(),
                    selected: false,
                  },
                ],
              },
            ];
          });
        });
      });
  }, []);

  function clickHandle(mainId, spanId) {
    if (!gameFinished) {
      let newData = data.map((i) =>
        i.id !== mainId
          ? i
          : {
              ...i,
              options: i.options.map((o) =>
                o.id !== spanId
                  ? { ...o, selected: false }
                  : { ...o, selected: true }
              ),
            }
      );
      console.log(newData.slice(0, 5));
      setData(newData);
    }
  }
  let [result, setResult] = useState("");

  function checkAnswer() {
    if (!gameFinished) {
      let result = [];
      for (let i of data) {
        let arr = i.options.filter((j) => j.selected && j.isCorrect);
        if (arr.length > 0) {
          result.push(arr);
        }
      }
      setResult(result);
      setGameFinished((old) => !old);
    } else if (gameFinished) {
      props.startGame();
    }
  }

  return (
    <div className=" mx-auto  pt-6 px-3 bg-[#F5F7FB]  flex flex-col align-middle justify-center lg:max-w-6xl">
      <div className="mx-auto">
        {data.slice(0, 5).map((obj) => {
          return (
            <div
              className="text-[#293264] flex flex-col gap-2 mb-6 lg:max-w-[80%]"
              key={obj.id}
              id={obj.id}
            >
              <h2 className=" font-bold">{obj.question}</h2>
              <div
                className="flex lg:gap-[3rem] gap-4 font-medium text-center text-sm"
                id="answerOptions"
              >
                {obj.options.map((i) => {
                  return (
                    <span
                      style={{
                        backgroundColor: i.selected ? "#deebf8" : "transparent",
                      }}
                      onClick={() => clickHandle(obj.id, i.id)}
                      key={i.id}
                    >
                      {i.opt}
                    </span>
                  );
                })}
              </div>
              <div className="h-[2px] rounded-md bg-slate-300"></div>
            </div>
          );
        })}
      </div>

      {gameFinished && (
        <div className="text-center , font-semibold text-3xl my-5">
          You Got {result.length} out of 5
        </div>
      )}
      <button
        className="bg-[#4D5B9E] hover:bg-[#293264] font-bold text-xl text-white px-14 py-5 rounded-2xl self-center mb-6"
        onClick={checkAnswer}
      >
        {gameFinished ? "Start Again" : "Check Answer"}
      </button>
    </div>
  );
}
