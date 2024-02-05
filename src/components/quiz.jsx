import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Question from "./Question";
import Loader from "./Loader";
import { Randomize } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { VscDebugRestart } from "react-icons/vsc";
import { IoMdSend } from "react-icons/io";
import Modal from "./Modal";
import gsap from "gsap";

export default function Quiz() {
  let [data, setData] = useState([]);
  let [openModel, setOpenModal] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameFinished, setGameFinished] = useState(false);
  const main = useRef(null);

  async function fetchData() {
    setGameFinished(false);
    setLoading(true);
    const res = await fetch("https://the-trivia-api.com/v2/questions");
    const data = await res.json();
    setData(
      data.map((item) => ({
        question: item.question.text,
        options: Randomize(item.incorrectAnswers, item.correctAnswer),
        category: item.category,
        id: item.id,
        correctAnswer: item.correctAnswer,
      }))
    );
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(".white-container", {
        xPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      }).from("#questions", { opacity: 0, duration: 0.5, ease: "power4.out" });
    }, [main]);

    return () => ctx.revert();
  }, [data]);

  const onSelect = (id, option, index) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, seletedOption: option } : item
      )
    );
    if (index < 9) {
      document
        .getElementById(data[index + 1]?.id)
        .scrollIntoView({ behavior: "smooth" });
    }
  };

  function checkAnswer() {
    const correct = data.filter(
      (item) => item.seletedOption === item.correctAnswer
    );
    setCorrectAnswer(correct.length);
    setGameFinished(true);
    setOpenModal(true);
  }

  if (!data.length || loading)
    return (
      <div className="h-screen bg-gray-950 grid place-content-center">
        <Loader />
      </div>
    );
  return (
    <div
      className="h-screen relative overflow-hidden flex justify-center items-center bg-gray-950 flex-col gap-5"
      ref={main}
    >
      <AnimatePresence>
        {openModel && (
          <Modal
            tryAgain={fetchData}
            correct={correctAnswer}
            setOpenModal={setOpenModal}
          />
        )}
      </AnimatePresence>

      <div className="bg-gray-100 absolute inset-0 z-20 white-container"></div>

      <div
        className="h-3/4 overflow-y-auto w-[95%] lg:w-2/3 p-5 pt-12"
        id="questions"
      >
        {data.slice(0, 10).map((q, i) => (
          <Question
            key={q.id}
            {...q}
            index={i}
            onSelect={onSelect}
            gameFinished={gameFinished}
          />
        ))}
      </div>
      <Button
        gameFinished={gameFinished}
        fetchData={fetchData}
        checkAnswer={checkAnswer}
      />
    </div>
  );
}

const Button = ({ gameFinished, fetchData, checkAnswer }) => {
  return (
    <button
      className="p-2 md:w-52 md:self-center bg-indigo-500 rounded-xl text-white text-lg font-semibold tracking-wider font-[poppins] hover:bg-gray-700 transition-all"
      onClick={() => {
        gameFinished ? fetchData() : checkAnswer();
      }}
    >
      {gameFinished ? (
        <ButtonText text="Try Again" Icon={VscDebugRestart} />
      ) : (
        <ButtonText text="Submit" Icon={IoMdSend} />
      )}
    </button>
  );
};

const ButtonText = ({ text, Icon }) => {
  return (
    <span className="flex justify-center items-center gap-2 group">
      {text}{" "}
      <Icon
        className={`${
          text === "Submit"
            ? "group-hover:translate-x-2"
            : "group-hover:-rotate-[270deg] duration-500"
        } scale-105 transition-all`}
      />
    </span>
  );
};
