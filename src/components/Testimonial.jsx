import React from "react";
const testimonials = [
  {
    name: "John Carter2",
    position: "CEO at Google",
    title: "“An amazing service”",
    content:
      "Lorem ipsum dolor sit ametolil col consectetur adipiscing lectus a nunc mauris scelerisque sed egestas.",
  },
  {
    name: "Sophie Mooree",
    position: "MD at Facebook",
    title: "“One of a kind service”",
    content:
      "Ultrices eros in cursus turpis massa tincidunt sem nulla pharetra diam sit amet nisl suscipit adipis.",
  },
  {
    name: "Andy Smithe",
    position: "CEO Dot Austere",
    title: "“The best service”",
    content:
      "Convallis posuere morbi leo urna molestie at elementum eu facilisis sapien pellentesque habitant.",
  },
];
const Testimonial = () => {
  return (
    <div className="container flex items-center justify-center flex-col py-30 gap-5 text-black dark:text-white ">
      <h2 className="text-4xl text-pri font-medium ">Meet our team members </h2>
      <p className="w-[413px] text-center font-light">
        Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar
        elementum tempus hac tellus libero accumsan.{" "}
      </p>
      <div className="grid grid-cols-3 gap-10 py-10 w-full">
        {testimonials.map((member, index) => (
          <div
            key={index}
            className="flex text-left p-10 flex-col gap-5 bg-white rounded-2xl text-pri"
          >
            <div className="flex justify-start">
              <img src={`${member.name}.png`} alt={member.title} />
            </div>
            <h2 className="text-xl text-black font-bold">{member.title}</h2>
            <p className="text-black font-extralight ">
              {member.content}
            </p>
            <div className="">
              <h3 className="font-bold text-lg pt-5">{member.name}</h3>
              <h4 className="font-bold text-black/30">{member.position}</h4>
            </div>
            <div className="flex items-center  gap-2 py-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
