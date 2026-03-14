import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Section 1: Hero - WORK WIFE on orange */}
      <section className="flex min-h-screen items-center justify-center bg-ww-orange px-6">
        <h1 className="font-display text-center text-[12vw] leading-[0.9] text-white md:text-[10vw]">
          WORK WIFE
        </h1>
      </section>

      {/* Section 2: Tagline on blue */}
      <section className="flex min-h-screen items-center justify-center bg-ww-blue px-6">
        <div className="font-display text-center text-[9.6vw] leading-[0.9] text-white md:text-[8vw]">
          <h2>YOUR FAVORITE</h2>
          <p className="text-[5.8vw] md:text-[4.5vw]">(DESPERATELY NEEDED)</p>
          <h2>WORK ADVICE PODCAST</h2>
        </div>
      </section>

      {/* Section 3: Topics conveyor belt on white */}
      <section className="relative min-h-screen overflow-hidden bg-white">
        {/* Top & bottom fade masks */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white to-transparent" />

        <div className="flex h-screen items-center justify-center">
          <div className="animate-conveyor-down flex flex-col items-center gap-2 text-center md:gap-3">
            {/* Duplicate the list twice so the animation loops seamlessly */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 md:gap-3">
                {[
                  "BAD BOSS?",
                  "NEGOTIATING A RAISE?",
                  "INTERVIEW STAGE FRIGHT?",
                  "ANNOYING CO-WORKER?",
                  "SEARCHING FOR LIFE'S MEANING?",
                  "HIRING YOUR FIRST TEAM?",
                  "NAVIGATING OFFICE BEEF?",
                  "GOSSIPY COWORKERS?",
                  "BATTLING BURNOUT?",
                  "DEBATING EMAIL ETIQUETTE?",
                ].map((topic) => (
                  <p
                    key={`${i}-${topic}`}
                    className="font-display text-lg text-ww-orange md:text-[2.5vw]"
                  >
                    {topic}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: CTA on blue */}
      <section className="flex min-h-screen items-center justify-center bg-ww-blue px-6">
        <Link href="/submissions" className="group">
          <h2 className="font-display text-center text-[9.6vw] leading-[0.9] text-white transition-transform group-hover:scale-105 md:text-[8vw]">
            SEND US YOUR QUESTIONS!
          </h2>
        </Link>
      </section>

      {/* Section 5: Closing statement on white */}
      <section className="flex min-h-screen items-center justify-center bg-white px-6">
        <h2 className="font-display max-w-5xl text-center text-4xl leading-[0.95] text-ww-orange md:text-6xl lg:text-[7rem]">
          IF YOU HAVE 99 PROBLEMS, WORK IS PROBABLY ONE
        </h2>
      </section>
    </>
  );
}
