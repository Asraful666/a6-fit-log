"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePlan } from "@/context/PlanContext";

type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const currentList = activeTab === "plan" ? plan : saved;

  const sortedList = useMemo(() => {
    return [...currentList].sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }

      return b.rating - a.rating;
    });
  }, [currentList, sortBy]);

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const handleRemove = (id: number) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
  };

  return (
    <main className="my-plan-page">
      <section className="my-plan-container">

        {/* Header */}
        <div className="my-plan-heading">
          <h1>MY PLAN</h1>

          <p>
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
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

        {/* Tabs + Sort */}
        <div className="plan-toolbar">

          <div className="plan-tabs">
            <button
              type="button"
              className={activeTab === "plan" ? "active" : ""}
              onClick={() => setActiveTab("plan")}
            >
              Today's Plan
            </button>

            <button
              type="button"
              className={activeTab === "saved" ? "active" : ""}
              onClick={() => setActiveTab("saved")}
            >
              Saved
            </button>
          </div>

          <label className="sort-box">
            <span>Sort By</span>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as SortOption)
              }
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </div>

        {/* Workout List */}
        {sortedList.length > 0 ? (
          <section className="plan-workout-list">

            {sortedList.map((workout) => (
              <article
                className={`plan-workout-card ${
                  workout.isDone ? "completed" : ""
                }`}
                key={workout.id}
              >
                {/* Image */}
                <div className="plan-workout-image">
                  <img
                    src={workout.image}
                    alt={workout.name}
                  />
                </div>

                {/* Main info */}
                <div className="plan-workout-info">

                  <h2>{workout.name}</h2>

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

                </div>

                {/* Actions */}
                <div className="plan-actions">

                  <Link
                    href={`/workout/${workout.id}`}
                    className="details-btn"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      type="button"
                      className={`done-btn ${
                        workout.isDone ? "is-done" : ""
                      }`}
                      onClick={() => markAsDone(workout.id)}
                    >
                      ✓{" "}
                      {workout.isDone
                        ? "Done"
                        : "Mark as Done"}
                    </button>
                  )}

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemove(workout.id)}
                    aria-label={`Remove ${workout.name}`}
                  >
                    ×
                  </button>

                </div>
              </article>
            ))}

          </section>
        ) : (

          /* Empty State */
          <section className="empty-plan">

            <div className="empty-content">

              <h2>NOTHING HERE YET</h2>

              <p>
                Browse the library and add a lift to get today moving.
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