import React from 'react'

const companies = [
    {name:"Google"},
    {name:"Facebook"},
    {name:"YouTube"},
    {name:"Pinterest"},
    {name:"Twitch"},
    {name:"Webflow"},

]

const Trusted = () => {
  return (
   <div className="container flex items-center justify-center flex-col gap-15 text-black dark:text-white font-bold py-10">
      <h2 className="text-3xl text-pri font-bold ">Trusted by 10,000+ companies around the world</h2>
      <div className="grid grid-cols-6 gap-30">
            {companies.map((c)=>(
                <div className="">
                    <img src={`${c.name}.png`} alt={c.name} />
                </div>
            ))}
      </div>
    </div>
  )
}

export default Trusted