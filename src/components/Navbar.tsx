"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const isHome = pathname === "/";
  const isMyPlan = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="FitLog Home"
        >
          <Image
            src="/images/logo.png"
            alt="FitLog"
            width={42}
            height={42}
            priority
            className="h-10 w-10 object-contain"
          />

          <span className="hidden text-xl font-black tracking-[0.15em] sm:block">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 sm:flex">
          <Link
            href="/"
            className={`text-sm font-bold uppercase tracking-wider transition-colors ${
              isHome
                ? "text-[#ccff00]"
                : "text-white/50 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`text-sm font-bold uppercase tracking-wider transition-colors ${
              isMyPlan
                ? "text-[#ccff00]"
                : "text-white/50 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Status badges */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[#ccff00] px-3 py-2 text-xs font-black uppercase tracking-wider text-black transition-transform hover:scale-105"
          >
            <span>Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] text-[#ccff00]">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-[#ccff00] px-3 py-2 text-xs font-black uppercase tracking-wider text-[#ccff00] transition-all hover:bg-[#ccff00] hover:text-black"
          >
            <span>Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-current px-1 text-[10px]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile navigation */}
      <nav className="flex border-t border-white/5 sm:hidden">
        <Link
          href="/"
          className={`flex flex-1 items-center justify-center py-3 text-xs font-bold uppercase tracking-widest ${
            isHome
              ? "bg-[#ccff00] text-black"
              : "text-white/50"
          }`}
        >
          Workout
        </Link>

        <Link
          href="/my-plan"
          className={`flex flex-1 items-center justify-center py-3 text-xs font-bold uppercase tracking-widest ${
            isMyPlan
              ? "bg-[#ccff00] text-black"
              : "text-white/50"
          }`}
        >
          My Plan
        </Link>
      </nav>
    </header>
  );
}