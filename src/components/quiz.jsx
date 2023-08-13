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
        bg-blue-800
        p-6
       shadow-lg
       rounded-md
        flex flex-col 
       lg:max-w-[95%]
       min-h-[90vh]
       min-w-[80vw]
       mx-auto
       my-4

         
         
         "
    >
      <h1
        className="font-bold text-4xl  text-center my-2 mb-8
      bg-white py-5 rounded-md shadow-md text-blue-700 "
      >
        QuizWiz
      </h1>
      {data.slice(0, 5).map((obj) => {
        return (
          <div
            className="text-white flex flex-col gap-2 mb-6"
            key={obj.id}
            id={obj.id}
          >
            <div className="flex items-center justify-between">
              <h2 className=" font-semibold mb-3 mr-auto">{obj.question}</h2>

              <span className="text-[.5rem] md:text-[1rem] self-start rounded shadow-md p-1 mx-2 bg-white text-blue-800">
                {obj.category}
              </span>
            </div>
            <div
              className=" font-semibold text-center grid md:grid-cols-4  border-b-2 pb-3 gap-4 grid-cols-2"
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
        <div className="text-center font-semibold text-3xl my-5 text-white border-[3px] py-3 rounded ">
          You Got {result.length} out of 5
        </div>
      )}
      <button
        className="  text-blue-800 font-bold shadow-md bg-white px-10 py-3 rounded md:self-center mb-4 font-[poppins]"
        onClick={checkAnswer}
      >
        {gameFinished ? "Start Again" : "Check Answer"}
      </button>
    </div>
  );
}
