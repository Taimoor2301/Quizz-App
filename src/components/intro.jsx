import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function Intro() {
  const main = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from("#white-container", {
        xPercent: "-100",
        duration: 0.7,
        delay: 0.5,
        ease: "power4.out",
      })
        .from(".heading1", {
          y: 100,
          opacity: 0,
          stagger: 0.3,
          duration: 0.3,
          ease: "power4.out",
        })
        .to(".heading1", {
          y: -100,
          opacity: 0,
          stagger: 0.3,
          duration: 0.3,
          delay: 0.75,
          ease: "power4.in",
        })
        .to("#white-container", {
          xPercent: "-100",
          duration: 0.7,
        })
        .from(".welcome", {
          opacity: 0,
          delay: 0.3,
          duration: 0.5,
        })
        .to("#start-button", { opacity: 1, delay: 0.5, duration: 0.3 });
    }, [main]);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={main}
      className="h-screen flex flex-col gap-3 justify-center items-center bg-gray-950 relative"
    >
      <div
        className="absolute bg-white font-space tracking-tighter inset-0 z-10 px-10 flex flex-col justify-center gap-5"
        id="white-container"
      >
        <h1 className="text-gray-800 lg:text-9xl md:text-7xl text-5xl heading1">
          It's
        </h1>
        <h1 className="text-gray-800 lg:text-9xl md:text-7xl text-5xl heading1">
          Time
        </h1>
        <h1 className="text-gray-800 lg:text-9xl md:text-7xl text-5xl heading1">
          For A Quizzz!
        </h1>
      </div>
      <h1 className="lg:text-9xl md:text-7xl text-5xl font-bold text-gray-100 font-space welcome">
        Welcome
      </h1>
      <Link
        to="/quiz"
        className="text-gray-100 flex justify-center items-center p-2 text-xl opacity-0 rounded-md border-2 border-white hover:bg-white hover:text-gray-950 transition-all duration-500 ease-out w-44"
        id="start-button"
      >
        Start
      </Link>
    </main>
  );
}
