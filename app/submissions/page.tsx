"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const collageImages = [
  { src: "/images/collage/camera-orange.jpg", alt: "Orange phone camera close-up", className: "object-top" },
  { src: "/images/collage/tape-holder-red.jpg", alt: "White out dispenser" },
  { src: "/images/collage/phone-nokia.jpg", alt: "Retro Nokia phone" },
  { src: "/images/collage/calendar-red.jpg", alt: "Red retro desk calendar" },
  { src: "/images/collage/clock-digital.jpg", alt: "Retro digital clock" },
];

const AGE_RANGES = [
  "18–20",
  "20–25",
  "25–30",
  "30–35",
  "35–40",
  "40–50",
  "50–60",
  "60+",
];

const GENDER_OPTIONS = ["Female", "Male", "Non-Binary", "Prefer not to say"];

const INDUSTRY_OPTIONS = [
  "Academia",
  "Arts",
  "Banking",
  "Beauty",
  "Consulting",
  "Customer Support",
  "Education",
  "Engineering",
  "Fashion",
  "Finance",
  "Government",
  "Healthcare",
  "Law",
  "Marketing",
  "Nonprofit",
  "Private Equity",
  "Real Estate",
  "Social Media",
  "Sports",
  "Startup",
  "Tech",
  "Venture Capital",
];

