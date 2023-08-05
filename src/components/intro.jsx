export default function Intro(props) {
  return (
    <div
      className=" bg-slate-100
        p-6
       shadow-lg
       rounded-md
       flex flex-col 
       lg:max-w-[95%]
       min-h-[90vh]
       min-w-[80vw]
       items-center
       gap-y-10
       "
    >
      <div className="text-center text-[#293264] flex flex-col">
        <h1
          className="font-bold text-6xl  text-center my-2 mb-8
      bg-slate-400 py-5 rounded-md shadow-md text-white "
        >
          QuizWiz
        </h1>
        <p className="md:max-w-[70%] text-center self-center my-12 text-3xl ">
          Welcome to MindMeld, where quick thinking meets endless fun in the
          realm of mind-boggling quizzes!
        </p>
      </div>

      <button
        className=" hover:bg-gray-700 hover:text-white font-bold shadow-md bg-white px-10 py-3 rounded-xl self-center mb-4 font-[poppins] min-w-[50%] text-4xl"
        onClick={props.start}
      >
        Start Quiz
      </button>
    </div>
  );
}
