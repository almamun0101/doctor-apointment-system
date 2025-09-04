import React from "react";

const Choose = () => {
  return (
    <div className="container  flex flex-wrap justify-center md:justify-between items-center gap-10">
      <div className="flex py-10 flex-col gap-10  w-[455px] text-center mx-auto">
        <h2 className="text-pri text-3xl font-bold landing-12">
          You have lots of reasons to choose us
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
          phasellus mollis sit aliquam sit nullam.
        </p>
        <div className="flex gap-5">
            <button className="hover:bg-pri hover:text-white transition-colors bg-white text-black rounded-3xl px-10 py-3">Get Started</button>
            <button className="hover:bg-pri hover:text-white transition-colors bg-white text-black rounded-3xl px-10 py-3">Talk To sales</button>
        </div>
      </div>
      <div className="">
        <img src="operation.png" alt="" />
      </div>
    </div>
  );
};

export default Choose;
