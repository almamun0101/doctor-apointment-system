import React from "react";
import { IoMdArrowForward } from "react-icons/io";

const services = [
  {
    title: "Dental treatments",
    detail:
      "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
  },
  {
    title: "Bones treatments",
    detail:
      "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
  },
  {
    title: "Diagnosis",
    detail:
      "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
  },
  {
    title: "Cardiology",
    detail:
      "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
  },
  {
    title: "Surgery",
    detail:
      "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
  },
  {
    title: "Eye care",
    detail:
      "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
  },
];
const Services = () => {
  return (
    <div className="container flex items-center justify-center flex-col py-30 gap-5 text-black dark:text-white ">
      <h2 className="text-4xl text-pri font-medium ">Services we provide </h2>
      <p className="w-[413px] text-center font-light">
        Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar
        elementum tempus hac tellus libero accumsan.{" "}
      </p>
      <div className="grid grid-cols-3 gap-10">
        {services.map((s, index) => (
          <div
            key={index}
            className="flex flex-col gap-5 bg-white p-5 rounded-2xl text-pri"
          >
            <img src={`${s.title}.png`} alt={s.title} />
            <h3 className="font-bold">{s.title}</h3>
            <p>{s.detail}</p>
            <div className="flex items-center  gap-2">
              <a href="">Learn More</a>
              <IoMdArrowForward />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
