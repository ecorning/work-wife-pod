import Image from "next/image";

export default function About() {
  return (
    <>
      {/* Section 1: HOSTED BY */}
      <section className="flex items-center justify-center bg-ww-orange px-6 py-16 md:py-24">
        <h1 className="font-display text-center text-4xl text-white md:text-6xl lg:text-7xl">
          HOSTED BY
        </h1>
      </section>

      {/* Section 2: Emily & Friends profiles */}
      <section className="bg-white px-6 pt-20 pb-6">
        <div className="mx-auto max-w-6xl">
          {/* Mobile layout — each host grouped together */}
          <div className="flex flex-col items-center gap-10 md:hidden">
            {/* Emily group */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/hosts/emily headshot.png"
                alt="Emily — cartoon portrait"
                width={1024}
                height={1024}
                className="mb-6 h-auto w-48"
              />
              <h2 className="font-display text-5xl text-ww-blue">
                EMILY
              </h2>
              <p className="font-display mt-2 text-xl text-ww-blue">
                YOUR OPINIONATED BEST FRIEND*
              </p>
              <p className="mt-4 text-base font-medium text-ww-blue/80">
                *OR BOSSY OLDER SISTER
              </p>
            </div>

            {/* & */}
            <h2 className="font-display text-5xl text-ww-blue">
              &amp;
            </h2>

            {/* Friends group */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/hosts/friends headshot.png"
                alt="Friends — cartoon portrait"
                width={1024}
                height={1024}
                className="mb-6 h-auto w-[14.4rem]"
              />
              <h2 className="font-display text-5xl text-ww-blue">
                FRIENDS
              </h2>
              <p className="font-display mt-2 text-xl text-ww-blue">
                ACTUALLY QUALIFIED* EXPERTS ON CAREER &amp; THE WORKPLACE
              </p>
              <p className="mt-4 text-base font-medium text-ww-blue/80">
                *SERIOUSLY, LIKE WITH PHDS
              </p>
            </div>
          </div>

          {/* Desktop layout — row-based grids */}
          <div className="hidden md:block">
            {/* Portrait row */}
            <div className="mb-10 grid grid-cols-[1fr_auto_1fr] gap-8">
              <div className="flex justify-center">
                <Image
                  src="/images/hosts/emily headshot.png"
                  alt="Emily — cartoon portrait"
                  width={1024}
                  height={1024}
                  className="h-auto md:w-56 lg:w-64"
                />
              </div>
              <div aria-hidden="true" />
              <div className="flex justify-center pl-6">
                <Image
                  src="/images/hosts/friends headshot.png"
                  alt="Friends — cartoon portrait"
                  width={1024}
                  height={1024}
                  className="h-auto md:w-[16.8rem] lg:w-[19.2rem]"
                />
              </div>
            </div>

            {/* Names row — top aligned */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-8">
              <div className="flex justify-center text-center">
                <h2 className="font-display text-6xl text-ww-blue">
                  EMILY
                </h2>
              </div>
              <div className="flex items-center justify-center px-2">
                <h2 className="font-display text-6xl text-ww-blue">
                  &amp;
                </h2>
              </div>
              <div className="flex justify-center text-center pl-6">
                <h2 className="font-display text-6xl text-ww-blue">
                  FRIENDS
                </h2>
              </div>
            </div>

            {/* Descriptions row — center aligned */}
            <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-8">
              <div className="flex justify-center text-center">
                <p className="font-display text-2xl text-ww-blue">
                  YOUR OPINIONATED BEST FRIEND*
                </p>
              </div>
              <div aria-hidden="true">
                <span className="invisible font-display text-2xl">&amp;</span>
              </div>
              <div className="flex justify-center text-center pl-6">
                <p className="font-display text-2xl text-ww-blue">
                  ACTUALLY QUALIFIED* EXPERTS ON CAREER &amp; THE WORKPLACE
                </p>
              </div>
            </div>

            {/* Asterisk footnotes row */}
            <div className="mt-8 grid grid-cols-[1fr_auto_1fr] gap-8">
              <div className="flex items-start justify-center text-center">
                <p className="text-base font-medium text-ww-blue/80">
                  *OR BOSSY OLDER SISTER
                </p>
              </div>
              <div aria-hidden="true">
                <span className="invisible font-display text-5xl">&amp;</span>
              </div>
              <div className="flex items-start justify-center text-center pl-6">
                <p className="text-base font-medium text-ww-blue/80">
                  *SERIOUSLY, LIKE WITH PHDS
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Contact — single line, reduced height and font */}
      <section className="flex items-center justify-center bg-white px-6 pt-6 pb-20 md:pt-8 md:pb-28">
        <h2 className="text-center text-base font-normal text-ww-orange">
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
