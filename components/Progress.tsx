'use client'
import Image from "next/image";
import progress from "~~/public/img/progress.svg";

export default function Progress() {
  return (
    <div className="relative overflow-hidden ">
        <Image height={32} className="w-full " src={progress} alt="progress"/>
        {/* <div  className="h-[46.5px] left-[100px] rounded mx-8 top-[1px] bg-gray-100 absolute w-[100%] parallelogram"></div> */}
    </div>
  );
}
