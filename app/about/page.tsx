import Image from "next/image";

export default function About() {
  return (
    <>
      {/* Section 1: HOSTED BY */}
      <section className="flex items-center justify-center bg-white px-6 py-16 md:py-24">
        <h1 className="font-display text-center text-4xl text-ww-orange md:text-6xl lg:text-7xl">
          HOSTED BY
        </h1>
      </section>

      {/* Section 2: Emily & Friends profiles */}
      <section className="min-h-screen bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          {/* Mobile layout: each host grouped (image + text), hidden on md+ */}
          <div className="flex flex-col items-center gap-10 md:hidden">
            {/* Emily group */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/hosts/emily headshot.png"
                alt="Emily — cartoon portrait"
                width={280}
                height={280}
                className="mb-6 h-auto w-48"
              />
              <h2 className="font-display text-5xl text-ww-blue">EMILY</h2>
              <p className="font-display mt-2 text-xl text-ww-blue">
                YOUR OPINIONATED BEST FRIEND*
              </p>
              <p className="mt-3 text-sm font-medium text-ww-blue/60">
                *OR BOSSY OLDER SISTER
              </p>
            </div>

            {/* & */}
            <h2 className="font-display text-5xl text-ww-blue">&amp;</h2>

            {/* Friends group */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/hosts/friends headshot.png"
                alt="Friends — cartoon portrait"
                width={336}
                height={336}
                className="mb-6 h-auto w-[14.4rem]"
              />
              <h2 className="font-display text-5xl text-ww-blue">FRIENDS</h2>
              <p className="font-display mt-2 text-xl text-ww-blue">
                ACTUALLY QUALIFIED* EXPERTS ON CAREER &amp; THE WORKPLACE
              </p>
              <p className="mt-3 text-sm font-medium text-ww-blue/60">
                *SERIOUSLY, LIKE WITH PHDS
              </p>
            </div>
          </div>

          {/* Desktop layout: 3-column grid rows, hidden on mobile */}
          <div className="hidden md:block">
            {/* Portrait row */}
            <div className="mb-10 grid grid-cols-[1fr_auto_1fr]">
              <div className="flex justify-center">
                <Image
                  src="/images/hosts/emily headshot.png"
                  alt="Emily — cartoon portrait"
                  width={280}
                  height={280}
                  className="h-auto w-56 lg:w-64"
                />
              </div>
              <div aria-hidden="true" />
              <div className="flex justify-center pl-6">
                <Image
                  src="/images/hosts/friends headshot.png"
                  alt="Friends — cartoon portrait"
                  width={336}
                  height={336}
                  className="h-auto w-[16.8rem] lg:w-[19.2rem]"
                />
              </div>
            </div>

            {/* Names and descriptions row */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-8">
              <div className="flex flex-col items-center text-center">
                <h2 className="font-display text-6xl text-ww-blue">EMILY</h2>
                <p className="font-display mt-2 text-2xl text-ww-blue">
                  YOUR OPINIONATED BEST FRIEND*
                </p>
              </div>
              <div className="flex items-center justify-center self-center px-2">
                <h2 className="font-display text-6xl text-ww-blue">&amp;</h2>
              </div>
              <div className="flex flex-col items-center text-center pl-6">
                <h2 className="font-display text-6xl text-ww-blue">FRIENDS</h2>
                <p className="font-display mt-2 text-2xl text-ww-blue">
                  ACTUALLY QUALIFIED* EXPERTS ON CAREER &amp; THE WORKPLACE
                </p>
              </div>
            </div>

            {/* Asterisk footnotes row */}
            <div className="mt-8 grid grid-cols-[1fr_auto_1fr]">
              <div className="flex items-start justify-center text-center">
                <p className="text-sm font-medium text-ww-blue/60">
                  *OR BOSSY OLDER SISTER
                </p>
              </div>
              <div aria-hidden="true">
                <span className="invisible font-display text-5xl">&amp;</span>
              </div>
              <div className="flex items-start justify-center text-center pl-6">
                <p className="text-sm font-medium text-ww-blue/60">
                  *SERIOUSLY, LIKE WITH PHDS
                </p>
              </div>
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
