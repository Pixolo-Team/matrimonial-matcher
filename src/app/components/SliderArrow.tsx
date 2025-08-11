// COMPONENTS //
import Image from "next/image";

const SliderArrow: React.FC<{
  direction: "left" | "right";
}> = ({ direction }) => {
  return (
    <div
      className={
        " cursor-pointer rounded-full border-1 border-slate-800 bg-slate-50 size-8 flex justify-center hover:bg-slate-200 transition-colors duration-300" +
        (direction === "right" ? " ml-2" : " mr-2")
      }
    >
      <Image
        src="/icons/arrow.svg"
        alt={"arrow"}
        width={10}
        height={10}
        className={`transform ${
          direction === "right" ? "rotate-180" : "rotate-0"
        } transition-transform duration-300`}
      />
    </div>
  );
};
export default SliderArrow;
