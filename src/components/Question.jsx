function Question({
  id,
  question,
  options,
  onSelect,
  index,
  category,
  seletedOption,
  correctAnswer,
  gameFinished,
}) {
  return (
    <div
      className="flex flex-col gap-5 mb-10 h-full justify-center font-space"
      id={id}
    >
      <h1 className="flex flex-col justify-center gap-5 items-center font-semibold text-center bg-gray-100 min-h-[150px] py-5 rounded-xl relative">
        <div className="bg-indigo-500 absolute capitalize px-16 py-3 flex justify-center items-center  rounded-3xl top-[0%] translate-y-[-50%] text-white font-semibold text-sm">
          {category}
        </div>
        <span className="max-w-[90%] lg:max-w-[80%] text-md md:text-2xl">
          {index + 1}. {question}
        </span>
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {options.map((o) => (
          <span
            onClick={() => onSelect(id, o, index)}
            key={o}
            className={`col-span-1 rounded-md px-2 py-4 text-center text-xs md:text-base hover:bg-indigo-500 hover:shadow-indigo-300 hover:shadow-[0_0px_15px] hover:text-white transition-all cursor-pointer ${
              !gameFinished && seletedOption === o
                ? "bg-indigo-500 text-gray-100"
                : gameFinished && correctAnswer === o
                ? "bg-green-500 text-gray-100"
                : gameFinished && seletedOption === o && correctAnswer !== o
                ? "bg-red-500 text-gray-100"
                : "bg-gray-100"
            }`}
          >
            {o}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Question;
