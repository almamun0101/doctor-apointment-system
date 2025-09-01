import React from "react";
import CountUp from "react-countup";

const Results = () => {
  return (
    <div className="container flex items-center justify-center flex-col py-20 gap-15 text-black dark:text-white font-bold">
      <h2 className="text-3xl text-pri font-medium ">Our Results In numbers</h2>
      <div className="grid grid-cols-4 gap-30">
        <div className="flex  flex-col items-center gap-2">
          <CountUp
            className="text-4xl font-bold text-pri"
            end={95}
            duration={3}
            suffix="%"
          />
          <h3>Customer satisfaction</h3>
        </div>
        <div className="flex  flex-col items-center gap-2">
          <CountUp
            className="text-4xl font-bold text-pri"
            end={15}
            duration={3}
            suffix="k"
          />
          <h3>Online Patients</h3>
        </div>
        <div className="flex  flex-col items-center gap-2">
          <CountUp
            className="text-4xl font-bold text-pri"
            end={12}
            duration={3}
            suffix="k"
          />
          <h3>Patients Recovered</h3>
        </div>
        <div className="flex  flex-col items-center gap-2">
          <CountUp
            className="text-4xl font-bold text-pri"
            end={240}
            duration={3}
            suffix="%"
          />
          <h3>Company growth</h3>
        </div>
      </div>
    </div>
  );
};

export default Results;
