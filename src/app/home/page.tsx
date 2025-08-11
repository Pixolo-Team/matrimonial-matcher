"use client";
// REACT //
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

// COMPONENTS //
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LabelValueBlock from "../components/LabelValueBlock";
import SendMessagePopup from "../components/SendMessagePopup";
import PhotoSlider from "../components/PhotoSlider";
import HeaderUserChip from "../components/HeaderUserChip";
import MatchBadge from "../components/MatchBadge";
import SliderArrow from "../components/SliderArrow";

// CONSTANTS //
import { SHEET_URL } from "@/constants";

// UTILS //
import { calculateCompatibilityRating, Profile } from "@/lib/matchmaking.util";

// OTHERS //
import { fetchSheetData } from "@/lib/google-sheet";
import {
  buildFullWhatsAppMessage,
  buildPartialWhatsAppMessage,
  buildWebWhatsAppLink,
} from "@/lib/whatsapp";

// IMAGES //
import GirlProfileImage from "@/../public/assets/images/omkar-crush.jpg";
import BoyProfileImage from "@/../public/assets/images/main-profile.png";
import UserThumbImage from "@/../public/assets/images/user-photo.png";
import ProfileImage from "@/../public/assets/images/main-profile.png";

// SVG's //
import ShareIcon from "@/../public/icons/share.svg";

