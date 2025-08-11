"use client";
import React, { useEffect, useState, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import SliderArrow from "./SliderArrow";
import { Profile } from "@/lib/matchmaking.util";

interface PhotoSliderProps {
  profile: Profile;
  alt?: string;
  loop?: boolean;
}

const PhotoSlider: React.FC<PhotoSliderProps> = ({
  profile,
  alt = "slide",
  loop = true,
}) => {
  // Build images array from profile fields, skipping empty/null values
  const images = useMemo(
    () =>
      [profile.photo_1, profile.photo_2, profile.photo_3].filter(
        (src): src is string => Boolean(src)
      ),
    [profile]
  );

  console.log(images);

  // State
  const [isPrevImg, setIsPrevImg] = useState(false);
  const [isNextImg, setIsNextImg] = useState(images.length > 1);

  // Embla Carousel
  const [viewportRef, emblaApi] = useEmblaCarousel({
    loop: loop && images.length > 1,
    containScroll: "trimSnaps",
    align: "start",
  });

  useEffect(() => {
    if (!emblaApi) return;
    const updateUi = () => {
      setIsPrevImg(emblaApi.canScrollPrev());
      setIsNextImg(emblaApi.canScrollNext());
    };
    emblaApi.on("select", updateUi);
    emblaApi.on("reInit", updateUi);
    updateUi();
  }, [emblaApi]);

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      <button
        type="button"
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!isPrevImg}
        aria-label="Previous"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 disabled:opacity-40"
      >
        <SliderArrow direction="left" />
      </button>

      {/* Viewport */}
      <div className="overflow-hidden rounded-3xl" ref={viewportRef}>
        <div className="flex">
          {images.map((imageSrc, idx) => (
            <div
              key={`${imageSrc}-${idx}`}
              className="relative shrink-0 w-full"
            >
              <div className="relative w-full h-full aspect-[4/6]">
                <Image
                  src={imageSrc}
                  alt={`${alt} ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        type="button"
        onClick={() => emblaApi?.scrollNext()}
        disabled={!isNextImg}
        aria-label="Next"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 disabled:opacity-40"
      >
        <SliderArrow direction="right" />
      </button>
    </div>
  );
};

export default PhotoSlider;
