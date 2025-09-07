import React from "react";

const companies = [
  { name: "Google" },
  { name: "Facebook" },
  { name: "YouTube" },
  { name: "Pinterest" },
  { name: "Twitch" },
  { name: "Webflow" },
];

import Responsive from "./ResponsiveSlides";

const Trusted = () => {
  return (
    <div className="container flex items-center justify-center flex-col gap-15 text-black dark:text-white font-bold py-10">
      <h2 className="text-3xl text-pri font-bold">
        Trusted by 10,000+ companies around the world
      </h2>

      <div className="w-3/4">
        <Responsive items={companies} />
      </div>

      <div className="py-20  flex justify-center flex-col items-center">
        <h2 className="py-5 text-3xl text-black  dark:text-white font-bold">
          Subscribe to our newsletter
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-10">
        <input type="text" className="bg-white md:w-[533px] px-10 py-3 rounded-3xl mx-auto" placeholder="Enter your email"/>

        <button className="bg-pri  px-10 py-3 rounded-2xl text-white">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Trusted;
