"use client";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className="h-36 w-full bg-[#393939] rounded-b-[1rem] flex flex-col items-center">
      <div className="mx-auto flex justify-between max-w-[2000px] w-full md:p-6 p-3 md:items-center">
        <Link href={"/"}>
          <Image src="/userIcon.png" alt="User Icon" width={20} height={20} className="w-5 h-5" />
        </Link>

        <div className="mt-6 md:mt-0">
          <Image src="/iglesiaIcon.png" alt="Iglesia Icon" width={40} height={40} className="w-10 h-10" />
        </div>

        <div className="">
          <Image src="/powerOff.png" alt="Power Off" width={20} height={20} className="w-5 h-5" />
        </div>
      </div>
      <div className="border-b border-[#BD1400] w-[180px] text-center">
        <h1 className="text-xl font-semibold text-white">SANTA TERESA</h1>
      </div>
    </div>
  );
};

export default Header;
