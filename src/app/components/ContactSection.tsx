// COMPONENTS //
import Link from "next/link";

// UTILS //
import { Profile } from "@/lib/matchmaking.util";

// OTHERS //
import LabelValueBlock from "./LabelValueBlock";

// Props for ContactColumn
type ContactProps = {
  title?: string;
  address?: string;
  email?: string;
  mob1?: string;
  mob2?: string;
  align?: "left" | "right";
};

// Single Contact Column
function ContactColumn({
  title = "Contact Details",
  address,
  email,
  mob1,
  mob2,
  align = "left",
}: ContactProps) {
  const alignItems = align === "right" ? "items-end" : "items-start";
  return (
    <div
      className={`flex flex-col flex-1 gap-2.5 px-5 justify-start ${alignItems}`}
    >
      {/* Title */}
      <span className="text-xl font-semibold text-n-900 p-with-before">
        {title}
      </span>

      {/* Contact info container */}
      <div className="flex gap-7 justify-start items-center">
        {/* Address */}
        <div className="flex flex-col gap-1 ">
          <LabelValueBlock label="Address" value={address} />
        </div>

        {/* Separator */}
        <div className="bg-n-400 h-8 w-px"></div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <LabelValueBlock label="Email">
            <Link href={`${email ?? ""}`}>
              <span className="text-lg font-medium text-n-900">
                {email ?? "-"}
              </span>
            </Link>
          </LabelValueBlock>
        </div>

        {/* Separator */}
        <div className="bg-n-400 h-8 w-px"></div>

        {/* Mobile numbers */}
        <div className="flex flex-col gap-1">
          <LabelValueBlock label="Mobile">
            {mob1 && (
              <Link href={`tel:${mob1}`}>
                <span className="text-lg font-medium text-n-900">{mob1}</span>
              </Link>
            )}{" "}
            {mob2 && (
              <>
                /
                <Link href={`tel:${mob2}`}>
                  <span className="text-lg font-medium text-n-900">{mob2}</span>
                </Link>
              </>
            )}
          </LabelValueBlock>
        </div>
      </div>
    </div>
  );
}

/** Section showing both male & female contact details */
export function ContactSection({
  male,
  female,
}: {
  male: Profile;
  female: Profile;
}) {
  return (
    <div className="px-5 py-8 flex gap-3.5">
      <ContactColumn
        address={male?.address}
        email={male?.email}
        mob1={male?.mob1}
        mob2={male?.mob2}
      />
      <ContactColumn
        address={female?.address}
        email={female?.email}
        mob1={female?.mob1}
        mob2={female?.mob2}
      />
    </div>
  );
}
