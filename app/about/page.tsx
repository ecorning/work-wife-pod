export default function About() {
  return (
    <>
      {/* Section 1: HOSTED BY — short white section */}
      <section className="flex items-center justify-center bg-ww-orange px-6 py-16 md:py-24">
        <h1 className="font-display text-center text-4xl text-white md:text-6xl lg:text-7xl">
          HOSTED BY
        </h1>
      </section>

      {/* Section 2: Emily & Friends profiles */}
      <section className="min-h-screen bg-ww-blue px-6 py-20">
        <div className="mx-auto max-w-6xl">
          {/* Names and descriptions row */}
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_auto_1fr]">
            {/* Emily */}
            <div className="flex flex-col items-center text-center">
              <h2 className="font-display text-5xl text-white md:text-6xl">
                EMILY
              </h2>
              <p className="font-display mt-2 text-xl text-white md:text-2xl">
                YOUR OPINIONATED BEST FRIEND*
              </p>
            </div>

            {/* & */}
            <div className="flex items-center justify-center self-center px-2">
              <h2 className="font-display text-5xl text-white md:text-6xl">
                &amp;
              </h2>
            </div>

            {/* Friends — nudged right for visual balance */}
            <div className="flex flex-col items-center text-center md:pl-6">
              <h2 className="font-display text-5xl text-white md:text-6xl">
                FRIENDS
              </h2>
              <p className="font-display mt-2 text-xl text-white md:text-2xl">
                ACTUALLY QUALIFIED* EXPERTS ON CAREER &amp; THE WORKPLACE
              </p>
            </div>
          </div>

          {/* Asterisk footnotes — standalone row, aligned with columns above */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr]">
            <div className="flex items-start justify-center text-center">
              <p className="text-sm font-medium text-white/80">
                *OR BOSSY OLDER SISTER
              </p>
            </div>
            <div className="hidden md:block" aria-hidden="true">
              {/* Spacer to match & column */}
              <span className="invisible font-display text-5xl">&amp;</span>
            </div>
            <div className="flex items-start justify-center text-center md:pl-6">
              <p className="text-sm font-medium text-white/80">
                *SERIOUSLY, LIKE WITH PHDS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Contact — single line, reduced height and font */}
      <section className="flex items-center justify-center bg-white px-6 py-20 md:py-28">
        <h2 className="font-display text-center text-sm text-ww-orange md:text-lg">
          BUSINESS &amp; TEAM INQUIRIES:{" "}
          <a
            href="mailto:contact@workwifepod.com"
            className="underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
          >
            CONTACT
          </a>
        </h2>
      </section>
    </>
  );
}
