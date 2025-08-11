"use client";
// REACT //
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

// COMPONENTS //
import Image from "next/image";

// OTHERS //
import SliderArrow from "./SliderArrow";

type ImageSrc = React.ComponentProps<typeof Image>["src"];

interface PhotoSliderProps {
  images: ImageSrc[];
  alt?: string;
  loop?: boolean;
}

/** Profile Photo Slider Component */
const PhotoSlider: React.FC<PhotoSliderProps> = ({
  images,
  alt = "slide",
  loop = true,
}) => {
  // Define States
  const [isPrevImg, setIsPrevImg] = useState(false);
  const [isNextImg, setIsNextImg] = useState(images.length > 1);

  // Embla Carousel Hook
  const [viewportRef, emblaApi] = useEmblaCarousel({
    loop: loop && images.length > 1,
    containScroll: "trimSnaps",
    align: "start",
  });

  // useEffect
  useEffect(() => {
    // Exit if no slider not ready
    if (!emblaApi) return;
    const updateUi = () => {
      // Enable/Disable left arrows
      setIsPrevImg(emblaApi.canScrollPrev());
      // Enable/Disable right arrows
      setIsNextImg(emblaApi.canScrollNext());
    };
    // On slide change
    emblaApi.on("select", updateUi);
    // On carousel reinitialization
    emblaApi.on("reInit", updateUi);
    // Initial check on mount
    updateUi();
  }, [emblaApi]);

  return (
    <div className={"relative w-full"}>
      {/* Left Arrow Button */}
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
      <div className={"overflow-hidden rounded-3xl"} ref={viewportRef}>
        <div className="flex">
          {images.map((imageSrc, imageIndex) => (
            <div
              key={`${imageSrc}-${imageIndex}`}
              className="relative shrink-0 w-full"
            >
              <div className="relative w-full h-full aspect-[4/6]">
              {/* Images seen here */}
                <Image
                  src={imageSrc}
                  alt={`${alt} ${imageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow Button*/}
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
