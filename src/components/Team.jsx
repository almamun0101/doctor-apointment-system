import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const teams = [
  {
    name: "John Carter",
    position: "CEO & Co-Founder",
    details:
      "Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi. ",
  },
  {
    name: "Sophie Moore",
    position: "dental specialist",
    details:
      "Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi. ",
  },
  {
    name: "Matt Cannon",
    position: "Orthopedic",
    details:
      "Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi. ",
  },
  {
    name: "Andy Smith",
    position: "brain surgeon",
    details:
      "Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi. ",
  },
  {
    name: "Lily Woods",
    position: "heart specialist",
    details:
      "Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi. ",
  },
  {
    name: "Patrick Meyer",
    position: "Eye specialist",
    details:
      "Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi. ",
  },
];
const Team = () => {
  return (
    <div>
      <div className="container flex items-center justify-center flex-col py-30 gap-5 text-black dark:text-white ">
        <h2 className="text-4xl text-pri font-medium ">
          Meet our team members{" "}
        </h2>
        <p className="w-[413px] text-center font-light">
          Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar
          elementum tempus hac tellus libero accumsan.{" "}
        </p>
        <div className="grid grid-cols-3 gap-10 py-10">
          {teams.map((member, index) => (
            <div
              key={index}
              className="flex items-center text-center p-10 flex-col gap-3 bg-white p-5 rounded-2xl text-pri"
            >
              <img src={`${member.name}.png`} alt={member.title} />
              <h3 className="font-bold text-2xl pt-5">{member.name}</h3>
              <h4 className="font-bold text-black text-xl">
                {member.position}
              </h4>
              <p className="text-black py-2 font-extralight px-2 ">
                {member.details}
              </p>
              <div className="flex items-center  gap-2 py-2">
                <Link href="" className="bg-[#e6f2f2] p-3 rounded-lg">
                  <FaFacebookF size={20} className="text-blue-500" />
                </Link>
                <Link href="" className="bg-[#e6f2f2] p-3 rounded-lg">
                  <FaTwitter size={20} className="text-blue-300" />
                </Link>
                <Link href="" className="bg-[#e6f2f2] p-3 rounded-lg">
                  <FaInstagram size={20} className="text-red-500" />
                </Link>
                <Link href="" className="bg-[#e6f2f2] p-3 rounded-lg">
                  <FaLinkedin size={20} className="text-blue-500" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
