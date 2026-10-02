import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-copy">
          <p className="hero-eyebrow">WORKOUT LIBRARY</p>

          <h1>
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="hero-description">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link href="#library" className="hero-button">
            BROWSE WORKOUTS
            <span>→</span>
          </Link>
        </div>

        <div className="hero-image">
          <Image
            src="/images/banner.png"
            alt="Workout illustration"
            width={360}
            height={360}
            priority
          />
        </div>
      </div>
    </section>
  );
}