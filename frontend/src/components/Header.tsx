"use client";
import Link from "next/link";

const Header = () => {
  return (
    <div className="h-72 w-full bg-[#393939] rounded-b-[2rem] flex flex-col items-center">
      <div className="mx-auto flex justify-between max-w-[2000px] w-full md:p-12 p-6 md:items-center">
        <Link href={"/"}>
          <img src="userIcon.png" alt="" />
        </Link>

        <div className="mt-14 md:mt-0">
          <img src="iglesiaIcon.png" alt="" />
        </div>

        <div className="">
          <img src="powerOff.png" alt="" />
        </div>
      </div>
      <div className="border-b-4 border-[#BD1400] w-[250px] text-center ">
        <h1 className="text-3xl font-bold text-white">SANTA TERESA</h1>
      </div>
    </div>
  );
};

export default Header;
