"use client";
// REACT //
import React from "react";
import useEmblaCarousel from "embla-carousel-react";

// COMPONENTS //
import HeaderUserChip from "../components/HeaderUserChip";
import SliderArrow from "../components/SliderArrow";

// UTILS //
import { Profile } from "@/lib/matchmaking.util";

// your existing components

// types

type MainHeaderProps = {
  maleProfiles: Profile[];
  femaleProfiles: Profile[];
  selectedMaleIndex: number;
  setSelectedMaleIndex: (i: number) => void;
  selectedFemaleIndex: number;
  setSelectedFemaleIndex: (i: number) => void;
  showArrowsWhenMoreThan?: number; // default 3
};

const MainHeader: React.FC<MainHeaderProps> = ({
  maleProfiles,
  femaleProfiles,
  selectedMaleIndex,
  setSelectedMaleIndex,
  selectedFemaleIndex,
  setSelectedFemaleIndex,
  showArrowsWhenMoreThan = 3,
}) => {
  // Embla instances/hook
  const [boysRef, boysApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [girlsRef, girlsApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });

  // Defining variables to show arrows based on length of profiles
  const showBoysArrows = maleProfiles.length > showArrowsWhenMoreThan;
  const showGirlsArrows = femaleProfiles.length > showArrowsWhenMoreThan;

  return (
    // Main Header Wrapper
    <div className="flex justify-between gap-3.5">
      {/* Boys row */}
      <div className="relative flex w-1/2 px-9 py-2 overflow-hidden">
        {/* Show arrow based on count of profiles */}
        {showBoysArrows && (
          <button
            type="button"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2"
            onClick={() => boysApi?.scrollPrev()}
            aria-label="Previous boys"
          >
            {/* Left Arrow Component */}
            <SliderArrow direction="left" />
          </button>
        )}

        {/* Boys Profile Items Wrapper */}
        <div className="w-full overflow-hidden" ref={boysRef}>
          <div className="flex gap-3.5">
            {/* Header User Chip Component */}
            {maleProfiles.map((maleProfileItem, maleProfileItemIndex) => (
              <HeaderUserChip
                key={`${
                  maleProfileItem.code_no ?? maleProfileItem.name ?? "m"
                }-${maleProfileItemIndex}`}
                src={maleProfileItem.photo_1}
                name={maleProfileItem.name ?? "Candidate Name"}
                age={maleProfileItem.age}
                isActive={selectedMaleIndex === maleProfileItemIndex}
                onClick={() => setSelectedMaleIndex(maleProfileItemIndex)}
              />
            ))}
          </div>
        </div>

        {/* Show arrow based on count of profiles */}
        {showBoysArrows && (
          <button
            type="button"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2"
            onClick={() => boysApi?.scrollNext()}
            aria-label="Next boys"
          >
            {/* Right Arrow Component */}
            <SliderArrow direction="right" />
          </button>
        )}
      </div>

      {/* Girls row */}
      <div className="relative flex w-1/2 px-9 py-2 overflow-hidden">
        {/* Show arrow based on count of profiles */}
        {showGirlsArrows && (
          <button
            type="button"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2"
            onClick={() => girlsApi?.scrollPrev()}
            aria-label="Previous girls"
          >
            {/* Left Arrow Component */}
            <SliderArrow direction="left" />
          </button>
        )}

        {/* Girls Profile Items Wrapper */}
        <div className="w-full overflow-hidden" ref={girlsRef}>
          <div className="flex gap-3.5">
            {/* Header User Chip Component */}
            {femaleProfiles.map((femaleProfileItem, femaleProfileItemIndex) => (
              <HeaderUserChip
                key={`${
                  femaleProfileItem.code_no ?? femaleProfileItem.name ?? "f"
                }-${femaleProfileItemIndex}`}
                src={femaleProfileItem.photo_1}
                name={femaleProfileItem.name ?? "Candidate Name"}
                age={femaleProfileItem.age}
                isActive={selectedFemaleIndex === femaleProfileItemIndex}
                onClick={() => setSelectedFemaleIndex(femaleProfileItemIndex)}
              />
            ))}
          </div>
        </div>

        {/* Show arrow based on count of profiles */}
        {showGirlsArrows && (
          <button
            type="button"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2"
            onClick={() => girlsApi?.scrollNext()}
            aria-label="Next girls"
          >
            {/* Right Arrow Component */}
            <SliderArrow direction="right" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
