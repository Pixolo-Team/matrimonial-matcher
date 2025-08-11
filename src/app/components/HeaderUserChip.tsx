// COMPONENTS //
import Image, { StaticImageData } from "next/image";

/* Header User chip component */
const HeaderUserChip: React.FC<{
  src: string;
  name: string;
  age: string | number;
  isActive: boolean; // Optional prop to indicate active state
  onClick: () => void;
}> = ({ src, name, age, isActive = false, onClick }) => (
  // Chip container
  <div
    className={`min-w-[202px] rounded-2xl flex gap-2 px-3 py-2.5 items-center cursor-pointer
      ${isActive ? "bg-yellow-500" : "hover:bg-slate-100"}`}
    onClick={onClick}
  >
    {/* Profile image */}
    <div className="object-contain w-[50] h-[50] rounded-xl overflow-hidden">
      <Image
        src={src}
        alt={name}
        width={50}
        height={50}
        className="w-full h-full"
      />
    </div>
    <div className="flex flex-col">
      {/* Name */}
      <span className="block w-[120px] truncate text-lg font-semibold text-n-900">
        {name}
      </span>{" "}
      {/* Age or placeholder */}
      <span className="text-sm font-normal text-n-700">
        {age ? `${age} Years` : "-"}
      </span>{" "}
    </div>
  </div>
);

export default HeaderUserChip;
