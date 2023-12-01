export default function Question({ id, question, options, onSelect, index, category, seletedOption, correctAnswer, gameFinished }) {
	return (
		<div className='pt-2 pb-5 border-b border-b-indigo-100 select-none'>
			<h1 className='text-sm md:text-lg font-medium py-2 tracking-wide flex flex-col-reverse justify-between md:flex-row items-center gap-2'>
				<span>
					{index + 1}. {question}
				</span>
				<span className='capitalize text-xs border p-1 rounded-lg text-gray-500 font-mono'>{category}</span>
			</h1>
			<div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
				{options.map((o) => (
					<span
						onClick={() => onSelect(id, o)}
						key={o}
						className={`col-span-1 border border-indigo-400 rounded-md px-2 py-1.5 text-center text-xs md:text-base hover:bg-indigo-500 hover:shadow-indigo-300 hover:shadow-[0_5px_7px] hover:text-white transition-all cursor-pointer ${
							!gameFinished && seletedOption === o
								? "bg-indigo-500 text-white"
								: gameFinished && correctAnswer === o
								? "bg-green-400 text-white"
								: gameFinished && seletedOption === o && correctAnswer !== o && "bg-red-400 text-white"
						}`}>
						{o}
					</span>
				))}
			</div>
		</div>
	);
}
