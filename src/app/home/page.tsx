// REACT //
import React from "react";

// COMPONENTS //
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// IMAGES //
import UserThumbImage from "@/../public/assets/images/user-photo.png";
import ProfileImage from "@/../public/assets/images/main-profile.png";

// SVG's //
import ShareIcon from "@/../public/icons/share.svg";

/** Home Screen */
const HomeScreen: React.FC = () => {
  // Define States
  return (
    <div className="bg-slate-200 min-h-screen z-10 relative before:content-[''] before:h-full before:w-[calc(50%-10px)] before:bg-slate-50 before:rounded-3xl before:absolute before:top-0 before:left-0 before:-z-11 after:content-[''] after:h-full after:w-[calc(50%-10px)] after:bg-slate-50 after:rounded-3xl after:absolute after:top-0 after:right-0 after:-z-10">
      {/* Header Section  */}
      <div className=" flex gap-3.5 justify-between">
        {/* Boys Header */}
        <div className=" flex w-1/2 py-2 px-9 gap-3.5">
          {/* User thumb */}
          <div className="bg-yellow-500 rounded-2xl hover:bg-slate-100 flex gap-2 px-3 py-2.5 justify-start items-center">
            {/* User Image */}
            <Image src={UserThumbImage} alt="omkar" className="" />
            {/* User Info */}
            <div className="flex flex-col justify-center items-start">
              <span className="text-lg font-semibold text-n-900">
                Rahul Shetty
              </span>
              <span className="text-sm font-normal text-n-700">33 Years</span>
            </div>
          </div>
          <div className=" rounded-2xl hover:bg-slate-100 flex gap-2 px-3 py-2.5 justify-start items-center">
            {/* User Image */}
            <Image src={UserThumbImage} alt="omkar" className="" />
            {/* User Info */}
            <div className="flex flex-col justify-center items-start">
              <span className="text-lg font-semibold text-n-900">
                Rahul Shetty
              </span>
              <span className="text-sm font-normal text-n-700">33 Years</span>
            </div>
          </div>
        </div>
        {/* Girls Header */}
        <div className=" flex w-1/2 py-2 px-9 gap-3.5">
          {/* User thumb */}
          <div className="bg-yellow-500 rounded-2xl hover:bg-slate-100 flex gap-2 px-3 py-2.5 justify-start items-center">
            {/* User Image */}
            <Image src={UserThumbImage} alt="omkar" className="" />
            {/* User Info */}
            <div className="flex flex-col justify-center items-start">
              <span className="text-lg font-semibold text-n-900">
                Rahul Shetty
              </span>
              <span className="text-sm font-normal text-n-700">33 Years</span>
            </div>
          </div>
          <div className=" rounded-2xl hover:bg-slate-100 flex gap-2 px-3 py-2.5 justify-start items-center">
            {/* User Image */}
            <Image src={UserThumbImage} alt="omkar" className="" />
            {/* User Info */}
            <div className="flex flex-col justify-center items-start">
              <span className="text-lg font-semibold text-n-900">
                Rahul Shetty
              </span>
              <span className="text-sm font-normal text-n-700">33 Years</span>
            </div>
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
        <div className=" w-116 flex flex-col items-center gap-4 px-5 py-8 ">
          <div className="rounded-3xl w-full">
            <Image src={ProfileImage} alt="omkar" className="w-full" />
          </div>
          {/* Button */}
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-slate-800 w-full h-18 text-base font-medium cursor-pointer">
            <Image src={ShareIcon} alt="share" />
            Send Girls Details
          </Button>
        </div>
        <div className="w-2/3 flex flex-col py-8">
          {/* Box 1  */}
          <div className="relative border-[3px] border-transparent hover:border-yellow-500 transition-all flex justify-between gap-3.5 py-2 px-3.5 ">
            {/* Boy Title */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-n-900">
                Rahul Shetty
              </span>
              <span className="size-3 bg-yellow-500 rounded-full"></span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="size-3 bg-yellow-500 rounded-full"></span>
              <span className="text-3xl font-bold text-n-900">
                Rahul Shetty
              </span>
            </div>
            <div
              className="w-24 h-24 absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-0 p-5 
    before:content-[''] before:w-full before:h-full 
    before:bg-[var(--color-yellow-500)] before:rounded-3xl 
    before:rotate-45 before:absolute before:top-0 before:left-0"
            >
              <p className="font-bold text-sm text-slate-900 z-20">Match</p>
              <p className="font-bold text-4xl text-slate-900 z-20">66</p>
            </div>
            <span className="no-match-reason">Less than</span>
            <span className="yes-match-reason">More than</span>
          </div>
          <div className=" relative border-[3px] border-transparent hover:border-yellow-500 transition-all flex justify-between gap-3.5 py-2 px-3.5 ">
            {/* DOB Title */}
            <div className="flex flex-col w-1/2">
              <span className="text-sm font-medium text-n-500">
                Date of Birth
              </span>
              <div className="flex flex-col  justify-start items-start">
                <div className="flex gap-2 justify-center items-center">
                  <span className="text-lg font-medium text-n-900">
                    15th March 1993
                  </span>
                  <span className="text-xl font-medium text-n-600">(33)</span>
                </div>
                <div className="flex gap-2.5 justify-start items-center">
                  <span className="text-sm font-normal text-n-900">Monday</span>
                  <div className="flex justify-start items-start"></div>
                  <span className="text-sm font-normal text-n-900">
                    6:45 AM
                  </span>
                  <div className="flex justify-start items-start"></div>
                  <span className="text-sm font-normal text-n-900">
                    Mangalore, Karnataka
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/2 items-end">
              <span className="text-sm font-medium text-n-500">
                Date of Birth
              </span>
              <div className="flex flex-col  justify-start items-end text-right">
                <div className="flex gap-2 justify-center items-center">
                  <span className="text-lg font-medium text-n-900">
                    15th March 1993
                  </span>
                  <span className="text-xl font-medium text-n-600">(33)</span>
                </div>
                <div className="flex gap-2.5 justify-start items-center">
                  <span className="text-sm font-normal text-n-900">Monday</span>
                  <div className="flex justify-start items-start"></div>
                  <span className="text-sm font-normal text-n-900">
                    6:45 AM
                  </span>
                  <div className="flex justify-start items-start"></div>
                  <span className="text-sm font-normal text-n-900">
                    Mangalore, Karnataka
                  </span>
                </div>
              </div>
            </div>
            <span className="no-match-reason">Less than</span>
            <span className="yes-match-reason">More than</span>
          </div>
          <div className="relative border-[3px] border-transparent hover:border-yellow-500 transition-all flex justify-between gap-3.5 py-2 px-3.5 yes-match">
            {/* DOB Title */}
            <div className="flex flex-col w-1/2  justify-start items-start">
              <span className="text-sm font-medium text-n-500">Height</span>
              <span className="text-lg font-medium text-n-900">175 cm</span>
            </div>
            <div className="flex flex-col w-1/2  justify-start items-end">
              <span className="text-sm font-medium text-n-500">Height</span>
              <span className="text-lg font-medium text-n-900">175 cm</span>
            </div>
            <span className="no-match-reason">Less than</span>
            <span className="yes-match-reason">More than</span>
          </div>
          <div className="relative border-[3px] border-transparent hover:border-yellow-500 transition-all flex justify-between gap-3.5 py-2 px-3.5">
            <div className="flex flex-col w-1/2  justify-start items-start">
              <span className="text-sm font-medium text-n-500">
                Nakshatra | Rashi
              </span>
              <span className="text-lg font-medium text-n-900">
                Ashwini | Mesha (Aries)
              </span>
            </div>
            <div className="flex flex-col w-1/2  justify-start items-end">
              <span className="text-sm font-medium text-n-500">
                Nakshatra | Rashi
              </span>
              <span className="text-lg font-medium text-n-900">
                Ashwini | Mesha (Aries)
              </span>
            </div>
            <span className="no-match-reason">Less than</span>
            <span className="yes-match-reason">More than</span>
          </div>
          <div className="relative border-[3px] border-transparent hover:border-yellow-500 transition-all flex justify-between gap-3.5 py-2 px-3.5 no-match">
            <div className="flex flex-col w-1/2  justify-start items-start">
              <span className="text-sm font-medium text-n-500">Education</span>
              <span className="text-lg font-medium text-n-900">
                B.E. (Computer Science), MBA (Marketing)
              </span>
            </div>
            <div className="flex flex-col w-1/2  justify-start items-end text-right">
              <span className="text-sm font-medium text-n-500">Education</span>
              <span className="text-lg font-medium text-n-900">
                B.E. (Computer Science), MBA (Marketing)
              </span>
            </div>
            <span className="no-match-reason">Less than</span>
            <span className="yes-match-reason">More than</span>
          </div>
          <div className="relative border-[3px] border-transparent hover:border-yellow-500 transition-all flex justify-between gap-3.5 py-2 px-3.5">
            <div className="flex flex-col w-1/2  justify-start items-start">
              <span className="text-sm font-medium text-n-500">
                Working / Own Venture
              </span>
              <span className="text-lg font-medium text-n-900">
                Working (Product Manager ay Infosys)
              </span>
            </div>
            <div className="flex flex-col w-1/2  justify-start items-end">
              <span className="text-sm font-medium text-n-500">
                Working / Own Venture
              </span>
              <span className="text-lg font-medium text-n-900">
                Working (Product Manager ay Infosys)
              </span>
            </div>
            <span className="no-match-reason">Less than</span>
            <span className="yes-match-reason">More than</span>
          </div>
          <div className="relative border-[3px] border-transparent hover:border-yellow-500 transition-all flex justify-between gap-3.5 py-2 px-3.5">
            <div className="flex flex-col w-1/2  justify-start items-start">
              <span className="text-sm font-medium text-n-500">
                Working Location
              </span>
              <span className="text-lg font-medium text-n-900">Mumbai</span>
            </div>
            <div className="flex flex-col w-1/2  justify-start items-end">
              <span className="text-sm font-medium text-n-500">
                Working Location
              </span>
              <span className="text-lg font-medium text-n-900">Mumbai</span>
            </div>
            <span className="no-match-reason">Less than</span>
            <span className="yes-match-reason">More than</span>
          </div>
          <div className="relative border-[3px] border-transparent hover:border-yellow-500 transition-all flex justify-between gap-3.5 py-2 px-3.5">
            <div className="flex flex-col w-1/2  justify-start items-start">
              <span className="text-sm font-medium text-n-500">
                Salary Per Month
              </span>
              <span className="text-lg font-medium text-n-900">
                Rs. 1,80,000
              </span>
            </div>
            <div className="flex flex-col w-1/2  justify-start items-end">
              <span className="text-sm font-medium text-n-500">
                Salary Per Month
              </span>
              <span className="text-lg font-medium text-n-900">
                Rs. 1,80,000
              </span>
            </div>
            <span className="no-match-reason">Less than</span>
            <span className="yes-match-reason">More than</span>
          </div>
          <div className="relative border-[3px] border-transparent hover:border-yellow-500 transition-all flex justify-between gap-3.5 py-2 px-3.5">
            <div className="flex flex-col w-1/2  justify-start items-start">
              <span className="text-sm font-medium text-n-500">
                1st Marriage / Divorcee
              </span>
              <span className="text-lg font-medium text-n-900">
                1st Marriage
              </span>
            </div>
            <div className="flex flex-col w-1/2  justify-start items-end text-right">
              <span className="text-sm font-medium text-n-500">
                1st Marriage / Divorcee
              </span>
              <span className="text-lg font-medium text-n-900">
                1st Marriage
              </span>
            </div>
            <span className="no-match-reason">Less than</span>
            <span className="yes-match-reason">More than</span>
          </div>
          <div className="relative border-[3px] border-transparent hover:border-yellow-500 transition-all flex justify-between gap-3.5 py-2 px-3.5">
            <div className="flex flex-col w-1/2  justify-start items-start">
              <span className="text-sm font-medium text-n-500">
                Any other Details / Conditions
              </span>
              <span className="text-lg font-medium text-n-900">
                Prefers partner settled in Karnataka or abroad
              </span>
            </div>
            <div className="flex flex-col w-1/2  justify-start items-end text-right">
              <span className="text-sm font-medium text-n-500">
                Any other Details / Conditions
              </span>
              <span className="text-lg font-medium text-n-900">
                Prefers partner settled in Karnataka or abroad
              </span>
            </div>
            <span className="no-match-reason">Less than</span>
            <span className="yes-match-reason">More than</span>
          </div>
          <div className="relative border-[3px] border-transparent hover:border-yellow-500 transition-all flex justify-between gap-3.5 py-2 px-3.5">
            <div className="flex flex-col w-1/2  justify-start items-start">
              <span className="text-sm font-medium text-n-500">Bari</span>
              <div className="flex gap-2.5 justify-center items-center">
                <span className="text-lg font-normal text-n-600">Father:</span>
                <span className="text-lg font-medium text-n-900">Shetty</span>
                <div className="flex justify-start items-start"></div>
                <span className="text-lg font-normal text-n-600">Mother:</span>
                <span className="text-lg font-medium text-n-900">Poojary</span>
              </div>
            </div>
            <div className="flex flex-col w-1/2  justify-start items-end text-right">
              <span className="text-sm font-medium text-n-500">Bari</span>
              <div className="flex gap-2.5 justify-center items-center">
                <span className="text-lg font-normal text-n-600">Father:</span>
                <span className="text-lg font-medium text-n-900">Shetty</span>
                <div className="flex justify-start items-start"></div>
                <span className="text-lg font-normal text-n-600">Mother:</span>
                <span className="text-lg font-medium text-n-900">Poojary</span>
              </div>
            </div>
            <span className="no-match-reason">Less than</span>
            <span className="yes-match-reason">More than</span>
          </div>
        </div>
        {/* Girls Profile Image Wrapper */}
        <div className="w-116 flex flex-col items-center gap-4 px-5 py-8">
          <div className="rounded-3xl w-full">
            <Image src={ProfileImage} alt="omkar" className="w-full" />
          </div>
          {/* Button */}
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-slate-800 w-full h-18 text-base font-medium cursor-pointer">
            <Image src={ShareIcon} alt="share" />
            Send Boys Details
          </Button>
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
      {/* Parents Details Section */}
      <div className=" px-5 py-8 flex justify-between gap-3.5 ">
        {/* Boy Side Details */}
        <div className="flex w-1/2 gap-12 px-5 items-center">
          <div className="flex flex-col flex-1 gap-2.5 justify-start items-start">
            <span className="text-xl font-semibold text-n-900 p-with-before">
              Father’s Details
            </span>
            <div className="flex flex-col  justify-start items-start">
              <span className="text-sm font-medium text-n-500">Name</span>
              <span className="text-lg font-medium text-n-900">
                Anand Shetty
              </span>
            </div>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">
                Employee Details
              </span>
              <span className="text-lg font-medium text-n-900">
                Retired - Government Officer
              </span>
            </div>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">Bari</span>
              <span className="text-lg font-medium text-n-900">Shetty</span>
            </div>
          </div>
          <span className="w-px h-4/5 bg-slate-300"></span>
          <div className="flex flex-col flex-1 gap-2.5 justify-start items-start">
            <span className="text-xl font-semibold text-n-900 p-with-before">
              Mother’s Details
            </span>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">Name</span>
              <span className="text-lg font-medium text-n-900">
                Sunita Shetty
              </span>
            </div>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">
                Employee Details
              </span>
              <span className="text-lg font-medium text-n-900">Homemaker</span>
            </div>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">Bari</span>
              <span className="text-lg font-medium text-n-900">Poojary</span>
            </div>
          </div>
        </div>
        {/* Girl Side Details */}
        <div className="flex w-1/2 gap-12 px-5 items-center">
          <div className="flex flex-col flex-1 gap-2.5 justify-start items-start">
            <span className="text-xl font-semibold text-n-900 p-with-before">
              Father’s Details
            </span>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">Name</span>
              <span className="text-lg font-medium text-n-900">
                Anand Shetty
              </span>
            </div>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">
                Employee Details
              </span>
              <span className="text-lg font-medium text-n-900">
                Retired - Government Officer
              </span>
            </div>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">Bari</span>
              <span className="text-lg font-medium text-n-900">Shetty</span>
            </div>
          </div>
          <span className="w-px h-4/5 bg-slate-300"></span>
          <div className="flex flex-col flex-1 gap-2.5 justify-start items-start">
            <span className="text-xl font-semibold text-n-900 p-with-before">
              Mother’s Details
            </span>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">Name</span>
              <span className="text-lg font-medium text-n-900">
                Sunita Shetty
              </span>
            </div>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">
                Employee Details
              </span>
              <span className="text-lg font-medium text-n-900">Homemaker</span>
            </div>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">Bari</span>
              <span className="text-lg font-medium text-n-900">Poojary</span>
            </div>
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
        <div className="flex flex-col w-1/2 gap-2.5 px-5 justify-start items-start">
          <span className="text-xl font-semibold text-n-900 p-with-before">
            Contact Details
          </span>
          <div className="flex gap-7 justify-start items-center">
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">Address</span>
              <span className="text-lg font-medium text-n-900">
                Shivbagh, Kadri, Mangalore - 575002
              </span>
            </div>
            <div className="flex justify-start items-start"></div>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">Email</span>
              <Link href={"#"}>
                <span className="text-lg font-medium text-n-900">
                  rahul.shetty@gmail.com
                </span>
              </Link>
            </div>
            <div className="flex justify-start items-start"></div>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">Mobile</span>
              <div className="flex gap-1">
                <Link href="tel:9845012345">
                  <span className="text-lg font-medium text-n-900">
                    9845012345
                  </span>
                </Link>
                <span>/</span>
                <Link href="tel:9741567890">
                  <span className="text-lg font-medium text-n-900">
                    9741567890
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/2 gap-2.5 px-5 justify-start items-start">
          <span className="text-xl font-semibold text-n-900 p-with-before">
            Contact Details
          </span>
          <div className="flex gap-7 justify-start items-center">
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">Address</span>
              <span className="text-lg font-medium text-n-900">
                Shivbagh, Kadri, Mangalore - 575002
              </span>
            </div>
            <div className="flex justify-start items-start"></div>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">Email</span>
              <Link href={"#"}>
                <span className="text-lg font-medium text-n-900">
                  rahul.shetty@gmail.com
                </span>
              </Link>
            </div>
            <div className="flex justify-start items-start"></div>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="text-sm font-medium text-n-500">Mobile</span>
              <div className="flex gap-1">
                <Link href="tel:9845012345">
                  <span className="text-lg font-medium text-n-900">
                    9845012345
                  </span>
                </Link>
                <span>/</span>
                <Link href="tel:9741567890">
                  <span className="text-lg font-medium text-n-900">
                    9741567890
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
