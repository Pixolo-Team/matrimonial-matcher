"use client";
// REACT //
import React, { useEffect, useRef } from "react";

// COMPONENTS //
import { Button } from "@/components/ui/button";
import Image from "next/image";

// SVG's //
import ShareIcon from "@/../public/icons/share.svg";

type SendMessagePopupProps = {
  isVisible: boolean;
  onClose: () => void;
  sendBasicDetails?: () => void;
  sendFullDetails?: () => void;
};

export default function SendMessagePopup({
  isVisible,
  onClose,
  sendBasicDetails,
  sendFullDetails,
}: SendMessagePopupProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Helper Functions
  /** Close when clicking outside the popup */
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    if (isVisible) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 bg-n-700/54 flex justify-center items-center"
    >
      <div className="bg-n-50 px-10 py-6 rounded-xl w-2/6 animate-fadeIn shadow-lg">
        <div className="flex flex-col items-center gap-11">
          {/* Centered Text */}
          <p className="text-center text-lg font-medium text-n-900">
            You are about to send the details to the boy’s family. Please the
            select the option below to decide what data to send.
          </p>

          {/* Button Stack */}
          <div className="flex flex-col gap-5 w-full">
            {/* Send Basic Details */}
            <Button
              className="bg-n-50 border-2 border-primary-500 hover:bg-primary-200 text-n-800 w-full h-16 text-base font-medium cursor-pointer"
              onClick={sendBasicDetails}
              variant={"outline"}
            >
              <Image src={ShareIcon} alt="share" />
              Send Basic Details
            </Button>

            {/* Send Full Details */}
            <Button
              className="bg-primary-500 hover:bg-primary-600 text-n-800 w-full h-16 text-base font-medium cursor-pointer"
              onClick={sendFullDetails}
            >
              <Image src={ShareIcon} alt="share" />
              Send Full Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
