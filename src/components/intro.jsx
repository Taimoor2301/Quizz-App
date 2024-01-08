import pic from "../assets/welcome.svg";
import { FaLightbulb } from "react-icons/fa";
import logo from "../assets/svg/logo-black.svg";
export default function Intro(props) {
	return (
		<div className='p-5 rounded-xl max-w-7xl mx-auto flex flex-col justify-center items-center w-full bg-white border-2 border-indigo-500'>
			{/* <div className='w-[45%]'>
				<img className='w-full h-full object-cover' src={pic} alt='' />
			</div> */}

			<img
				src={logo}
				className='w-96'
				alt=''
			/>
			<p className='text-lg max-w-lg text-center'>
				Welcome to MindMeld, where quick thinking meets endless fun in the realm of mind-boggling quizzes!
			</p>

			<button
				className='border-2 h-14 flex items-center justify-center gap-2 border-black font-semibold text-2xl rounded-lg mt-10 hover:text-white hover:bg-gray-800 tracking-wide w-44 
				 transition-all'
				onClick={props.start}>
				Start <FaLightbulb />
			</button>
		</div>
	);
}
