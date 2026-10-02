"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const isWorkout = pathname === "/";
  const isMyPlan = pathname === "/my-plan";

  return (
    <header className="fitlog-navbar">
      <div className="fitlog-navbar-inner">
        {/* Logo */}
        <Link href="/" className="fitlog-logo">
          <Image
            src="/images/logo.png"
            alt="FitLog"
            width={26}
            height={26}
            priority
          />

          <span>FITLOG</span>
        </Link>

        {/* Center Navigation */}
        <nav className="fitlog-nav">
          <Link
            href="/"
            className={`fitlog-nav-link ${
              isWorkout ? "active" : ""
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`fitlog-nav-link ${
              isMyPlan ? "active" : ""
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right Side */}
        <div className="fitlog-status">
          <Link href="/my-plan" className="fitlog-status-item">
            <span>Plan</span>

            <span className="fitlog-plan-count">
              {plan.length}
            </span>
          </Link>

          <Link href="/my-plan" className="fitlog-status-item">
            <span>Saved</span>

            <span className="fitlog-saved-count">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}