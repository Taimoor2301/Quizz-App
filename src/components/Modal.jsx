import pic from "../assets/winner.svg";
import { motion } from "framer-motion";
import { VscDebugRestart } from "react-icons/vsc";

function Modal({ tryAgain, setOpenModal, correct = 10, total = 10 }) {
	const handleTryAgain = () => {
		tryAgain((prev) => prev + 1);
		setOpenModal(false);
	};
	return (
		<motion.div
			className='fixed inset-0 grid place-content-center bg-black/20 backdrop-blur z-[9000000]'
			onClick={() => setOpenModal(false)}
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0 }}>
			<div
				className='p-5 rounded-xl flex flex-col justify-center items-center  bg-white backdrop-blur-md h-[95vh] w-[90vw]'
				onClick={(e) => e.stopPropagation()}>
				<div className='md:w-96 w-80'>
					<img className='w-full h-full object-cover' src={pic} alt='' />
				</div>

				<h1 className='text-2xl md:text-4xl text-center font-bold font-[poppins] tracking-wide pt-10 text-gray-700'>
					You got <span className='text-indigo-500 text-5xl px-2'>{correct}</span> questions right out of {total}
				</h1>

				<p className='text-gray-600 tracking-wide font-[poppins] pt-3'>Thanks for trying out.</p>

				<div className='flex justify-center items-center gap-3 py-10'>
					<button
						className='border-2 h-14 flex items-center justify-center gap-2 border-black font-semibold text-lg rounded-lg hover:text-white hover:bg-gray-800 tracking-wide px-2 md:w-44 transition-all'
						onClick={() => handleTryAgain()}>
						Try Again <VscDebugRestart />
					</button>
					<button
						className='border-2 h-14 grid place-content-center border-indigo-500 hover:border-black font-semibold text-lg rounded-lg text-white bg-indigo-500 hover:bg-gray-800 tracking-wide md:w-44 px-2 transition-all'
						onClick={() => setOpenModal(false)}>
						View Answers
					</button>
				</div>
			</div>
		</motion.div>
	);
}

export default Modal;
