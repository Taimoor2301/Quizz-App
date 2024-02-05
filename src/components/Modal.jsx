// import pic from "../assets/winner.svg";
import { motion } from "framer-motion";
import { VscDebugRestart } from "react-icons/vsc";

function Modal({ tryAgain, setOpenModal, correct = 10, total = 10 }) {
  const handleTryAgain = () => {
    tryAgain();
    setOpenModal(false);
  };

  return (
    <motion.div
      className="fixed inset-0 grid place-content-center z-[9000000] bg-gray-950"
      onClick={() => setOpenModal(false)}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ scale: 0 }}
    >
      <div
        className="p-5 rounded-xl flex flex-col justify-center items-center h-[95vh] w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl md:text-4xl text-center font-bold font-[poppins] tracking-wide pt-10 text-gray-100">
          You got{" "}
          <span className="text-indigo-500 text-5xl px-2">{correct}</span>{" "}
          questions right out of {total}
        </h1>

        <p className="text-gray-300 tracking-wide font-[poppins] pt-3">
          Thanks for trying out.
        </p>

        <div className="flex justify-center items-center gap-3 py-10">
          <button
            className="border-2 h-14 flex items-center justify-center gap-2 border-white font-semibold text-lg rounded-lg text-white hover:bg-gray-800 tracking-wide px-2 md:w-44 transition-all"
            onClick={() => handleTryAgain()}
          >
            Try Again <VscDebugRestart />
          </button>
          <button
            className="border-2 h-14 grid place-content-center border-indigo-500 hover:border-black font-semibold text-lg rounded-lg text-white bg-indigo-500 hover:bg-gray-800 tracking-wide md:w-44 px-2 transition-all"
            onClick={() => setOpenModal(false)}
          >
            View Answers
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Modal;
