"use client";
// REACT //
import { useCallback, useEffect, useState } from "react";

// COMPONENTS //
import Image from "next/image";

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

export default function Home() {
  const [maleProfiles, setMaleProfiles] = useState<Profile[]>([]);
  const [femaleProfiles, setFemaleProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [whatsappMessage, setWhatsappMessage] = useState<string>("");

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

      // Optional: Build and log WhatsApp message for first male profile
      if (males.length > 0) {
        const fullMsg = buildFullWhatsAppMessage(males[0]);
        const shortMsg = buildPartialWhatsAppMessage(males[0], {
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

        const webWhatsappLink = buildWebWhatsAppLink(shortMsg);
        console.log("WhatsApp Web Link:", webWhatsappLink);
        setWhatsappMessage(fullMsg);
      }

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

  useEffect(() => {
    loadAndProcessData();
  }, [loadAndProcessData]);

  const renderProfileCard = (profile: Profile, index: number) => (
    <div
      key={index}
      className="color-n-200 shadow rounded-lg p-4 border space-y-1"
    >
      {profile.photo_1 && (
        <Image
          width={100}
          height={100}
          src={profile.photo_1}
          alt={`${profile.name} - Photo 1`}
          className="w-full rounded-lg"
        />
      )}
      {profile.photo_2_url && (
        <Image
          width={100}
          height={100}
          src={profile.photo_2}
          alt={`${profile.name} - Photo 2`}
          className="w-full rounded-lg"
        />
      )}
      {profile.photo_3 && (
        <Image
          width={100}
          height={100}
          src={profile.photo_3}
          alt={`${profile.name} - Photo 3`}
          className="w-full rounded-lg"
        />
      )}
      <p>{whatsappMessage}</p>
      <p>
        <strong>Timestamp:</strong> {profile.timestamp}
      </p>
      <p>
        <strong>Gender:</strong> {profile.gender}
      </p>
      <p>
        <strong>Code No:</strong> {profile.code_no}
      </p>
      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>Date of Birth:</strong> {profile.date_of_birth}
      </p>
      <p>
        <strong>Age:</strong> {profile.age}
      </p>
      <p>
        <strong>Birth Time:</strong> {profile.birth_time}
      </p>
      <p>
        <strong>Birth Day:</strong> {profile.birth_day}
      </p>
      <p>
        <strong>Birth Place:</strong> {profile.birth_place}
      </p>
      <p>
        <strong>Nakshatra:</strong> {profile.nakshatra}
      </p>
      <p>
        <strong>Rashi:</strong> {profile.rashi}
      </p>
      <p>
        <strong>Height:</strong> {profile.height}
      </p>
      <p>
        <strong>Father Bari:</strong> {profile.father_bari}
      </p>
      <p>
        <strong>Mother Bari:</strong> {profile.mother_bari}
      </p>
      <p>
        <strong>Educational Qualifications:</strong>{" "}
        {profile.edu_qualifications}
      </p>
      <p>
        <strong>Working / Own Venture:</strong> {profile.working_or_own_venture}
      </p>
      <p>
        <strong>Designation:</strong> {profile.designation}
      </p>
      <p>
        <strong>Employer:</strong> {profile.employer}
      </p>
      <p>
        <strong>Working Location:</strong> {profile.working_location}
      </p>
      <p>
        <strong>Salary per Month:</strong> {profile.salary_pm}
      </p>
      <p>
        <strong>Father Name:</strong> {profile.father_name}
      </p>
      <p>
        <strong>Father Employment Details:</strong> {profile.father_emp_details}
      </p>
      <p>
        <strong>Mother Name:</strong> {profile.mother_name}
      </p>
      <p>
        <strong>Mother Employment Details:</strong> {profile.mother_emp_details}
      </p>
      <p>
        <strong>Address:</strong> {profile.address}
      </p>
      <p>
        <strong>Mobile 1:</strong> {profile.mob1}
      </p>
      <p>
        <strong>Mobile 2:</strong> {profile.mob2}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Is Divorced:</strong> {profile.is_divorced}
      </p>
      <p>
        <strong>Any Other Details:</strong> {profile.any_other_details}
      </p>
      <p>
        <strong>Is Active:</strong> {profile.is_active}
      </p>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Active Matrimony Profiles</h1>

      {loading ? (
        <p className="text-gray-500">Loading profiles...</p>
      ) : (
        <div className="space-y-8">
          {/* Male Profiles Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              Male Profiles ({maleProfiles.length})
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {maleProfiles.map((profile, index) =>
                renderProfileCard(profile, index)
              )}
            </div>
          </div>

          {/* Female Profiles Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-pink-600">
              Female Profiles ({femaleProfiles.length})
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {femaleProfiles.map((profile, index) =>
                renderProfileCard(profile, index)
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
