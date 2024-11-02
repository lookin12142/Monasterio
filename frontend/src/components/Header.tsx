"use client";
import Link from "next/link";

const Header = () => {
  return (
    <div className="h-36 w-full bg-[#393939] rounded-b-[1rem] flex flex-col items-center">
      <div className="mx-auto flex justify-between max-w-[2000px] w-full md:p-6 p-3 md:items-center">
        <Link href={"/"}>
          <img src="userIcon.png" alt="" className="w-5 h-5" /> {/* Icono más pequeño */}
        </Link>

        <div className="mt-6 md:mt-0">
          <img src="iglesiaIcon.png" alt="" className="w-10 h-10" /> {/* Icono más pequeño */}
        </div>

        <div className="">
          <img src="powerOff.png" alt="" className="w-5 h-5" /> {/* Icono más pequeño */}
        </div>
      </div>
      <div className="border-b border-[#BD1400] w-[180px] text-center">
        <h1 className="text-xl font-semibold text-white">SANTA TERESA</h1>
      </div>
    </div>
  );
};

export default Header;
