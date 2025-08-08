"use client"
import Image from "next/image";
import React, { useEffect, useRef } from "react";

import ProfileImage from "@/../public/assets/images/main-profile.png";

type PhotoSliderProps = {
};

export default function PhotoSlider({}):PhotoSliderProps {

  return (
    <div className="rounded-3xl w-full">
        <Image src={ProfileImage} alt="omkar" className="w-full" />
    </div>
  );
}
