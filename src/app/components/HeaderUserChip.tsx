// COMPONENTS //
import Image, { StaticImageData } from "next/image";

/* Header User chip component */
const HeaderUserChip: React.FC<{
  img: StaticImageData;
  name: string;
  age?: string;
  isActive?: boolean; // Optional prop to indicate active state
}> = ({ img, name, age, isActive = false }) => (
  // Chip container
  <div
    className={`min-w-[202px] rounded-2xl flex gap-2 px-3 py-2.5 items-center 
      ${isActive ? "bg-yellow-500" : "hover:bg-slate-100"}`}
  >
    {/* Profile image */}
    <Image src={img} alt={name} />
    <div className="flex flex-col">
      {/* Name */}
      <span className="text-lg font-semibold text-n-900">{name}</span>{" "}
      {/* Age or placeholder */}
      <span className="text-sm font-normal text-n-700">
        {age ? `${age} Years` : "-"}
      </span>{" "}
    </div>
  </div>
);

export default HeaderUserChip;
