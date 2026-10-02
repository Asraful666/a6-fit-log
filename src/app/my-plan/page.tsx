"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePlan } from "@/context/PlanContext";

type SortOption = "duration" | "calories" | "rating";
type ActiveTab = "plan" | "saved";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<ActiveTab>("plan");
  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const currentList =
    activeTab === "plan" ? plan : saved;

  /*
   * Sort current list
   */
  const sortedList = useMemo(() => {
    return [...currentList].sort((a, b) => {
      switch (sortBy) {
        case "duration":
          return a.duration - b.duration;

        case "calories":
          return a.caloriesBurned - b.caloriesBurned;

        case "rating":
          return b.rating - a.rating;

        default:
          return 0;
      }
    });
  }, [currentList, sortBy]);

  /*
   * Today's Plan metrics
   */
  const totalMinutes = useMemo(() => {
    return plan.reduce(
      (total, workout) =>
        total + workout.duration,
      0
    );
  }, [plan]);

  const totalCalories = useMemo(() => {
    return plan.reduce(
      (total, workout) =>
        total + workout.caloriesBurned,
      0
    );
  }, [plan]);

  /*
   * Remove workout
   */
  const handleRemove = (id: number) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
      return;
    }

    removeFromSaved(id);
  };

  /*
   * Change tab
   */
  const handleTabChange = (
    tab: ActiveTab
  ) => {
    setActiveTab(tab);
  };

  return (
    <main className="my-plan-page">
      <section className="my-plan-container">

        {/* ================= HEADER ================= */}

        <div className="my-plan-heading">
          <h1>MY PLAN</h1>

          <p>
            Cap of five lifts for today. Finish them,
            then load more.
          </p>
        </div>

        {/* ================= METRICS ================= */}

        <section className="metrics-grid">

          <div className="metric-card">
            <span>Exercises</span>
            <strong>{plan.length}</strong>
          </div>

          <div className="metric-card">
            <span>Minutes</span>
            <strong>{totalMinutes}</strong>
          </div>

          <div className="metric-card">
            <span>Calories</span>
            <strong>{totalCalories}</strong>
          </div>

        </section>

        {/* ================= TOOLBAR ================= */}

        <div className="plan-toolbar">

          {/* Tabs */}

          <div className="plan-tabs">

            <button
              type="button"
              className={
                activeTab === "plan"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleTabChange("plan")
              }
            >
              Today's Plan
            </button>

            <button
              type="button"
              className={
                activeTab === "saved"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleTabChange("saved")
              }
            >
              Saved
            </button>

          </div>

          {/* Sort */}

          <label className="sort-box">

            <span>Sort By</span>

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value as SortOption
                )
              }
              aria-label="Sort workouts"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>

          </label>

        </div>

        {/* ================= WORKOUT LIST ================= */}

        {sortedList.length > 0 ? (

          <section className="plan-workout-list">

            {sortedList.map((workout) => (

              <article
                key={workout.id}
                className={`plan-workout-card ${
                  workout.isDone
                    ? "completed"
                    : ""
                }`}
              >

                {/* IMAGE */}

                <div className="plan-workout-image">

                  <img
                    src={workout.image}
                    alt={workout.name}
                    loading="lazy"
                  />

                </div>

                {/* INFO */}

                <div className="plan-workout-info">

                  <h2>
                    {workout.name}
                  </h2>

                  <p className="plan-equipment">
                    {workout.equipment}
                  </p>

                  <div className="plan-stats">

                    <span>
                      ◷ {workout.duration} min
                    </span>

                    <span>
                      🔥 {workout.caloriesBurned} kcal
                    </span>

                    <span>
                      ★ {workout.rating}
                    </span>

                  </div>

                  {workout.isDone &&
                    activeTab === "plan" && (
                      <span className="completed-label">
                        COMPLETED
                      </span>
                    )}

                </div>

                {/* ACTIONS */}

                <div className="plan-actions">

                  <Link
                    href={`/workout/${workout.id}`}
                    className="details-btn"
                  >
                    View Details
                  </Link>

                  {/* Mark as Done only for Today's Plan */}

                  {activeTab === "plan" && (

                    <button
                      type="button"
                      className={`done-btn ${
                        workout.isDone
                          ? "is-done"
                          : ""
                      }`}
                      onClick={() =>
                        markAsDone(workout.id)
                      }
                    >
                      ✓{" "}

                      {workout.isDone
                        ? "Done"
                        : "Mark as Done"}
                    </button>

                  )}

                  {/* Remove */}

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() =>
                      handleRemove(workout.id)
                    }
                    aria-label={`Remove ${workout.name}`}
                  >
                    ×
                  </button>

                </div>

              </article>

            ))}

          </section>

        ) : (

          /* ================= EMPTY STATE ================= */

          <section className="empty-plan">

            <div className="empty-content">

              <h2>
                NOTHING HERE YET
              </h2>

              <p>
                {activeTab === "plan"
                  ? "Browse the library and add a lift to get today moving."
                  : "Save a workout from the library to see it here."}
              </p>

              <Link
                href="/"
                className="go-workouts-btn"
              >
                Go to workouts
              </Link>

            </div>

          </section>

        )}

      </section>
    </main>
  );
}