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

      {/* Sections 2 & 3: Emily & Experts — 2x2 grid on desktop */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          {/* Mobile: stacked */}
          <div className="flex flex-col items-center gap-12 text-center md:hidden">
            {/* Emily group */}
            <div className="flex flex-col items-center gap-6">
              <Image
                src="/images/hosts/emily headshot.png"
                alt="Emily — cartoon portrait"
                width={1024}
                height={1024}
                className="h-auto w-48"
              />
              <div>
                <h2 className="font-display text-5xl text-ww-blue">EMILY</h2>
                <p className="font-display mt-4 text-xl text-ww-blue">
                  THINK OF HER AS
                  <br />
                  YOUR OPINIONATED BEST FRIEND
                  <br />
                  OR BOSSY OLDER SISTER
                </p>
              </div>
            </div>
            {/* With the help of */}
            <h3 className="font-display text-3xl italic text-ww-orange">WITH THE HELP OF</h3>
            {/* Friends group */}
            <div className="flex flex-col items-center gap-6">
              <Image
                src="/images/hosts/friends headshot.png"
                alt="Friends — cartoon portrait"
                width={1024}
                height={1024}
                className="h-auto w-56"
              />
              <div>
                <h2 className="font-display text-5xl text-ww-blue">EXPERTS</h2>
                <p className="font-display mt-4 text-xl text-ww-blue">
                  I.E. ACTUALLY QUALIFIED PROFESSIONALS WITH EXPERTISE ON CAREER &amp; THE WORKPLACE
                </p>
              </div>
            </div>
          </div>

          {/* Desktop: 2x2 grid — row 1: Emily text + Emily image, row 2: Friends image + Experts text */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-20">
            {/* Row 1, Left: Emily text */}
            <div className="flex items-center justify-center text-center">
              <div>
                <h2 className="font-display text-6xl text-ww-blue lg:text-7xl">EMILY</h2>
                <p className="font-display mt-4 text-xl text-ww-blue lg:text-2xl">
                  THINK OF HER AS
                  <br />
                  YOUR OPINIONATED BEST FRIEND
                  <br />
                  OR BOSSY OLDER SISTER
                </p>
              </div>
            </div>
            {/* Row 1, Right: Emily image */}
            <div className="flex items-center justify-center">
              <Image
                src="/images/hosts/emily headshot.png"
                alt="Emily — cartoon portrait"
                width={1024}
                height={1024}
                className="h-auto w-56 lg:w-72"
              />
            </div>
            {/* With the help of — spans both columns */}
            <div className="col-span-2 flex items-center justify-center">
              <h3 className="font-display text-3xl italic text-ww-orange lg:text-4xl">WITH THE HELP OF</h3>
            </div>
            {/* Row 2, Left: Friends image */}
            <div className="flex items-center justify-center">
              <Image
                src="/images/hosts/friends headshot.png"
                alt="Friends — cartoon portrait"
                width={1024}
                height={1024}
                className="h-auto w-64 lg:w-80"
              />
            </div>
            {/* Row 2, Right: Experts text */}
            <div className="flex items-center justify-center text-center">
              <div>
                <h2 className="font-display text-6xl text-ww-blue lg:text-7xl">EXPERTS</h2>
                <p className="font-display mt-4 text-xl text-ww-blue lg:text-2xl">
                  I.E. ACTUALLY QUALIFIED PROFESSIONALS WITH EXPERTISE ON CAREER &amp; THE WORKPLACE
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Contact */}
      <section className="flex items-center justify-center bg-white px-6 pt-6 pb-20 md:pt-8 md:pb-28">
        <h2 className="font-display text-center text-xl text-ww-orange">
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
