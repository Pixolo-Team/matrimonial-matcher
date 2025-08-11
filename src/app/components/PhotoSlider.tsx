"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

import ProfileImage from "@/../public/assets/images/main-profile.webp";

export default function PhotoSlider() {
  return (
    <div className="rounded-3xl w-full">
      <Image src={ProfileImage} alt="omkar" className="w-full" />
    </div>
  );
}
