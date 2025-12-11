"use client";
// REACT //
import React, { useState, useEffect, useCallback } from "react";

// COMPONENTS //
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LabelValueBlock from "@/app/components/LabelValueBlock";
import SendMessagePopup from "@/app/components/SendMessagePopup";
import PhotoSlider from "@/app/components/PhotoSlider";
import MatchBadge from "@/app/components/MatchBadge";
import MainHeader from "@/app/components/MainHeader";
import { SectionDivider } from "@/app/components/SectionDivider";
import { ContactSection } from "@/app/components/ContactSection";
import FullPageLoader from "@/app/components/FullPageLoader";
import Toast from "@/app/components/Toast";

// CONSTANTS //
import { SHEET_URL } from "@/constants";

// UTILS //
import {
  calculateCompatibilityRating,
  checkMatch,
  Profile,
} from "@/lib/matchmaking.util";

// OTHERS //
import { fetchSheetData } from "@/lib/google-sheet";
import {
  buildPartialWhatsAppMessage,
  buildWebWhatsAppLink,
} from "@/lib/whatsapp";

// SVG's //
import ShareIcon from "@/../public/icons/share.svg";

/** Home Screen */
const HomeScreen: React.FC = () => {
  // Define States
  const [sendMessageVisible, setSendMessageVisible] = useState<boolean>(false);
  const [maleProfiles, setMaleProfiles] = useState<Profile[]>([]);
  const [femaleProfiles, setFemaleProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMaleIndex, setSelectedMaleIndex] = useState<number>(0);
  const [selectedFemaleIndex, setSelectedFemaleIndex] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [compatibilityRating, setCompatibilityRating] = useState<number>(0);
  const [showMatchLines, setShowMatchLines] = useState<boolean>(true);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "info" | "warning";
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false,
  });

  // Helper Functions
  /** Open Send Message Popup */
  const initSendMessage = (user: Profile) => {
    // Set selected profile
    setSelectedUser(user);
    // Show popup
    setSendMessageVisible(true);
  };

  /** Close Send Message popup */
  const closeSendPopup = () => {
    // Hide popup
    setSendMessageVisible(false);
    // TODO: Remove if not needed
    // setSelectedUser(null); // optional
  };

  /** Close toast notification */
  const closeToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  /** Opens WhatsApp Web with a message and optional phone number */
  const openWhatsApp = (msg: string, to: string) => {
    // Generate WhatsApp link
    const url = buildWebWhatsAppLink(msg, to);
    // Open in new tab; on mobile, browser redirects to app
    window.open(url, "_blank", "noopener,noreferrer");
  };

  /** Sends profile details via WhatsApp */
  const handleSend = (type: "basic" | "full") => {
    // No user selected
    if (!selectedUser) return;

    // Normalize gender and pick the opposite user
    const isGroom =
      selectedUser.gender?.toLowerCase() === "groom" ||
      selectedUser.gender?.toLowerCase() === "male" ||
      selectedUser.gender?.toLowerCase() === "boy" ||
      selectedUser.gender?.toLowerCase() === "groom (boy)";

    const receiverUser = isGroom
      ? femaleProfiles[selectedFemaleIndex]
      : maleProfiles[selectedMaleIndex];

    // Build message
    const msg = buildPartialWhatsAppMessage(selectedUser, {
      include:
        type === "full"
          ? [
              "name",
              "gender",
              "date_of_birth",
              "age",
              "height",
              "working_or_own_venture",
              "designation",
              "employer",
              "working_location",
              "photo_1",
              "photo_2",
              "photo_3",
            ]
          : [
              "name",
              "gender",
              "date_of_birth",
              "age",
              "height",
              "working_or_own_venture",
              "designation",
              "employer",
              "working_location",
            ],
      title: `WE FORWARD HEREWITH DETAILS FOR A POSSIBLE MATCH FOR ${receiverUser.name} KINDLY GO THROUGH AND CONSIDER SUITABILITY AND DO CONTACT US IF YOU REQUIRE MORE DETAILS`,
    });

    // Send message to opposite party
    openWhatsApp(msg, receiverUser.mob1);

    // Close popup
    closeSendPopup();
  };

  /** Separates a list of profiles into male and female groups based on the gender field. */
  function separateProfilesByGender(profiles: Profile[]) {
    const males: Profile[] = [];
    const females: Profile[] = [];

    // Loop over profiles and push gender specific profiles in their respective states
    profiles.forEach((profile) => {
      const gender =
        profile.gender?.toLowerCase() || profile.sex?.toLowerCase();

      if (gender === "groom" || gender === "boy" || gender === "male") {
        males.push(profile);
      } else if (
        gender === "bride" ||
        gender === "female" ||
        gender === "girl"
      ) {
        females.push(profile);
      }
    });

    // Return grouped profiles
    return { males, females };
  }

  /** Fetches data from Google Sheet and processes it into male/female lists */
  const loadAndProcessData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch sheet data
      const rawProfiles = await fetchSheetData(SHEET_URL);

      // Split into groups
      const { males, females } = separateProfilesByGender(rawProfiles);
      // Store male profiles
      setMaleProfiles(males);
      // Store female profiles
      setFemaleProfiles(females);
      // Error
    } catch (error) {
      // Log error
      console.error("Error loading data:", error);
    } finally {
      // Stop loading state
      setLoading(false);
    }
  }, []);

  /** Calculates compatibility rating between selected male and female profiles */
  const calculateRating = useCallback(async () => {
    const score = Number(
      calculateCompatibilityRating(
        // Selected male profile
        maleProfiles[selectedMaleIndex],
        // Selected female profile
        femaleProfiles[selectedFemaleIndex]
      )
    );

    // Update Rating
    setCompatibilityRating(Number.isFinite(score) ? score : 0);
  }, [femaleProfiles, maleProfiles, selectedFemaleIndex, selectedMaleIndex]);

  // UseEffect
  useEffect(() => {
    // Fetch data
    loadAndProcessData();
  }, [loadAndProcessData]);

  // Recalculate rating on every profile change
  useEffect(() => {
    // Calculate rating
    calculateRating();
  }, [calculateRating]);

  // Keyboard shortcut to toggle match lines
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Press 'H' to toggle match lines visibility
      if (event.key.toLowerCase() === "h") {
        const newState = !showMatchLines;
        setShowMatchLines(newState);

        // Show toast notification
        setToast({
          message: `Match lines ${newState ? "enabled" : "disabled"}`,
          type: newState ? "success" : "warning",
          isVisible: true,
        });
      }
    };

    // Add event listener
    document.addEventListener("keydown", handleKeyPress);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showMatchLines]);

  // Graceful empty state when no profiles are available
  if (!loading && maleProfiles.length === 0 && femaleProfiles.length === 0) {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
          <span className="text-2xl font-semibold text-n-900 mb-1">
            No profiles available
          </span>
          <span className="text-n-600 mb-3">
            Please check back later or try reloading.
          </span>
          <Button
            className="bg-primary-500 hover:bg-primary-600 text-n-800"
            onClick={loadAndProcessData}
          >
            Reload data
          </Button>
        </div>
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={closeToast}
          duration={2000}
        />
      </>
    );
  }

  return (
    <>
      {/* Full Page Loader */}
      <FullPageLoader
        isLoading={loading}
        text="Loading matrimonial profiles..."
      />

      <div className="bg-n-200 min-h-screen z-10 relative before:content-[''] before:h-full before:w-[calc(50%-10px)] before:bg-n-50 before:rounded-3xl before:absolute before:top-0 before:left-0 before:-z-11 after:content-[''] after:h-full after:w-[calc(50%-10px)] after:bg-n-50 after:rounded-3xl after:absolute after:top-0 after:right-0 after:-z-10">
        {/* Popup that comes on Send Message */}
        {selectedUser && (
          <SendMessagePopup
            isVisible={sendMessageVisible}
            onClose={closeSendPopup}
            sendBasicDetails={() => handleSend("basic")}
            sendFullDetails={() => handleSend("full")}
          />
        )}

        {/* Header Section  */}
        <MainHeader
          maleProfiles={maleProfiles}
          femaleProfiles={femaleProfiles}
          selectedMaleIndex={selectedMaleIndex}
          setSelectedMaleIndex={setSelectedMaleIndex}
          selectedFemaleIndex={selectedFemaleIndex}
          setSelectedFemaleIndex={setSelectedFemaleIndex}
          showArrowsWhenMoreThan={3}
        />

        {/* Separation Component */}
        <SectionDivider direction="horizontal" />

        {/* Main Content Section */}
        <div className="flex">
          {/* Boys Profile Image Wrapper */}
          <div className="w-116 flex flex-col items-center gap-4 px-5 py-7 ">
            {/* Profile Image Slider */}
            {maleProfiles[selectedMaleIndex] && (
              <PhotoSlider
                profile={maleProfiles[selectedMaleIndex]}
                alt="Profile photo"
                loop={false}
              />
            )}

            {/* Button */}
            <Button
              className="bg-primary-500 hover:bg-primary-600 text-n-800 w-full h-18 text-base font-medium cursor-pointer"
              onClick={() => {
                if (femaleProfiles[selectedFemaleIndex])
                  initSendMessage(femaleProfiles[selectedFemaleIndex]);
              }}
            >
              <Image src={ShareIcon} alt="share" />
              Send Girls Details
            </Button>
          </div>

          {/* Middle Content Section */}
          <div className="w-2/3 flex flex-col py-7">
            {/* Box 1  */}
            <div className="interactive-card ">
              {/* Boy Title */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-n-900">
                  {maleProfiles[selectedMaleIndex]?.name}
                </span>
                <span className="size-3 bg-primary-500 rounded-full"></span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="size-3 bg-primary-500 rounded-full"></span>
                <span className="text-3xl font-bold text-n-900">
                  {femaleProfiles[selectedFemaleIndex]?.name}
                </span>
              </div>

              {/* Match Score Badge Component */}
              <MatchBadge score={compatibilityRating} />
            </div>

            {/* DOB */}
            <div
              className={`interactive-card ${
                showMatchLines
                  ? checkMatch(
                      "age",
                      maleProfiles[selectedMaleIndex]?.age,
                      femaleProfiles[selectedFemaleIndex]?.age
                    )
                  : ""
              }`}
            >
              {/* Boy - DOB */}
              <div className="label-value-container-left">
                <LabelValueBlock label="Date of Birth">
                  <div className="flex flex-col  justify-start items-start">
                    <div className="flex gap-2 justify-center items-center">
                      <span className="text-lg font-medium text-n-900">
                        {maleProfiles[selectedMaleIndex]?.date_of_birth}
                      </span>
                      <span className="text-xl font-medium text-n-600">
                        ({maleProfiles[selectedMaleIndex]?.age})
                      </span>
                    </div>
                    <div className="flex gap-2.5 justify-start items-center">
                      <span className="text-sm font-normal text-n-900">
                        {maleProfiles[selectedMaleIndex]?.birth_day}
                      </span>
                      {/* Separator */}
                      <div className="bg-n-400 h-2.5 w-px"></div>
                      <span className="text-sm font-normal text-n-900">
                        {maleProfiles[selectedMaleIndex]?.birth_time}
                      </span>
                      {/* Separator */}
                      <div className="bg-n-400 h-2.5 w-px"></div>
                      <span className="text-sm font-normal text-n-900">
                        {maleProfiles[selectedMaleIndex]?.birth_place}
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
                        {femaleProfiles[selectedFemaleIndex]?.date_of_birth}
                      </span>
                      <span className="text-xl font-medium text-n-600">
                        ({femaleProfiles[selectedFemaleIndex]?.age})
                      </span>
                    </div>
                    <div className="flex gap-2.5 justify-start items-center">
                      <span className="text-sm font-normal text-n-900">
                        {femaleProfiles[selectedFemaleIndex]?.birth_day}
                      </span>
                      {/* Separator */}
                      <div className="bg-n-400 h-2.5 w-px"></div>
                      <span className="text-sm font-normal text-n-900">
                        {femaleProfiles[selectedFemaleIndex]?.birth_time}
                      </span>
                      {/* Separator */}
                      <div className="bg-n-400 h-2.5 w-px"></div>
                      <span className="text-sm font-normal text-n-900">
                        {femaleProfiles[selectedFemaleIndex]?.birth_place}
                      </span>
                    </div>
                  </div>
                </LabelValueBlock>
              </div>
              <span className="no-match-reason">Less than</span>
              <span className="yes-match-reason">More than</span>
            </div>

            {/* HEIGHT */}
            <div
              className={`interactive-card ${
                showMatchLines
                  ? checkMatch(
                      "height",
                      maleProfiles[selectedMaleIndex]?.height,
                      femaleProfiles[selectedFemaleIndex]?.height
                    )
                  : ""
              }`}
            >
              {/* Boy Height */}
              <div className="label-value-container-left">
                <LabelValueBlock
                  label={"Height"}
                  value={`${maleProfiles[selectedMaleIndex]?.height} cms`}
                />
              </div>

              {/* Girl Height */}
              <div className="label-value-container-right">
                <LabelValueBlock
                  label={"Height"}
                  value={`${femaleProfiles[selectedFemaleIndex]?.height} cms`}
                  align="right"
                />
              </div>

              {/* Reasons for Yes / No */}
              {showMatchLines && (
                <>
                  <span className="no-match-reason">Less than</span>
                  <span className="yes-match-reason">More than</span>
                </>
              )}
            </div>

            {/* NAKSHATRA / RASHI */}
            <div className="interactive-card">
              {/* Boy */}
              <div className="label-value-container-left">
                <LabelValueBlock
                  label={"Nakshatra | Rashi"}
                  value={`${maleProfiles[selectedMaleIndex]?.nakshatra} | ${maleProfiles[selectedMaleIndex]?.rashi}`}
                />
              </div>

              {/* Girl */}
              <div className="label-value-container-right">
                <LabelValueBlock
                  label={"Nakshatra | Rashi"}
                  value={`${femaleProfiles[selectedFemaleIndex]?.nakshatra} | ${femaleProfiles[selectedFemaleIndex]?.rashi}`}
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
                  value={maleProfiles[selectedMaleIndex]?.edu_qualifications}
                />
              </div>

              {/* Girl */}
              <div className="label-value-container-right">
                <LabelValueBlock
                  label={"Education"}
                  value={
                    femaleProfiles[selectedFemaleIndex]?.edu_qualifications
                  }
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
                  value={
                    maleProfiles[selectedMaleIndex]?.working_or_own_venture
                  }
                />
              </div>

              {/* Girl */}
              <div className="label-value-container-right">
                <LabelValueBlock
                  label={"Working / Own Venture"}
                  value={
                    femaleProfiles[selectedFemaleIndex]?.working_or_own_venture
                  }
                  align="right"
                />
              </div>
            </div>

            {/* WORKING LOCATION */}
            <div
              className={`interactive-card ${
                showMatchLines
                  ? checkMatch(
                      "working_location",
                      maleProfiles[selectedMaleIndex]?.working_location,
                      femaleProfiles[selectedFemaleIndex]?.working_location
                    )
                  : ""
              }`}
            >
              {/* Boy */}
              <div className="label-value-container-left">
                <LabelValueBlock
                  label={"Working Location"}
                  value={maleProfiles[selectedMaleIndex]?.working_location}
                />
              </div>

              {/* Girl */}
              <div className="label-value-container-right">
                <LabelValueBlock
                  label={"Working Location"}
                  value={femaleProfiles[selectedFemaleIndex]?.working_location}
                  align="right"
                />
              </div>

              {/* Match Reasons */}
              {showMatchLines && (
                <>
                  <span className="no-match-reason">Different</span>
                  <span className="yes-match-reason">Same</span>
                </>
              )}
            </div>

            {/* SALARY */}
            <div
              className={`interactive-card ${
                showMatchLines
                  ? checkMatch(
                      "salary_pm",
                      maleProfiles[selectedMaleIndex]?.salary_pm,
                      femaleProfiles[selectedFemaleIndex]?.salary_pm
                    )
                  : ""
              }`}
            >
              {/* Boy */}
              <div className="label-value-container-left">
                <LabelValueBlock
                  label={"Salary PM"}
                  value={maleProfiles[selectedMaleIndex]?.salary_pm}
                />
              </div>

              {/* Girl */}
              <div className="label-value-container-right">
                <LabelValueBlock
                  label={"Salary PM"}
                  value={femaleProfiles[selectedFemaleIndex]?.salary_pm}
                  align="right"
                />
              </div>

              {/* Match Reasons */}
              {showMatchLines && (
                <>
                  <span className="no-match-reason">Less than</span>
                  <span className="yes-match-reason">More than</span>
                </>
              )}
            </div>

            {/* 1ST MARRIAGE / DIVORCEE */}
            <div
              className={`interactive-card ${
                showMatchLines
                  ? checkMatch(
                      "marriage_status",
                      maleProfiles[selectedMaleIndex]?.is_first_marriage
                        ? "first"
                        : "not_first",
                      femaleProfiles[selectedFemaleIndex]?.is_first_marriage
                        ? "first"
                        : "not_first"
                    )
                  : ""
              }`}
            >
              {/* Boy */}
              <div className="label-value-container-left">
                <LabelValueBlock
                  label={"1st Marriage / Divorcee"}
                  value={
                    maleProfiles[selectedMaleIndex]?.is_divorced
                      ? "Divorcee"
                      : maleProfiles[selectedMaleIndex]?.is_first_marriage
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
                    femaleProfiles[selectedFemaleIndex]?.is_divorced
                      ? "Divorcee"
                      : femaleProfiles[selectedFemaleIndex]?.is_first_marriage
                      ? "1st Marriage"
                      : "Married Before"
                  }
                  align="right"
                />
              </div>

              {/* Match Reasons */}
              {showMatchLines && (
                <>
                  <span className="no-match-reason">Different</span>
                  <span className="yes-match-reason">Same</span>
                </>
              )}
            </div>

            {/* OTHER DETAILS */}
            <div className={`interactive-card`}>
              {/* Boy */}
              <div className="label-value-container-left">
                <LabelValueBlock
                  label={"Any other details / Conditions"}
                  value={maleProfiles[selectedMaleIndex]?.any_other_details}
                />
              </div>

              {/* Girl */}
              <div className="label-value-container-right">
                <LabelValueBlock
                  label={"Any other details / Conditions"}
                  value={femaleProfiles[selectedFemaleIndex]?.any_other_details}
                  align="right"
                />
              </div>
            </div>

            <div
              className={`interactive-card ${
                showMatchLines
                  ? checkMatch(
                      "mother_bari",
                      maleProfiles[selectedMaleIndex]?.mother_bari,
                      femaleProfiles[selectedFemaleIndex]?.mother_bari
                    )
                  : ""
              }`}
            >
              {/* Boy */}
              <div className="label-value-container-left">
                <LabelValueBlock label={"Bari"}>
                  <div className="flex gap-2.5 justify-center items-center">
                    <span className="text-lg font-normal text-n-600">
                      Father:{" "}
                      <span className="font-medium text-n-900">
                        {maleProfiles[selectedMaleIndex]?.father_bari}
                      </span>
                    </span>
                    {/* Separator */}
                    <div className="bg-n-400 h-2.5 w-px"></div>
                    <span className="text-lg font-normal text-n-600">
                      Mother:{" "}
                      <span className="font-medium text-n-900">
                        {maleProfiles[selectedMaleIndex]?.mother_bari}
                      </span>
                    </span>
                  </div>
                </LabelValueBlock>
              </div>

              {/* Girl */}
              <div className="label-value-container-right">
                <LabelValueBlock label={"Bari"} align="right">
                  <div className="flex gap-2.5 justify-center items-center">
                    <span className="text-lg font-normal text-n-600">
                      Father:{" "}
                      <span className="font-medium text-n-900">
                        {femaleProfiles[selectedFemaleIndex]?.father_bari}
                      </span>
                    </span>
                    {/* Separator */}
                    <div className="bg-n-400 h-2.5 w-px"></div>
                    <span className="text-lg font-normal text-n-600">
                      Mother:{" "}
                      <span className="font-medium text-n-900">
                        {femaleProfiles[selectedFemaleIndex]?.mother_bari}
                      </span>
                    </span>
                  </div>
                </LabelValueBlock>
              </div>

              {/* Match Reasons */}
              {showMatchLines && (
                <>
                  <span className="no-match-reason">Same</span>
                  <span className="yes-match-reason">Different</span>
                </>
              )}
            </div>

            {/* WILLING TO RELOCATE */}
            <div className="interactive-card">
              {/* Boy */}
              <div className="label-value-container-left">
                <LabelValueBlock
                  label={"Willing to Relocate"}
                  value={maleProfiles[selectedMaleIndex]?.willing_to_relocate}
                />
              </div>

              {/* Girl */}
              <div className="label-value-container-right">
                <LabelValueBlock
                  label={"Willing to Relocate"}
                  value={
                    femaleProfiles[selectedFemaleIndex]?.willing_to_relocate
                  }
                  align="right"
                />
              </div>
            </div>

            {/* BILLAWAR PARENT / MEMBER */}
            <div className="interactive-card">
              {/* Boy */}
              <div className="label-value-container-left">
                <LabelValueBlock
                  label={"Billawar Parent / Member"}
                  value={maleProfiles[selectedMaleIndex]?.billawar_member}
                />
              </div>

              {/* Girl */}
              <div className="label-value-container-right">
                <LabelValueBlock
                  label={"Billawar Parent / Member"}
                  value={femaleProfiles[selectedFemaleIndex]?.billawar_member}
                  align="right"
                />
              </div>
            </div>

            {/* MEMBER NUMBER */}
            <div className="interactive-card">
              {/* Boy */}
              <div className="label-value-container-left">
                <LabelValueBlock
                  label={"Member Number"}
                  value={maleProfiles[selectedMaleIndex]?.member_number}
                />
              </div>

              {/* Girl */}
              <div className="label-value-container-right">
                <LabelValueBlock
                  label={"Member Number"}
                  value={femaleProfiles[selectedFemaleIndex]?.member_number}
                  align="right"
                />
              </div>
            </div>
          </div>

          {/* GIRLS PHOTO SIDE */}
          <div className="w-116 flex flex-col items-center gap-4 px-5 py-7">
            {femaleProfiles[selectedFemaleIndex] && (
              <PhotoSlider
                profile={femaleProfiles[selectedFemaleIndex]}
                alt="Profile photo"
                loop={false}
              />
            )}

            {/* Button */}
            <Button
              className="bg-primary-500 hover:bg-primary-600 text-n-800 w-full h-18 text-base font-medium cursor-pointer"
              onClick={() => {
                if (maleProfiles[selectedMaleIndex])
                  initSendMessage(maleProfiles[selectedMaleIndex]);
              }}
            >
              <Image src={ShareIcon} alt="share" />
              Send Boys Details
            </Button>
          </div>
        </div>

        {/* Separation Component */}
        <SectionDivider direction="horizontal" />

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
              <LabelValueBlock
                label="Name"
                value={maleProfiles[selectedMaleIndex]?.father_name}
              />

              {/* Boy - Father Employee Details */}
              <LabelValueBlock
                label="Employee Details"
                value={maleProfiles[selectedMaleIndex]?.father_emp_details}
              />
            </div>

            {/* Separater Component */}
            <SectionDivider direction="vertical" />

            {/* Mother Details */}
            <div className="flex flex-col flex-1 gap-2.5 justify-start items-start">
              <span className="text-xl font-semibold text-n-900 p-with-before">
                Mother’s Details
              </span>
              {/* Boy - Mother Name */}
              <LabelValueBlock
                label="Name"
                value={maleProfiles[selectedMaleIndex]?.mother_name}
              />

              {/* Boy - Mother Employee Details */}
              <LabelValueBlock
                label="Employee Details"
                value={maleProfiles[selectedMaleIndex]?.mother_emp_details}
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
              <LabelValueBlock
                label="Name"
                value={femaleProfiles[selectedFemaleIndex]?.father_name}
              />

              {/* GIrl - Father Employee Details */}
              <LabelValueBlock
                label="Employee Details"
                value={femaleProfiles[selectedFemaleIndex]?.father_emp_details}
              />
            </div>

            {/* Separater Component */}
            <SectionDivider direction="vertical" />

            {/* Mother Details */}
            <div className="flex flex-col flex-1 gap-2.5 justify-start items-start">
              <span className="text-xl font-semibold text-n-900 p-with-before">
                Mother’s Details
              </span>
              {/* GIrl - Mother Name */}
              <LabelValueBlock
                label="Name"
                value={femaleProfiles[selectedFemaleIndex]?.mother_name}
              />

              {/* GIrl - Mother Employee Details */}
              <LabelValueBlock
                label="Employee Details"
                value={femaleProfiles[selectedFemaleIndex]?.mother_emp_details}
              />
            </div>
          </div>
        </div>

        {/* Separation Component */}
        <SectionDivider direction="horizontal" />

        {/* Footer Section - Contact details for both male & female */}
        <ContactSection
          male={maleProfiles[selectedMaleIndex]}
          female={femaleProfiles[selectedFemaleIndex]}
        />
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
        duration={2000}
      />
    </>
  );
};

export default HomeScreen;
