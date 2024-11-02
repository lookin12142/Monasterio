// components/DepartmentSection.tsx
"use client";
import Image from "next/image";

type DepartmentItem = {
  name: string;
  icon: string;
};

type DepartmentSectionProps = {
  title: string;
  items: DepartmentItem[];
};

const DepartmentSection = ({ title, items }: DepartmentSectionProps) => {
  return (
    <section className="my-8">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center w-48 h-32 p-4 bg-white rounded-lg shadow-md ${
              index === 0 && items.length === 1 ? "col-span-full" : ""
            }`}
          >
            <Image src={`/${item.icon}`} alt={item.name} width={40} height={40} />
            <p className="mt-2 font-medium text-red-600">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DepartmentSection;
