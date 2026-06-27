import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      {/* Decorazioni soft sullo sfondo, nei colori del brand */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-teal/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-brand-tan/25 blur-3xl"
      />

      <div
        className="flex flex-col items-center gap-8"
        style={{ animation: "fade-up 0.7s ease-out both" }}
      >
        <Image
          src="/logo.png"
          alt="Scodinzolandia Pet Shop"
          width={440}
          height={240}
          priority
          className="h-auto w-[260px] sm:w-[340px] md:w-[400px]"
        />

        <div
          className="flex flex-col items-center gap-4"
          style={{ animation: "fade-up 0.7s ease-out 0.15s both" }}
        >
          <h1 className="text-2xl font-semibold tracking-tight text-brand-teal-dark sm:text-3xl">
            Sito in creazione
          </h1>
          <p className="max-w-md text-base leading-7 text-muted">
            Stiamo preparando con cura la nuova casa online di Scodinzolandia.
            Torna presto a trovarci — qui troverai tutto per i tuoi amici a
            quattro zampe. 🐾
          </p>
        </div>

        {/* Indicatore "lavori in corso" */}
        <div
          className="flex items-center gap-2"
          style={{ animation: "fade-up 0.7s ease-out 0.3s both" }}
          aria-label="Lavori in corso"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-full bg-brand-teal"
              style={{
                animation: "dot-pulse 1.4s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <footer
        className="absolute bottom-6 text-xs text-muted"
        style={{ animation: "fade-up 0.7s ease-out 0.45s both" }}
      >
        © {new Date().getFullYear()} Scodinzolandia Pet Shop
      </footer>
    </main>
  );
}