export default function Submissions() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [industry, setIndustry] = useState("");
  const [industryOther, setIndustryOther] = useState("");
  const [ageMode, setAgeMode] = useState<"exact" | "range">("exact");
  const [exactAge, setExactAge] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [showTextBox, setShowTextBox] = useState(false);
  const [question, setQuestion] = useState("");
  const [callInOpen, setCallInOpen] = useState(false);
  const [callInEmail, setCallInEmail] = useState("");
  const [callInPhone, setCallInPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const textareaRef = useRef<HTMLDivElement>(null);

  const hasAge = ageMode === "exact" ? exactAge !== "" : ageRange !== "";
  const isFormValid = firstName.trim() !== "" && lastName.trim() !== "" && consentChecked && gender !== "" && industry !== "" && hasAge;

  const handleWriteToUs = () => {
    setShowTextBox(true);
    setTimeout(() => {
      textareaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleSubmit = async () => {
    if (!isFormValid || !question.trim()) return;
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          age: ageMode === "exact" ? exactAge : ageRange,
          gender,
          industry,
          industryOther,
          question,
          callIn: callInOpen,
          callInEmail: callInOpen ? callInEmail : "",
          callInPhone: callInOpen ? callInPhone : "",
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Section 1: Instructions */}
      <section className="flex items-center justify-center bg-ww-blue px-6 py-14 md:py-20">
        <h1 className="font-display text-center text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
          FILL OUT THE FORM BELOW
          <br />
          TO SUBMIT YOUR QUESTION
        </h1>
      </section>

      {/* Section 2: Submission form */}
      <section className="bg-white px-6 pt-10 pb-16">
        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-8"
            noValidate
          >
            {/* First Name / Last Name */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="font-display mb-2 block text-sm tracking-wide text-ww-blue">
                  FIRST NAME <span className="text-ww-orange">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-base transition-colors focus:border-ww-blue focus:outline-none focus:ring-1 focus:ring-ww-blue"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="font-display mb-2 block text-sm tracking-wide text-ww-blue">
                  LAST NAME OR LAST INITIAL <span className="text-ww-orange">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-base transition-colors focus:border-ww-blue focus:outline-none focus:ring-1 focus:ring-ww-blue"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="font-display mb-2 block text-sm tracking-wide text-ww-blue">
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-base transition-colors focus:border-ww-blue focus:outline-none focus:ring-1 focus:ring-ww-blue"
                placeholder="jane@example.com"
              />
            </div>

            {/* Age / Industry / Gender — single row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Age */}
              <div>
                <label className="font-display mb-2 block text-sm tracking-wide text-ww-blue">
                  AGE <span className="text-ww-orange">*</span>
                </label>
                {ageMode === "exact" ? (
                  <div className="relative">
                    <input
                      type="number"
                      min="13"
                      max="120"
                      value={exactAge}
                      onChange={(e) => setExactAge(e.target.value)}
                      className="w-full appearance-none rounded-md border border-gray-300 px-4 py-3 pr-10 text-base transition-colors [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:border-ww-blue focus:outline-none focus:ring-1 focus:ring-ww-blue"
                      placeholder="28"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex flex-col items-center justify-center pr-3">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-gray-500">
                        <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="h-1" />
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-gray-500">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <select
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-base transition-colors focus:border-ww-blue focus:outline-none focus:ring-1 focus:ring-ww-blue"
                  >
                    <option value="">Select a range</option>
                    {AGE_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (ageMode === "exact") {
                      setAgeMode("range");
                      setExactAge("");
                    } else {
                      setAgeMode("exact");
                      setAgeRange("");
                    }
                  }}
                  className="mt-2 block w-full text-center text-sm italic text-ww-blue underline decoration-1 underline-offset-2 transition-opacity hover:opacity-70"
                >
                  {ageMode === "exact"
                    ? "I prefer to share my age range"
                    : "I prefer to enter my exact age"}
                </button>
              </div>

              {/* Industry */}
              <div>
                <label className="font-display mb-2 block text-sm tracking-wide text-ww-blue">
                  INDUSTRY <span className="text-ww-orange">*</span>
                </label>
                <select
                  value={industry}
                  onChange={(e) => {
                    setIndustry(e.target.value);
                    if (e.target.value !== "Other") setIndustryOther("");
                  }}
                  className={`w-full rounded-md border border-gray-300 px-4 py-3 text-base transition-colors focus:border-ww-blue focus:outline-none focus:ring-1 focus:ring-ww-blue ${industry === "" ? "text-gray-400" : "text-gray-900"}`}
                >
                  <option value="">Select</option>
                  {INDUSTRY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="font-display mb-2 block text-sm tracking-wide text-ww-blue">
                  GENDER <span className="text-ww-orange">*</span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={`w-full rounded-md border border-gray-300 px-4 py-3 text-base transition-colors focus:border-ww-blue focus:outline-none focus:ring-1 focus:ring-ww-blue ${gender === "" ? "text-gray-400" : "text-gray-900"}`}
                >
                  <option value="">Select</option>
                  {GENDER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Industry "Other" write-in (full width below the row) */}
            {industry === "Other" && (
              <div>
                <input
                  type="text"
                  value={industryOther}
                  onChange={(e) => setIndustryOther(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-base transition-colors focus:border-ww-blue focus:outline-none focus:ring-1 focus:ring-ww-blue"
                  placeholder="Please specify your industry"
                />
              </div>
            )}

            {/* Consent checkbox */}
            <div>
              <label className="flex cursor-pointer items-start gap-3">
                <span
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${
                    consentChecked
                      ? "border-ww-orange bg-ww-orange"
                      : "border-gray-300"
                  }`}
                >
                  {consentChecked && (
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="sr-only"
                />
                <span>
                  <span className="text-sm leading-relaxed text-gray-600">
                    By clicking here you consent to us sharing (or paraphrasing) your question via Work Wife (required)
                  </span>
                  <span className="mt-2 block text-[11px] leading-tight text-gray-400">
                    By clicking below, I acknowledge that I am voluntarily providing my consent and release to Work Wife, its members, officers, directors, employees, contractors and assigns to use any and all details from this submission for any purpose, including, but not limited to, the right to use such story for content for the Work Wife podcast and social media platforms, and to monetize and exploit such content commercially.
                    {" "}
                    I hereby release and hold harmless Work Wife, its members, officers, directors, employees, contractors and assigns against all claims, damages or expenses of whatever form or nature, including attorneys&apos; fees and other costs of legal defense, whether direct or indirect, that they may sustain or incur as a result of the use of this content and release any claims by or on behalf of myself and my heirs for any damages or reimbursement for use of the content.
                  </span>
                </span>
              </label>
            </div>

            {/* Action buttons */}
            {submitStatus !== "success" && (
              <div className="flex flex-col gap-4 pt-4 md:flex-row md:gap-6">
                <button
                  type="button"
                  disabled={!isFormValid || showTextBox}
                  onClick={handleWriteToUs}
                  className={`font-display flex-1 rounded-md px-8 py-4 text-lg text-white transition-all md:text-xl ${
                    isFormValid && !showTextBox
                      ? "bg-ww-orange hover:opacity-90 active:scale-[0.98]"
                      : "cursor-not-allowed bg-ww-orange opacity-40"
                  }`}
                >
                  WRITE TO US
                </button>
                <button
                  type="button"
                  disabled
                  className="font-display flex-1 cursor-not-allowed rounded-md bg-ww-blue px-8 py-4 text-white opacity-40 transition-all"
                >
                  <span className="text-lg md:text-xl">RECORD A VOICE MEMO</span>
                  <span className="mt-1 block text-xs font-normal tracking-wide">
                    (COMING SOON)
                  </span>
                </button>
              </div>
            )}

            {/* Question textarea — appears after clicking Write to Us */}
            {showTextBox && submitStatus !== "success" && (
              <div ref={textareaRef} className="space-y-4 pt-2">
                <label className="font-display mb-2 block text-sm tracking-wide text-ww-blue">
                  YOUR QUESTION <span className="text-ww-orange">*</span>
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={6}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-base transition-colors focus:border-ww-blue focus:outline-none focus:ring-1 focus:ring-ww-blue"
                  placeholder="Tell us what's going on at work..."
                />
                {/* Call-in checkbox */}
                <div>
                  <label className="flex cursor-pointer items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${
                        callInOpen
                          ? "border-ww-orange bg-ww-orange"
                          : "border-gray-300"
                      }`}
                    >
                      {callInOpen && (
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      checked={callInOpen}
                      onChange={(e) => {
                        setCallInOpen(e.target.checked);
                        if (!e.target.checked) {
                          setCallInEmail("");
                          setCallInPhone("");
                        }
                      }}
                      className="sr-only"
                    />
                    <span className="text-sm leading-relaxed text-gray-600">
                      I am open to potentially calling into the Work Wife podcast and discussing my question with the hosts (voices can be anonymized)
                    </span>
                  </label>

                  {/* Conditional contact fields — skip email if already provided above */}
                  {callInOpen && (
                    <div className="mt-4 grid grid-cols-1 gap-4 pl-8 md:grid-cols-2">
                      {!email.trim() && (
                        <div>
                          <label className="font-display mb-2 block text-sm tracking-wide text-ww-blue">
                            EMAIL
                          </label>
                          <input
                            type="email"
                            value={callInEmail}
                            onChange={(e) => setCallInEmail(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-4 py-3 text-base transition-colors focus:border-ww-blue focus:outline-none focus:ring-1 focus:ring-ww-blue"
                            placeholder="jane@example.com"
                          />
                        </div>
                      )}
                      <div>
                        <label className="font-display mb-2 block text-sm tracking-wide text-ww-blue">
                          PHONE NUMBER
                        </label>
                        <input
                          type="tel"
                          value={callInPhone}
                          onChange={(e) => setCallInPhone(e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-4 py-3 text-base transition-colors focus:border-ww-blue focus:outline-none focus:ring-1 focus:ring-ww-blue"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      {!email.trim() && !callInEmail.trim() && !callInPhone.trim() && (
                        <p className="text-sm text-gray-400 md:col-span-2">
                          Please provide at least an email or phone number
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  disabled={!question.trim() || isSubmitting || (callInOpen && !email.trim() && !callInEmail.trim() && !callInPhone.trim())}
                  onClick={handleSubmit}
                  className={`font-display w-full rounded-md px-8 py-4 text-lg text-white transition-all md:text-xl ${
                    question.trim() && !isSubmitting && !(callInOpen && !email.trim() && !callInEmail.trim() && !callInPhone.trim())
                      ? "bg-ww-orange hover:opacity-90 active:scale-[0.98]"
                      : "cursor-not-allowed bg-ww-orange opacity-40"
                  }`}
                >
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                </button>
                {submitStatus === "error" && (
                  <p className="text-center text-sm text-red-500">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            )}

            {/* Success message */}
            {submitStatus === "success" && (
              <div className="py-12 text-center">
                <h2 className="font-display text-3xl text-ww-blue md:text-4xl">
                  THANK YOU!
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  We have received your question and hope we can help
                </p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Section 3: Photo row — 5 equal images in a single row */}
      <section className="bg-white px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-5 gap-3">
            {collageImages.map((img) => (
              <div key={img.src} className="aspect-square overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={500}
                  height={500}
                  className={`h-full w-full object-cover ${img.className || ""}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
