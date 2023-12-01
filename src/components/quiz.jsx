import { useEffect, useState } from "react";
import Question from "./Question";
import Loader from "./Loader";
import { Randomize } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { VscDebugRestart } from "react-icons/vsc";
import { IoMdSend } from "react-icons/io";
import Modal from "./Modal";
import logo from "../assets/svg/logo-black.svg";

export default function Quiz(props) {
	let [data, setData] = useState([]);
	let [openModel, setOpenModal] = useState(false);
	let totalQuestions = 10;
	const [correctAnswer, setCorrectAnswer] = useState(0);
	const [tries, setTries] = useState(1);
	const [loading, setLoading] = useState(true);
	const [gameFinished, setGameFinished] = useState(false);

	useEffect(() => {
		document.body.style.overflow = openModel ? "hidden" : "auto";
	}, [openModel]);

	useEffect(() => {
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
		fetchData();
	}, [tries]);

	const onSelect = (id, option) => {
		setData((prev) => prev.map((item) => (item.id === id ? { ...item, seletedOption: option } : item)));
	};

	function checkAnswer() {
		const correct = data.filter((item) => item.seletedOption === item.correctAnswer);
		setCorrectAnswer(correct.length);
		setGameFinished(true);
		setOpenModal(true);
	}

	if (!data.length || loading) return <Loader />;
	return (
		<>
			<AnimatePresence>
				{openModel && <Modal tryAgain={setTries} correct={correctAnswer} total={totalQuestions} setOpenModal={setOpenModal} />}
			</AnimatePresence>
			<div className='max-w-7xl mx-auto bg-white md:rounded-xl px-5 pb-5'>
				<div className='flex justify-center items-center'>
					<img src={logo} className='w-44' alt='' />
				</div>
				<div className='border-[2px] border-indigo-500 rounded-xl p-5 flex flex-col gap-3 font-[poppins]'>
					{data.slice(0, totalQuestions).map((q, i) => (
						<Question key={q.id} {...q} index={i} onSelect={onSelect} gameFinished={gameFinished} />
					))}

					<button
						className='p-2 md:w-52 md:self-center bg-indigo-500 rounded-xl text-white text-lg font-semibold tracking-wider font-[poppins] hover:bg-indigo-600 transition-all hover:scale-[1.01]'
						onClick={() => {
							gameFinished ? setTries(tries + 1) : checkAnswer();
						}}>
						{gameFinished ? <ButtonText text='Try Again' Icon={VscDebugRestart} /> : <ButtonText text='Submit' Icon={IoMdSend} />}
					</button>
				</div>
			</div>
		</>
	);
}

const ButtonText = ({ text, Icon }) => {
	return (
		<span className='flex justify-center items-center gap-2 group'>
			{text}{" "}
			<Icon className={`${text === "Submit" ? "group-hover:translate-x-2" : "group-hover:-rotate-[270deg] duration-500"} scale-105 transition-all`} />
		</span>
	);
};
