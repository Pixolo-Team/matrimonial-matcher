"use client"
import React, { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { ShareIcon } from "lucide-react";
import Image from "next/image";
import { buildFullWhatsAppMessage, buildPartialWhatsAppMessage, buildWebWhatsAppLink } from "@/lib/whatsapp";


type SendMessagePopupProps = {
  isVisible: boolean;
  onClose: () => void;
  sendTo: string;
  user: any;
};

export default function SendMessagePopup({ isVisible, onClose, sendTo, user }: SendMessagePopupProps) {
  const overlayRef = useRef<HTMLDivElement>(null);


  // Helper Functions
  /** Close when clicking outside the popup */
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  /** Send Whatsapp Message */
  const sendWhatsappMessage = () => {
    const fullMsg = buildFullWhatsAppMessage(user);
    const shortMsg = buildPartialWhatsAppMessage(user, {
                include: [
                  "code_no",
                  "name",
                  "gender",
                  "date_of_birth",
                  "age",
                  "height",
                  "working_or_own_venture",
                  "designation",
                  "employer",
                  "working_location",
                  "mob1",
                ],
                title: "Candidate Snapshot",
              });
      
    const webWhatsappLink = buildWebWhatsAppLink(shortMsg, sendTo);
    console.log("WhatsApp Web Link:", webWhatsappLink);
  }

  useEffect(() => {
    if (isVisible) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 bg-slate-800 bg-opacity-30 flex justify-center items-center"
    >
      <div className="bg-white px-10 py-6 rounded-xl w-[90%] max-w-sm animate-fadeIn shadow-lg">
        <div className="flex flex-col items-center gap-11">
          {/* Centered Text */}
          <p className="text-center text-lg font-medium text-gray-900">You are about to send the details to the boy’s family. Please the select the option below to decide what data to send.</p>

          {/* Button Stack */}
          <div className="flex flex-col gap-5 w-full">
            {/* Send Basic Details */}
            <Button className="bg-slate-50 hover:bg-yellow-600 text-slate-800 w-full h-18 text-base font-medium cursor-pointer" onClick={sendWhatsappMessage}>
                <Image src={ShareIcon} alt="share" />
                Send Basic Details
            </Button>

            {/* Send Full Details */}
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-slate-800 w-full h-18 text-base font-medium cursor-pointer" onClick={sendWhatsappMessage}>
                <Image src={ShareIcon} alt="share" />
                Send Full Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
