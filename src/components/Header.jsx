import React from "react";
import { AvatarCircles } from "./ui/avatar-circles";
const avatarUrls = [
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569",
];


const Header = () => {
  return (
    <div className="container flex justify-between items-center gap-10">
      <div className="flex flex-col gap-10">
        <h1 className="text-4xl font-medium leading-12 w-[657px]">
          Providing Quality <span className="text-pri"> Healthcare</span> for A
          <span className="text-sec"> Brighter</span> and{" "}
          <span className="text-sec"> Healthy</span> Future
        </h1>
        <p className="w-[587px]">
          At our hospital, we are dedicated to providing exceptional medical
          care to our patients and their families. Our experienced team of
          medical professionals, cutting-edge technology, and compassionate
          approach make us a leader in the healthcare industry
        </p>
        <div className="flex gap-5 ">
          <button className="bg-pri px-6 py-3 rounded-lg text-white  ">
            Appointments
          </button>
          <button className="bg-pri px-6 py-3 rounded-lg text-white  ">
            Appointments
          </button>
        </div>
      </div>
      <div className="relative">
        <img src="banner.png" alt="Banner" />
        <div className="absolute top-40 right-0 bg-white rounded-sm p-3 ">
          <span className="text-pri font-bold px-2 text-xl">24/7</span>
          services
        </div>
        <div className="absolute bottom-10 -left-20 bg-white rounded-sm px-5 py-2 ">
            <p>our professionals</p>
          <AvatarCircles numPeople={30} avatarUrls={avatarUrls} />
        </div>
      </div>
      
    </div>
  );
};

export default Header;