/** Home Screen */
const HomeScreen: React.FC = () => {
  // Define States
  const [sendMessageVisible, setSendMessageVisible] = useState<boolean>(false);
  const [maleProfiles, setMaleProfiles] = useState<Profile[]>([]);
  const [femaleProfiles, setFemaleProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [whatsappMessage, setWhatsappMessage] = useState<string>("");
  const [selectedMale, setSelectedMale] = useState<Profile | null>(null);
  const [selectedFemale, setSelectedFemale] = useState<Profile | null>(null);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);

  // Helper Functions
  const [boysRef, boysApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [girlsRef, girlsApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });

  /** Toggle the Popup */
  const toggleSendPopup = () => {
    setSendMessageVisible((prev) => !prev);
  };

  /** Open Send Message Popup */
  const initSendMessage = (user: Profile) => {
    setSelectedUser(user);
    setSendMessageVisible(true);
  };

  // close popup
  const closeSendPopup = () => {
    setSendMessageVisible(false);
    // setSelectedUser(null); // optional
  };

  // helpers to open WhatsApp
  const openWhatsApp = (msg: string, to?: string) => {
    const url = buildWebWhatsAppLink(msg, to); // uses normalizePhone internally
    // open in new tab; on mobile, browser redirects to app
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // send basic
  const handleSendBasic = () => {
    if (!selectedUser) return;
    const msg = buildPartialWhatsAppMessage(selectedUser, {
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
    openWhatsApp(msg, selectedUser.mob1); // or use a fixed `sendTo`
    closeSendPopup();
  };

  // send full
  const handleSendFull = () => {
    if (!selectedUser) return;
    const msg = buildFullWhatsAppMessage(selectedUser);
    openWhatsApp(msg, selectedUser.mob1); // or a fixed `sendTo`
    closeSendPopup();
  };

  /**
   * Separates a list of profiles into male and female groups based on the gender field.
   */
  function separateProfilesByGender(profiles: Profile[]) {
    const males: Profile[] = [];
    const females: Profile[] = [];

    // Loop over profiles and push gender specific profiles in their respective states
    profiles.forEach((profile) => {
      const gender =
        profile.gender?.toLowerCase() || profile.sex?.toLowerCase();

      if (gender === "male") {
        males.push(profile);
      } else if (gender === "female") {
        females.push(profile);
      }
    });

    return { males, females };
  }

  /** Process the raw data ans store it in profile states */
  const loadAndProcessData = useCallback(async () => {
    try {
      const rawProfiles = await fetchSheetData(SHEET_URL);

      const { males, females } = separateProfilesByGender(rawProfiles);

      setMaleProfiles(males);
      setFemaleProfiles(females);

      // Set the first Male
      males.length > 0 ? setSelectedMale(males[0]) : null;

      // Set first Female
      females.length > 0 ? setSelectedFemale(females[0]) : null;

      // Example compatibility test (can be removed or moved to button action)
      const rating = calculateCompatibilityRating(
        {
          name: "Rahul",
          age: "30",
          salary_pm: "90000",
          mother_bari: "Bharadwaj",
          working_location: "Mumbai",
          is_divorced: "No",
          height: "178",
        },
        {
          name: "Priya",
          age: "37",
          salary_pm: "50000",
          mother_bari: "Bharadwaj",
          working_location: "Mumbai",
          is_divorced: "No",
          height: "185",
        }
      );
      console.log(`Compatibility Rating: ${rating}%`);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // TODO: Remove later
  const BoysImgs = [
    "/assets/images/main-profile.png",
    "/assets/images/omkar-2.png",
    "/assets/images/omkar-2.png",
    "/assets/images/omkar-2.png",
  ];
  // TODO: Remove later
  const GirlsImgs = [
    "/assets/images/omkar-crush.jpg",
    "/assets/images/omkar-crush-2.jpg",
  ];

  useEffect(() => {
    loadAndProcessData();
    console.log(selectedUser, "male");
  }, [loadAndProcessData]);

  return (
    <div className="bg-slate-200 min-h-screen z-10 relative before:content-[''] before:h-full before:w-[calc(50%-10px)] before:bg-slate-50 before:rounded-3xl before:absolute before:top-0 before:left-0 before:-z-11 after:content-[''] after:h-full after:w-[calc(50%-10px)] after:bg-slate-50 after:rounded-3xl after:absolute after:top-0 after:right-0 after:-z-10">
      {/* Popup that comes on Send Message */}
      <SendMessagePopup
        isVisible={sendMessageVisible}
        onClose={closeSendPopup}
        sendTo={"2342"}
        user={selectedUser}
        sendBasicDetails={handleSendBasic}
        sendFullDetails={handleSendFull}
      />

      {/* Header Section  */}
      <div className=" flex gap-3.5 justify-between">
        {/* Boys Header */}
        <div className="relative flex w-1/2 py-2 px-9 overflow-hidden">
          {/* Slider Arrow Component - Right*/}
          <div
            className="absolute top-1/2 left-3 -translate-y-1/2 z-10"
            onClick={() => boysApi?.scrollPrev()}
          >
            <SliderArrow direction="left" />
          </div>
          <div className="overflow-hidden w-full" ref={boysRef}>
            <div className="flex gap-3.5">
              {/* Boy Header Chip Component */}
              <HeaderUserChip
                img={UserThumbImage}
                name="Rahul Shetty"
                age="33"
                isActive
              />
              {/* Boy Header Chip Component */}
              <HeaderUserChip
                img={UserThumbImage}
                name="Rahul Shetty"
                age="33"
              />
              <HeaderUserChip
                img={UserThumbImage}
                name="Rahul Shetty"
                age="33"
              />
              <HeaderUserChip
                img={UserThumbImage}
                name="Rahul Shetty"
                age="33"
              />
              <HeaderUserChip
                img={UserThumbImage}
                name="Rahul Shetty"
                age="33"
              />
            </div>
          </div>
          {/* Slider Arrow Component - Right */}
          <div
            className="absolute top-1/2 right-3 -translate-y-1/2 z-10"
            onClick={() => boysApi?.scrollNext()}
          >
            <SliderArrow direction="right" />
          </div>
        </div>
        {/* Girls Header */}
        <div className="relative flex w-1/2 py-2 px-9">
          {/* Slider Arrow Component - Left */}
          <div
            className="absolute top-1/2 left-3 -translate-y-1/2 z-10"
            onClick={() => girlsApi?.scrollPrev()}
          >
            <SliderArrow direction="left" />
          </div>
          <div className="overflow-hidden w-full" ref={girlsRef}>
            <div className="flex gap-3.5 ">
              {/* Girl Header Chip Component */}
              <HeaderUserChip
                img={UserThumbImage}
                name="Rahul Shetty"
                age="33"
                isActive
              />
              {/* Girl Header Chip Component */}
              <HeaderUserChip
                img={UserThumbImage}
                name="Rahul Shetty"
                age="33"
              />
              {/* Girl Header Chip Component */}
              <HeaderUserChip
                img={UserThumbImage}
                name="Rahul Shetty"
                age="33"
              />
              {/* Girl Header Chip Component */}
              <HeaderUserChip
                img={UserThumbImage}
                name="Rahul Shetty"
                age="33"
              />
              {/* Girl Header Chip Component */}
              <HeaderUserChip
                img={UserThumbImage}
                name="Rahul Shetty"
                age="33"
              />
            </div>
          </div>
          {/* Slider Arrow Component - Right */}
          <div
            className="absolute top-1/2 right-3 -translate-y-1/2"
            onClick={() => girlsApi?.scrollNext()}
          >
            <SliderArrow direction="right" />
          </div>
        </div>
      </div>
      {/* Separation */}
      <div className="flex justify-between gap-3.5 ">
        <div className="w-1/2 h-px px-12">
          <div className=" h-px bg-slate-300"></div>
        </div>
        <div className="w-1/2 h-px px-12">
          <div className=" h-px bg-slate-300"></div>
        </div>
      </div>
      {/* Main Content Section */}
      <div className="flex">
        {/* Boys Profile Image Wrapper */}
        <div className="w-116 flex flex-col items-center gap-4 px-5 py-8 ">
          {/* Profile Image Slider */}
          <PhotoSlider images={BoysImgs} alt="Profile photo" loop={false} />
          {/* Button */}
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-slate-800 w-full h-18 text-base font-medium cursor-pointer"
            onClick={() => {
              selectedFemale && initSendMessage(selectedFemale);
            }}
          >
            <Image src={ShareIcon} alt="share" />
            Send Girls Details
          </Button>
        </div>
        <div className="w-2/3 flex flex-col py-8">
          {/* Box 1  */}
          <div className="interactive-card ">
            {/* Boy Title */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-n-900">
                {selectedMale?.name}
              </span>
              <span className="size-3 bg-yellow-500 rounded-full"></span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="size-3 bg-yellow-500 rounded-full"></span>
              <span className="text-3xl font-bold text-n-900">
                {selectedFemale?.name}
              </span>
            </div>

            {/* Match Score Badge Component */}
            <MatchBadge score={69} />
          </div>

          {/* DOB */}
          <div className=" interactive-card ">
            {/* Boy - DOB */}
            <div className="label-value-container-left">
              <LabelValueBlock label="Date of Birth">
                <div className="flex flex-col  justify-start items-start">
                  <div className="flex gap-2 justify-center items-center">
                    <span className="text-lg font-medium text-n-900">
                      {selectedMale?.date_of_birth}
                    </span>
                    <span className="text-xl font-medium text-n-600">
                      ({selectedMale?.age})
                    </span>
                  </div>
                  <div className="flex gap-2.5 justify-start items-center">
                    <span className="text-sm font-normal text-n-900">
                      {selectedMale?.birth_day}
                    </span>
                    <div className="flex justify-start items-start"></div>
                    <span className="text-sm font-normal text-n-900">
                      {selectedMale?.birth_time}
                    </span>
                    <div className="flex justify-start items-start"></div>
                    <span className="text-sm font-normal text-n-900">
                      {selectedMale?.birth_place}
                    </span>
                  </div>
                </div>
              </LabelValueBlock>
            </div>

            {/* Girl - DOB */}
            <div className="label-value-container-right">
              <LabelValueBlock label="Date of Birth" align="right">
                <div className="flex flex-col  justify-start items-end">
                  <div className="flex gap-2 justify-center items-center">
                    <span className="text-lg font-medium text-n-900">
                      {selectedFemale?.date_of_birth}
                    </span>
                    <span className="text-xl font-medium text-n-600">
                      ({selectedFemale?.age})
                    </span>
                  </div>
                  <div className="flex gap-2.5 justify-start items-center">
                    <span className="text-sm font-normal text-n-900">
                      {selectedFemale?.birth_day}
                    </span>
                    <div className="flex justify-start items-start"></div>
                    <span className="text-sm font-normal text-n-900">
                      {selectedFemale?.birth_time}
                    </span>
                    <div className="flex justify-start items-start"></div>
                    <span className="text-sm font-normal text-n-900">
                      {selectedFemale?.birth_place}
                    </span>
                  </div>
                </div>
              </LabelValueBlock>
            </div>
            <span className="no-match-reason">Less than</span>
            <span className="yes-match-reason">More than</span>
          </div>

          {/* HEIGHT */}
          <div className="interactive-card yes-match">
            {/* Boy Height */}
            <div className="label-value-container-left">
              <LabelValueBlock label={"Height"} value={selectedMale?.height} />
            </div>

            {/* Girl Height */}
            <div className="label-value-container-right">
              <LabelValueBlock
                label={"Height"}
                value={selectedFemale?.height}
                align="right"
              />
            </div>

            {/* Reasons for Yes / No */}
            <span className="no-match-reason">Less than</span>
            <span className="yes-match-reason">More than</span>
          </div>

          {/* NAKSHATRA / RASHI */}
          <div className="interactive-card">
            {/* Boy */}
            <div className="label-value-container-left">
              <LabelValueBlock
                label={"Nakshatra | Rashi"}
                value={`${selectedMale?.nakshatra} | ${selectedMale?.rashi}`}
              />
            </div>

            {/* Girl */}
            <div className="label-value-container-right">
              <LabelValueBlock
                label={"Nakshatra | Rashi"}
                value={`${selectedFemale?.nakshatra} | ${selectedFemale?.rashi}`}
                align="right"
              />
            </div>
          </div>

          {/* EDUCATION */}
          <div className="interactive-card">
            {/* Boy */}
            <div className="label-value-container-left">
              <LabelValueBlock
                label={"Education"}
                value={selectedMale?.edu_qualifications}
              />
            </div>

            {/* Girl */}
            <div className="label-value-container-right">
              <LabelValueBlock
                label={"Education"}
                value={selectedFemale?.edu_qualifications}
                align="right"
              />
            </div>
          </div>

          {/* WORKING / OWN VENTURE */}
          <div className="interactive-card">
            {/* Boy */}
            <div className="label-value-container-left">
              <LabelValueBlock
                label={"Working / Own Venture"}
                value={selectedMale?.working_or_own_venture}
              />
            </div>

            {/* Girl */}
            <div className="label-value-container-right">
              <LabelValueBlock
                label={"Working / Own Venture"}
                value={selectedFemale?.working_or_own_venture}
                align="right"
              />
            </div>
          </div>

          {/* WORKING LOCATION */}
          <div className="interactive-card">
            {/* Boy */}
            <div className="label-value-container-left">
              <LabelValueBlock
                label={"Working Location"}
                value={selectedMale?.working_location}
              />
            </div>

            {/* Girl */}
            <div className="label-value-container-right">
              <LabelValueBlock
                label={"Working Location"}
                value={selectedFemale?.working_location}
                align="right"
              />
            </div>

            {/* Match Reasons */}
            <span className="no-match-reason">Less than</span>
            <span className="yes-match-reason">More than</span>
          </div>

          {/* SALARY */}
          <div className="interactive-card">
            {/* Boy */}
            <div className="label-value-container-left">
              <LabelValueBlock
                label={"Salary PM"}
                value={selectedMale?.salary_pm}
              />
            </div>

            {/* Girl */}
            <div className="label-value-container-right">
              <LabelValueBlock
                label={"Salary PM"}
                value={selectedFemale?.salary_pm}
                align="right"
              />
            </div>

            {/* Match Reasons */}
            <span className="no-match-reason">Less than</span>
            <span className="yes-match-reason">More than</span>
          </div>

          {/* 1ST MARRIAGE / DIVORCEE */}
          <div className="interactive-card">
            {/* Boy */}
            <div className="label-value-container-left">
              <LabelValueBlock
                label={"1st Marriage / Divorcee"}
                value={
                  selectedMale?.is_divorced
                    ? "Divorcee"
                    : selectedMale?.is_first_marriage
                    ? "1st Marriage"
                    : "Married Before"
                }
              />
            </div>

            {/* Girl */}
            <div className="label-value-container-right">
              <LabelValueBlock
                label={"1st Marriage / Divorcee"}
                value={
                  selectedFemale?.is_divorced
                    ? "Divorcee"
                    : selectedFemale?.is_first_marriage
                    ? "1st Marriage"
                    : "Married Before"
                }
                align="right"
              />
            </div>

            {/* Match Reasons */}
            <span className="no-match-reason">Less than</span>
            <span className="yes-match-reason">More than</span>
          </div>

          {/* OTHER DETAILS */}
          <div className="interactive-card">
            {/* Boy */}
            <div className="label-value-container-left">
              <LabelValueBlock
                label={"Any other details / Conditions"}
                value={selectedMale?.any_other_details}
              />
            </div>

            {/* Girl */}
            <div className="label-value-container-right">
              <LabelValueBlock
                label={"Any other details / Conditions"}
                value={selectedFemale?.any_other_details}
                align="right"
              />
            </div>
          </div>

          <div className="interactive-card">
            {/* Boy */}
            <div className="label-value-container-left">
              <LabelValueBlock label={"Any other details / Conditions"}>
                <div className="flex gap-2.5 justify-center items-center">
                  <span className="text-lg font-normal text-n-600">
                    Father:{" "}
                    <span className="font-medium text-n-900">
                      {selectedMale?.father_bari}
                    </span>
                  </span>
                  <span className="text-lg font-normal text-n-600">
                    Mother:{" "}
                    <span className="font-medium text-n-900">
                      {selectedMale?.mother_bari}
                    </span>
                  </span>
                </div>
              </LabelValueBlock>
            </div>

            {/* Girl */}
            <div className="label-value-container-right">
              <LabelValueBlock
                label={"Any other details / Conditions"}
                align="right"
              >
                <div className="flex gap-2.5 justify-center items-center">
                  <span className="text-lg font-normal text-n-600">
                    Father:{" "}
                    <span className="font-medium text-n-900">
                      {selectedFemale?.father_bari}
                    </span>
                  </span>
                  <span className="text-lg font-normal text-n-600">
                    Mother:{" "}
                    <span className="font-medium text-n-900">
                      {selectedFemale?.mother_bari}
                    </span>
                  </span>
                </div>
              </LabelValueBlock>
            </div>

            {/* Match Reasons */}
            <span className="no-match-reason">Is same as</span>
            <span className="yes-match-reason">Is different than</span>
          </div>
        </div>

        {/* GIRLS PHOTO SIDE */}
        <div className="w-116 flex flex-col items-center gap-4 px-5 py-8">
          <PhotoSlider images={GirlsImgs} alt="Profile photo" loop />

          {/* Button */}
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-slate-800 w-full h-18 text-base font-medium cursor-pointer"
            onClick={() => {
              selectedMale && initSendMessage(selectedMale);
            }}
          >
            <Image src={ShareIcon} alt="share" />
            Send Boys Details
          </Button>
        </div>
      </div>

      {/* Separation Line */}
      <div className="flex justify-between gap-3.5 ">
        <div className="w-1/2 h-px px-12">
          <div className=" h-px bg-slate-300"></div>
        </div>
        <div className="w-1/2 h-px px-12">
          <div className=" h-px bg-slate-300"></div>
        </div>
      </div>

      {/* PARENTS DETAILS */}
      <div className=" px-5 py-8 flex justify-between gap-3.5 ">
        {/* Boy Side Parents */}
        <div className="flex w-1/2 gap-12 px-5 items-center">
          {/* Father Details */}
          <div className="flex flex-col flex-1 gap-2.5 justify-start items-start">
            <span className="text-xl font-semibold text-n-900 p-with-before">
              Father’s Details
            </span>

            {/* Boy - Father Name */}
            <LabelValueBlock label="Name" value={selectedMale?.father_name} />

            {/* Boy - Father Employee Details */}
            <LabelValueBlock
              label="Employee Details"
              value={selectedMale?.father_emp_details}
            />
          </div>

          {/* Separater */}
          <span className="w-px h-4/5 bg-slate-300"></span>

          {/* Mother Details */}
          <div className="flex flex-col flex-1 gap-2.5 justify-start items-start">
            <span className="text-xl font-semibold text-n-900 p-with-before">
              Mother’s Details
            </span>
            {/* Boy - Mother Name */}
            <LabelValueBlock label="Name" value={selectedMale?.mother_name} />

            {/* Boy - Mother Employee Details */}
            <LabelValueBlock
              label="Employee Details"
              value={selectedMale?.mother_emp_details}
            />
          </div>
        </div>

        {/* Girl Side Parents */}
        <div className="flex w-1/2 gap-12 px-5 items-center">
          {/* Father Details */}
          <div className="flex flex-col flex-1 gap-2.5 justify-start items-start">
            <span className="text-xl font-semibold text-n-900 p-with-before">
              Father’s Details
            </span>

            {/* GIrl - Father Name */}
            <LabelValueBlock label="Name" value={selectedFemale?.father_name} />

            {/* GIrl - Father Employee Details */}
            <LabelValueBlock
              label="Employee Details"
              value={selectedFemale?.father_emp_details}
            />
          </div>

          {/* Separater */}
          <span className="w-px h-4/5 bg-slate-300"></span>

          {/* Mother Details */}
          <div className="flex flex-col flex-1 gap-2.5 justify-start items-start">
            <span className="text-xl font-semibold text-n-900 p-with-before">
              Mother’s Details
            </span>
            {/* GIrl - Mother Name */}
            <LabelValueBlock label="Name" value={selectedFemale?.mother_name} />

            {/* GIrl - Mother Employee Details */}
            <LabelValueBlock
              label="Employee Details"
              value={selectedFemale?.mother_emp_details}
            />
          </div>
        </div>
      </div>

      {/* Separation */}
      <div className="flex justify-between gap-3.5 ">
        <div className="w-1/2 h-px px-12">
          <div className=" h-px bg-slate-300"></div>
        </div>
        <div className="w-1/2 h-px px-12">
          <div className=" h-px bg-slate-300"></div>
        </div>
      </div>

      {/* Footer Section */}
      <div className=" px-5 py-8 flex gap-3.5">
        {/* BOY - Contact Details */}
        <div className="flex flex-col w-1/2 gap-2.5 px-5 justify-start items-start">
          <span className="text-xl font-semibold text-n-900 p-with-before">
            Contact Details
          </span>
          <div className="flex gap-7 justify-start items-center">
            {/* ADDRESS */}
            <div className="flex flex-col gap-1 justify-start items-start">
              <LabelValueBlock label="Address" value={selectedMale?.address} />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-1 justify-start items-start">
              <LabelValueBlock label="Email">
                <Link href={`${selectedMale?.email}`}>
                  <span className="text-lg font-medium text-n-900">
                    {selectedMale?.email}
                  </span>
                </Link>
              </LabelValueBlock>
            </div>

            {/* MOBILE */}
            <div className="flex flex-col gap-1 justify-start items-start">
              <LabelValueBlock label="Mobile">
                <Link href={`tel:${selectedMale?.mob1}`}>
                  <span className="text-lg font-medium text-n-900">
                    {selectedMale?.mob1}
                  </span>
                </Link>
                <span>/</span>
                <Link href={`tel:${selectedMale?.mob2}`}>
                  <span className="text-lg font-medium text-n-900">
                    {selectedMale?.mob2}
                  </span>
                </Link>
              </LabelValueBlock>
            </div>
          </div>
        </div>

        {/* Girl - Contact Details */}
        <div className="flex flex-col w-1/2 gap-2.5 px-5 justify-start items-start">
          <span className="text-xl font-semibold text-n-900 p-with-before">
            Contact Details
          </span>
          <div className="flex gap-7 justify-start items-center">
            {/* ADDRESS */}
            <div className="flex flex-col gap-1 justify-start items-start">
              <LabelValueBlock
                label="Address"
                value={selectedFemale?.address}
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-1 justify-start items-start">
              <LabelValueBlock label="Email">
                <Link href={`${selectedFemale?.email}`}>
                  <span className="text-lg font-medium text-n-900">
                    {selectedFemale?.email ? selectedFemale.email : "-"}
                  </span>
                </Link>
              </LabelValueBlock>
            </div>

            {/* MOBILE */}
            <div className="flex flex-col gap-1 justify-start items-start">
              <LabelValueBlock label="Mobile">
                <Link href={`tel:selectedFemale?.mob1`}>
                  <span className="text-lg font-medium text-n-900">
                    {selectedFemale?.mob1}
                  </span>
                </Link>
                <span>/</span>
                <Link href={`tel:selectedFemale?.mob2`}>
                  <span className="text-lg font-medium text-n-900">
                    {selectedFemale?.mob2}
                  </span>
                </Link>
              </LabelValueBlock>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
