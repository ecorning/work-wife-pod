"use client";

import { useState } from "react";

export default function ComingSoon() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const isFormValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone }),
      });

      if (!res.ok) throw new Error("Failed");
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Section 1: Header banner */}
      <section className="flex items-center justify-center bg-ww-orange px-6 py-14 md:py-20">
        <h1 className="font-display text-center text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
          PODCAST COMING SOON!
        </h1>
      </section>

      {/* Section 2: Sign-up form */}
      <section className="bg-white px-6 pt-10 pb-16">
        <div className="mx-auto max-w-xl">
          {submitStatus !== "success" ? (
            <div className="space-y-8">
              <div className="text-center">
                <p className="font-display text-lg text-ww-blue">
                  The Work Wife podcast is launching soon!
                </p>
                <p className="font-display mt-1 text-lg text-ww-blue">
                  Sign up below to be the first to know when we go live
                </p>
              </div>

              <div className="space-y-6">
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
                      LAST NAME <span className="text-ww-orange">*</span>
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
                    EMAIL <span className="text-ww-orange">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-base transition-colors focus:border-ww-blue focus:outline-none focus:ring-1 focus:ring-ww-blue"
                    placeholder="jane@example.com"
                  />
                </div>

                {/* Phone (optional) */}
                <div>
                  <label className="font-display mb-2 block text-sm tracking-wide text-ww-blue">
                    PHONE NUMBER{" "}
                    <span className="font-sans text-xs font-normal text-gray-400">
                      (OPTIONAL)
                    </span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-base transition-colors focus:border-ww-blue focus:outline-none focus:ring-1 focus:ring-ww-blue"
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Submit */}
                <button
                  type="button"
                  disabled={!isFormValid || isSubmitting}
                  onClick={handleSubmit}
                  className={`font-display w-full rounded-md px-8 py-4 text-lg text-white transition-all md:text-xl ${
                    isFormValid && !isSubmitting
                      ? "bg-ww-orange hover:opacity-90 active:scale-[0.98]"
                      : "cursor-not-allowed bg-ww-orange opacity-40"
                  }`}
                >
                  {isSubmitting ? "SUBMITTING..." : "NOTIFY ME"}
                </button>

                {submitStatus === "error" && (
                  <p className="text-center text-sm text-red-500">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <h2 className="font-display text-3xl text-ww-blue md:text-4xl">
                YOU&apos;RE ON THE LIST!
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We&apos;ll let you know as soon as the podcast launches
              </p>
              <p className="mt-6 text-base text-gray-600">
                In the meantime, if you have a work related question or dilemma you would like advice on, please{" "}
                <a
                  href="/submissions"
                  className="font-medium text-ww-orange underline decoration-1 underline-offset-2 hover:opacity-80"
                >
                  submit here
                </a>
                !
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
