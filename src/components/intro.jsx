export default function Intro(props) {
  return (
    <div
      className=" bg-blue-800
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
      <div className="text-center text-white flex flex-col">
        <h1
          className="font-bold text-6xl  text-center my-2 mb-8
      bg-white py-5 rounded-md shadow-md text-blue-800"
        >
          QuizWiz
        </h1>
        <p className="md:max-w-[70%]  text-center self-center my-12 text-lg md:text-2xl ">
          Welcome to MindMeld, where quick thinking meets endless fun in the
          realm of mind-boggling quizzes!
        </p>
      </div>

      <button
        className="font-bold shadow-md bg-white text-blue-800 px-10 py-3 rounded self-stretch md:self-center mb-4 font-[poppins] min-w-[50%] text-4xl"
        onClick={props.start}
      >
        Start Quiz
      </button>
    </div>
  );
}
