import React from "react";
import { Switch } from "@/components/ui/switch";

const Find = () => {
  return (
    <div className="container bg-white p-5 rounded-2xl text-black">
      <h2 className="text-3xl font-bold py-2 ">Find A Doctor</h2>
      <div className="pt-5 grid grid-cols-4 gap-5 justify-between items-center placeholder:text-black">
        <input
          type="text"
          className="rounded-sm border border-pri px-10 py-2"
          placeholder="Name"
        />
        <input
          type="text"
          className="rounded-sm border border-pri px-10 py-2"
          placeholder="Name"
        />
        <Switch>Availbe</Switch>{" "}
        <input
          type="button"
          className="rounded-sm border border-pri px-10 py-2 bg-pri text-white"
          value="Search"
        />
      </div>
    </div>
  );
};

export default Find;
