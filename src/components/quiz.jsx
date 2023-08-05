import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Answers from "./Answers";

export default function Quiz(props) {
  let [data, setData] = useState([]);
  let [gameFinished, setGameFinished] = useState(false);
  let [result, setResult] = useState("");

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
                category: i.category,

                options: [
                  {
                    opt: i.correctAnswer,
                    isCorrect: true,
                    id: nanoid(),
                    selected: false,
                    correctPick: true,
                  },
                  {
                    opt: i.incorrectAnswers[0],
                    isCorrect: false,
                    id: nanoid(),
                    selected: false,
                    correctPick: false,
                  },
                  {
                    opt: i.incorrectAnswers[1],
                    isCorrect: false,
                    id: nanoid(),
                    selected: false,
                    correctPick: false,
                  },
                  {
                    opt: i.incorrectAnswers[2],
                    isCorrect: false,
                    id: nanoid(),
                    selected: false,
                    correctPick: false,
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

      setData(newData);
    }
  }

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
    <div
      className="
        bg-slate-100
        p-6
       shadow-lg
       rounded-md
        flex flex-col 
       lg:max-w-[95%]
       min-h-[90vh]
       min-w-[80vw]

         
         
         "
    >
      <h1
        className="font-bold text-4xl  text-center my-2 mb-8
      bg-slate-500 py-5 rounded-md shadow-md text-white "
      >
        QuizWiz
      </h1>
      {data.slice(0, 5).map((obj) => {
        return (
          <div
            className="text-gray-700 flex flex-col gap-2 mb-6"
            key={obj.id}
            id={obj.id}
          >
            <div className="flex items-center">
              <h2 className=" font-semibold my-3 mr-auto">{obj.question}</h2>

              <span className="text-[.5rem] md:text-[1rem] rounded-md shadow-md p-1 mx-2 bg-slate-400 font-thin text-white">
                {obj.category}
              </span>
            </div>
            <div
              className=" font-semibold text-center flex-wrap grid md:grid-cols-4  border-b-2 pb-3 gap-4 grid-cols-2"
              id="answerOptions"
            >
              <Answers
                options={obj.options}
                gameFinished={gameFinished}
                clickHandle={clickHandle}
                questionId={obj.id}
              />
            </div>
          </div>
        );
      })}
      {gameFinished && (
        <div className="text-center font-semibold text-3xl my-5 ">
          You Got {result.length} out of 5
        </div>
      )}
      <button
        className=" hover:bg-gray-700 hover:text-white font-bold shadow-md bg-white px-10 py-3 rounded-xl self-center mb-4 font-[poppins]"
        onClick={checkAnswer}
      >
        {gameFinished ? "Start Again" : "Check Answer"}
      </button>
    </div>
  );
}
