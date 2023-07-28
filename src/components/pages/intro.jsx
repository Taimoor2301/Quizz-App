export default function Intro(props) {
  return (
    <div className="flex flex-col gap-6 max-w-2xl relative aspect-square mx-auto mt-4 justify-center items-center bg-[#F5F7FB]">
      <div className="text-center text-[#293264]">
        <h1 className="text-6xl my-4 font-bold">Quizzical</h1>
        <p className="space-x-2">Some Description if Needed</p>
      </div>

      <button
        className="bg-[#4D5B9E] hover:bg-[#293264] text-white px-16 py-5 rounded-2xl"
        onClick={props.start}
      >
        Start Quiz
      </button>
    </div>
  );
}
