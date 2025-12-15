"use client";
// REACT //
import React, { useEffect, useState, useMemo, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

// COMPONENTS //
import Image from "next/image";

// UTILS //
import { Profile } from "@/lib/matchmaking.util";

// OTHERS //
import SliderArrow from "./SliderArrow";

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
  /**  Build images array from profile fields, skipping empty/null values */
  const images = useMemo(
    () =>
      [profile.photo_1, profile.photo_2, profile.photo_3].filter(
        (src): src is string => Boolean(src)
      ),
    [profile]
  );

  /** A stable key that changes whenever the slide set actually changes */
  const imagesKey = useMemo(() => images.join("|"), [images]);

  // Define States
  const [isPrevImg, setIsPrevImg] = useState(false);
  const [isNextImg, setIsNextImg] = useState(images.length > 1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Embla Carousel
  const [viewportRef, emblaApi] = useEmblaCarousel({
    loop: loop && images.length > 1,
    containScroll: "trimSnaps",
    align: "start",
  });

  /** Sync UI state (selected index and arrow enable/disable) with Embla. */
  const updateUi = useCallback(() => {
    if (!emblaApi) return;
    // Current slide index
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setIsPrevImg(emblaApi.canScrollPrev());
    setIsNextImg(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Attach Embla event listeners, update on init/reInit, and clean up on unmount
  useEffect(() => {
    // Wait until Embla is ready
    if (!emblaApi) return;

    // Initialize snaps and sync UI
    setScrollSnaps(emblaApi.scrollSnapList());
    updateUi();
    emblaApi.on("select", updateUi);
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      updateUi();
    });
  }, [emblaApi, updateUi]);

  // Reset to first slide when the profile/images change
  useEffect(() => {
    // Reset index state
    setSelectedIndex(0);
    if (!emblaApi) return;

    // Ensure we’re at the first snap after slides change
    // Using reset frame id waits a tick for the DOM to reflect new slides
    const resetFrameId = requestAnimationFrame(() => {
      try {
        // Jump to first slide
        emblaApi.scrollTo(0, true);
        setScrollSnaps(emblaApi.scrollSnapList());
        setIsPrevImg(emblaApi.canScrollPrev());
        setIsNextImg(emblaApi.canScrollNext());
      } catch {}
    });
    return () => cancelAnimationFrame(resetFrameId);
  }, [emblaApi, imagesKey]);

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!isPrevImg}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 disabled:opacity-40"
        >
          <SliderArrow direction="left" />
        </button>
      )}

      {/* Viewport */}
      <div
        className="overflow-hidden rounded-3xl"
        ref={viewportRef}
        key={imagesKey}
      >
        <div className="flex">
          {images.map((imageSrc, idx) => (
            <div
              key={`${imageSrc}-${idx}`}
              className="relative shrink-0 w-full"
            >
              <div className="relative w-full h-full aspect-[4/6]">
                <Image
                  src={
                    imageSrc ??
                    "https://drive.google.com/open?id=1Jc6pohgCS-4TGtjdfRhoIdI67JlwCiU-"
                  }
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
      {images.length > 1 && (
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!isNextImg}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 disabled:opacity-40"
        >
          <SliderArrow direction="right" />
        </button>
      )}

      {/* Slider dot indicator */}
      {images.length > 1 && (
        <div className=" absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {scrollSnaps.map((snapItem, snapItemIndex) => (
            <button
              key={`${snapItem}-${snapItemIndex}`}
              className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                snapItemIndex === selectedIndex
                  ? "bg-n-50 h-2.5 w-2.5"
                  : "bg-n-300"
              }`}
              onClick={() => emblaApi?.scrollTo(snapItemIndex)}
              aria-label={`Go to slide ${snapItemIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoSlider;
